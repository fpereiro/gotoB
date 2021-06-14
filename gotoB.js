/*
gotoB - v2.0.1

Written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

Please refer to readme.md to read the annotated source.
*/

(function () {

   // *** SETUP ***

   if (typeof exports === 'object') return console.log ('gotoв only works in a browser!');

   var dale = window.dale, teishi = window.teishi, lith = window.lith, r = window.R (), c = window.c;

   var type = teishi.type, time = Date.now ? function () {return Date.now ()} : function () {return new Date ().getTime ()};

   var B = window.B = {v: '2.0.1', B: 'в', t: time (), r: r, responders: r.responders, store: r.store, log: r.log, call: r.call, respond: r.respond, forget: r.forget};

   // *** ERROR REPORTING ***

   r.error = B.error = function () {
      var x = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var args = dale.go (arguments, function (v) {return v}).slice (x ? 1 : 0);
      B.call.apply (null, [x || {}, 'error'].concat (args));
      return false;
   }

   B.respond ({id: 'error', verb: 'error', path: [], match: function (ev) {return ev.verb === 'error'}}, function () {
      document.body.innerHTML += lith.g (['div', {
         id: 'eventlog-snackbar', style: lith.css.style ({position: 'fixed', 'font-weight': 'bold', opacity: '0.8', top: 0, left: 0.1, width: 0.8, padding: 10, color: 'white', 'background-color': 'black', 'z-index': '10001', 'text-align': 'center'})
      }, 'There was an error.'], true);

      setTimeout (function () {
         if (c ('#eventlog-snackbar')) document.body.removeChild (c ('#eventlog-snackbar'))
      }, 3000);

      B.eventlog ()
   });

   B.eventlog = function () {
      if (c ('#eventlog')) document.body.removeChild (c ('#eventlog'));

      var index = {}, colors = ['#fe6f6c', '#465775', '#e086c3', '#8332ac', '#462749', '#044389', '#59c9a6', '#ffad05', '#7cafc4', '#5b6c5d'], columns = ['#', 'ms', 'type', 'id', 'from', 'verb', 'path', 'args'], shorten = function (s) {return s.length > 500 ? s.slice (0, 500) + '... [' + (s.length - 500) + ' more characters]' : s};

      document.body.innerHTML += lith.g (['table', {id: 'eventlog'}, [
         ['style', ['#eventlog', {'border-collapse': 'collapse', 'font-family': 'monospace', 'font-size': 18, position: 'absolute', 'right, top': 4, width: Math.min (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 800), 'z-index': '10000', border: 'solid 4px #4488DD'}, ['th, td', {'padding-left, padding-right': 10, 'border-bottom, border-right': 'solid 1px black'}]]],
         ['tr', dale.go (columns, function (header) {
            return ['th', {style: lith.css.style ({'background-color': '#efefef'})}, header];
         })],
         dale.go (B.log, function (entry, k) {
            var responderIndex = entry.id [0] !== 'E' && entry.from && entry.from.match (/^E\d+$/) ? (entry.id + '/' + entry.from) : undefined;
            index [responderIndex || entry.id] = k;
            return ['tr', {style: lith.css.style ({'background-color': {0: '#fcfcfc', 1: '#efefef'} [k % 2]})}, dale.go (['#' + (k + 1), entry.t - B.t, entry.id.match (/^E\d+$/) ? 'event' : 'responder', entry.id, entry.from, entry.verb, entry.path.join (':'), shorten (dale.go (entry.args, B.str).join (', '))], function (value, k2) {
               if (k2 === 1) return ['td', (value / 1000) + (! (value % 1000) ? '.0' : '') + (! (value % 100) ? '0' : '') + (! (value % 10) ? '0' : '') + 's'];
               if (k2 !== 3 && k2 !== 4) return ['td', value];
               var onclick = value === undefined ? '' : ('var row = c ({from: c ("#eventlog"), selector: "tr"}) [' + ((index [value] === undefined ? index [responderIndex] : index [value]) + 1) + ']; row.scrollIntoView (); row.style.background = "#8e8e8e"; setTimeout (function () {row.style.background = "#bebebe"}, 500); setTimeout (function () {row.style.background = "white"}, 1000);');
               return ['td', {onclick: onclick, style: lith.css.style ({cursor: 'pointer', 'font-weight': 'bold', color: colors [parseInt (index [value]) % colors.length]})}, value === undefined ? '' : value];
            })];
         }),
      ]], true);

      c ('tr') [B.log.length].scrollIntoView ();
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
         keys = keys.slice ().sort (function (a, b) {return b - a});
         dale.go (keys, function (v) {target.splice (v, 1)})
      }

      return true;
   }

   // *** B.MRESPOND ***

   B.mrespond = function (responders) {
      dale.go (responders, function (responder) {
         B.respond.apply (null, responder);
      });
   }

   // *** CHANGE RESPONDERS ***

   dale.go (['add', 'rem', 'set'], function (verb) {
      B.respond ({id: verb, verb: verb, path: [], match: function (ev, responder) {
         return r.compare (ev.verb, responder.verb);
      }}, function (x) {
         var previousValue = verb === 'set' ? B.get (x.path) : teishi.copy (B.get (x.path));
         if (B [x.verb].apply (null, [x, x.path].concat (dale.go (arguments, function (v) {return v}).slice (1))) === false) return;
         if (! teishi.eq (previousValue, B.get (x.path))) B.call (x, 'change', x.path, B.get (x.path), previousValue);
      });
   });

   B.changeResponder = function (ev, responder) {
      if (! r.compare (ev.verb, responder.verb)) return false;
      if (ev.path.length === 0 || responder.path.length === 0) return true;
      return dale.stop (dale.times (Math.min (ev.path.length, responder.path.length), 0), false, function (k) {
         return r.compare (ev.path [k], responder.path [k]);
      });
   }

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

      var output = 'var id = B.call ("ev", event ? event.type : "undefined event", B.evh (this));';

      dale.go (evs, function (ev) {
         var defaultValue = ! B.internal.oldFF ? 'this.value' : 'this.value || (this.attributes.value ? this.attributes.value.nodeValue : "")';
         output += ' B.call ({"from": id}, ' + dale.go (ev.length === 2 ? ev.concat ({raw: defaultValue}) : ev, function (v, k) {
            if (k > 1 && type (v) === 'object' && type (v.raw) === 'string') return v.raw;
            return B.str (v);
         }).join (', ') + ');';
      });

      return output;
   }

   // *** B.MOUNT & B.UNMOUNT ***

   B.mount = function (target, fun) {
      if (! B.prod && type (target) !== 'string' || ! target.match (/^(body|[a-z0-9]*#[^\s\[>,:]+)$/)) return B.error ('B.mount', 'Target must be either \'body\' or an id selector, but instead is ' + target);

      var element = target === 'body' ? document.body : document.getElementById (target.replace (/.*#/g, ''));

      if (! B.prod) {
         if (! element)                 return B.error ('B.mount', 'Target not found:', target);
         if (type (fun) !== 'function') return B.error ('B.mount', 'fun must be a function but instead is', fun);
      }

      var elem = fun ();

      if (! B.prod) {
         var result = B.validateLith (elem);
         if (result !== 'Lith' && result !== 'Lithbag') return B.error ('B.mount', 'function returned invalid lith or lithbag', result);
      }

      c.place (target, 'beforeEnd', lith.g (elem, true));
   }

   B.unmount = function (target) {
      if (! B.prod && type (target) !== 'string' || ! target.match (/^(body|[a-z0-9]*#[^\s\[>,:]+)$/)) return B.error ('B.unmount', 'Target must be either \'body\' or an id selector, but instead is ' + target);

      var element = target === 'body' ? document.body : document.getElementById (target.replace (/.*#/g, ''));

      if (! B.prod && ! element) return B.error ('B.unmount', 'Target not found:', target);

      c ({selector: '*', from: element}, function (child) {
         if (child.id && child.id.match (/^в[0-9a-f]+$/g) && B.responders [child.id]) B.forget (child.id);
      });

      element.innerHTML = '';
   }

   // *** B.VIEW ***

   B.view = function (path, fun) {

      var paths;
      if      (type (path) !== 'array')     paths = [[path]];
      else if (type (path [0]) !== 'array') paths = [path];
      else                                  paths = path;

      if (! B.prod && teishi.stop ('B.view', [
         dale.stopNot (paths, false, function (path) {
            return r.isPath (path) ? true : B.error ('B.view', 'Invalid path:', path, 'Arguments', {path: path});
         }),
         function () {return ['fun', fun, 'function']}
      ], function (error) {
         B.error ('B.view', error, {path: path});
      })) return false;

      var id = B.B + B.internal.count++;

      var makeElement = function () {
         var count = B.internal.count, children = [];
         var elem = fun.apply (null, dale.go (paths, B.get));
         if (! B.prod && B.validateLith (elem) !== 'Lith') return B.error ('B.view', 'View function must return a lith element but instead returned:', elem, 'Arguments:', {path: path});
         if (! B.prod && type (elem [1]) === 'object' && elem [1].id !== undefined) return B.error ('B.view', 'View function must return a lith element without an id attribute but instead returned:', elem, 'Arguments:', {path: path});

         dale.go (dale.times (B.internal.count - count, count), function (k) {
            var responder = B.responders [B.B + k];
            if (! responder.parent) {
               children.push (responder.id);
               responder.parent = id;
            }
            responder.priority = responder.priority + B.responders [id].priority;
         });

         var attributes = dale.obj (type (elem [1]) === 'object' ? elem [1] : {}, {
            id: id,
            path: dale.go (paths, function (path) {return path.join (':') || ':'}).join (', ')
         }, function (v, k) {
            if (['id', 'path'].indexOf (k.toLowerCase ()) === -1) return [k, v]
         });
         elem = elem.slice ();

         if (type (elem [1]) !== 'object') elem.splice (1, 0, attributes);
         else                              elem [1] = attributes;

         B.responders [id].elem     = elem;
         B.responders [id].children = children;
         return elem;
      }

      B.respond ('change', [], {id: id, priority: -1, match: function (ev) {
         return dale.stop (paths, true, function (path) {
            return B.changeResponder (ev, {verb: 'change', path: path});
         });
      }}, function (x) {
         var oldElement = B.responders [id].elem, oldChildren = B.responders [id].children, t = time ();
         if (makeElement ()) B.redraw (x, id, oldElement, oldChildren, time () - t);
      });

      return makeElement ();
   }

   // *** INTERNALS ***

   B.internal = {count: 1, timeout: 200, queue: [], redrawing: false}
   if (document.body.fireEvent && ! document.body.dispatchEvent) B.internal.oldIE    = true;
   if (! document.querySelectorAll && B.internal.oldIE)          B.internal.olderIE  = true;
   if (! document.querySelectorAll && ! B.internal.oldIE)        B.internal.oldFF    = true;
   if (navigator.userAgent.match ('Opera'))                      B.internal.oldOpera = true;

   B.validateLith = function (input) {
      var v = lith.v (input, true);
      if (v !== 'Lith' && v !== 'Lithbag') return v;
      if (v === 'Lith') {
         if (type (teishi.last (input)) !== 'array') return 'Lith';
         var result = input [0] === 'style' ? B.validateLitc (teishi.last (input)) : B.validateLith (teishi.last (input));
         return (result === 'Lith' || result === 'Lithbag' || result === true) ? 'Lith' : result;
      }
      return dale.stopNot (input, undefined, function (v) {
         if (type (v) !== 'array') return;
         var result = B.validateLith (v);
         if (result !== 'Lith' && result !== 'Lithbag') return result;
      }) || 'Lithbag';
   }

   B.validateLitc = function (input) {
      var result = lith.css.v (input, true);
      if (result !== true) return result;
      if (type (input [0]) === 'array') return dale.stopNot (input, true, B.validateLitc);
      if (type (teishi.last (input)) !== 'array') return true;
      return B.validateLitc (teishi.last (input));
   }

   if (! document.body.contains) document.body.contains = function (el) {
      while (el = el.parentNode) {
         if (el === document.body) return true;
      }
      return false;
   }

   B.redraw = function (x, id, oldElement, oldChildren, msCreate, fromQueue) {

      if (B.internal.redrawing && ! fromQueue) return B.internal.queue.push ([x, id, oldElement, oldChildren, msCreate]);

      B.internal.redrawing = true;

      var responder = B.responders [id], element = document.getElementById (id), t0 = time ();

      if (! B.prod && (! element || ! document.body.contains (element))) return B.error (x, 'B.redraw', 'Attempt to redraw dangling element.', {responder: responder});

      var prediffs = [B.prediff (oldElement), B.prediff (responder.elem)], t1 = time ();
      var diff = B.diff (prediffs [0], prediffs [1]), t2 = time ();

      dale.go (oldChildren, function (id) {B.forget (id)});

      if (diff === false) {
         var element = document.getElementById (id), parentNode = element.parentNode, nextSibling = element.nextSibling;
         var html = lith.g (responder.elem, true);
         parentNode.removeChild (element);
         if (nextSibling) nextSibling.insertAdjacentHTML ('beforeBegin', html);
         else             parentNode.insertAdjacentHTML  ('beforeEnd',   html);
      }
      else {
         var errorIndex = B.applyDiff (element, diff);
         if (! B.prod && errorIndex !== undefined) return B.error (x, 'B.redraw', 'Redraw error: DOM element missing.', {diffIndex: errorIndex, diffElement: diff [errorIndex], diff: diff, responder: responder.id});
      }

      B.call (x, 'redraw', x.path, {responder: responder.id, ms: {create: msCreate, prediff: t1 - t0, diff: t2 - t1, DOM: time () - t2, total: time () - t0 + msCreate}, diffLength: diff === false ? false : diff.length});

      var nextRedraw = dale.stopNot (B.internal.queue, undefined, function () {
         var next = B.internal.queue.shift ();
         if (B.responders [next [1]]) return next;
      });

      if (nextRedraw) B.redraw.apply (null, nextRedraw.concat (true));
      else            B.internal.redrawing = false;
   }

   B.prediff = function (input, output) {

      if (type (input) !== 'array' || input [0] === 'LITERAL') {
         if (input === undefined || input === '') return;
         if (output [output.length - 1].substr (0, 1) !== 'L') return output.push ('L ' + lith.g (input, true));
         return output [output.length - 1] += lith.g (input, true);
      }

      output = output || [];

      if (lith.k.tags.indexOf (input [0]) === -1) return dale.go (input, function (v) {B.prediff (v, output)});

      if (input [1] && input [1].id && (input [1].id + '').match (/^в[0-9a-f]+$/g) && output.length) input = B.responders [input [1].id].elem;

      var attributes = type (input [1]) !== 'object' ? undefined : dale.obj (input [1], function (v, k) {
         if (['', null, false, undefined].indexOf (v) === -1) return [k, v];
      });
      var contents = input [attributes ? 2 : 1];

      output.push ('O ' + input [0]);
      if (attributes) output [output.length - 1] += ' ' + JSON.stringify (attributes);

      if (attributes && attributes.opaque) {
         var length = output [output.length - 1].length;
         output [output.length - 1] = 'P ' + length + output [output.length - 1].slice (1) + ' ' + lith.g (contents, true);
         return output;
      }

      if (input [0] === 'table') var tableIndex = output.length;
      B.prediff (contents, output);
      if (input [0] === 'table' && output [tableIndex]) {
         if (output [tableIndex].match (/^O thead/)) {
            var depth = 0;
            dale.stopNot (dale.times (output.length - tableIndex, tableIndex), undefined, function (k) {
               if (output [k].substr (0, 1) === 'O') depth++;
               if (output [k].substr (0, 1) === 'C') depth--;
               if (depth === 0) return tableIndex = k + 1;
            });
         }
         if (output [tableIndex] && ! output [tableIndex].match (/^O tbody/)) {
            output.splice (tableIndex, 0, 'O tbody');
            output.push ('C tbody');
         }
         if (B.internal.olderIE && ! output [tableIndex]) output.splice (tableIndex, 0, 'O tbody', 'C tbody');
      }
      if (B.internal.olderIE && input [0] === 'table' && ! output [tableIndex]) output.splice (tableIndex, 0, 'O tbody', 'C tbody');
      output.push ('C ' + input [0]);
      return output;
   }

   B.applyDiff = function (rootElement, diff) {

      var elements = [], positions = [], references = {}, rootElementParent = rootElement.parentNode, rootElementSibling = rootElement.nextSibling, active;
      var tree = [rootElement, null], position = [];

      var errorIndex = dale.stopNot (diff, undefined, function (v, k) {
         if (v [1].substr (0, 1) === 'C') {
            if (v [0] !== 'rem') {
               position.pop ();
               position [position.length - 1]++;
            }
            if (v [0] !== 'add') tree.pop ();
            return;
         }
         if (v [0] !== 'rem') {
            positions [k] = position.slice ();
            if (v [1].substr (0, 1) === 'O') {
               references [positions [k].join (',')] = k;
               position.push (0);
            }
            else position [position.length - 1]++;
         }
         if (v [0] !== 'add') {
            var element;
            if (k === 0)                       element = rootElement;
            else if (! tree [tree.length - 1]) element = tree [tree.length - 2].firstChild;
            else                               element = tree [tree.length - 1].nextSibling;

            if (! B.prod && ! element) return k;

            elements [k] = element;
            if (element === document.activeElement) active = element;
            tree [tree.length - 1] = element;
            if (v [1].substr (0, 1) === 'O') tree.push (null);
         }
      });

      if (errorIndex !== undefined) return errorIndex;

      var extract = function (elementString, part) {
         if (part === 'tag') return elementString.match (/(O|P) [^\s]+/) [0].replace (/(O|P) /, '')
         else                return elementString.match ('{') ? JSON.parse (elementString.replace (/[^{]+/, '')) : {};
      }

      var place = function (position, element) {
         var Parent = position.length === 0 ? rootElementParent : elements [references [position.slice (0, -1).join (',')]];
         var children = Parent.children || Parent.childNodes;
         if (position.length === 0) {
            if (rootElementSibling && rootElementSibling.previousSibling === element) return;
            if (! rootElementSibling && children [children.length - 1] === element) return;
         }
         if (position.length > 0 && children [position [position.length - 1]] === element) return;
         var nextSibling = position.length === 0 ? rootElementSibling : children [position [position.length - 1]] || null;
         Parent.insertBefore (element, nextSibling);
      }

      var processOpaque = function (elementString) {
         var length = parseInt (elementString.match (/ \d+ /) [0].replace (/\s/g, ''));
         elementString = elementString.replace (length + ' ', '');
         return {element: elementString.slice (0, length), contents: elementString.slice (length + 1)};
      }

      var make = function (elementString) {
         if (elementString.substr (0, 1) === 'L') {
            var container = document.createElement ('div');
            container.innerHTML = elementString.slice (2);
            return container.firstChild;
         }

         if (elementString.substr (0, 1) === 'P') {
            var processedOpaque = processOpaque (elementString);
            elementString = processedOpaque.element;
         }

         var element = document.createElement (extract (elementString, 'tag'));
         dale.go (extract (elementString, 'attributes'), function (v, k) {
            if (['', null, false].indexOf (v) === -1) element.setAttribute (B.internal.olderIE && k === 'class' ? 'className' : k, v);
         });
         if (elementString.substr (0, 1) === 'P') element.innerHTML = processedOpaque.contents;
         return element;
      }

      var recycle = function (element, old, New) {
         var oldAttributes = extract (old, 'attributes'), newAttributes = extract (New, 'attributes');
         if (B.internal.oldIE && oldAttributes.type !== newAttributes.type) return;
         dale.go (newAttributes, function (v, k) {
            if (v === oldAttributes [k] || ['', null, false].indexOf (v) !== -1) return;
            element.setAttribute (B.internal.olderIE && k === 'class' ? 'className' : k, v);
            if (k === 'value')   element.value = v;
            if (k === 'checked') element.checked = true;
            if (B.internal.oldOpera && k === 'selected') element.selected = v;
         });
         dale.go (oldAttributes, function (v, k) {
            if (v === newAttributes [k] || ['', null, false].indexOf (v) !== -1) return;
            if (['', null, false, undefined].indexOf (newAttributes [k]) !== -1) {
               element.removeAttribute (B.internal.olderIE && k === 'class' ? 'className' : k, v);
               if (k === 'value')   element.value = '';
               if (k === 'checked') element.checked = false;
            }
         });
         return element;
      }

      var recyclables = {}, toRemove = {};

      dale.go (diff, function (v, k) {
         var elementType = v [1].substr (0, 1);
         if (elementType === 'C') return;
         if (v [0] === 'keep') {
            if (B.internal.olderIE && elementType === 'O' && extract (v [1], 'attributes').checked) elements [k].setAttribute ('checked', true);
            if (elementType !== 'P') return place (positions [k], elements [k]);
            elements [k].parentNode.removeChild (elements [k]);
         }
         if (v [0] === 'rem')  {
            if (elementType === 'O') {
               recyclables [extract (v [1], 'tag')] = k;
               return toRemove [k] = true;
            }
            return elements [k].parentNode.removeChild (elements [k]);
         }

         if (elementType === 'L') return place (positions [k], make (v [1]));
         var tag = extract (v [1], 'tag'), recycleIndex = recyclables [tag], element;

         if (elementType === 'P' || recycleIndex === undefined) element = make (v [1]);
         else {
            element = recycle (elements [recycleIndex], diff [recycleIndex] [1], v [1]);
            if (! element) element = make (v [1]);
            else recyclables [tag] = toRemove [recycleIndex] = undefined;
         }
         elements [k] = element;
         place (positions [k], element);
         var olderIEAttributes = B.internal.olderIE ? extract (elementType === 'O' ? v [1] : processOpaque (v [1]).element, 'attributes') : {};
         if (olderIEAttributes.checked)   element.setAttribute ('checked', true);
         if (olderIEAttributes ['class']) element.className = olderIEAttributes ['class'];
      });

      dale.go (toRemove, function (v, k) {
         if (v === true) elements [k].parentNode.removeChild (elements [k]);
      });

      if (active && document.body.contains (active) && active !== document.activeElement) {
         active.focus ();
         if (B.internal.oldIE) active.focus ();
      }
   }

   B.diff = function (s1, s2) {

      var diff = [], VList = [], VLast, VNew, D = 0, k, x, t = time ();

      while (D <= s1.length + s2.length) {

         if (B.internal.timeout && (time () - t > B.internal.timeout)) return false;

         k = -D;
         VLast = VList [VList.length - 1] || {1: 0};
         VNew = {};
         VList.push (VNew);

         while (k <= D) {

            if (k === -D || (k !== D && VLast [k + 1] > VLast [k - 1])) x = VLast [k + 1];
            else                                                        x = VLast [k - 1] + 1;

            while (x < s1.length && (x - k) < s2.length && s1 [x] === s2 [x - k]) x++;

            VNew [k] = x;
            if (x < s1.length || (x - k) < s2.length) {
               k += 2;
               continue;
            }

            while (x > 0) {
               if (k === -D || (k !== D && VList [D - 1] [k + 1] > VList [D - 1] [k - 1])) {
                  k++;
                  while (x > (D === 0 ? 0 : VList [D - 1] [k])) {
                     diff.unshift (['keep', s1 [x - 1]]);
                     x--;
                  }
                  if (D > 0) diff.unshift (['add', s2 [x - k]]);
               }
               else {
                  k--;
                  x--;
                  while (x > VList [D - 1] [k]) {
                     diff.unshift (['keep', s1 [x]]);
                     x--;
                  }
                  diff.unshift (['rem', s1 [x]]);
               }
               D--;
            }
            return diff;
         }
         D++;
      }
   }

}) ();
