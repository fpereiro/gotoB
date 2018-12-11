/*
gotoB - v1.2.2

Written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

Please refer to readme.md to read the annotated source (but not yet!).
*/

(function () {

   // *** SETUP ***

   if (typeof exports === 'object') return console.log ('gotoB only works in a browser!');

   var dale = window.dale, teishi = window.teishi, lith = window.lith, R = window.R, c = window.c, B = window.B;

   var type = teishi.t, log = teishi.l;

   var r = window.R ();
   var B = window.B = {v: '1.2.2', B: 'в', r: r, routes: r.routes, store: r.store, do: r.do, listen: r.listen, forget: r.forget};

   // *** B.EVENTLOG ***

   B.eventlog = [];

   B.listen ({id: 'eventlog', verb: '*', path: []}, function (x) {
      B.eventlog.unshift ({verb: x.verb, path: x.path, from: x.from});
      if (arguments.length > 1) B.eventlog [0].args = [].slice.call (arguments, 1);
      if (B.verbose) log ('B.eventlog event #' + B.eventlog.length, B.eventlog [0]);
   });

   // *** ARGS ***

   B.add = function (path) {

      if (! B.prod && ! r.isPath (path, 'B.add')) return false;

      if (B.get (path) === undefined) B.set (path, []);
      var target = B.get (path);
      if (type (target) !== 'array') return log ('B.add', 'Cannot add to something that is not an array.');
      dale.do (arguments, function (arg, k) {
         if (k !== 0) target.push (arg);
      });
      return true;
   }

   B.rem = function (path) {

      if (! B.prod && ! r.isPath (path, 'B.rem')) return false;

      var target     = B.get (path);
      var targetType = type (target);
      var keys       = type (arguments [1]) === 'array' ? arguments [1] : dale.do (arguments, function (v) {return v}).slice (1);

      if (! B.prod && teishi.stop ([
         ['target', target, ['array', 'object'], 'oneOf'],
         targetType === 'array' ?
            ['keys of array target',  keys, 'integer', 'each'] :
            ['keys of object target', keys, 'string',  'each']
      ])) return false;

      if (targetType === 'array') {
         keys.sort (function (a, b) {return b - a});
         dale.do (keys, function (v) {target.splice (v, 1)})
      }
      else dale.do (keys, function (v) {delete target [v]});

      return true;
   }

   B.get = function (path) {

      path = type (path) === 'array' ? path : dale.do (arguments, function (v) {return v});
      if (! B.prod && ! r.isPath (path, 'B.get')) return;

      var target = B.store;

      return dale.stop (path, false, function (v, k) {
         if (k + 1 < path.length && teishi.simple (target [v])) return false;
         target = target [v];
      }) === false ? undefined : target;
   }

   B.set = function (path, value, overwriteParent) {

      if (! B.prod && ! r.isPath (path, 'B.set')) return false;

      var target = B.store;

      if (type (path) !== 'array') path = [path];

      var error = dale.stop (path, true, function (v, k) {
         if (k + 1 === path.length) {
            target [v] = value;
            return;
         }
         var targetType = type (path [k + 1]) === 'string' ? 'object' : 'array';
         if (type (target [v]) !== targetType) {
            if (target [v] !== undefined && ! overwriteParent) {
               log ('B.set didn\'t overwrite a parent because of type mismatch. Pass a truthy third argument to force this behavior. Path', path);
               return true;
            }
            target [v] = targetType === 'object' ? {} : [];
         }
         target = target [v];
      });

      return error ? false : true;
   }

   dale.do (['add', 'rem', 'set'], function (v) {
      B.listen ({id: v, verb: v, path: []}, function (x, value) {
         if (x.verb === 'set') var prev = B.get (x.path);
         if (B [x.verb].apply (null, [x.path].concat ([].slice.call (arguments, 1))) !== true) return;
         if (x.verb === 'add' || x.verb === 'rem') {
            B.do (x, 'change', x.path);
            var args = [].slice.call (arguments, 1);
            if (x.verb === 'add') dale.do (dale.times (args.length, B.get (x.path).length - args.length), function (i) {
               B.do (x, 'change', x.path.concat (i));
            });
            if (x.verb === 'rem') {
               if (type (args [0]) === 'array') args = args [0];
               dale.do (args, function (i) {
                  B.do (x, 'change', x.path.concat (i));
               });
            }
         }
         if (x.verb === 'set' && ! teishi.eq (prev, value)) B.do (x, 'change', x.path);
      });
   });

   // *** DOM METHODS ***

   B.str = function (input) {
      var inputType = type (input);
      if (teishi.simple (input)) return inputType === 'string' ? JSON.stringify (input) : (input + '');

      var output = inputType === 'array' ? '[' : '{';

      if (inputType === 'array') output += dale.do (input, B.str).join (', ');
      else                       output += dale.do (input, function (v, k) {
         return JSON.stringify (k) + ': ' + B.str (v);
      }).join (', ');

      output += inputType === 'array' ? ']' : '}';

      return output;
   }

   B.ev = function () {

      var attrs = arguments.length === 1 ? {} : arguments [0];
      var evs   = arguments.length === 1 ? arguments [0] : arguments [1];

      if (type (evs) === 'array' && type (evs [0]) === 'string') evs = [evs];

      if (! B.prod && teishi.stop ('B.ev', [
         ['attrs', attrs, 'object'],
         ['evs',   evs,   'array'],
         ['evs',   evs,   'array', 'each'],
         function () {return dale.do (evs, function (ev) {
            return [
               ['ev.ev',   ev [0], 'string'],
               ['ev.verb', ev [1], 'string'],
               r.isPath (ev [2], 'B.ev')
            ];
         })}
      ])) return false;

      var Evs = {}, Attrs = teishi.c (attrs);
      dale.do (evs, function (ev) {
         dale.do (ev [0].split (/,\s*/), function (evname) {
            if (! Evs [evname]) Evs [evname] = [ev];
            else                Evs [evname].push (ev);
         });
      });

      return dale.obj (Evs, attrs, function (ev, evname) {
         var output = '';
         dale.do (ev, function (entry) {
            var args = [JSON.stringify (entry [1]), JSON.stringify (entry [2])];
            if (entry.length < 4) entry [3] = {rawArgs: 'this.value'};
            dale.do (entry.slice (3), function (arg) {
               if (type (arg) === 'object') {
                  var keys = dale.keys (arg);
                  if (keys.indexOf ('args') === -1 && keys.indexOf ('rawArgs') === -1) args = args.concat (B.str (arg));
                  else {
                     if (keys.indexOf ('args') !== -1)    {
                        if (type (arg.args) === 'object' || arg.args === undefined) arg.args = [arg.args];
                        args = args.concat (dale.do (arg.args, B.str));
                     }
                     if (keys.indexOf ('rawArgs') !== -1) args = args.concat (arg.rawArgs);
                  }
               }
               else args = args.concat (B.str (arg));
            });
            output += 'B.do ({from: {ev: "' + evname + '", attrs: ' + B.str (Attrs) + '}}, ' + args.join (', ') + ');';
         });
         return [evname, output];
      });
   }

   B.view = function () {
      var argc = 0;
      var x      = type (arguments [argc]) === 'object' ? arguments [argc++] : {};
      var path   = arguments [argc++];
      var params = type (arguments [argc]) === 'object' ? arguments [argc++] : {};
      var rfun   = arguments [argc];

      if (! B.prod && teishi.stop ('B.view', [
         r.isPath (path, 'B.view'),
         ['rfun',   rfun,   'function'],
         function () {return [
            ['params.tag',      params.tag, [undefined].concat (lith.k.tags), 'oneOf', teishi.test.equal],
            ['params.attrs',    params.attrs,    ['object',   'undefined'], 'oneOf'],
            ['params.listen',   params.listen,   ['array',    'undefined'], 'oneOf'],
            ['params.ondraw',   params.ondraw,   ['function', 'undefined'], 'oneOf'],
            ['params.onforget', params.onforget, ['function', 'undefined'], 'oneOf'],
            function () {
               return [params.attrs !== undefined, ['params.attrs.id', (params.attrs || {}).id, 'undefined']]
            }
         ]}
      ])) return false;

      params.attrs = params.attrs || {};
      var id = params.attrs.id = 'в' + B.count++;
      params.attrs ['path-в'] = path.join ? path.join (':') : path;

      if (params.listen && params.listen.length !== 0 && type (params.listen [0]) !== 'array') params.listen = [params.listen];

      var listeners = [];

      if (dale.stop (params.listen, false, function (args, k) {
         var routeId = dale.stopNot (args, undefined, function (arg) {
            if (type (arg) === 'object' && arg.id) return arg.id;
         });
         if (routeId) return log ('B.view', 'Cannot pass `id` property in args to listener.');
         var route = B.listen.apply (null, args);
         if (! B.prod && route === false) {
            log ('B.view', 'There was an error creating event listener #' + (k + 1) + ' on view with path: ', path);
            dale.do (listeners, function (route) {B.forget (route)});
            return false;
         }
         listeners.push (route);
         if (! B.routes [route].parent) B.routes [route].parent = id;
      }) === false) return false;

      B.listen ('change', path, {id: id, priority: -1}, function (x) {
         B.resolve (x, id, function () {
            x.from.unshift ({ev: 'redraw', id: id, path: path});
            return B.drawView (x, B.get (path), rfun);
         });
      });

      var x2 = dale.obj (x, {verb: 'change', path: path}, function (v, k) {return [k, v]});

      var view = B.drawView (x2, B.get (path), rfun);

      if (params.ondraw)   B.routes [id].ondraw   = params.ondraw;
      if (params.onforget) B.routes [id].onforget = params.onforget;
                           B.routes [id].view     = view [0];

      dale.do (B.getChildren (view [1]), function (v) {
         B.routes [v].priority--;
         if (! B.routes [v].parent) B.routes [v].parent = id;
      });

      return [params.tag || 'div', params.attrs, ['LITERAL', view [1]]];
   }

   B.mount = function (target, view) {

      if (! B.prod && type (target) !== 'string' || ! target.match (/^(body|#[^\s]+)$/)) return log ('B.mount', 'target must be either \'body\' or an id selector, but instead is ' + target);

      if (! B.prod && c (target) === undefined) return log ('B.mount', 'target not found.');

      view = lith.g (view, B.prod);

      if (! B.prod && view === false) return log ('B.mount', 'received invalid view.');

      c.place (target, 'afterBegin', view);

      dale.do (B.getChildren (view), function (id) {
         if (B.routes [id] && B.routes [id].ondraw) B.routes [id].ondraw ({from: [{ev: 'mount', target: target}], route: B.routes [id]});
      });
   }

   B.unmount = function (target) {

      if (! B.prod && type (target) !== 'string' || ! target.match (/^(body|#[^\s]+)$/)) return log ('B.unmount', 'target must be either \'body\' or an id selector, but instead is ' + target);

      var Target = target === 'body' ? c (target) [0] : c (target);

      if (! B.prod && ! Target) return log ('B.unmount', 'target not found.');

      var onforget = function (route) {
         if (route.onforget) route.onforget ({from: [{ev: 'unmount', target: target}], route: route});
      }

      var ids = B.getChildren (Target.innerHTML);

      dale.do (ids, function (id) {
         if (B.routes [id]) B.forget (id, onforget);
      });

      dale.do (ids, function (id) {
         var e = document.getElementById (id);
         if (e) e.remove ();
      });
   }

   // *** B.VIEW INTERNALS ***

   B.drawView = function (x, value, rfun) {

      var view = rfun (x, value);
      var html = lith.g (view, B.prod);

      if (! B.prod && html === false) {
         view = ['pre', ['Invalid lith: ', teishi.simple (view) ? view.toString () : JSON.stringify (view, null, '   ')]];
         html = lith.g (view, B.prod);
      }

      return [view, html];
   }

   B.getChildren = function (view) {
      var children = (view || '').match (/id="в[0-9a-f]+/g) || [];
      return dale.do (children, function (v) {
         return v.slice (4);
      });
   }

   B.count        = 1;
   B.trample      = 200;
   B.resolvequeue = [];
   B.resolving    = false;

   B.resolve = function (x, id, newView, rec) {

      if (B.resolving && ! rec) return B.resolvequeue.push ([x, id, newView]);

      B.resolving = true;

      var outro = function () {
         var next;
         var index = dale.stopNot (B.resolvequeue, undefined, function (v, k) {
            if (B.routes [v [1]]) return k;
         });

         if (index !== undefined) {
            next = B.resolvequeue [index];
            B.resolvequeue.splice (0, index + 1);
            return B.resolve.apply (null, next.concat (true));
         }
         else B.resolving = false;
      }

      var route = B.routes [id], newView = newView ();

      var rootElement = document.getElementById (id);

      var onforget = function (route) {
         if (route.onforget) route.onforget (x);
      }

      if (! rootElement) {
         log ('B.resolve', 'Attempted to redraw dangling view, omitting redraw & deleting route.', {route: {id: id, path: route.path}, view: newView [0]});
         x.from.unshift ({ev: 'danglingView'});
         B.forget (id, onforget);
         return outro ();
      }

      var diff = B.diff (B.prediff (route.view), B.prediff (newView [0]));

      dale.do (B.routes, function (route) {
         if (route.parent === id && route.id.match (/^в[0-9a-f]+$/)) B.forget (route.id, onforget);
      });

      if (diff === false) {
         if (! B.prod) log ('diff took too long, trampling instead!', route.id);
         c ('#' + id).innerHTML = newView [1];
      }
      else {
         var insert = function (el, where, position) {
            var p = find (where, 'insert1', position);
            if (p) p.parentNode.insertBefore (el, p);
            else   find (where.slice (0, where.length - 1), 'insert2', position).appendChild (el);
         }

         var find = function (where, action, position) {
            var cur = rootElement;
            dale.do (where, function (v, k) {
               if (! cur) {
                  var data = {
                     action: action,
                     position: position,
                     diffitem: diff [position].slice (0, 2).join (' '),
                     id: id,
                     where: where,
                     k: k,
                     innerHTML: rootElement.innerHTML,
                     expectedHTML: newView [1],
                     oldView: route.view,
                     newView: newView [0],
                     diff: dale.obj (teishi.c (diff), function (v2, k2) {return [k2, v2]})
                  };
                  x.from.unshift ({ev: 'gotoB error', data: data});
                  log ('BOOM! YOU FOUND A BUG IN gotoB! Please open a pull request at http://github.com/fpereiro/gotoB/issues and paste the text below:\n', JSON.stringify (data));
                  throw new Error ('gotoB redraw error!');
               }
               cur = cur.childNodes [v];
            });
            return cur;
         }

         var dold = [0], dnew = [0], match = {
            add: {tag: null, index: null},
            rem: {tag: null, index: null}
         };

         dale.do (diff, function (v, k) {
            if (v [1].match (/^<</)) return;
            if (! v [1].match (/^>/)) diff [k] [2] = {el: find (dold, 'sequence', k), old: teishi.c (dold), New: teishi.c (dnew)};
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

         dale.do (diff, function (v, k) {
            if (v [1].match (/^>/)) return;
            if (v [1].match (/^<</)) {
               if (v [0] !== 'rem') diff [k - 1] [2].el.innerHTML = v [1].slice (1);
               return;
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
                     dale.do (dale.fil (oldAttrs, undefined, function (v, k) {
                        if (type (v) === 'string') v = {name: k};
                        if (newAttrs [v.name] === undefined) return v.name;
                     }), function (k) {
                        el.removeAttribute (k);
                        if (['value', 'checked', 'selected'].indexOf (k) !== -1) el [k] = k === 'value' ? '' : false;
                        if (k === 'selected') unselected.push (el);
                     });
                     dale.do (newAttrs, function (v, k) {
                        el.setAttribute (k, v);
                        if (['value', 'checked', 'selected'].indexOf (k) !== -1) el [k] = v;
                     });
                     if (el.attributes && el.attributes.selected) selected.push (el);
                     if (el.attributes && el.attributes.checked)  checked.push  (el);
                  }
                  else {
                     el = document.createElement (v [1].match (/[^<\s]+/g) [0]);
                     dale.do (JSON.parse (v [1].match (/{.+/) || '{}'), function (v, k) {
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

         dale.do (selected,   function (el) {el.selected = true});
         dale.do (unselected, function (el) {el.selected = false});
         dale.do (checked,    function (el) {el.checked  = true});

         var Textareas = dale.fil (textareas, undefined, function (v) {
            if (v.length === 2) return v [0];
         });

         dale.do (textareas, function (v) {
            if (v.length === 2) return v [0].value = v [1].replace (/&amp;/g, '&').replace (/&lt;/g, '<').replace (/&gt;/g, '>').replace (/&quot;/g, '"').replace (/&#39;/g, "'").replace (/&#96;/g, '`');
            if (Textareas.indexOf (v [0]) === -1) v [0].value = '';
         });
      }

      route.view = newView [0];

      dale.do (B.getChildren (c ('#' + id).innerHTML), function (id) {
         var croute = B.routes [id];
         croute.priority += route.priority;
         if (! croute.parent) croute.parent = route.id;
         if (croute.ondraw) croute.ondraw (x);
      });

      if (route.ondraw) route.ondraw (x);

      outro ();
   }

   B.prediff = function (input, output) {

      if (teishi.simple (input)) {
         if (input === undefined || input === '') return output ? undefined : [];
         if (! output) return [lith.g (input, B.prod)];
         if (output.length === 0) output.push ('');
         if (output [output.length - 1].match (/^(<|>)/)) output.push ('');
         return output [output.length - 1] += lith.g (input, B.prod);
      }

      output = output || [];

      if (lith.k.tags.indexOf (input [0]) !== -1) {
         output.push ('<' + input [0]);

         var attrs = type (input [1]) !== 'object' ? undefined : dale.obj (input [1], function (v, k) {
            if (v || v === 0) return [k, v];
         });

         var conts = input [attrs ? 2 : 1];
         if (input [0] === 'style' && type (conts) === 'array') conts = lith.css.g (conts);
         if (attrs) {
            output [output.length - 1] += ' ' + JSON.stringify (attrs);
            if (attrs.opaque) output.push ('<' + lith.g (conts, B.prod));
            else if (attrs.id !== undefined && (attrs.id + '').match (/^в[0-9a-f]+$/g)) {
               conts = B.routes [attrs.id].view;
            }
         }
         var mark = output.length;
         if (! attrs || ! attrs.opaque) B.prediff (conts, output);
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
         dale.do (input, function (v) {
            B.prediff (v, output);
         });
      }
      return output;
   }

   B.diff = function (s1, s2) {

      var V = [], sol, d = 0, vl, vc, k, out, y, point, diff, v, last, t = Date.now ();

      while (d < s1.length + s2.length + 1) {

         if (B.trample && (Date.now () - t > B.trample)) return false;

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
               if (last [0]) dale.do (dale.times (last [0]), function (v2) {
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
