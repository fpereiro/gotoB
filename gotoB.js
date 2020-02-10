/*
gotoB - v2.0.0

Written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

Please refer to readme.md to read the annotated source.
*/

(function () {

   // *** SETUP ***

   if (typeof exports === 'object') return console.log ('gotoв only works in a browser!');

   var dale = window.dale, teishi = window.teishi, lith = window.lith, r = window.R (), c = window.c;

   var type = teishi.type;

   var B = window.B = {v: '2.0.0', B: 'в', t: teishi.time (), r: r, listeners: r.listeners, store: r.store, log: r.log, say: r.say, listen: r.listen, forget: r.forget};

   // *** ERROR REPORTING ***

   r.error = B.error = function () {
      var x = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var args = dale.go (arguments, function (v) {return v}).slice (x ? 1 : 0);
      B.say.apply (null, [x || {}, 'error'].concat (args));
      return false;
   }

   // *** DATA FUNCTIONS ***

   B.get = function () {

      var path = type (arguments [0]) === 'array' ? arguments [0] : dale.go (arguments, function (v) {return v});

      if (! B.prod && ! r.isPath (path)) return B.error ('B.get', 'Invalid path:', path) || undefined;

      var target = B.store;

      return dale.stop (path, false, function (v, k) {
         if (k < path.length - 1 && teishi.simple (target [v])) return false;
         target = target [v];
      }) === false ? undefined : target;
   }

   B.set = function () {

      var x    = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var path = arguments [x ? 1 : 0], value = arguments [x ? 2 : 1];

      if (! B.prod && ! r.isPath (path)) return B.error (x || {}, 'B.set', 'Invalid path:', path);

      if (type (path) !== 'array') path = [path];

      if (path.length === 0) {
         if (! B.prod && teishi.simple (value)) return B.error (x || {}, 'B.set', 'Cannot set B.store to something that is not an array or object.');
         B.store = value;
         return true;
      }

      var storeType = type (path [0]) === 'string' ? 'object' : 'array';
      if (type (B.store) !== storeType) B.store = storeType === 'object' ? {} : [];

      var target = B.store;

      dale.go (path, function (v, k) {
         if (k === path.length - 1) return target [v] = value;

         var targetType = type (path [k + 1]) === 'string' ? 'object' : 'array';
         if (type (target [v]) !== targetType) target [v] = targetType === 'object' ? {} : [];

         target = target [v];
      });

      return true;
   }

   B.add = function () {

      var x    = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var path = arguments [x ? 1 : 0];

      if (! B.prod && ! r.isPath (path)) return B.error (x || {}, 'B.add', 'Invalid path:', path);

      if (B.get (path) === undefined) B.set (path, []);

      var target = B.get (path);
      if (! B.prod && type (target) !== 'array') return B.error (x || {}, 'B.add', 'Cannot add to something that is not an array. Path:', path);

      dale.go (arguments, function (v, k) {
         if (k > (x ? 1 : 0)) target.push (v);
      });

      return true;
   }

   B.rem = function () {

      var x    = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var path = arguments [x ? 1 : 0];

      if (! B.prod && ! r.isPath (path)) return B.error (x || {}, 'B.rem', 'Invalid path:', path);

      var target     = B.get (path);
      var targetType = type (target);
      var keys       = type (arguments [x ? 2 : 1]) === 'array' ? arguments [x ? 2 : 1] : dale.go (arguments, function (v) {return v}).slice (x ? 2 : 1);

      if (! B.prod && teishi.stop ('B.rem', [
         ['type of target', targetType, ['array', 'object', 'undefined'], 'oneOf', teishi.test.equal],
         targetType === 'array'  ? ['keys of array target',  keys, 'integer', 'each'] : [],
         targetType === 'object' ? ['keys of object target', keys, 'string',  'each'] : []
      ], function (error) {
         B.error (x || {}, 'B.rem', error, 'Path:', path);
      })) return false;

      if (targetType === 'object') dale.go (keys, function (v) {delete target [v]});

      if (targetType === 'array') {
         keys = teishi.copy (keys);
         keys.sort (function (a, b) {return b - a});
         dale.go (keys, function (v) {target.splice (v, 1)})
      }

      return true;
   }

   // *** DATA LISTENERS ***

   dale.go (['add', 'rem', 'set'], function (verb) {
      B.listen ({id: verb, verb: verb, path: []}, function (x) {
         var previousValue = verb === 'set' ? B.get (x.path) : teishi.copy (B.get (x.path));
         if (B [x.verb].apply (null, [x, x.path].concat (dale.go (arguments, function (v) {return v}).slice (1))) === false) return;
         if (! teishi.eq (previousValue, B.get (x.path))) B.say (x, 'change', x.path);
      });
   });

   // *** B.EV ***

   B.str = function (input) {
      var inputType = type (input);
      if (inputType !== 'array' && inputType !== 'object') return inputType === 'string' ? teishi.str (input) : (input + '');

      if (inputType === 'array') return '[' + dale.go (input, B.str).join (', ') + ']';

      return '{' + dale.go (input, function (v, k) {
         return teishi.str (k) + ': ' + B.str (v);
      }).join (', ') + '}';
   }

   B.evh = function (element) {
      return dale.obj (c.get (element), function (v, k) {
         if (! k.match (/^on/)) return [k, v];
      });
   }

   B.ev = function () {

      if (type (arguments [0]) === 'array') var evs = arguments;
      else                                  var evs = arguments.length === 0 ? [] : [dale.go (arguments, function (v) {return v})];

      if (! B.prod && teishi.stop ('B.ev', dale.go (evs, function (ev) {
         return [
            ['ev', ev, 'array'],
            function () {return [
               ['ev.verb', ev [0], 'string'],
               function () {
                  return r.isPath (ev [1]) ? true : B.error ('B.ev', 'Invalid path:', ev [1], 'Events:', evs);
               }
            ]}
         ];
      }), function (error) {
         B.error ('B.ev', error, 'Events:', evs);
      })) return false;

      var output = 'var id = B.say ("ev", event.type, B.evh (this));';

      dale.go (evs, function (ev) {
         output += ' B.say ({"from": id}, ' + dale.go (ev.length === 2 ? ev.concat ({raw: 'this.value'}) : ev, function (v, k) {
            if (k > 1 && type (v) === 'object' && type (v.raw) === 'string') return v.raw;
            return B.str (v);
         }).join (', ') + ');';
      });

      return output;
   }

   // *** ERROR EVENT & DEBUG FUNCTION ***

   B.listen ({id: 'error', verb: 'error', path: []}, function (x) {
      if (B.prod) return;
      document.body.innerHTML += lith.g (['div', {id: 'errorwarning', style: lith.css.style ({position: 'fixed', 'font-weight': 'bold', bottom: 20, left: 0.1, width: 0.8, padding: 10, color: 'white', 'background-color': 'black', 'z-index': '10001', 'text-align': 'center'})}, 'There was an error.']);
      setTimeout (function () {if (c ('#errorwarning')) document.body.removeChild (c ('#errorwarning'))}, 3000);
      B.eventlog ();
   });

   B.eventlog = function () {
      if (c ('#eventlog')) document.body.removeChild (c ('#eventlog'));

      var idindex = {}, colors = ['maroon', 'red', 'olive', 'green', 'purple', 'fuchsia', 'teal', 'blue', 'black', 'gray', 'salmon', 'darkcyan', 'darkviolet', 'indigo', 'limegreen', 'coral', 'orangered'], columns = ['ms', 'entry', 'from', 'verb', 'path', 'args'];

      document.body.innerHTML += lith.g (['table', {id: 'eventlog', style: lith.css.style ({'border-collapse': 'collapse', 'font-family': 'serif', 'font-size': 18, position: 'absolute', 'right, top': 4, width: Math.min (window.innerWidth, 800), 'z-index': '10000', border: 'solid 4px #4488DD'})}, [
         ['style', ['th, td', {'padding-left, padding-right': 10, 'border-bottom, border-right': 'solid 1px black'}]],
         ['tr', dale.go (columns, function (header) {
            return ['th', {style: lith.css.style ({'background-color': '#bababa'})}, header];
         })],
         dale.go (B.log, function (entry, k) {
            idindex [entry.id] = k;
            return ['tr', {style: lith.css.style ({'background-color': {0: '#eaeaea', 1: '#bababa'} [k % 2]})}, dale.go ([entry.t - B.t, k, idindex [entry.from], entry.verb, entry.path.join (':'), dale.go (entry.args, B.str).join (', ')], function (value, k2) {
               if (k2 === 0) return ['td', (value / 1000) + (! (value % 1000) ? '.0' : '') + (! (value % 100) ? '0' : '') + (! (value % 10) ? '0' : '') + 's'];
               if (k2 !== 1 && k2 !== 2) return ['td', value];
               var onclick = value === undefined ? '' : ('c ("tr") [' + (value + 1) + '].scrollIntoView ()');
               return ['td', {onclick: onclick, style: lith.css.style ({cursor: 'pointer', 'font-weight': 'bold', color: colors [value % colors.length]})}, value === undefined ? '' : ((k2 === 2 ? 'from ' : '') + '#' + (value + 1))];
            })];
         }),
      ]], true);

      c ('tr') [B.log.length].scrollIntoView ();
   }

}) ();
