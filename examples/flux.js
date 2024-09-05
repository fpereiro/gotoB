var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c, B = window.B;

var type = teishi.type, clog = teishi.clog, style = lith.css.style;

// If you want to run this against the real Flux Challenge server, set this variable to `false`.
var fakeServer = true;

// *** WORLDS SOCKET ***

if (fakeServer) {
   window.server.worldsSocket (function (world) {
      B.call ('set', 'currentPlanet', JSON.parse (world));
   });
}
else {
   var socket = new WebSocket ('ws://localhost:4000');

   socket.addEventListener ('message', function (ev) {
      B.call ('set', 'currentPlanet', JSON.parse (ev.data));
   });
}

// *** GET JEDI ***

var getJedi = function (id, cb) {
   if (fakeServer) {
      var requestAborted;
      window.server.getJedi (id, function (error, body) {
         if (requestAborted) return;
         if (error) return cb (error);
         var jedi = JSON.parse (body);
         cb (null, jedi);
      });

      return {xhr: {abort: function () {
         requestAborted = true;
      }}};
   }
   else {
      return c.ajax ('get', 'http://localhost:3000/dark-jedis/' + id, {}, '', function (error, rs) {
         if (error) return cb (error.responseText);
         var jedi = rs.body;
         cb (null, jedi);
      });
   }
}

// *** SOLUTION ***

/*
   Requirements:
      1) Data for current planet indicator comes from Websocket connection
      2) Get the first jedi at http://localhost:3000/dark-jedis/3616
      3) When scrolling, move two slots at a time.
      4) When you have an empty slot, query the missing jedis.
      5) Never cache data that has gone out of the list.
      6) If the user scrolls and throws a jedi out of the list, and there was a HTTP request ongoing for that jedi, cancel it.
      7) "When either the current planet indicator changes OR loaded new rows: check if there is a displayed jedi whose home planet matches the current planet. If true, then display that jedi in red text, and cancel ALL ongoing HTTP requests for rows. Freeze the UI from scrolling until the current planet changes again and there is no red-highlighted jedi anymore."
      8) "The list cannot be scrolled down if the last known sith has no apprentice. The list cannot be scrolled up if the first known sith has no master."

   Solution:
      - One responder that initializes the state by setting `slots` (starting with Darth Sidious).
      - One responder (`change slots.*`) that will be matched when the data for any of the slots changes.
      - The data in each slot can be one of the following:
         - `undefined` for an empty slot.
         - `{id: ...}` for a slot that requires us to get the jedi with that id
         - `{id: ..., ...}` for a slot that has a jedi already loaded
      - When the responder for a given slot is matched (triggered), it checks its current value and its old value.
         - If its old value is a jedi for which 1) there is still a request going on and 2) that jedi no longer is in a slot, it cancels the request.
         - If the current value shows that there's only `{id: ...}`, it does the following:
            - If there's already a request for such a jedi, it doesn't do anything else.
            - If there's no request for such a jedi, it performs one.
      - The logic for performing a request to a jedi (done in the `retrieve jedi.*` responder) is as follows:
         - If there's already an ongoing request for a jedi, we don't create a second one.
         - The request itself is stored in a way that can be directly matched to the id of the jedi.
         - When the request receives a response, it iterates the list of slots and finds the slot where `{id: <ID FOR WHICH THE REQUEST WAS MADE>}`. In that way, if the user scrolled while the request was happening, we put the jedi in its current position, not the position where it should have been when we made the request. If there is no slot with `{id: ...}`, we simply ignore the jedi we just got.
         - After placing the jedi, if the jedi has master or apprentice data, and there is a slot up (and/or down), it places `{id: ...}` in one or both neighboring slots.
         - When the request is aborted or completed, it is removed from the hash (object) containing the requests.
      - A responder that listens to changes in the entire `slots` (`change slots`)is in charge of firing change events for each of the slots that changed. We need this when multiple slots change at the same time, which only happens when scrolling.
      - A responder that is in charge of performing scrolling (`scroll up|down`), which merely consists of throwing away part of the existing list and potentially adding one item "up" (the master of the first jedi before the scroll) or "down" (the apprentice of the last jedi before the scroll).
      - A responder that listens to changes in both `slots` and `currentPlanet` is in charge of cancelling all requests if Obi Wan is currently on the home planet. The same responder is in charge of retrieving jedis once Obi Wan is no longer on a home planet of a jedi that's shown on screen.
      - Structure of the store: {
         currentPlanet: {id: ..., name: ...}
         slots: [...], has length 5, and its possible values are:
            - `undefined`
            - `{id: ...}`: jedi placeholder
            - `{id: ..., ...}`: full jedi
         requests: {
            [JEDI ID]: requestObject,
            ...
         },
         ObiWanInHomePlanet: true|undefined
      }
*/

var MAX_JEDIS = 5;

B.mrespond ([
   ['initialize', [], function (x) {

      B.mount ('body', view);

      // Start with Darth Sidious (id 3616)
      B.call (x, 'set', 'slots', [{id: 3616}].concat (dale.go (dale.times (MAX_JEDIS - 1), function () {return undefined})));
   }],
   ['change', ['slots', '*'], function (x, currentJedi, oldJedi) {
      var slotPosition = x.path [1];

      if (oldJedi) {
         var oldRequest = B.get ('requests', oldJedi.id.toString ());
         var stillNeeded = dale.stop (B.get ('slots'), true, function (jedi) {
            return jedi && oldJedi.id === jedi.id;
         });
         if (oldRequest && ! stillNeeded) {
            oldRequest.xhr.abort ();
            B.call (x, 'rem', 'requests', oldJedi.id.toString ());
         }
      }

      // If the current jedi has no name, we request this jedi.
      if (currentJedi && ! currentJedi.name) B.call (x, 'retrieve', ['jedi', currentJedi.id]);
   }],
   ['retrieve', ['jedi', '*'], function (x, cb) {
      var jediId = x.path [1];

      // If there is currently a request ongoing for this jedi, we don't do anything else.
      if (B.get ('requests', jediId)) return;

      var request = getJedi (jediId, function (error, jedi) {
         if (error) return alert ('Unexpected error: ' + error);
         if (! jedi) return; // If the request was aborted, there will be no jedi.

         var index = dale.stopNot (B.get ('slots'), undefined, function (jedi, index) {
            if (jedi && jedi.id === jediId) return index;
         });

         B.call (x, 'rem', 'requests', jediId.toString ());

         B.call (x, 'set', ['slots', index], jedi);

         if (index > 0 && jedi.master.id) {
            if (! B.get ('slots', index - 1)) B.call (x, 'set', ['slots', index - 1], {id: jedi.master.id});
         }
         if (index !== MAX_JEDIS - 1 && jedi.apprentice.id) {
            if (! B.get ('slots', index + 1)) B.call (x, 'set', ['slots', index + 1], {id: jedi.apprentice.id});
         }
      });

      B.call (x, 'set', ['requests', jediId.toString ()], request);
   }],
   ['scroll', /^up|down$/, function (x) {
      var slots = B.get ('slots');
      if (x.path [0] === 'up') {
         var firstMaster = B.get ('slots', 0, 'master', 'id');
         B.call (x, 'set', 'slots', [undefined, firstMaster ? {id: firstMaster} : undefined, ...slots.slice (0, 3)]);
      }
      if (x.path [0] === 'down') {
         var lastApprentice = B.get ('slots', slots.length - 1, 'apprentice', 'id');
         B.call (x, 'set', 'slots', [...slots.slice (2), lastApprentice ? {id: lastApprentice} : undefined, undefined]);
      }
   }],
   ['change', 'slots', function (x, currentJedis, oldJedis) {
      oldJedis = oldJedis || [];
      dale.go (currentJedis, function (v, k) {
         if (! teishi.eq (v, oldJedis [k])) B.call (x, 'change', ['slots', k], v, oldJedis [k]);
      });
   }],
   ['change', [], {match: function (ev) {
      if (ev.path [0] === 'slots' || ev.path [0] === 'currentPlanet') return true;
   }}, function (x) {
      var slots = B.get ('slots');
      var currentPlanetName = B.get ('currentPlanet', 'name');
      var ObiWanInHomePlanet = dale.stop (slots, true, function (jedi) {
         if (jedi && jedi.homeworld && jedi.homeworld.name === currentPlanetName) return true;
      });

      if (ObiWanInHomePlanet) {
         dale.go (B.get ('requests'), function (request, id) {
            request.xhr.abort ();
            B.call (x, 'rem', 'requests', id);
         });
         B.call (x, 'set', 'ObiWanInHomePlanet', true);
      }
      else {
         B.call (x, 'rem', [], 'ObiWanInHomePlanet');
         // This will re-trigger aborted calls to jedis that we still need
         if (x.path [0] === 'currentPlanet') dale.go (slots, function (jedi) {
            if (jedi && jedi.id && ! jedi.name) B.call (x, 'retrieve', ['jedi', jedi.id]);
         });
      }
   }],
]);

var view = function () {
   return B.view ([['currentPlanet', 'name'], ['slots'], ['ObiWanInHomePlanet']], function (currentPlanetName, slots, ObiWanInHomePlanet) {

      slots = slots || [];
      var firstJedi  = slots [0];
      var lastJedi   = slots [slots.length - 1];
      var scrollUp   = ! ObiWanInHomePlanet && firstJedi && firstJedi.master    && firstJedi.master.id;
      var scrollDown = ! ObiWanInHomePlanet && lastJedi  && lastJedi.apprentice && lastJedi.apprentice.id;

      return ['div', {class: 'app-container'}, [
         ['div', {class: 'css-root'}, [
            ['h1', {class: 'css-planet-monitor'}, 'Obi-Wan currently on ' + currentPlanetName],
            ['section', {class: 'css-scrollable-list'}, [
               ['ul', {class: 'css-slots'}, dale.go (slots, function (jedi) {
                  if (! jedi || ! jedi.name) return ['li', {class: 'css-slot'}];
                  return ['li', {class: 'css-slot', style: style ({color: jedi.homeworld.name === currentPlanetName ? 'red' : undefined})}, [
                     ['h3', jedi.name],
                     ['h6', 'Homeworld: ' + jedi.homeworld.name],
                  ]];
               })],
               ['div', {class: 'css-scroll-buttons'}, [
                  ['button', {
                     class: 'css-button-up'   + (! scrollUp   ? ' css-button-disabled' : ''),
                     onclick: B.ev (scrollUp   ? ['scroll', 'up'] : [])
                  }],
                  ['button', {
                     class: 'css-button-down' + (! scrollDown ? ' css-button-disabled' : ''),
                     onclick: B.ev (scrollDown ? ['scroll', 'down'] : [])
                  }]
               ]]
            ]]
         ]]
      ]];
   });
}

// *** INITIALIZE ***

B.call ('initialize', []);

// Store up to 2000 items in the gotoB log.
B.r.addLog = function (log) {
   if (B.log.length >= 2000) B.log.shift ();
   B.log.push (log);
}
