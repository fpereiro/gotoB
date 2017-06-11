/*
gotoB - v0.3.0

Written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

Please refer to readme.md to read the annotated source (but not yet!).
*/

(function () {

   // *** SETUP ***

   if (typeof exports === 'object') return console.log ('gotoB only works in a browser!');

   var dale   = window.dale;
   var teishi = window.teishi;
   var lith   = window.lith;
   var c      = window.c;

   var type   = teishi.t, log = teishi.l;

   var r = window.R ();

   var B = window.B = {v: '0.3.0', B: 'в', r: r, routes: r.routes, store: r.store, do: r.do, listen: r.listen, forget: r.forget};

   // *** DEVELOPER TOOLS ***

   B.debug = [];

   B.debug.log = function (from, to, mute) {

      if (! B.prod && teishi.stop ([
         ['from', from, 'integer'],
         ['to',   to,   ['integer', 'undefined'], 'oneOf']
      ])) return false;

      if (from < 0) {
         from = B.debug.length + from;
         to   = B.debug.length;
      }
      to = to || from;
      return dale.fil (dale.times (to - from + 1, from), undefined, function (v, k) {
         var item = B.debug [from + k];
         if (item) {
            if (! mute) console.log (from + k, item [0].verb, item [0].path, [].slice.call (item, 1));
            return item;
         }
      });
   }

   B.listen ({id: 'debug', verb: '*', path: '*'}, function () {
      B.debug.push ([].slice.call (arguments, 0));
   });

   // *** ARGS ***

   var isPath = function (path) {
      return teishi.v ([
         ['path', path, 'array'],
         function () {
            return ['path length', path.length, {min: 1}, teishi.test.range];
         },
         ['path', path, ['integer', 'string'], 'eachOf']
      ]);
   }

   B.add = function (path, value) {

      if (teishi.simple (path)) path = [path];
      if (! isPath (path)) return false;

      var target = B.get (path);

      if (target === false) return false;
      if (type (target) !== 'array') return log ('B.add', 'Cannot add to something that is not an array');
      target.push (value);
      return true;
   }

   B.rem = function (path, keys) {

      if (teishi.simple (path)) path = [path];
      if (! isPath (path)) return false;

      var target = B.get (path);
      if (teishi.simple (target)) return log ('B.rem', 'Cannot remove elements from simple target.');

      if (type (target) === 'array') {
         if (keys === '*') target.splice (0, target.length);
         else {
            if (type (keys) === 'array') keys.sort (function (a, b) {return b - a});
            dale.do (keys, function (v) {target.splice (v, 1)})
         }
      }
      else {
         if (keys === '*') dale.do (target, function (v, k) {delete target [k]});
         else              dale.do (keys,   function (v)    {delete target [v]});
      }

      return true;
   }

   B.get = function (path) {

      if (teishi.simple (path)) path = [path];
      if (! isPath (path)) return false;

      var target = B.store;
      return dale.stop (path, false, function (v, k) {
         if (k + 1 < path.length && teishi.simple (target [v])) return false;
         target = target [v];
      }) === false ? undefined : target;
   }

   B.set = function (path, value) {
      if (teishi.simple (path)) path = [path];
      if (! isPath (path)) return false;

      var item = B.store;

      dale.do (path, function (v, k) {
         if (k + 1 === path.length) item [v] = value;
         else {
            if (item [v] === undefined) item [v] = (type (path [k + 1]) === 'string' ? {} : []);
            item = item [v];
         }
      });

      return true;
   }

   B.equal = function (a, b) {
      if (teishi.simple (a) && teishi.simple (b)) return a === b;
      if (teishi.t (a, true) !== teishi.t (b, true)) return false;
      if (teishi.s (dale.keys (a).sort ()) !== teishi.s (dale.keys (b).sort ())) return false;
      return dale.stop (a, false, function (v, k) {
         return B.equal (v, b [k]);
      });
   }

   dale.do (['add', 'rem', 'get', 'set'], function (v) {
      B.listen ({id: v, verb: v, path: '*'}, function (x, val) {
         if (x.verb === 'set') var prev = B.get (x.path);
         B [x.verb].apply (null, [x.path].concat ([].slice.call (arguments, 1)));
         if (x.verb === 'add' || x.verb === 'rem')      B.do ('change', x.path, B.get (x.path));
         if (x.verb === 'set' && ! B.equal (prev, val)) B.do ('change', x.path, val);
      });
   });

   // *** DOM METHODS ***

   B.ev = function (attrs, evs) {
      if (! B.prod && teishi.stop ([
         ['attrs', attrs, 'object'],
         ['evs', evs, ['object', 'array'], 'oneOf'],
         [type (evs) === 'array', ['evs', evs, 'object', 'each']]
      ])) return false;

      if (type (evs) === 'object') evs = [evs];
      var Evs = {};
      dale.do (evs, function (v) {
         if (Evs [v.ev]) Evs [v.ev].push (v);
         else            Evs [v.ev] = [v];
      });
      return dale.obj (Evs, attrs, function (v, k) {
         var output = '';
         dale.do (v, function (v2) {
            var args = [JSON.stringify (v2.verb), JSON.stringify (v2.path)];
            if (v2.args) args = args.concat (dale.do (v2.args, JSON.stringify));
            else         args = args.concat (['this.value', 'event']);
            output += 'B.do (' + args.join (', ') + ');';
         });
         return [k, output];
      });
   }

   B.view = function (params, rfun) {

      if (! B.prod && teishi.stop ([
         ['params', params, 'object'],
         ['rfun', rfun, 'function'],
         function () {return [
            [params.tag !== undefined, ['params.tag', params.tag, lith.k.tags, 'oneOf', teishi.test.equal]],
            ['params.attrs', params.attrs, ['object', 'undefined'], 'oneOf'],
            ['params.ondraw', params.ondraw, ['function', 'undefined'], 'oneOf'],
            ['params.onforget', params.onforget, ['function', 'undefined'], 'oneOf']
         ]}
      ])) return false;

      var tag   = params.tag   || 'div';
      var attrs = params.attrs || {};
      params.path  = type (params.path) === 'array' ? params.path : [params.path];
      if (! isPath (params.path)) return false;

      var id = attrs.id = 'в' + B.count++;
      attrs ['data-в'] = params.path.join (':');

      if (dale.stop (type (params.listen) === 'object' ? [params.listen] : params.listen, false, function (v) {
         if (! v) return false;
         var Id = B.listen (v, v.rfun);
         if (Id === false) return false;
         B.routes [Id].parent = id;
      }) === false) return false;

      if (B.listen ({verb: 'change', path: params.path, id: id}, function (x) {
         var view = rfun (x, B.get (params.path));
         if (! B.prod && ! lith.v (view)) return log ('B.view received invalid view', view, x);
         B.resolve (id, view);
         if (params.ondraw) params.ondraw (params);
      }) === false) return log ('Invalid parameters passed to B.view:', params, rfun);

      var view = rfun ({verb: 'change', path: params.path}, B.get (params.path));

      if (! B.prod && ! lith.v (view)) return log ('B.view received invalid view', view, x);

      B.routes [id].view     = view;
      B.routes [id].priority = -2;
      B.routes [id].onforget = params.onforget;

      view = lith.g (view, B.prod);

      dale.do (B.getChildren (view), function (v) {
         B.routes [v].priority--;
         if (! B.routes [v].parent) B.routes [v].parent = id;
      });

      if (params.ondraw) params.ondraw (params);

      return [tag, attrs, ['LITERAL', view]];
   }

   // *** B.VIEW INTERNALS ***

   B.getChildren = function (view) {
      var children = (view || '').match (/id="в[0-9a-f]+/g) || [];
      return dale.do (children, function (v) {
         return v.slice (4);
      });
   }

   B.count        = 0;
   B.resolvequeue = [];
   B.resolving    = false;

   B.resolve = function (id, newView, rec) {

      if (B.resolving && ! rec) return B.resolvequeue.push ([id, newView]);

      B.resolving = true;

      var outro = function () {
         var next;
         var index = dale.stopNot (B.resolvequeue, undefined, function (v, k) {
            if (B.routes [v [0]]) return k;
         });

         if (index !== undefined) {
            next = B.resolvequeue [index];
            B.resolvequeue.splice (0, index + 1);
            return B.resolve.apply (null, next.concat (true));
         }
         else B.resolving = false;
      }

      if (! c ('#' + id)) {
         log ('B.resolve', 'Attempted to redraw dangling view', id);
         return outro ();
      }

      var backup   = c ('#' + id).innerHTML;
      var route    = B.routes [id];
      var prediff1 = B.prediff (route.view);
      var prediff2 = B.prediff (newView);
      var diff = B.diff (prediff1, prediff2);

      dale.do (r.routes, function (v) {
         if (v.parent === id && v.view) B.forget (v.id, function (route) {
            if (route.onforget) route.onforget ();
         });
      });

      var insert = function (el, where, debugpos) {
         var p = find (where, 'insert1', debugpos);
         if (p) p.parentNode.insertBefore (el, p);
         else   find (where.slice (0, where.length - 1), 'insert2', debugpos).appendChild (el);
      }

      var find = function (where, debug, debugpos) {
         var t = Date.now ();
         var cur = document.getElementById (id);
         dale.do (where, function (v, k) {
            if (! cur) {
               log ('BOOM! YOU FOUND A BUG IN gotoB! Please open a pull request at http://github.com/fpereiro/gotoB/issues and paste the text below:\n', JSON.stringify ({
                  debug: debug,
                  debugpos: debugpos,
                  diffitem: diff [debugpos].slice (0, 2).join (' '),
                  id: id,
                  where: where,
                  k: k,
                  backup: backup,
                  oldView: route.view,
                  newView: newView,
                  diff: dale.obj (teishi.c (diff), function (v2, k2) {return [k2, v2]})
               }));
               throw new Error ('gotoB redraw error!');
            }
            cur = cur.childNodes [v];
         });
         return cur;
      }

      var dold = [0];
      var dnew = [0];

      var match = {
         add: {tag: null, index: null},
         rem: {tag: null, index: null}
      }

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

      var detached = {};

      dale.do (diff, function (v, k) {
         if (v [1].match (/^>/)) return;
         if (v [1].match (/^<</)) {
            if (v [0] !== 'rem') diff [k - 1] [2].el.innerHTML = v [1].slice (1);
            return;
         }
         if (v [0] === 'keep') {
            if (v [1].match (/<.+ {.*"opaque":true.*}/)) v [2].el.innerHTML = '';
            insert (v [2].el.parentNode.removeChild (v [2].el), v [2].New, k);
            if (v [2].active && v [1].match (/[^<\s]+/g) [0] !== 'a') v [2].el.focus ? v [2].el.focus () : v [2].el.setActive ();
            return;
         }
         if (v [1].match (/^</)) {
            if (v [0] === 'rem') {
               if (v [2].match === undefined || v [2].match > k) detached [v [2].old] = v [2].el.parentNode.removeChild (v [2].el);
            }
            if (v [0] === 'add') {
               var el;
               if (v [2].match !== undefined) {
                  var old = diff [v [2].match];
                  if (! detached [old [2].old]) detached [old [2].old] = old [2].el;
                  el = old [2].el;
                  var oldAttrs = el.attributes;
                  if (type (oldAttrs, true) === 'moznamedattrmap') {
                     oldAttrs = dale.obj (oldAttrs, function (v) {
                        if (v) return [v.name, v.value];
                     });
                  }
                  var newAttrs = JSON.parse (v [1].match (/{.+/) || '{}');
                  dale.do (dale.fil (oldAttrs, undefined, function (v) {
                     if (newAttrs [v.name] === undefined) return v.name;
                  }), function (name) {
                     if (name === 'value')    el.value    = undefined;
                     if (name === 'checked')  el.checked  = false;
                     if (name === 'selected') el.selected = false;
                     el.removeAttribute (name);
                  });
                  dale.do (newAttrs, function (v, k) {
                     if (k === 'value')    el.value    = v;
                     if (k === 'checked')  el.checked  = v;
                     if (k === 'selected') el.selected = v;
                     el.setAttribute (k, v);
                  });
               }
               else {
                  el = document.createElement (v [1].match (/[^<\s]+/g) [0]);
                  dale.do (JSON.parse (v [1].match (/{.+/) || '{}'), function (v, k) {
                     el.setAttribute (k, v);
                  });
               }
               insert (el, v [2].New, k);
               v [2].el = el;
               if (old && old [2].active && v [1].match (/[^<\s]+/g) [0] !== 'a') el.focus ? el.focus () : el.setActive ();
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
            else v [2].el.parentNode.removeChild (v [2].el);
         }
      });

      route.view  = newView;

      dale.do (B.getChildren (c ('#' + id).innerHTML), function (v) {
         B.routes [v].priority = B.routes [v].priority + B.routes [id].priority + 1;
         if (! B.routes [v].parent) B.routes [v].parent = id;
         if (B.routes [v].ondraw) B.routes [v].ondraw ();
      });

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
         var attrs = type (input [1]) === 'object' ? input [1] : undefined;
         var conts = input [attrs ? 2 : 1];
         if (attrs) {
            output [output.length - 1] += ' ' + JSON.stringify (attrs);
            if (attrs.opaque) output.push ('<' + lith.g (conts, B.prod));
            else if (attrs.id && attrs.id.match (/^в[0-9a-f]+$/g)) {
               conts = B.routes [attrs.id].view;
            }
         }
         var mark = output.length;
         if (! attrs || ! attrs.opaque) B.prediff (conts, output);
         if (input [0] === 'table' && output [mark] && output [mark].match (/<tbody/) === null) {
            output.splice (mark, 0, '<tbody');
            output.push ('>');
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

      var V = [], sol, d = 0, vl, vc, k, out, y, point, diff, v, last;

      while (d < s1.length + s2.length + 1) {

         V.push ({});

         vl = V [V.length - 2] || {1: {x: 0}};
         vc = V [V.length - 1];
         k = -d;

         while (k < -d + 2 * d + 1) {

            out = {diags: 0};

            if (k === -d || (k !== d && vl [k - 1].x < vl [k + 1].x)) {
               out.x = vl [k + 1].x;
               out.dir = 'd';
            }
            else {
               out.x = vl [k - 1].x + 1;
               out.dir = 'r';
            }

            y = out.x - k;

            while (out.x < s1.length && y < s2.length && s1 [out.x] === s2 [y]) {
               out.x++; y++; out.diags++;
            }

            vc [k] = out;

            if (out.x >= s1.length && y >= s2.length) {

               point = {x: out.x, y: y};
               diff  = [];

               v = d;
               while (v > -1) {
                  last = V [v] [point.x - point.y];
                  y = last.x - (point.x - point.y);
                  if (last.diags) dale.do (dale.times (last.diags), function (v2) {
                     diff.unshift (['keep', s1 [last.x - v2]]);
                  });
                  if (last.dir === 'r') diff.unshift (['rem', s1 [last.x - last.diags - 1]]);
                  else                  diff.unshift (['add', s2 [y      - last.diags - 1]]);
                  point.x = last.x - last.diags - (last.dir === 'r' ? 1 : 0);
                  point.y = y      - last.diags - (last.dir === 'd' ? 1 : 0);
                  v--;
               }

               diff.shift ();
               return diff;
            }
            k += 2;
         }
         d++;
      }
   }

}) ();
