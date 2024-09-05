var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c, B = window.B;

var type = teishi.type, clog = teishi.clog, style = lith.css.style;

B.mrespond ([
   ['initialize', [], function (x) {
      B.mount ('body', view);

      B.call (x, 'refresh', []);
   }],
   ['refresh', [], function (x) {
      var SUGGESTIONS = 3;
      dale.go (dale.times (SUGGESTIONS, 0), function (index) {
         B.call (x, 'retrieve', 'suggestion', index);
      });
   }],
   ['retrieve', 'suggestion', function (x, index) {

      B.call (x, 'set', ['suggestions', index], {}); // Immediately clear the suggestion.

      var randomOffset = Math.floor (Math.random () * 500);
      c.ajax ('get', 'https://api.github.com/users?since=' + randomOffset, {}, '', function (error, rs) {
         if (error) return console.log ('There was an error', error.responseText);
         B.call (x, 'set', ['suggestions', index], rs.body [0]);
      });
   }],
]);

var view = function () {
   return B.view (['suggestions'], function (suggestions) {
      return ['div', {class: 'container'}, [
         ['div', {class: 'header'}, [
            ['h2', 'Who to follow'],
            ['a', {href: '#', onclick: B.ev ('refresh', [])}, 'Refresh']
         ]],
         ['ul', {class: 'suggestions'}, dale.go (suggestions, function (suggestion, index) {
            return ['li', {class: 'suggestion'}, [
               ['img', {src: suggestion.avatar_url}],
               ['a',   {href: suggestion.html_url, target: '_blank', class: 'username'}, suggestion.login],
               ['a',   {href: '#', class: 'close', onclick: B.ev ('retrieve', 'suggestion', index)}, 'X'],
            ]];
         })],
      ]];
   });
}

B.call ('initialize', []);
