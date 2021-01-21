// *** SETUP ***

var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c, B = window.B;

var type = teishi.type, clog = teishi.clog;

window.Data  = B.store.Data  = {};
window.State = B.store.State = {};

// *** STYLE ***

var Views = {};

// Note: this example could perfectly use an external stylesheet. We choose to write the CSS in litc to illustrate how to use litc to generate CSS.
Views.style = [
   ['html, body', {'margin, padding': 0}],
   ['button', {
      'margin, padding, border': 0,
      background: 'none',
      'font-size': 1,
      'vertical-align': 'baseline',
      'font-family, font-weight, color': 'inherit',
      '-webkit-appearance, appearance': 'none',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale'
   }],
   ['body', {
      font: '14px \'Helvetica Neue\', Helvetica, Arial, sans-serif',
      'line-height': '1.4em',
      background: '#f5f5f5',
      color:      '#4d4d4d',
      'min-width': 230,
      'max-width': 550,
      margin: '0 auto',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'font-weight': '300'
   }],
   [':focus', {outline: 0}],
   ['.hidden', {display: 'none'}],
   ['.todoapp', {
      background: '#fff',
      margin: '130px 0 40px 0',
      position: 'relative',
      'box-shadow': '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)'
   }, [
      dale.go (['-webkit-input', '-moz', 'input'], function (v) {
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
   ]],
   ['.new-todo, .edit', {
      position: 'relative',
      'margin': 0,
      width: 1,
      'font-size': 24,
      'font-family, font-weight': 'inherit',
      'line-height': '1.4em',
      border: 0,
      color: 'inherit',
      padding: 6,
      border: '1px solid #999',
      'box-shadow': 'inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)',
      'box-sizing': 'border-box',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale'
   }],
   ['.new-todo', {
      padding: '16px 16px 16px 60px',
      border: 'none',
      background: 'rgba(0, 0, 0, 0.003)',
      'box-shadow': 'inset 0 -2px 1px rgba(0,0,0,0.03)'
   }],
   ['.main', {
      position: 'relative',
      'z-index': '2',
      'border-top': '1px solid #e6e6e6'
   }],
   ['.toggle-all', {
      'text-align': 'center',
      border: 'none',
      opacity: 0,
      position: 'absolute'
   }],
   ['.toggle-all + label', {
      width: 60,
      height: 34,
      'font-size': 0,
      position: 'absolute',
      top: -52,
      left: -13,
      '-webkit-transform, transform': 'rotate(90deg)'
   }, [
      ['&:before', {
         content: '"❯"',
         'font-size': 22,
         color: '#e6e6e6',
         padding: '10px 27px 10px 27px',
      }],
   ]],
   ['.toggle-all:checked + label:before', {color: '#737373'}],
   ['.todo-list', {'margin, padding': 0, 'list-style': 'none'}, [
      ['li', {
         position: 'relative',
         'font-size': 24,
         'border-bottom': '1px solid #ededed'
      }, [
         ['&:last-child', {'border-bottom': 'none'}],
         ['&.editing', {'border-bottom': 'none', padding: 0}, [
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
            'border, -webkit-appearance, appearance': 'none',
            opacity: 0
         }, [
            ['+ label', {
               'background-image': 'url(\'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E\')',
               'background-repeat': 'no-repeat',
               'background-position': 'center left'
            }],
            ['&:checked + label', {
               'background-image': 'url(\'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E\')'
            }]
         ]],
         ['label', {
            'word-break': 'break-all',
            padding: '15px 15px 15px 60px',
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
            ['&:after', {content: '\'×\''}]
         ]],
         ['&:hover .destroy', {display: 'block'}],
         ['.edit', {display: 'none'}],
         ['&.editing:last-child', {'margin-bottom': -1}]
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
      ['p', {'line-height': '1'}],
      ['a', {
         color: 'inherit',
         'text-decoration': 'none',
         'font-weight': '400'
      }, ['&:hover', {'text-decoration': 'underline'}]]
   ]],
   lith.css.media ('screen and (-webkit-min-device-pixel-ratio:0)', [
      ['.toggle-all, .todo-list li .toggle', {background: 'none'}],
      ['.todo-list li .toggle', {height: 40}],
      ['.toggle-all', {
         '-webkit-transform, transform': 'rotate(90deg)',
         '-webkit-appearance, appearance': 'none'
      }],
   ]),
   lith.css.media ('(max-width: 430px)', [
      ['.footer',  {height: 50}],
      ['.filters', {bottom: 10}],
   ])
];

B.mount ('body', function () {
   return ['div', [
      ['h2', ['TodoMVC (under construction)']],
   ]];
});

// TODO: re-implement

// *** STORAGE ***

/*
B.listen ('load', '*', function (x) {
   if (! localStorage ['todos-gotoB']) {
      localStorage.setItem ('todos-gotoB', '{"todos": []}');
   }
   B.do (x, 'set', ['Data', 'todos'], JSON.parse (localStorage ['todos-gotoB']).todos);
});

B.listen ('change', ['Data', 'todos'], function (x) {
   localStorage.setItem ('todos-gotoB', JSON.stringify ({todos: dale.do (B.get ('Data', 'todos'), function (v) {
      return dale.obj (v, function (v2, k2) {
         if (k2 !== 'editing') return [k2, v2];
      });
   })}));
});

// *** HASH NAVIGATION ***

window.addEventListener ('hashchange', function () {B.do ({from: {ev: 'hashchange'}}, 'change', 'hash')});

B.listen ('change', 'hash', function (x) {
   var hash = window.location.hash.replace ('#/', '');
   if (hash !== 'all' && hash !== 'active' && hash !== 'completed') return window.location.hash = '#/all';
   B.do (x, 'set', ['State', 'display'], hash);
});

B.do ({from: {ev: 'initializeHash'}}, 'change', 'hash');

// *** MAIN VIEW ***

Views.main = function () {return B.view (['Data', 'todos'], {listen: [

   // *** MAIN VIEW EVENTS ***

   ['editNew', 'todo', function (x, keycode) {
      if (keycode !== 13) return;
      var title = (B.get ('State', 'new-todo') || '').trim ();
      if (title === '') return;
      B.do (x, 'add', ['Data', 'todos'], {title: title, completed: false});
      B.do (x, 'set', ['State', 'new-todo'], '');
   }],

   ['toggle', 'todos', function (x, value) {
      dale.do (B.get ('Data', 'todos'), function (todo) {
         todo.completed = value;
      });
      B.do (x, 'change', ['Data', 'todos']);
   }],

   ['startEdit', '*', function (x) {
      var index = x.path [0];
      B.do (x, 'set', ['State', 'edit-todo'], B.get ('Data', 'todos') [x.path [0]].title);

      var editing = dale.stopNot (B.get ('Data', 'todos'), undefined, function (v2, k2) {
         if (v2.editing) return k2;
      });
      if (editing !== undefined && editing !== x.path [0]) B.do (x, 'set', ['Data', 'todos', editing, 'editing'], false);
      B.do (x, 'set', ['Data', 'todos', index, 'editing'], true);
      var target = c ('.editing input.edit') [0];
      target.focus ? target.focus () : target.setActive ();
   }],

   ['finishEdit', '*', function (x) {
      var index = x.path [0];
      if (! B.get ('Data', 'todos') [index] || ! B.get ('Data', 'todos') [index].editing) return;
      var newTitle = B.get ('State', 'edit-todo');
      if (newTitle === '') B.do (x, 'rem', ['Data', 'todos'], index);
      else {
         B.do (x, 'set', ['Data', 'todos', index, 'title'], newTitle);
         B.do (x, 'set', ['Data', 'todos', index, 'editing'], false);
      }
      B.do (x, 'set', ['State', 'edit-todo'], '');
   }],

   ['edit', '*', function (x, value, keycode) {
      if (keycode === 13) {
         B.do (x, 'set', ['State', 'edit-todo'], value);
         return B.do (x, 'finishEdit', x.path);
      }
      if (keycode === 27) {
         B.do (x, 'set', ['Data', 'todos', x.path [0], 'editing'], false);
         B.do (x, 'set', ['State', 'edit-todo'], '');
      }
   }],

   ['clear', 'completed', function (x) {
      B.do (x, 'set', ['Data', 'todos'], dale.fil (B.get ('Data', 'todos'), undefined, function (v) {
         if (! v.completed) return v;
      }));
   }],

], ondraw: function () {
   var target = c ('.new-todo') [0];
   target.focus ? target.focus () : target.setActive ();
}}, function (x, todos) {

   var allCompleted = dale.stopNot (todos, true, function (v) {
      return v.completed;
   });
   var someCompleted = dale.stop   (todos, true, function (v, k) {
      return v.completed;
   });

   // *** MAIN VIEW PROPER ***

   return [
      ['style', Views.style],
      ['section', {class: 'todoapp'}, [
         B.view (x, ['State', 'new-todo'], {tag: 'header', attrs: {class: 'header'}}, function (x, newTodo) {
            return [
               ['h1', 'todos'],
               ['input', B.ev ({
                  class: 'new-todo',
                  placeholder: 'What needs to be done?',
                  autofocus: true,
                  autocomplete: 'off',
                  value: newTodo
               }, [
                  ['onkeyup', 'editNew', 'todo', {rawArgs: 'event.keyCode'}],
                  ['oninput', 'set',     ['State', 'new-todo']]
               ])]
            ];
         }),
         ! todos || todos.length === 0 ? [] : [
            ['section', {class: 'main'}, [
               ['input', B.ev ({class: 'toggle-all', type: 'checkbox', 'checked': allCompleted ? true : undefined},
                  ['onclick', 'toggle', 'todos', ! allCompleted]
               )],
               B.view (x, ['State'], {tag: 'ul', attrs: {class: 'todo-list'}}, function (x, State) {

                  return dale.do (todos, function (v, k) {

                     if (  v.completed && State.display === 'active')    return;
                     if (! v.completed && State.display === 'completed') return;

                     return ['li', {class: ['todo', v.completed ? 'completed' : '', v.editing ? 'editing' : ''].join (' ')}, [
                        ['div', {class: 'view'}, [
                           ['input', B.ev ({class: 'toggle', type: 'checkbox', checked: v.completed},
                              ['onclick', 'set', ['Data', 'todos', k, 'completed'], ! v.completed]
                           )],
                           ['label', B.ev (['ondblclick', 'startEdit', k]), v.title],
                           ['button', B.ev ({class: 'destroy'}, ['onclick', 'rem', ['Data', 'todos'], k])],
                        ]],
                        ['input', B.ev ({class: 'edit', type: 'text', value: State ['edit-todo']}, [
                           ['onchange', 'set', ['State', 'edit-todo']],
                           ['onkeydown',  'edit', k, {rawArgs: ['value', 'event.keyCode']}],
                           ['onblur',   'finishEdit', k]
                        ])]
                     ]];
                  });
               }),
            ]],
            ['footer', {class: 'footer'}, [
               ['span', {class: 'todo-count'}, [
                  (function () {
                     var left = dale.fil (todos, false, function (v) {return ! v.completed}).length;
                     return [['strong', left], ' item' + (left === 1 ? '' : 's') + ' left'];
                  }) (),
               ]],
               ['ul', {class: 'filters'}, dale.do (['All', 'Active', 'Completed'], function (V) {
                  var v = V.toLowerCase ();
                  return ['li', ['a', {href: '#/' + v, class: v === Data.display ? 'selected' : ''}, V]]
               })],
               ! someCompleted ? [] : ['button', B.ev ({class: 'clear-completed'}, ['onclick', 'clear', 'completed']), 'Clear completed']
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

// *** INITIALIZATION ***

// Throw error if browser does not support LocalStorage.
if (! Storage) {
   alert           ('This application only works in a modern browser!');
   throw new Error ('This application only works in a modern browser!');
}

B.mount ('body', Views.main ());

B.do ({from: {ev: 'initializeLoad'}}, 'load', ['data', 'calc']);
*/

/*
XXX ADD AUTOMATIC TESTS

- Focus kept while writing new todo.
- Add new todo: check counter bottom left too.
- Delete single todo, go back to original view
- Add two new todos in a row, verify order is correct and also counter.
- Mark one of them as done.
- Check that active view shows only one, and same with completed. Check that all shows all again. Check that the URLS change.
- Touch on check all, that should check all.
- Touch on check all again, that should uncheck all.
- Check and delete a todo.
- Edit one of the todos with double click. Enter to save.
- Edit one of the todos with double click. Blur to save.
- Edit one of the todos and cancel with escape, check that changes were not saved.
- Reedit it and check that the input value didn't change.
- Check that if you delete entire text of an existing todo, it is deleted.
- Add one todo, check it and run clear completed.
- Check that new todos are trimmed and empty todos are not inserted.
- Clear completed button should only appear if there are completed todos.
- Put four todos, mark first and third as done. Select all and then unselect all.
- Check that invalid URL is redirected to #/all
*/
