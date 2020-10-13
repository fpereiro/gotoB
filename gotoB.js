/*
gotoB - v2.0.0

Written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

Please refer to readme.md to read the annotated source.
*/

(function () {

   // *** SETUP ***

   if (typeof exports === 'object') return console.log ('gotoв only works in a browser!');

   var dale = window.dale, teishi = window.teishi, lith = window.lith, r = window.R (), c = window.c;

   var type = teishi.type, time = Date.now ? function () {return Date.now ()} : function () {return new Date ().getTime ()};

   var B = window.B = {v: '2.0.0', B: 'в', t: time (), r: r, responders: r.responders, store: r.store, log: r.log, call: r.call, respond: r.respond, forget: r.forget};

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

      var index = {}, colors = ['#fe6f6c', '#465775', '#e086c3', '#8332ac', '#462749', '#044389', '#59c9a6', '#ffad05', '#7cafc4', '#5b6c5d'], columns = ['#', 'ms', 'id', 'from', 'verb', 'path', 'args'];

      document.body.innerHTML += lith.g (['table', {id: 'eventlog'}, [
         ['style', ['#eventlog', {'border-collapse': 'collapse', 'font-family': 'monospace', 'font-size': 18, position: 'absolute', 'right, top': 4, width: Math.min (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, 800), 'z-index': '10000', border: 'solid 4px #4488DD'}, ['th, td', {'padding-left, padding-right': 10, 'border-bottom, border-right': 'solid 1px black'}]]],
         ['tr', dale.go (columns, function (header) {
            return ['th', {style: lith.css.style ({'background-color': '#efefef'})}, header];
         })],
         dale.go (B.log, function (entry, k) {
            index [(entry.from && entry.from.match (/^E\d+$/)) ? (entry.id + '/' + entry.from) : entry.id] = k;
            return ['tr', {style: lith.css.style ({'background-color': {0: '#fcfcfc', 1: '#efefef'} [k % 2]})}, dale.go (['#' + (k + 1), entry.t - B.t, entry.id, entry.from, entry.verb, entry.path.join (':'), dale.go (entry.args, B.str).join (', ')], function (value, k2) {
               if (k2 === 1) return ['td', (value / 1000) + (! (value % 1000) ? '.0' : '') + (! (value % 100) ? '0' : '') + (! (value % 10) ? '0' : '') + 's'];
               if (k2 !== 2 && k2 !== 3) return ['td', value];
               var onclick = value === undefined ? '' : ('c ("tr") [' + (index [value] + 1) + '].scrollIntoView ()');
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
         output += ' B.call ({"from": id}, ' + dale.go (ev.length === 2 ? ev.concat ({raw: 'this.value'}) : ev, function (v, k) {
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

      c.place (target, 'afterBegin', lith.g (elem, true));
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

      if (B.internal.redrawing && ! fromQueue) return B.internal.queue.push ([x, id, oldElement, oldChildren]);

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

      if (nextRedraw) B.redraw.apply (null, next.concat (true));
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
      }
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

      var place = function (operation, position, element) {
         var Parent = position.length === 0 ? rootElementParent : elements [references [position.slice (0, -1).join (',')]];
         if (operation === 'keep' && (Parent.children || Parent.childNodes) [position [position.length - 1]] === element) return;
         var nextSibling = Parent === rootElementParent ? rootElementSibling : (Parent.children || Parent.childNodes) [position [position.length - 1]] || null;
         Parent.insertBefore (element, nextSibling);
      }

      var make = function (elementString) {
         if (elementString.substr (0, 1) === 'L') {
            var container = document.createElement ('div');
            container.innerHTML = elementString.slice (2);
            return container.firstChild;
         }

         if (elementString.substr (0, 1) === 'P') {
            var length = parseInt (elementString.match (/ \d+ /) [0].replace (/\s/g, ''));
            elementString = elementString.replace (length + ' ', '');
            var contents = elementString.slice (length + 1);
            elementString = elementString.slice (0, length);
         }

         var element = document.createElement (extract (elementString, 'tag'));
         dale.go (extract (elementString, 'attributes'), function (v, k) {
            if (['', null, false].indexOf (v) === -1) element.setAttribute (k, v);
         });
         if (elementString.substr (0, 1) === 'P') element.innerHTML = contents;
         return element;
      }

      var oldIE = document.body.fireEvent && ! document.body.dispatchEvent, recycle = function (element, old, New) {
         var oldAttributes = extract (old, 'attributes'), newAttributes = extract (New, 'attributes');
         if (oldIE && (oldAttributes.type || newAttributes.type)) return make (New);
         dale.go (newAttributes, function (v, k) {
            if (['', null, false].indexOf (v) === -1) element.setAttribute (k, v);
         });
         dale.go (oldAttributes, function (v, k) {
            if (['', null, false].indexOf (v) !== -1) return;
            if (['', null, false, undefined].indexOf (newAttributes [k]) !== -1) element.removeAttribute (k);
         });
         return element;
      }

      var recyclables = {};

      dale.go (diff, function (v, k) {
         var elementType = v [1].substr (0, 1);
         if (elementType === 'C') return;
         if (v [0] === 'keep') {
            if (elementType !== 'P') return place ('keep', positions [k], elements [k]);
            elements [k].parentNode.removeChild (elements [k]);
         }
         if (v [0] === 'rem')  {
            if (elementType === 'O') recyclables [extract (v [1], 'tag')] = k;
            return elements [k].parentNode.removeChild (elements [k]);
         }

         if (elementType !== 'O') return place ('add', positions [k], make (v [1]));
         var tag = extract (v [1], 'tag'), recycleIndex = recyclables [tag], element;

         if (recycleIndex === undefined) element = make (v [1]);
         else {
            element = recycle (elements [recycleIndex], diff [recycleIndex] [1], v [1]);
            recyclables [tag] = undefined;
         }
         elements [k] = element;
         place ('add', positions [k], element);
      });

      if (active && document.body.contains (active)) active.focus ? active.focus () : active.setActive ();
   }

   B.diff = function (s1, s2) {

      var V = [], sol, d = 0, vl, vc, k, out, y, point, diff, v, last, t = time ();

      while (d < s1.length + s2.length + 1) {

         if (B.internal.timeout && (time () - t > B.internal.timeout)) return false;

         vl = V [V.length - 1] || {1: [0, 0]};
         vc = {};
         V.push (vc);

         k = -d;

         while (k < -d + 2 * d + 1) {

            if (k === -d || (k !== d && vl [k - 1] [1] < vl [k + 1] [1])) out = [0, vl [k + 1] [1]];
            else                                                          out = [0, vl [k - 1] [1] + 1, true];

            y = out [1] - k;

            while (out [1] < s1.length && y < s2.length && s1 [out [1]] === s2 [y]) {
               out [1]++; y++; out [0]++;
            }

            vc [k] = out;

            if (out [1] < s1.length || y < s2.length) {
               k += 2;
               continue;
            }

            point = {x: out [1], y: y};
            diff  = [];

            v = d;

            while (v > -1) {
               last = V [v] [point.x - point.y];
               y = last [1] - (point.x - point.y);
               if (last [0]) dale.go (dale.times (last [0]), function (v2) {
                  diff.unshift (['keep', s1 [last [1] - v2]]);
               });
               if (last [2]) diff.unshift (['rem', s1 [last [1] - last [0] - 1]]);
               else          diff.unshift (['add', s2 [y        - last [0] - 1]]);
               point.x = last [1] - last [0] - (last [2] ? 1 : 0);
               point.y = y        - last [0] - (last [2] ? 0 : 1);
               v--;
            }

            diff.shift ();
            return diff;
         }
         d++;
      }
   }

}) ();
