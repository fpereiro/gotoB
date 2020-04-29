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

   B.listen ({id: 'error', verb: 'error', path: [], match: function (ev) {return ev.verb === 'error'}}, function () {
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

      var index = {}, colors = ['maroon', 'red', 'olive', 'green', 'purple', 'fuchsia', 'teal', 'blue', 'black', 'gray', 'salmon', 'darkcyan', 'darkviolet', 'indigo', 'limegreen', 'coral', 'orangered'], columns = ['ms', 'entry', 'from', 'verb', 'path', 'args'];

      document.body.innerHTML += lith.g (['table', {id: 'eventlog'}, [
         ['style', ['#eventlog', {'border-collapse': 'collapse', 'font-family': 'serif', 'font-size': 18, position: 'absolute', 'right, top': 4, width: Math.min (window.innerWidth, 800), 'z-index': '10000', border: 'solid 4px #4488DD'}, ['th, td', {'padding-left, padding-right': 10, 'border-bottom, border-right': 'solid 1px black'}]]],
         ['tr', dale.go (columns, function (header) {
            return ['th', {style: lith.css.style ({'background-color': '#bababa'})}, header];
         })],
         dale.go (B.log, function (entry, k) {
            index [entry.id] = k;
            return ['tr', {style: lith.css.style ({'background-color': {0: '#eaeaea', 1: '#bababa'} [k % 2]})}, dale.go ([entry.t - B.t, k, index [entry.from], entry.verb, entry.path.join (':'), dale.go (entry.args, B.str).join (', ')], function (value, k2) {
               if (k2 === 0) return ['td', (value / 1000) + (! (value % 1000) ? '.0' : '') + (! (value % 100) ? '0' : '') + (! (value % 10) ? '0' : '') + 's'];
               if (k2 !== 1 && k2 !== 2) return ['td', value];
               var onclick = value === undefined ? '' : ('c ("tr") [' + (value + 1) + '].scrollIntoView ()');
               return ['td', {onclick: onclick, style: lith.css.style ({cursor: 'pointer', 'font-weight': 'bold', color: colors [value % colors.length]})}, value === undefined ? '' : ((k2 === 2 ? 'from ' : '') + '#' + (value + 1))];
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
         keys = teishi.copy (keys);
         keys.sort (function (a, b) {return b - a});
         dale.go (keys, function (v) {target.splice (v, 1)})
      }

      return true;
   }

   // *** CHANGE EVENT & B.CHANGELISTENER ***

   dale.go (['add', 'rem', 'set'], function (verb) {
      B.listen ({id: verb, verb: verb, path: [], match: function (ev, listener) {
         return r.compare (ev.verb, listener.verb);
      }}, function (x) {
         var previousValue = verb === 'set' ? B.get (x.path) : teishi.copy (B.get (x.path));
         if (B [x.verb].apply (null, [x, x.path].concat (dale.go (arguments, function (v) {return v}).slice (1))) === false) return;
         if (! teishi.eq (previousValue, B.get (x.path))) B.say (x, 'change', x.path, B.get (x.path), previousValue);
      });
   });

   B.changeListener = function (ev, listener) {
      if (! r.compare (ev.verb, listener.verb)) return false;
      if (ev.path.length === 0 || listener.path.length === 0) return true;
      return dale.stop (dale.times (Math.min (ev.path.length, listener.path.length), 0), false, function (k) {
         return r.compare (ev.path [k], listener.path [k]);
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

      var output = 'var id = B.say ("ev", event.type, B.evh (this));';

      dale.go (evs, function (ev) {
         output += ' B.say ({"from": id}, ' + dale.go (ev.length === 2 ? ev.concat ({raw: 'this.value'}) : ev, function (v, k) {
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
         if (child.id && child.id.match (/^в[0-9a-f]+$/g) && B.listeners [child.id]) B.forget (child.id);
      });

      element.innerHTML = '';
   }

   // *** B.ELEM ***

   B.elem = function (paths, fun) {

      if (type (paths) === 'array' && type (paths [0]) !== 'array') paths = [paths];

      if (! B.prod && teishi.stop ('B.elem', [
         dale.stopNot (paths, false, function (path) {
            return r.isPath (path) ? true : B.error ('B.elem', 'Invalid path:', path, 'Arguments', {paths: paths, options: options, fun: fun});
         }),
         ['fun', fun, 'function']
      ], function (error) {
         B.error ('B.elem', error, {paths: paths});
      })) return false;

      var id = B.B + B.internal.count++;

      var makeElement = function () {
         var count = B.internal.count, children = [];
         var elem = fun.apply (null, dale.go (paths, B.get));
         if (elem !== undefined) {
            if (! B.prod && B.validateLith (elem) !== 'Lith') return B.error ('B.elem', 'Function must return a lith element but instead is:', elem, 'Arguments:', {paths: paths, fun: fun});

            dale.go (dale.times (B.internal.count - count, 1), function (k) {
               var listener = B.listeners [B.B + count + k];
               listener.priority--;
               if (! listener.parent) {
                  children.push (listener.id);
                  listener.parent = id;
               }
            });

            if (type (elem [1]) !== 'object') elem.splice (1, 0, {});
            elem [1].id    = id;
            elem [1].paths = dale.go (paths, function (path) {return path.join (':')}).join (', ');
         }
         B.listeners [id].elem     = elem;
         B.listeners [id].children = children;
         return elem;
      }

      B.listen ('change', [], {id: id, priority: -1, match: function (ev) {
         return dale.stop (paths, true, function (path) {
            return B.changeListener (ev, {path: path});
         });
      }}, function (x) {
         var oldElement = B.listeners [id].elem, oldChildren = B.listeners [id].children;
         if (makeElement ()) B.redraw (x, id, oldElement, oldChildren);
      });

      return makeElement ();
   }

   // *** INTERNALS ***

   B.internal = {count: 1, timeout: 200, queue: [], redrawing: false}

   // returns Lith, Lithbag or error.
   B.validateLith = function (input) {
      var v = lith.v (input, true);
      if (v !== 'Lith' && v !== 'Lithbag') return v;
      if (v === 'Lith') return type (teishi.last (input)) === 'array' ? B.validateLith (teishi.last (input)) : 'Lith';
      var error = dale.stopNot (input, undefined, function (v) {
         if (type (v) !== 'array') return;
         var result = B.validateLith (v);
         if (result !== 'Lith' || result !== 'Lithbag') return result;
      });
      return error || 'Lithbag';
   }

   B.redraw = function (x, id, oldElement, oldChildren, rec) {

      if (B.internal.redrawing && ! rec) return B.internal.queue.push ([x, id, oldElement, oldChildren]);

      B.internal.redrawing = true;

      var done = function () {
         var next = dale.stopNot (B.internal.queue, undefined, function (v, k) {
            var next = B.internal.queue.shift ();
            // listener might be absent because of it being deleted by a previous redraw
            if (B.listeners [next [1]]) return next;
         });

         if (next) B.redraw.apply (null, next.concat (true));
         else      B.internal.redrawing = false;
      }

      var listener = B.listeners [id], element = document.getElementById (id);

      if (! B.prod && ! element) {
         B.forget (id);
         return B.error (x, 'B.redraw', 'Attempted to redraw dangling element, omitting redraw & deleting listener.', {listener: listener});
      }

      var diff = B.diff (B.prediff (oldElement), B.prediff (listener.elem));

      // we delete the old children after we do the prediff, to know what's actually there on the DOM! oldELement's nested reactive children might not be accurate if they were redrawn after the parent was redrawn.
      dale.go (oldChildren, function (id) {B.forget (id)});

      if (diff) B.applyDiff (element, diff);
      else {
         if (! B.prod) B.say (x, 'trample', {timeout: B.internal.timeout, listener: listener});
         document.getElementById (id).innerHTML = lith.g (listener.elem);
      }

      done ();
   }

   B.applyDiff = function (element, diff) {
      var insert = function (el, where, position) {
         var p = find (where, 'insert1', position);
         if (p) p.parentNode.insertBefore (el, p);
         else   find (where.slice (0, where.length - 1), 'insert2', position).appendChild (el);
      }

      var find = function (where, action, position) {
         var cur = element;
         dale.go (where, function (v, k) {
            if (cur) return cur = cur.childNodes [v];

            if (! B.prod) B.error (x, 'redraw', {
               action: action,
               position: position,
               diffitem: diff [position].slice (0, 2).join (' '),
               id: id,
               where: where,
               k: k,
               innerHTML: element.innerHTML,
               expectedHTML: lith.g (view, lith.g (view)),
               oldElement: listener.elem,
               newElement: view,
               diff: dale.obj (teishi.copy (diff), function (v2, k2) {return [k2, v2]})
            });
            throw new Error ('gotoB redraw error!');
            // log ('gotoB redraw error! This could be caused by two things: 1) invalid markup; 2) a gotoB redraw bug. To eliminate the possibility of #1, check that the view being redrawn returns lith that represents valid HTML, taking particular care to not nest elements incorrectly (for example, an <h1> cannot go inside an <h1>). If you need help debugging the error, please open a pull request at http://github.com/fpereiro/gotoB/issues and paste the text below:\n', JSON.stringify (data, null, '   '));
         });
         return cur;
      }

      //var dold = [0], dnew = [0], match = {
      var dold = [], dnew = [], match = {
         add: {tag: null, index: null},
         rem: {tag: null, index: null}
      };

      dale.go (diff, function (v, k) {
         if (v [1].match (/^<opaque/)) return;
         if (! v [1].match (/^>/)) diff [k] [2] = {el: find (dold, 'sequence', k), old: teishi.copy (dold), New: teishi.copy (dnew)};
         if (v [1].match (/^</)) {
            diff [k] [2].active = diff [k] [2].el === document.activeElement;
            var tag  = v [1].match (/[^\s]+/g) [0];
            var opaque = v [1].match (/<.+ {.*"opaque":true.*}/);
            if (v [0] === 'add' && ! opaque) {
               if (match.rem.tag === tag) {
                  diff [k] [2].match = match.rem.index;
                  diff [match.rem.index] [2].match = k;
                  match.rem.tag = match.rem.index = null;
               }
               else {
                  match.add.tag   = tag;
                  match.add.index = k;
               }
            }
            if (v [0] === 'rem' && ! opaque) {
               if (match.add.tag === tag) {
                  diff [k] [2].match = match.add.index;
                  diff [match.add.index] [2].match = k;
                  match.add.tag = match.add.index = null;
               }
               else {
                  match.rem.tag   = tag;
                  match.rem.index = k;
               }
            }

            if (v [0] !== 'add') dold.push (0);
            if (v [0] !== 'rem') dnew.push (0);
         }
         else if (v [1].match (/^>/)) {
            if (v [0] !== 'add') {
               dold.pop ();
               dold [dold.length - 1]++;
            }
            if (v [0] !== 'rem') {
               dnew.pop ();
               dnew [dnew.length - 1]++;
            }
         }
         else {
            if (v [0] !== 'add') dold [dold.length - 1]++;
            if (v [0] !== 'rem') dnew [dnew.length - 1]++;
         }
      });

      var detached = {}, active, selected = [], unselected = [], checked = [], textareas = [];

      dale.go (diff, function (v, k) {
         if (v [1].match (/^>/)) return;
         if (v [1].match (/^<opaque/)) {
            if (v [0] === 'rem') return;
            // previous might be n items behind if there are multiple `rem` operations
            var previous = dale.stopNot (dale.times (k, k - 1, -1), undefined, function (k) {
               if (diff [k] [0] !== 'rem') return diff [k];
            });
            return previous [2].el.innerHTML = v [1].slice (7);
         }
         if (v [1] [0] !== '<' && v [0] !== 'rem' && v [2].New.length > 1) {
            var Parent = find (v [2].New.slice (0, -1));
            if (Parent.tagName === 'TEXTAREA') textareas.push ([Parent, v [1]]);
         }
         if (v [0] === 'keep') {
            if (v [1].match (/<.+ {.*"opaque":true.*}/)) v [2].el.innerHTML = '';

            // This if is because of the way IE/Edge treat text elements (they simply bring text instead of a textNode).
            if (! v [2].el) insert (document.createTextNode (v [1]), v [2].New, k);
            else {
               if (v [1].match (/<option/)) {
                  var attrs = JSON.parse (v [1].match (/{.+/) || '{}');
                  if (attrs.selected) selected.push (v [2].el);
               }
               insert (v [2].el.parentNode.removeChild (v [2].el), v [2].New, k);

               if (v [2].active && v [1].match (/[^<\s]+/g) [0] !== 'a') active = v [2].el;
            }
         }
         else if (v [1].match (/^</)) {
            if (v [0] === 'rem') {
               if (v [2].match === undefined || v [2].match > k) detached [v [2].old] = v [2].el.parentNode.removeChild (v [2].el);
            }
            if (v [0] === 'add') {
               var el;
               if (v [2].match !== undefined) {
                  var old = diff [v [2].match];
                  if (! detached [old [2].old]) detached [old [2].old] = old [2].el;
                  el = old [2].el;
                  var oldAttrs = dale.obj (el.attributes, function (v) {
                     // The check for v is required in FF22, IE<=10 & Opera<=11.6
                     if (v && v.specified) return [v.name, v.value];
                  });
                  var newAttrs = JSON.parse (v [1].match (/{.+/) || '{}');
                  dale.go (dale.fil (oldAttrs, undefined, function (v, k) {
                     if (type (v) === 'string') v = {name: k};
                     if (newAttrs [v.name] === undefined) return v.name;
                  }), function (k) {
                     el.removeAttribute (k);
                     if (['value', 'checked', 'selected'].indexOf (k) > -1) el [k] = k === 'value' ? '' : false;
                     if (k === 'selected') unselected.push (el);
                  });
                  dale.go (newAttrs, function (v, k) {
                     el.setAttribute (k, v);
                     if (['value', 'checked', 'selected'].indexOf (k) > -1) el [k] = v;
                  });
                  if (el.attributes && el.attributes.selected) selected.push (el);
                  if (el.attributes && el.attributes.checked)  checked.push  (el);
               }
               else {
                  el = document.createElement (v [1].match (/[^<\s]+/g) [0]);
                  dale.go (JSON.parse (v [1].match (/{.+/) || '{}'), function (v, k) {
                     if (v || v === '' || v === 0) el.setAttribute (k, v);
                  });
               }
               insert (el, v [2].New, k);
               v [2].el = el;
               if (old && old [2].active && v [1].match (/[^<\s]+/g) [0] !== 'a') active = el;
            }
         }
         else {
            if (v [0] === 'add') {
               v [1] = v [1]
                  .replace (/&amp;/g,  '\&')
                  .replace (/&lt;/g,   '<')
                  .replace (/&gt;/g,   '>')
                  .replace (/&quot;/g, '"')
                  .replace (/&#39;/g,  "'")
                  .replace (/&#96;/g,  '`');
               insert (document.createTextNode (v [1]), v [2].New, k);
            }
            else {
               if (v [2].el) v [2].el.parentNode.removeChild (v [2].el);
            }
         }
         if (v [1].match (/<textarea/) && v [0] !== 'rem') textareas.push ([v [2].el]);
      });

      if (active) {
         active.focus ? active.focus () : active.setActive ();
         active.blur ();
         active.focus ? active.focus () : active.setActive ();
      }

      dale.go (selected,   function (el) {el.selected = true});
      dale.go (unselected, function (el) {el.selected = false});
      dale.go (checked,    function (el) {el.checked  = true});

      var Textareas = dale.fil (textareas, undefined, function (v) {
         if (v.length === 2) return v [0];
      });

      dale.go (textareas, function (v) {
         if (v.length === 2) return v [0].value = v [1].replace (/&amp;/g, '&').replace (/&lt;/g, '<').replace (/&gt;/g, '>').replace (/&quot;/g, '"').replace (/&#39;/g, "'").replace (/&#96;/g, '`');
         if (Textareas.indexOf (v [0]) === -1) v [0].value = '';
      });
   }

   B.prediff = function (input, output) {

      if (teishi.simple (input)) {
         if (input === undefined || input === '') return output ? undefined : [];
         if (! output) return [lith.g (input)];
         if (output.length === 0) output.push ('');
         if (output [output.length - 1].match (/^(<|>)/)) output.push ('');
         return output [output.length - 1] += lith.g (input);
      }

      output = output || [];

      if (lith.k.tags.indexOf (input [0]) > -1) {

         // TODO: LITERAL

         if (input [1] && input [1].id && (input [1].id + '').match (/^в[0-9a-f]+$/g)) input = B.listeners [input [1].id].elem;

         var attrs = type (input [1]) !== 'object' ? undefined : dale.obj (input [1], function (v, k) {
            if (v || v === 0) return [k, v];
         });

         output.push ('<' + input [0]);

         var conts = input [attrs ? 2 : 1];
         if (attrs) {
            output [output.length - 1] += ' ' + JSON.stringify (attrs);
            if (attrs.opaque) output.push ('<opaque' + lith.g (conts, true));
         }

         var mark = output.length;
         if (! attrs || ! attrs.opaque) B.prediff (conts, output);
         // This inserts thead and tbody on table if necesssary
         if (input [0] === 'table' && output [mark]) {
            if (output [mark].match (/<thead/)) {
               var deep = 0;
               var index = dale.stopNot (dale.times (output.length - mark, mark), undefined, function (k) {
                  if (output [k].match (/</)) deep++;
                  if (output [k].match (/>/)) deep--;
                  if (deep === 0) return mark = k + 1;
               });
            }
            if (output [mark] && output [mark].match (/<tbody/) === null) {
               output.splice (mark, 0, '<tbody');
               output.push ('>');
            }
         }
         output.push ('>');
      }
      else {
         dale.go (input, function (v) {
            B.prediff (v, output);
         });
      }
      return output;
   }

   B.diff = function (s1, s2) {

      var V = [], sol, d = 0, vl, vc, k, out, y, point, diff, v, last, t = teishi.time ();

      while (d < s1.length + s2.length + 1) {

         if (B.internal.timeout && (new Date ().getTime () - t > B.internal.timeout)) return false;

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
