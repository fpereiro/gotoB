(function () {

   // *** SETUP ***

   var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c, B = window.B;

   var type = teishi.t, log = teishi.l;

   var Views = window.Views = B.store.Views = {};
   var Data  = window.Data  = B.store.Data  = {};
   var State = window.State = B.store.State = {};

   var Test = function (fun) {
      if (State.prod) return;
      var error = fun ();
      if (error) throw new Error (error);
   }

   // *** STYLE ***

   Views.style = [
      ['html, body, button, .todo-list', {'margin, padding': 0}],
      ['button', {
         border: 0,
         background: 'none',
         'font-size': 1,
         'vertical-align': 'baseline',
         'font-family, font-weight, color': 'inherit',
         '-webkit-appearance, appearance': 'none',
      }],
      ['button, body, .new-todo, .edit', {
         'font-smoothing, -webkit-font-smoothing, -moz-osx-font-smoothing': 'antialiased'
      }],
      ['body', {
         font: '14px \'Helvetica Neue\', Helvetica, Arial, sans-serif',
         'line-height': '1.4em',
         background: '#f5f5f5',
         color:      '#4d4d4d',
         'min-width': 230,
         'max-width': 550,
         margin: '0 auto',
         'font-weight': '300'
      }],
      ['button, input[type="checkbox"]', {outline: 'none'}],
      ['.hidden', {display: 'none'}],
      ['.todoapp', {
         background: '#fff',
         margin: '130px 0 40px 0',
         position: 'relative',
         'box-shadow': '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
      }, [
         dale.do (['-webkit-input', '-moz', 'input'], function (v) {
            return ['input::' + v + '-placeholder', {
               'font-style': 'italic',
               'font-weight': '300',
               color: '#e6e6e6'
            }]
         }),
         ['h1', {
            position: 'absolute',
            top: -155,
            width: 1,
            'font-size': 100,
            'font-weight': '100',
            'text-align': 'center',
            color: 'rgba(175, 47, 47, 0.15)',
            '-webkit-text-rendering, -moz-text-rendering, text-rendering': 'optimizeLegibility'
         }],
         ['.new-todo, .edit', {
            position: 'relative',
            'margin': 0,
            width: 1,
            'font-size': 24,
            'font-family, font-weight': 'inherit',
            'line-height': '1.4em',
            outline: 'none',
            'box-sizing': 'border-box',

         }],
         ['.edit', {padding: 6, border: 'solid 1px #999', 'box-shadow': 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)', color: 'inherit'}]
      ]],
      ['.new-todo', {
         padding: '16px 16px 16px 60px',
         border: 'none',
         background: 'rgba(0, 0, 0, 0.003)',
         'box-shadow': 'inset 0 -2px 1px rgba(0,0,0,0.03)',
      }],
      ['.main', {
         position: 'relative',
         'z-index': '2',
         'border-top': '1px solid #e6e6e6',
      }],
      ['label[for="toggle-all"]', {display: 'none'}],
      ['.toggle-all', {
         'position': 'absolute',
         top: -55,
         left: -12,
         width: 60,
         height: 34,
         'text-align': 'center',
         border: 'none'
      }, [
         ['&:before', {
            content: '"❯"',
            'font-size': 22,
            color: '#e6e6e6',
            padding: '10px 27px 10px 27px',
         }],
         ['&:checked:before', {color: '#737373'}],
      ]],
      ['.todo-list', {'list-style': 'none'}, [
         ['li', {
            position: 'relative',
            'font-size': 24,
            'border-bottom': '1px solid #ededed'
         }, [
            ['&:last-child, &.editing', {'border-bottom': 'none'}],
            ['&.editing', {padding: 0}, [
               ['.edit', {
                  display: 'block',
                  width: 506,
                  padding: '12px 16px',
                  margin: '0 0 0 43px'
               }],
               ['.view', {display: 'none'}],
            ]],
            ['.toggle', {
               'text-align': 'center',
               width: 40,
               height: 'auto',
               position: 'absolute',
               'top, bottom': 0,
               margin: 'auto 0',
               'border, appearance, -webkit-appearance': 'none',
            }, [
               ['&:after', {
                  content: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>\')'
               }],
               ['&:checked:after', {
                  content: 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>\')'
               }]
            ]],
            ['label', {
               'word-break': 'break-all',
               padding: '15px 60px 15px 15px',
               'margin-left': 45,
               display: 'block',
               'line-height': '1.2',
               transition: 'color 0.4s'
            }],
            ['&.completed label', {
               color: '#d9d9d9',
               'text-decoration': 'line-through'
            }],
            ['.destroy', {
               display: 'none',
               position: 'absolute',
               'top, bottom': 0,
               right: 10,
               'width, height': 40,
               margin: 'auto 0',
               'font-size': 30,
               color: '#cc9a9a',
               'margin-bottom': 11,
               transition: 'color 0.2s ease-out'
            }, [
               ['&:hover', {color: '#af5b5e'}],
               ['&:after', {content: '"×"'}]
            ]],
            ['&:hover .destroy', {display: 'block'}],
            ['.edit', {display: 'none'}],
            ['&:editing:last-child', {'margin-bottom': -1}]
         ]]
      ]],
      ['.footer', {
         color: '#777',
         padding: '10px 15px',
         height: 20,
         'text-align': 'center',
         'border-top': '1px solid #e6e6e6'
      }, ['&:before', {
         content: '\'\'',
         position: 'absolute',
         'right, bottom, left': 0,
         height: 50,
         overflow: 'hidden',
         'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2)'
      }]],
      ['.todo-count', {
         'float, text-align': 'left',
      }, ['strong', {'font-weight': 300}]],
      ['.filters', {
         'margin, padding, right, left': 0,
         'list-style': 'none',
         position: 'absolute'
      }, [
         ['li', {display: 'inline'}, [
            ['a', {
               color: 'inherit',
               'margin, border-radius': 3,
               padding: '3px 7px',
               'text-decoration': 'none',
               border: 'solid 1px transparent'
            }, [
               ['&:hover',    {'border-color': 'rgba(175, 47, 47, 0.1)'}],
               ['&.selected', {'border-color': 'rgba(175, 47, 47, 0.2)'}]
            ]]
         ]]
      ]],
      ['.clear-completed, html .clear-completed:active', {
         float: 'right',
         position: 'relative',
         'line-height': 20,
         'text-decoration': 'none',
         cursor: 'pointer'
      }],
      ['.clear-completed:hover', {'text-decoration': 'underline'}],
      ['.info', {
         margin: '65px auto 0',
         color: '#bfbfbf',
         'font-size': 10,
         'text-shadow': '0 1px 0 rgba(255, 255, 255, 0.5)',
         'text-align': 'center'
      }, [
         ['p', {'line-height': 1}],
         ['a', {
            color: 'inherit',
            'text-decoration': 'none',
            'font-weight': '400'
         }, ['&:hover', {'text-decoration': 'underline'}]]
      ]],
      ['LITERAL', '@media screen and (-webkit-min-device-pixel-ratio:0) {'],
      ['.toggle-all, .todo-list li .toggle', {background: 'none'}],
      ['.todo-list li .toggle', {height: 40}],
      ['.toggle-all', {
         '-webkit-transform, transform': 'rotate(90deg)',
         '-webkit-appearance, appearance': 'none'
      }],
      ['LITERAL', '}'],
      ['LITERAL', '@media (max-width: 430px) {'],
      ['.footer',  {height: 50}],
      ['.filters', {bottom: 10}],
      ['LITERAL', '}']
   ];

   // *** INITIALIZATION ***

   B.listen ({verb: 'init', path: '*', burn: true}, function () {
      // Throw error if browser does not support LocalStorage.
      if (! Storage) {
         alert           ('This application only works in a modern browser!');
         throw new Error ('This application only works in a modern browser!');
      }

      c.place ('body', 'afterBegin', lith.g (['body', Views.main ()]));

      B.do ('load', ['data', 'calc']);
   });

   // When document is ready, perform initialization.
   c.ready (function () {
      B.do ('init', '*');
   });

   // *** STORAGE ***

   B.listen ({verb: 'load', path: '*', burn: true}, function () {
      if (! localStorage ['todos-gotoB']) {
         localStorage.setItem ('todos-gotoB', '{"todos": []}');
      }
      B.do ('set', ['Data', 'todos'], JSON.parse (localStorage ['todos-gotoB']).todos);
   });

   B.listen ({verb: 'change', path: ['Data', 'todos']}, function (x) {
      localStorage.setItem ('todos-gotoB', JSON.stringify ({todos: dale.do (B.get (['Data', 'todos']), function (v) {
         return dale.obj (v, function (v2, k2) {
            if (k2 !== 'editing') return [k2, v2];
         });
      })}));
   });

   // *** HASH NAVIGATION ***

   window.addEventListener ('hashchange', function () {B.do ('change', 'hash')});

   B.listen ({verb: 'change', path: 'hash'}, function () {
      var hash = window.location.hash.replace ('#/', '');
      if (hash !== 'all' && hash !== 'active' && hash !== 'completed') return window.location.hash = '#/all';
      B.do ('set', ['Data', 'display'], hash);
   });

   // *** INITIALIZATION OF CERTAIN FIELDS AND SHORTHANDS ***

   var Todos    = function () {return B.get (['Data', 'todos'])}
   var Display  = function () {return B.get (['Data', 'display'])}

   B.do ('change', 'hash');

   // *** MAIN VIEW ***

   Views.main = function () {return B.view ({path: ['Data'], listen: [

      // *** MAIN VIEW EVENTS ***

      {verb: 'editNew', path: 'todo', rfun: function (x, value, ev) {
         if (ev.keyCode !== 13) return;
         var title = (B.get (['Data', 'new-todo']) || '').trim ();
         if (title === '') return;
         B.do ('add', ['Data', 'todos'], {title: title, completed: false});
         B.do ('set', ['Data', 'new-todo'], '');
      }},

     {verb: 'toggle', path: 'todos', rfun: function (x, value) {
         dale.do (Todos (), function (v, k) {
            Todos () [k].completed = value;
         });
         B.do ('change', ['Data', 'todos']);
      }},

      {verb: 'startEdit', path: '*', rfun: function (x) {
         var index = x.path [0];
         B.do ('set', ['Data', 'edit-todo'], Todos () [x.path [0]].title);

         var editing = dale.stopNot (Todos (), undefined, function (v2, k2) {
            if (v2.editing) return k2;
         });
         if (editing !== undefined && editing !== x.path [0]) B.do ('set', ['Data', 'todos', editing, 'editing'], false);
         B.do ('set', ['Data', 'todos', index, 'editing'], true);
         var target = c ('.editing input.edit') [0];
         target.focus ? target.focus () : target.setActive ();
      }},

      {verb: 'finishEdit', path: '*', rfun: function (x) {
         var index = x.path [0];
         if (! Todos () [index] || ! Todos () [index].editing) return;
         var newTitle = B.get (['Data', 'edit-todo']);
         if (newTitle === '') B.do ('rem', ['Data', 'todos'], index);
         else {
            B.do ('set', ['Data', 'todos', index, 'title'], newTitle);
            B.do ('set', ['Data', 'todos', index, 'editing'], false);
         }
      }},

      {verb: 'edit', path: '*', rfun: function (x, value, ev) {
         if (ev.keyCode === 13) {
            B.do ('set', ['Data', 'edit-todo'], value);
            return B.do ('finishEdit', x.path);
         }
         if (ev.keyCode === 27) B.do ('set', ['Data', 'todos', x.path [0], 'editing'], false);
      }},

      {verb: 'clear', path: 'completed', rfun: function () {
         B.do ('set', ['Data', 'todos'], dale.fil (Todos (), undefined, function (v) {
            if (! v.completed) return v;
         }));
      }}

   ]}, function (v, Data) {

      var allCompleted = dale.stopNot (Todos (), true, function (v) {
         return v.completed;
      });
      var someCompleted = dale.stop   (Todos (), true, function (v, k) {
         return v.completed;
      });

      // *** MAIN VIEW PROPER ***

      return [
         ['style', lith.css.g (Views.style)],
         ['section', {class: 'todoapp'}, [
            ['header', {class: 'header'}, [
               ['h1', 'todos'],
               ['input', B.ev ({
                  class: 'new-todo',
                  placeholder: 'What needs to be done?',
                  autofocus: true,
                  autocomplete: 'off',
                  value: B.get (['Data', 'new-todo'])
               }, [
                  {ev: 'onkeyup', verb: 'set',     path: ['Data', 'new-todo']},
                  {ev: 'onkeyup', verb: 'editNew', path: 'todo'}
               ])]
            ]],
            ! Todos () || Todos ().length === 0 ? [] : [
               ['section', {class: 'main'}, [
                  ['input', B.ev ({class: 'toggle-all', type: 'checkbox', 'checked': allCompleted ? true : undefined}, {ev: 'onclick', verb: 'toggle', path: 'todos', args: [! allCompleted]})],
                  ['ul', {class: 'todo-list'}, dale.fil (Todos (), undefined, function (v, k) {

                     if (  v.completed && Display () === 'active')    return;
                     if (! v.completed && Display () === 'completed') return;

                     return ['li', {class: ['todo', v.completed ? 'completed' : '', v.editing ? 'editing' : ''].join (' ')}, [
                        ['div', {class: 'view'}, [
                           ['input', B.ev ({class: 'toggle', type: 'checkbox', checked: v.completed ? 'true' : undefined},
                              {ev: 'onclick', verb: 'set', path: ['Data', 'todos', k, 'completed'], args: [! v.completed]}
                           )],
                           ['label', B.ev ({}, {ev: 'ondblclick', verb: 'startEdit', path: k}), v.title],
                           ['button', B.ev ({class: 'destroy'}, {ev: 'onclick', verb: 'rem', path: ['Data', 'todos'], args: k})],
                        ]],
                        ['input', B.ev ({class: 'edit', type: 'text', value: B.get (['Data', 'edit-todo'])}, [
                           {ev: 'onchange', verb: 'set',        path: ['Data', 'edit-todo']},
                           {ev: 'onkeyup',  verb: 'edit',       path: k},
                           {ev: 'onblur',   verb: 'finishEdit', path: k}
                        ])],
                     ]]
                  })]
               ]],
               ['footer', {class: 'footer'}, [
                  ['span', {class: 'todo-count'}, [
                     (function () {
                        var left = dale.fil (Todos (), false, function (v) {return ! v.completed}).length;
                        return [['strong', left], ' item' + (left === 1 ? '' : 's') + ' left'];
                     }) (),
                  ]],
                  ['ul', {class: 'filters'}, dale.do (['All', 'Active', 'Completed'], function (V) {
                     var v = V.toLowerCase ();
                     return ['li', ['a', {href: '#/' + v, class: v === Data.display ? 'selected' : ''}, V]]
                  })],
                  ! someCompleted ? [] : ['button', B.ev ({class: 'clear-completed'}, {ev: 'onclick', verb: 'clear', path: 'completed'}), 'Clear completed']
               ]]
            ]
         ]],
         ['footer', {class: 'info'}, [
            ['p', 'Double-click to edit a todo'],
            ['p', ['Written by ', ['a', {href: 'http://github.com/fpereiro'}, 'Federico Pereiro']]],
            ['p', ['Part of ',    ['a', {href: 'http://todomvc.com'        }, 'TodoMVC']]]
         ]]
      ];
   })}

   /*
   XXX ADD TESTS

   - Focus kept while writing new todo.
   - Add new todo: check counter bottom left too.
   - Delete single todo, go back to original view
   - Add two new todos in a row, verify order is correct and also counter.
   - Mark one of them as done.
   - Check that active view shows only one, and same with completed. Check that all shows all again.
   - Touch on check all, that should check all.
   - Touch on check all again, that should uncheck all.
   - Check and delete a todo.
   - Edit one of the todos with double click. Enter to save.
   - Edit one of the todos with double click. Blur to save.
   - Edit one of the todos and cancel with escape, check that changes were not saved.
   - Check that clear completed is working.
   - Check that new todos are trimmed and empty todos are not inserted.
   - Clear completed button should only appear if there are completed todos.
   - Put four todos, mark first and third as done. Select all and then unselect all.
   */

}) ();
