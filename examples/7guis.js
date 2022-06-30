var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c, B = window.B;

var type = teishi.type;

B.mount ('body', function () {
   return [
      ['style', [
         ['body', {padding: 10}]
      ]],
      ['h1', ['7GUIs tasks, as described ', ['a', {href: 'https://eugenkiss.github.io/7guis/tasks'}, 'here']]],
      ['br']
   ];
});

var views = {};

// *** COUNTER ***

views.counter = function () {
   return B.view ('counter', function (counter) {
      if (counter === undefined) counter = 0;
      return ['div', [
         ['h2', 'Counter'],
         ['input', {readonly: true, value: counter}],
         ['button', {onclick: B.ev ('set', 'counter', counter + 1)}, 'Count']
      ]];
   });
}

B.mount ('body', views.counter);

// *** TEMPERATURE CONVERTER ***

views.converter = function () {
   return ['div', [
      ['h2', 'Temperature converter'],

      B.view (['temperature', 'celsius'], function (celsius) {
         return ['input', {
            onchange: B.ev ('set', ['temperature', 'celsius']),
            value: celsius
         }];
      }),
      ['label', ['LITERAL', '&nbsp; Celsius = &nbsp;']],

      B.view (['temperature', 'fahrenheit'], function (fahrenheit) {
         return ['input', {
            onchange: B.ev ('set', ['temperature', 'fahrenheit']),
            value: fahrenheit
         }];
      }),
      ['label', ['LITERAL', ' Fahrenheit']]
   ]];
}

B.respond ('change', ['temperature', /celsius|fahrenheit/], function (x, value) {
   value = parseInt (value);
   if (isNaN (value)) return;
   if (x.path [1] === 'celsius')    B.call (x, 'set', ['temperature', 'fahrenheit'], Math.round (value * 9/5 + 32));
   if (x.path [1] === 'fahrenheit') B.call (x, 'set', ['temperature', 'celsius'],    Math.round ((value - 32) * 5/9));
});

B.mount ('body', views.converter);

// *** FLIGHT BOOKER ***

views.booker = function () {
   return ['div', [
      ['style', ['input.invalid', {'background-color': 'red'}]],
      ['h2', 'Flight booker'],

      B.view (['flight', 'type'], function (type) {
         return ['select', {value: type, onchange: B.ev ('set', ['flight', 'type'])}, [
            ['option', {value: 'one-way'}, 'one-way flight'],
            ['option', {value: 'return'},  'return flight'],
         ]];
      }),
      ['br'], ['br'],
      B.view (['flight', 'departure'], function (departure) {
         return ['input', {
            'class':  departure.input && ! departure.date ? 'invalid' : false,
            value:    departure.input,
            onchange: B.ev ('set', ['flight', 'departure', 'input']),
            oninput:  B.ev ('set', ['flight', 'departure', 'input'])
         }];
      }),
      ['br'], ['br'],
      B.view ([['flight', 'type'], ['flight', 'return']], function (type, Return) {
         return ['input', {
            'class':  type === 'return' && Return.input && ! Return.date ? 'invalid' : false,
            disabled: type !== 'return',
            value:    Return.input,
            onchange: B.ev ('set', ['flight', 'return', 'input']),
            oninput:  B.ev ('set', ['flight', 'return', 'input'])
         }];
      }),
      ['br'], ['br'],
      B.view ([['flight', 'type'], ['flight', 'departure', 'date'], ['flight', 'return', 'date']], function (type, departureDate, returnDate) {
         var disabled;
         if (type !== 'return') disabled = ! departureDate;
         else                   disabled = ! departureDate || ! returnDate || returnDate <= departureDate;
         return ['button', {disabled: disabled, onclick: B.ev ('flight', 'book')}, 'Book'];
      })
   ]];
}

B.mrespond ([
   ['change', ['flight', /departure|return/, 'input'], function (x, value) {
      var date = value.split ('.');
      date = new Date (date [2] + '-' + date [1] + '-' + date [0]).getTime ();
      if (isNaN (date)) return B.call (x, 'rem', ['flight', x.path [1]], 'date');
      B.call (x, 'set', ['flight', x.path [1], 'date'], date);
   }],
   ['flight', 'book', function (x) {
      var message = 'You have booked a ' + (B.get ('flight', 'type') || 'one-way') + ' flight on ' + B.get ('flight', 'departure', 'input');
      if (B.get ('flight', 'type') === 'return') message += ' returning on ' + B.get ('flight', 'return', 'input');
      alert (message);
   }],
]);

B.call ('set', ['flight', 'departure', 'input'], '01.01.2020');
B.call ('set', ['flight', 'return',    'input'], '01.01.2020');

B.mount ('body', views.booker);

// *** TIMER ***

views.timer = function () {
   return ['div', [
      ['style', [
         ['div.progress', {'border': 'solid 1px black', 'height': 15, width: 150}, ['div', {'background-color': 'blue', height: 1}]]
      ]],
      ['h2', 'Timer'],
      ['label', {style: 'float: left'}, ['Elapsed time:', ['LITERAL', '&nbsp;']]],
      ['div', {'class': 'progress', style: 'float: left'}, B.view ('timer', function (timer) {
         var width = Math.min (100, 100 * (timer.elapsed || 0) / timer.total);
         return ['div', {style: 'width: ' + width + '%'}];
      })],
      ['br'],
      B.view ('timer', function (timer) {
         return ['div', (timer.elapsed || 0) + 's'];
      }),
      ['label', {style: 'float: left'}, ['Duration:', ['LITERAL', '&nbsp;']]],
      B.view (['timer', 'total'], function (total) {
         return ['input', {
            type: 'range',
            min: 0,
            max: 60,
            value: total,
            oninput: B.ev ('update', 'timer', {raw: 'this.value'})
         }]
      }),
      B.view ('timer', function (timer) {
         var width = Math.min (100, 100 * (timer.elapsed || 0) / timer.total);
         return ['div', {style: 'width: ' + width + '%'}];
      }),
      ['br'],
      ['button', {onclick: B.ev ('set', ['timer', 'elapsed'], 0)}, 'Reset']
   ]];
}

B.mrespond ([
   ['update', 'timer', function (x, value) {
      B.call (x, 'set', ['timer', 'total'], value);
   }],
   ['timer', 'tick', function (x) {
      var time = B.get ('timer', 'elapsed') || 0;
      if (time > B.get ('timer', 'total')) return;
      B.call (x, 'set', ['timer', 'elapsed'], (Math.round (time * 10) + 1) / 10);
   }]
]);

setInterval (function () {
   B.call ('timer', 'tick');
}, 100);

B.call ('set', ['timer', 'total'], 30);

B.mount ('body', views.timer);

// *** CRUD ***

views.crud = function () {
   return ['div', [
      ['style', [
         ['li.selected', {'background-color': 'blue', color: 'white'}],
         ['div.left, div.right', {'float': 'left', padding: 10}],
         ['div.right label', {width: 100}],
         ['div.right input', {width: 100}],
         ['div.left ul', {'list-style-type': 'none', padding: 0, border: 'solid 1px black'}],
         ['div.left ul li', {padding: 5}],
      ]],
      ['h2', 'CRUD'],
      ['div', {class: 'left'}, [
         ['label', {style: 'float: left'}, ['Filter prefix:', ['LITERAL', '&nbsp;']]],
         B.view (['crud', 'filter'], function (filter) {
            return ['input', {style: 'float: left; width: 50px', value: filter, oninput: B.ev ('set', ['crud', 'filter'])}];
         }),
         ['br'],
         B.view ([['crud', 'people'], ['crud', 'filter'], ['crud', 'selected']], function (people, filter, selected) {
            return ['ul', {style: 'height: 150px'}, dale.go (people, function (person, k) {
               if (filter !== undefined && filter !== '' && ! person.surname.toLowerCase ().match (filter.toLowerCase ())) return;
               return ['li', {'class': k === selected ? 'selected' : '', onclick: B.ev ('set', ['crud', 'selected'], k)}, person.surname + ', ' + person.name];
            })];
         }),
      ]],
      ['div', {class: 'right'}, [
         ['label', {style: 'float: left'}, ['Name:', ['LITERAL', '&nbsp;']]],
         B.view (['crud', 'new', 'name'], function (name) {
            return ['input', {value: name, oninput: B.ev ('set', ['crud', 'new', 'name'])}];
         }),
         ['br'],
         ['label', {style: 'float: left'}, ['Surname:', ['LITERAL', '&nbsp;']]],
         B.view (['crud', 'new', 'surname'], function (surname) {
            return ['input', {value: surname, oninput: B.ev ('set', ['crud', 'new', 'surname'])}];
         }),
      ]],
      B.view ([['crud', 'new', 'name'], ['crud', 'new', 'surname'], ['crud', 'selected']], function (name, surname, selected) {
         return ['div', {style: 'clear: both'}, [
            ['button', {disabled: (name || '').length === 0 || (surname || '').length === 0, onclick: B.ev ('add', ['crud', 'people'], {name: name, surname: surname})}, 'Create'],
            ['button', {disabled: selected === undefined, onclick: B.ev ('set', ['crud', 'people', selected || 0], {name: name, surname: surname})}, 'Update'],
            ['button', {disabled: selected === undefined, onclick: B.ev (['rem', ['crud', 'people'], selected], ['rem', 'crud', 'selected'], ['rem', 'crud', 'new'])}, 'Delete'],
         ]];
      })
   ]]
}

B.respond ('change', ['crud', 'selected'], function (x) {
   // We need to copy the object, otherwise changes to crud.new will be done to crud.people.SELECTED too.
   B.call (x, 'set', ['crud', 'new'], teishi.copy (B.get ('crud', 'people', B.get ('crud', 'selected'))));
});

B.call ('set', ['crud', 'people'], [{name: 'Hans', surname: 'Emil'}, {name: 'Max', surname: 'Mustermann'}, {name: 'Roman', surname: 'Tisch'}]);

B.mount ('body', views.crud);

// *** CIRCLE DRAWER ***

views.drawer = function () {
   return ['div', [
      ['style', [
         ['div.circles', {'width, height': 300, border: 'solid 1px black', margin: 10}, ['svg', {'width, height': 1}]]
      ]],
      ['h2', ['Circle drawer']],
      ['div', [
         ['button', {onclick: B.ev ('undo', 'history')}, 'Undo'],
         ['button', {onclick: B.ev ('redo', 'history')}, 'Redo']
      ]],
      B.view ([['drawer', 'position'], ['drawer', 'history'], ['drawer', 'selected'], ['drawer', 'edit']], function (position, history, selected, edit) {
         var circles = resolveCircles (position, history);
         return ['div', {
            'class': 'circles',
            style:       edit ? 'opacity: 0.5' : '',
            onmousemove: edit ? undefined : B.ev ('move',   'mouse',  {raw: 'event'}),
            onclick:     edit ? undefined : B.ev ('create', 'circle', {raw: 'event'})
         }, ['LITERAL', '<svg>' + dale.go (circles, function (circle) {
            var fill    = circle.id === selected ? 'purple' : 'none';
            // We stop propagation of the click to not draw another circle if we're selecting a circle to edit it. We return false to avoid the context menu from appearing.
            var oncontextmenu = edit ? '' : 'event.stopPropagation (); ' + B.ev ('set', ['drawer', 'edit'], {id: circle.id, radius: circle.radius, x: circle.x, y: circle.y}).replace (/"/g, '\'') + ' return false';
            return '<circle id="c' + circle.id + '" cx="' + circle.x + '" cy="' + circle.y + '" r="' + circle.radius + '" stroke="black" stroke-width="1" fill="' + fill + '" oncontextmenu="' + oncontextmenu + '"/>';
         }).join ('\n')]];
      }),
      B.view (['drawer', 'edit'], function (edit) {
         if (! edit) return ['span'];
         return ['div', {'class': 'modal'}, [
            ['p', 'Adjust diameter of circle at (' + edit.x + ', ' + edit.y + ')'],
            ['input', {
               type: 'range',
               min: 0,
               max: 150,
               value: edit.radius,
               oninput: B.ev (['resizeTemp', 'circle', edit.id, {raw: 'parseInt (this.value)'}], ['set', ['drawer', 'edit', 'radius'], {raw: 'parseInt (this.value)'}])
            }],
            ['button', {onclick: B.ev ('resize', 'circle', edit.id, edit.radius)}, 'Done']
         ]];
      })
   ]];
}

var resolveCircles = function (position, history) {
   var circles = {};
   dale.go (position === undefined ? history : history.slice (0, position), function (change) {
      if (change.op === 'create') circles [change.id]        = teishi.copy (change);
      if (change.op === 'resize') circles [change.id].radius = change.radius;
   });
   return dale.go (circles, function (circle) {return circle});
}

var distance = function (p1, p2) {
   return Math.pow (Math.pow (p1.x - p2.x, 2) + Math.pow (p1.y - p2.y, 2), 0.5);
}

B.mrespond ([
   ['append', 'history', function (x, change) {
      var position = B.get ('drawer', 'position') || 0, history = B.get ('drawer', 'history') || [];
      // We remove the history after the current position, if any.
      history = history.slice (0, position);
      history.push (change);
      B.call (x, 'set', ['drawer', 'history'], history);
      B.call (x, 'set', ['drawer', 'position'], position + 1);
   }],
   ['create', 'circle', function (x, ev) {
      B.call (x, 'append', 'history', {op: 'create', id: teishi.time (), radius: 20, x: ev.offsetX, y: ev.offsetY});
   }],
   ['resize', 'circle', function (x, id, radius) {
      B.call (x, 'rem', 'drawer', 'edit');
      B.call (x, 'append', 'history', {op: 'resize', id: id, radius: radius});
   }],
   ['resizeTemp', 'circle', function (x, id, radius) {
      c ('#c' + id).setAttribute ('r', radius);
   }],
   ['move', 'mouse', function (x, ev) {
      // We slice circles to make a shallow copy of them, so we can sort the copied array of circles without affecting the order of the original one.
      var circles = resolveCircles (B.get ('drawer', 'position'), B.get ('drawer', 'history')).slice ();
      if (circles.length === 1) circles [0].d = distance ({x: ev.offsetX, y: ev.offsetY}, circles [0]);
      else {
         // We sort circles so that the closest one to the mouse is at the beginning of the array.
         circles.sort (function (c1, c2) {
            // We put the distances on the circles to already have them.
            c1.d = distance ({x: ev.offsetX, y: ev.offsetY}, c1);
            c2.d = distance ({x: ev.offsetX, y: ev.offsetY}, c2);
            // If distances are the same, prefer the newest circle (largest id)
            if (c1.d === c2.d) return c1.id - c2.id;
            return c1.d - c2.d;
         });
      }
      var selected = dale.stopNot (circles, undefined, function (circle) {
         if (circle.d < circle.radius) return circle.id;
      });
      B.call (x, 'set', ['drawer', 'selected'], selected);
   }],
   ['undo', 'history', function (x) {
      var position = B.get ('drawer', 'position'), history = B.get ('drawer', 'history') || [];
      if (history.length === 0) return;
      B.call (x, 'set', ['drawer', 'position'], Math.max (0, position - 1));
   }],
   ['redo', 'history', function (x) {
      var position = B.get ('drawer', 'position'), history = B.get ('drawer', 'history') || [];
      if (history.length === 0) return;
      B.call (x, 'set', ['drawer', 'position'], Math.min (history.length, position + 1));
   }]
]);

B.mount ('body', views.drawer);

// *** EARLEY PARSER ***

// This implementation of an Earley parser owes a debt of gratitude to Lurchmath's implementation of the Earley parser (https://github.com/lurchmath/earley-parser/blob/master/earley-parser.litcoffee), especially for the crucial bit of how to construct the parse tree inside the completer function.

// `input` is a string, `grammar` is an object represeting a grammar (see the examples below by way of definition)
// `options` is an optional argument with keys `printLogs` (by default `false`, if truthy you'll see a lot of debugging info that is useful to understand the parser), `skipCategories` (by default `false`, if truthy the parser will only add terminals to the parse tree) and `collapseBranches`, which will unwrap nested arrays of the form `[...[X]...]` into `[X]` (where `...` represents a number of `[` and `]`).
var earleyParser = function (input, grammar, options) {

   options = options || {};

   var k = {d: '•', a: '→', s: 'ə'};

   var printState = function (state) {
      return state [0] + '  ' + state [1] + '  ' + JSON.stringify (state [2]).replace (/"/g, '').replace (/,/g, ', ');
   }
   var printRule = function (rule) {
      return rule [0] + k.a + rule [1];
   }
   var log = options.printLogs ? teishi.clog : function () {};

   if (teishi.stop ([
      ['input', input, 'string'],
      ['grammar', grammar, 'object'],
      function () {
         return [
            dale.go (['terminals', 'nonterminals'], function (charType) {
               return [
                  ['grammar.' + charType, grammar [charType], 'array'],
                  function () {return ['grammar.' + charType + ' length', grammar [charType].length, {min: 1}, teishi.test.range]},
                  ['grammar.' + charType, grammar [charType], 'string', 'each'],
                  dale.go (grammar [charType], function (character, k) {
                     return ['grammar.' + charType + ' [' + k + '] length', character.length, 1, teishi.test.equal];
                  }),
               ];
            }),
            ['grammar.root', grammar.root, 'string'],
            ['grammar.root', grammar.root, grammar.nonterminals, 'oneOf', teishi.test.equal],
            ['grammar.rules', grammar.rules, 'array'],
            ['grammar.rules', grammar.rules, 'array', 'each'],
            dale.go (grammar.rules, function (rule, k) {
               return [
                  ['grammar rule [k] length', rule.length, 2, teishi.test.equal],
                  ['grammar rule [k]', rule, 'string', 'each'],
                  function () {return [
                     ['grammar.rule [k] left side length', rule [0].length, 1, teishi.test.equal],
                     ['grammar.rule [k] left side character', rule [0], grammar.nonterminals, 'oneOf', teishi.test.equal],
                     ['grammar.rule [k] right side characters', rule [1].split (''), grammar.nonterminals.concat (grammar.terminals), 'eachOf', teishi.test.equal],
                  ]}
               ];
            })
         ];
      },
   ])) return false;

   var rootAtLeft = dale.stop (grammar.rules, true, function (rule) {
      return rule [0] === grammar.root;
   });
   if (! rootAtLeft) return teishi.clog ('There must be at least one rule that has the root of the grammar at its left.');
   var forbiddenCharacter = dale.stop (grammar.nonterminals.concat (grammar.terminals), true, function (character) {
      return dale.go (k, function (v2) {return v2}).indexOf (character) > -1;
   });
   if (forbiddenCharacter) return teishi.clog ('The characters `•`, `→` and `ə` cannot be used in the grammar');

   /*
      We initialize `states`, an array that will have N+1 state sets (where N is the length of input).
      A state set is an array of states.
      A state is an array of the form `['X→...•...', INTEGER, [...]]`.
      The first element of a state is a string starting with a nonterminal, an arrow pointing to the production rule, and then a dot denoting the marked character, which can be preceded or followed by terminals and nonterminals. For example, 'E→•E+T'. The marked character is the character to the *right* of the dot.
      The second element of a state is the *origin position*, an integer that denotes the position in the input at which the matching of this production rule began.
      The third element of a state is a parse tree, which is an array. For a parse tree (or a section of the parse tree) that is `[X, ...]`, the nonterminal X maps to all the other elements inside that array.
   */
   var states = dale.go (dale.times (input.length + 1, 0), function (index) {
      // The first state set (the one at position 0) is initialized with an initial state.
      // Note we use `ə` as a special character to represent the beginning of the string.
      if (index === 0) {
         log ('adding initial state to 0', printState ([k.s + k.a + k.d + grammar.root, 0, []]));
         return [[k.s + k.a + k.d + grammar.root, 0, []]];
      }
      // All other state sets start empty.
      else             return [];
   });

   var repeatedState = function (current, newState) {
      return dale.stop (states [current], true, function (state) {
         // We only compare the first two elements of a state to see if it's the same to another state - we ignore the partial parse tree in the comparison.
         return teishi.eq (newState.slice (0, 2), state.slice (0, 2));
      }) || false;
   }

   // This function returns a new string with the dot advanced by one position in the production rule.
   var moveDot = function (string) {
      var markedPosition = string.indexOf (k.d) + 2;
      return string.slice (0, markedPosition).replace (k.d, '') + k.d + string.slice (markedPosition);
   }

   // The predictor is invoked when there's a nonterminal to the right of the dot.
   // The predictor adds states to the current state set.
   var predictor = function (current, state) {
      var markedPosition = state [0].indexOf (k.d) + 1;
      // Iterate the rules.
      dale.go (grammar.rules, function (rule) {
         if (rule [0] !== state [0] [markedPosition]) return;
         // If the left side of the rule is the nonterminal X that is marked by the dot in state, we construct a new state with a production rule `X→•Y`, where Y is the right side of the production rule. The origin is set to `current`, which is the index of the current state set being processed. The parse tree itself is set to an empty array.
         var newState = [rule [0] + k.a + k.d + rule [1], current, []];
         if (repeatedState (current, newState)) return;
         // If the state is not in the current state set, we add it.
         log ('predictor adding to state set', current, printState (newState), 'from state', printState (state), 'and rule', printRule (rule));
         states [current].push (newState);
      });
   }

   // The scanner is invoked when there's a terminal to the right of the dot.
   // The scanner adds states to the *next* state set.
   var scanner = function (current, state) {
      var markedPosition = state [0].indexOf (k.d) + 1;
      if (input [current] !== state [0] [markedPosition]) return;
      // If the character at index `current` of the input is equal to the marked character in the production rule, we construct a new state with the same production rule, except that we advance the dot by one character.
      // The `origin` is the same in the new rule.
      // The tree of the new state is a copy of the the tree of the current state; we then push the current nonterminal to the tree.
      var tree = teishi.copy (state [2]);
      tree.push (input [current]);
      var newState = [moveDot (state [0]), state [1], teishi.copy (tree)];
      if (repeatedState (current + 1, newState)) return;
      // If the state is not in the next state set, we add it.
      log ('scanner adding to state set', current + 1, printState (newState), 'from state', printState (state));
      states [current + 1].push (newState);
   }

   // The completer is invoked when the dot is at the end of the production
   // The completer adds states to the current state set.
   var completer = function (current, state) {
      // We iterate the state set k, where k is the `origin` of the state
      dale.go (states [state [1]], function (State, i) {
         if (State [0] [State [0].indexOf (k.d) + 1] !== state [0] [0]) return;
         // If the character to the right of the dot is the nonterminal at the left of the state, we construct a new state.

         // To construct the parse tree of the new state, we start by copying the parse tree of the state we passed as an argument.
         var tree = teishi.copy (state [2]);
         // If options.skipNonterminals is not set, we add the character at the left side of the state we passed as an argument to the beginning of the tree.
         if (! options.skipNonterminals) tree.unshift (state [0] [0]);
         // If options.collapseBranches is set, we unwrap the tree.
         if (options.collapseBranches && tree.length === 1) tree = tree [0];
         // We create a new tree by copying the tree of the state we're completing.
         var tree2 = teishi.copy (State [2]);
         // We then push to this tree the tree we made earlier with the nonterminal, plus the tree coming from the state passed as an argument.
         tree2.push (tree);
         var newState = [moveDot (State [0]), State [1], tree2];

         if (repeatedState (current, newState)) return;
         // If the state is not in the next state set, we add it.
         log ('completer adding to state set', current, printState (newState), 'from state', printState (state), 'and previous state', printState (State));
         states [current].push (newState);
      });
   }

   var t = teishi.time (), current = 0;

   // The `next` function is recursive and is in charge of either adding more states or deciding that we're done recognizing the input.
   // The return value of `next` is irrelevant. All its work is done through reading and writing state to the `states` variable.
   var next = function () {
      log ('Processing state set', current);
      // We note the number of current states at the beginning of the execution of `next`. This number will tell us later whether the current execution of `next` added more states to the current set of states.
      var numberOfCurrentStates = states [current].length;
      // For each of the current states:
      dale.go (states [current], function (state, i) {
         // The marked character is the character at the right of the dot.
         var marked = state [0] [state [0].indexOf (k.d) + 1];
         // If the marked character is a nonterminal, we invoke the predictor.
         if (grammar.nonterminals.indexOf (marked) !== -1) return predictor (current, state, current + ':' + i);
         // If the marked character is a terminal, we invoke the scanner.
         if (grammar.terminals.indexOf (marked) !== -1)    return scanner (current, state, current + ':' + i);
         // If there is no marked character, the dot is at the end of the production rule. We invoke the completer.
         // completer: dot at end of production
         if (marked === undefined) return completer (current, state, current + ':' + i);
         // No further cases are possible.
      });

      // If the number of current states increased during the current execution of `next`, we invoke `next` recursively.
      if (states [current].length > numberOfCurrentStates) return next ();
      // If we are here, the number of current states has not increased.
      // If `current` is less than the length of the input, we increase `current` and invoke `next` recursively.
      if (current < input.length) {
         current++;
         return next ();
      }

      // If we are here, we are on the Nth step, where N is the length of the input, and we also cannot add any further states. This means we're done recognizing.
      // We check whether the input conforms to the grammar.
      // We iterate the states on the current step until we find the first one that is a final state.
      var tree = dale.stopNot (states [current], undefined, function (state, i) {
         // If the start starts with ə and it comes from 0, this is a final state. We return `true` to indicate that it is a final state and stop the loop.
         if (state [0] === k.s + k.a + grammar.root + k.d && state [1] === 0) return state [2];
      });
      // We remove the outermost part of the tree since there will always be an extra array wrapper at the top level.
      if (tree) tree = tree [0];

      var output = {valid: !! tree, input: input, length: input.length, time: Date.now () - t, tree: tree};
      log ('Recognizer output', output);
      return output;
   }

   return next ();
}

var grammars = {};

grammars.AE = {
   terminals:    ['a', '+', '*'],
   nonterminals: ['E', 'T', 'P'],
   root: 'E',
   rules: [
      ['E', 'T'],
      ['E', 'E+T'],
      ['T', 'P'],
      ['T', 'T*P'],
      ['P', 'a']
   ]
}

grammars.UBDA = {
   terminals: ['x'],
   nonterminals: ['A'],
   root: 'A',
   rules: [
      ['A', 'x'],
      ['A', 'AA'],
   ]
}

grammars.BK = {
   terminals: ['x'],
   nonterminals: ['K', 'J', 'F', 'I'],
   root: 'K',
   rules: [
      ['K', ''],
      ['K', 'KJ'],
      ['J', 'F'],
      ['J', 'I'],
      ['F', 'x'],
      ['I', 'x'],
   ]
}

grammars.PAL = {
   terminals: ['x'],
   nonterminals: ['A'],
   root: 'A',
   rules: [
      ['A', 'x'],
      ['A', 'xAx']
   ]
}

grammars.G1 = {
   terminals: ['a', 'b'],
   nonterminals: ['S', 'A'],
   root: 'S',
   rules: [
      ['S', 'Ab'],
      ['A', 'a'],
      ['A', 'Ab']
   ]
}

grammars.G2 = {
   terminals: ['a', 'b'],
   nonterminals: ['S', 'B'],
   root: 'S',
   rules: [
      ['S', 'aB'],
      ['B', 'aB'],
      ['B', 'b']
   ]
}

grammars.G3 = {
   terminals: ['a', 'b'],
   nonterminals: ['S'],
   root: 'S',
   rules: [
      ['S', 'ab'],
      ['S', 'aSb']
   ]
}

grammars.G4 = {
   terminals: ['a', 'b', 'c', 'd'],
   nonterminals: ['S', 'A', 'B'],
   root: 'S',
   rules: [
      ['S', 'AB'],
      ['A', 'a'],
      ['A', 'Ab'],
      ['B', 'bc'],
      ['B', 'bB'],
      ['B', 'Bd']
   ]
}

grammars.PC = {
   terminals:  ['(', ')', 'p', 'q', 'r', '⊃', '∧', '∨', '˜', '`'],
   nonterminals: ['F', 'C', 'S', 'P', 'U', 'L'],
   root: 'F',
   rules: [
      ['F', 'C'],
      ['F', 'S'],
      ['F', 'P'],
      ['F', 'U'],
      ['C', 'U⊃U'],
      ['U', '(F)'],
      ['U', '˜U'],
      ['U', 'L'],
      ['L', 'L`'],
      ['L', 'p'],
      ['L', 'q'],
      ['L', 'r'],
      ['S', 'U∨S'],
      ['S', 'U∨U'],
      ['P', 'U∧P'],
      ['P', 'U∧U']
   ]
}

grammars.GRE = {
   terminals: ['a', 'b', 'd' ,'e'],
   nonterminals: ['X', 'Y'],
   root: 'X',
   rules: [
      ['X', 'a'],
      ['X', 'Xb'],
      ['X', 'Ya'],
      ['Y', 'e'],
      ['Y', 'YdY']
   ]
}

grammars.NSE = {
   terminals: ['a', 'b', 'c', 'd'],
   nonterminals: ['S', 'A', 'B', 'C', 'D'],
   root: 'S',
   rules: [
      ['S', 'AB'],
      ['A', 'a'],
      ['A', 'SC'],
      ['B', 'b'],
      ['B', 'DB'],
      ['C', 'c'],
      ['D', 'd']
   ]
}

dale.go ([
   ['a+a*a', grammars.AE],
   ['xxxx', grammars.UBDA],
   ['', grammars.BK],
   ['xxxx', grammars.BK],
   ['x', grammars.PAL],
   // The test below is the only test that should return `false`, since grammar PAL only accepts an input made of an odd number of `x`.
   ['xx', grammars.PAL],
   ['abbb', grammars.G1],
   ['aaab', grammars.G2],
   ['aaabbb', grammars.G3],
   ['abbbcd', grammars.G4],
   ['p', grammars.PC],
   ['(p∧q)', grammars.PC],
   ['(p`∧q)∨r∨p∨q`', grammars.PC],
   ['p⊃((q⊃˜(r`∨(p∧q)))⊃(q`∨r))', grammars.PC],
   ['˜(˜p`∧(q∨r)∧p`)', grammars.PC],
   ['((p∧q)∨(q∧r)∨(r∧p`))⊃˜((p`∨q`)∧(r`∨p))', grammars.PC],
   ['ededea', grammars.GRE],
   ['ededeabbbb', grammars.GRE],
   ['ededeabbbbbbbbbb', grammars.GRE],
   ['ededeabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', grammars.GRE],
   ['ededededeabb', grammars.GRE],
   ['edededededededeabb', grammars.GRE],
   ['ededededededededeabb', grammars.GRE],
   ['adbcddb', grammars.NSE],
   ['adddbcbcdddbcddddb', grammars.NSE],
   ['addddddddddddddddddb', grammars.NSE],
   ['abcbcbcdddbcdbcddbcddddb', grammars.NSE],
   ['abcdbcddbcdddbcb', grammars.NSE],
], function (testCase) {
   var result1 = earleyParser (testCase [0], testCase [1]);
   var result2 = earleyParser (testCase [0], testCase [1], {skipNonterminals: true, collapseBranches: true});
   //teishi.clog (result1);
   //teishi.clog (result2);
});

// *** CELLS ***

/*
Main refererences:
- https://www.artima.com/pins1ed/the-scells-spreadsheet.html (original specification and implementation)
- https://andrewgreenh.github.io/7guis/#/cells (a great React implementation)

What is allowed in a cell:
- Number
- Text
- Formula

A formula is an equals sign followed by one of the following:
- Number
- Coordinate (e.g.: "A1")
- Function application

A function application is one of the following functions:
- add : sums one or more arguments. Arguments can be numbers, the coordinate of a cell that has a number value, a range of cells that have number values, or a function application that returns a number.
- sub: subtracts the second argument from the first. The function only takes two arguments. Arguments can be numbers, the coordinate of a cell that has a number value, or a function application that returns a number (however, it cannot be a range).
- mul: multiplies one or more arguments. Arguments can be numbers, the coordinate of a cell that has a number value, a range of cells that have number values, or a function application that returns a number.
- div: divides the second argument into the first. The function only takes two arguments. Arguments can be numbers, the coordinate of a cell that has a number value, or a function application that returns a number (however, it cannot be a range).
- mod: takes the modulo second argument of the first. The function only takes two arguments. Arguments can be numbers, the coordinate of a cell that has a number value, or a function application that returns a number (however, it cannot be a range).

Note: the `sum` and `prod` operations of SCells are not implemented since we have modified `add` and `mul` to take multiple arguments.
*/

// We use Cyrillic capital letters for specifying nonterminals since we don't have a tokenizer and we want to use all ASCII letters as terminals
var cellsGrammar = {
   terminals: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*_-()[]{}:., ='.split (''),
   nonterminals: 'ЗЦБСКЛРЧВТХФЭИПпЯ'.split (''),
   root: 'Я',
   rules: []
};

// Ц: non-zero digit (1-9), З: digit (0-9)
dale.go (dale.times (10, 0), function (n) {
   cellsGrammar.rules.push (['З', n + '']);
   if (n !== 0) cellsGrammar.rules.push (['Ц', n + '']);
});

// Б: letters (A-Z & a-z), C: symbols (A-Z, a-z & a bunch of symbols except equals)
dale.go ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split (''), function (l) {
   cellsGrammar.rules.push (['Б', l]);
   cellsGrammar.rules.push (['Б', l.toLowerCase ()]);
   cellsGrammar.rules.push (['С', l]);
   cellsGrammar.rules.push (['С', l.toLowerCase ()]);
});

dale.go ('!@#$%^&*_-()[]{}:., '.split (''), function (s) {
   cellsGrammar.rules.push (['С', s]);
});

cellsGrammar.rules = cellsGrammar.rules.concat ([
   // К: coordinate ($?[A-Z]$?[1-9][0-0])
   ['К', 'БЧ'],
   ['К', '$БЧ'],
   ['К', 'Б$Ч'],
   ['К', '$Б$Ч'],
   // Р: range (К:К)
   ['Р', 'К:К'],
   // Ч: right-side number sequence ([0-9]+)
   ['Ч', 'З'],
   ['Ч', 'ЗЧ'],
   // Л: left-side number sequence ([1-9][0-9]+)
   ['Л', 'Ц'],
   ['Л', 'ЦЧ'],
   // В: numeric expression
   ['В', 'Л'],
   ['В', '-Л'],
   ['В', 'Л.Ч'],
   ['В', '-Л.Ч'],
   // Т: text
   ['Т', 'С'],
   ['Т', 'СТ'],
   // Х: optional whitespace
   ['Х', ''],
   ['Х', ' '],
   ['Х', ' Х'],
   // Ф: formula: =coordinate, =number, =function application
   ['Ф', '=К'],
   ['Ф', '=В'],
   ['Ф', '=Э'],
   // Э: function application
   ['Э', 'ИХ(ХПХ)Х'],
   // П: parameter list
   ['П', 'п'],
   ['П', 'пХ,ХПХ'],
   // п: parameter: number, coordinate, range, function application
   ['п', 'В'],
   ['п', 'К'],
   ['п', 'Р'],
   ['п', 'Э'],
   // Я: cell: text, number, formula
   ['Я', 'Т'],
   ['Я', 'В'],
   ['Я', 'Ф'],
]);

// И: function name
dale.go (['add', 'sub', 'mul', 'div', 'mod'], function (functionName) {
   return cellsGrammar.rules.push (['И', functionName]);
});

// list of references per cell: ['A1', 'A2']. These are *direct references* only! And if they are already in the references object, they are valid.
var resolveReferences = function (cell, references) {
   var output = [];

   var recurseReferences = function (cell, firstCall) {
      if (output.indexOf (cell) > -1) return;
      if (! firstCall) output.push (cell);
      dale.go (references [cell], function (cell) {
         recurseReferences (cell);
      });
   }

   recurseReferences (cell, true);
   return output.sort ();
}


var flatten = function (tree) {
   var output = '';
   dale.go (tree, function (v) {
      if (teishi.simple (v)) return output += v;
      output += flatten (v);
   });
   return output;
}

var parseCell = function (input) {
   return earleyParser (input, cellsGrammar, {skipNonterminals: true, collapseBranches: true}).tree;
}

var concatenate = function (fun, input) {
   var output = '';
   dale.go (input, function (v) {
      v = fun (v);
      output += type (v) === 'string' ? v : v.value;
   });
   return output;
}

var mapColumns = function (input) {
   if (type (input) === 'string') return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf (input);
   return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' [input];
}

/*
   `evaluate` takes a tree from a parsed input. The following can occur:
   - If it's an invalid value, it returns an error.
   - If it's text or number (or a formula that just contains a number), it returns it.
   - If it's a coordinate, it resolves it or returns an error if there's a circular reference.
   - If it's a function application it returns its value (resolving any references) or returns an error if there's a circular reference.

   Something we haven't implemented but would be interesting to do: copy/paste with shifting of references. The basic idea would be to pass an offset to the function, so that it returns instead a shifted formula, rather than a value.
*/

var evaluate = function (tree, cell, references, rows, returnCoordinate) {
   if (tree === undefined) return {error: 'Invalid input'};
   // Character or digit
   if (tree [0] === 'С' || tree [0] === 'Б' || tree [0] === 'З' || tree [0] === 'Ц') return {value: tree [1]};
   // Left/right side of numeric sequence
   if (tree [0] === 'Л' || tree [0] === 'Ч') return {value: concatenate (evaluate, tree.slice (1))};
   // Text
   if (tree [0] === 'Т') return {value: concatenate (evaluate, tree.slice (1))};
   // Numeric expression
   if (tree [0] === 'В') return {value: parseFloat (concatenate (function (part) {
      if (part === '-' || part === '.') return part;
      return evaluate (part);
   }, tree.slice (1)))};
   // Coordinate
   if (tree [0] === 'К' || tree [0] === 'COORDINATE') {
      var coordinate = tree [0] === 'COORDINATE' ? tree [1] : concatenate (function (part) {
         if (part === '$') return '';
         return evaluate (part);
      }, tree.slice (1));
      if (returnCoordinate) return coordinate;
      var referenceList = resolveReferences (coordinate, references);
      if (cell === coordinate || referenceList.indexOf (cell) > -1) return {error: 'Circular reference'};
      try {
         var value = rows [parseInt (coordinate.slice (1)) - 1] [coordinate [0].toUpperCase ()].value;
      }
      catch (error) {
         var value = undefined;
      }
      return {value: value, refs: [coordinate]};
   }
   // Range
   if (tree [0] === 'Р') {
      var coordA = evaluate (tree [1], cell, references, rows, true);
      var coordB = evaluate (tree [3], cell, references, rows, true);
      var cols = [coordA [0], coordB [0]];
      var Rows = [parseInt (coordA.slice (1)), parseInt (coordB.slice (1))];
      if (Rows [0] > Rows [1]) return {error: 'Invalid range'};
      if (mapColumns (cols [0]) > mapColumns (cols [1])) return {error: 'Invalid range'};
      var error, refs = [];
      var values = dale.go (dale.times (1 + Rows [1] - Rows [0], Rows [0]), function (row) {
         return dale.go (dale.times (1 + mapColumns (cols [1]) - mapColumns (cols [0]), mapColumns (cols [0])), function (colIndex) {
            refs.push (mapColumns (colIndex) + row);
            var result = evaluate (['COORDINATE', mapColumns (colIndex) + row], cell, references, rows);
            if (result.error) return error = result.error;
            return result.value;
         });
      });
      return error ? {error: error} : {values: values, refs: refs};
   }

   // Cell
   if (tree [0] === 'Я') return evaluate (tree [1], cell, references, rows);
   // Formula
   if (tree [0] === 'Ф') return evaluate (tree [2], cell, references, rows);
   // Function name
   if (tree [0] === 'И') return tree.slice (1).join ('');

   // Filters out elements and flattens a list of parameters
   var processParameterList = function (list, args) {
      args = args || [];
      dale.go (list, function (item) {
         // We ignore whitespace, parentheses and commas
         if (item === 'Х' || item === '(' || item === ')' || item === ',' || item [0] === 'Х') return;
         if (item [0] === 'П') return processParameterList (item.slice (1), args);
         if (item [0] === 'п') return processParameterList (item.slice (1), args);
         // We are left with function names or function arguments. We push them to the argument list.
         args.push (item);
      });
      return args;
   }

   // Function application
   if (tree [0] === 'Э') {
      var error, args = [], refs = [];
      dale.stopNot (processParameterList (tree.slice (1)), undefined, function (v) {
         var result = evaluate (v, cell, references, rows);
         if (result.error) return error = result.error;

         if (result.refs) refs = refs.concat (result.refs);
         if (result.value) args.push (result.value);
         else dale.go (result.values, function (row) {
            dale.go (row, function (value) {
               args.push (value);
            });
         });
      });
      if (error) return {error: error};
      var functionName = evaluate (tree [1]);
      if (functionName === 'add' || functionName === 'mul') {
         // Because the grammar requires argument lists to have at least a single argument, we don't have to check whether args.length is greater than 0
         result = 0;
         dale.go (args, function (arg) {
            if (functionName === 'add') result += arg ? arg : 0;
            if (functionName === 'mul') result *= arg ? arg : 0
         });
      }
      if (functionName === 'sub') {
         if (args.length !== 2) return {error: 'Takes exactly 2 arguments'};
         result = (args [0] || 0) - (args [1] || 0);
      }
      if (functionName === 'div') {
         if (args.length !== 2) return {error: 'Takes exactly 2 arguments'};
         result = (args [0] || 0) / (args [1] || 0);
      }
      if (functionName === 'mod') {
         if (args.length !== 2) return {error: 'Takes exactly 2 arguments'};
         result = (args [0] || 0) % (args [1] || 0);
      }
      return refs.length ? {value: result, refs: refs.sort ()} : {value: result};
   }
}

dale.go ([
   ['=',                  {error: 'Invalid input'}],
   ['=e',                 {error: 'Invalid input'}],
   ['=BB3',               {error: 'Invalid input'}],
   ['s',                  {value: 's'}],
   ['some text',          {value: 'some text'}],
   ['1',                  {value: 1}],
   ['1.2',                {value: 1.2}],
   ['-1.23',              {value: -1.23}],
   ['=-34.5',             {value: -34.5}],
   ['=A1',                {value: 7, refs: ['A1']},      'A2', {},                       [{A: {value: 7}}]],
   ['=$A1',               {value: 8, refs: ['A1']},      'A2', {},                       [{A: {value: 8}}]],
   ['=$A$1',              {value: 9, refs: ['A1']},      'A2', {},                       [{A: {value: 9}}]],
   // Direct circular reference
   ['=A1',                {error: 'Circular reference'}, 'A1', {},                       []],
   // Indirect circular reference (one degree)
   ['=A1',                {error: 'Circular reference'}, 'A2', {A1: ['A2']},             []],
   // Indirect circular reference (two degrees)
   ['=A1',                {error: 'Circular reference'}, 'A2', {A1: ['A3'], A3: ['A2']}, []],
   // Function applications
   ['=add(1)',            {value: 1}],
   ['=add (1)',           {value: 1}],
   ['=add  ( 1 )',        {value: 1}],
   ['=add (1.2)',         {value: 1.2}],
   ['=add (-1.2)',        {value: -1.2}],
   ['=add (-1.2, 2.4)',   {value: 1.2}],
   ['=add (A1)',          {value: 7, refs: ['A1']},      'A2', {},                       [{A: {value: 7}}]],
   ['=add ($A1)',         {value: 7, refs: ['A1']},      'A2', {},                       [{A: {value: 7}}]],
   ['=add (A$1)',         {value: 7, refs: ['A1']},      'A2', {},                       [{A: {value: 7}}]],
   ['=add (A1, 2)',       {value: 9, refs: ['A1']},      'A2', {},                       [{A: {value: 7}}]],
   ['=add (A3, 2)',       {value: 2, refs: ['A3']},      'A2', {},                       [{A: {value: 7}}]],
   ['=add (2, A1)',       {value: 9, refs: ['A1']},      'A2', {},                       [{A: {value: 7}}]],
   ['=add (C3:D1)',       {error: 'Invalid range'}],
   ['=add (D1:C3)',       {error: 'Invalid range'}],
   ['=add (C1:D3)',       {error: 'Circular reference'}, 'A2', {D3: ['A2']},             []],
   ['=add (C1:D3)',       {value: 7, refs: ['C1', 'C2', 'C3', 'D1', 'D2', 'D3']}, 'A2', {}, [{C: {value: 1}, D: {value: 2}}, {C: {value: ''}, D: {value: 2}}, {C: {}, D: {value: 2}}]],
   // Nested function applications
   ['=add (add (1))',     {value: 1}],
   ['=add (A1, add (1))', {value: 8, refs: ['A1']},       'A2', {},                       [{A: {value: 7}}]],
   // Circular references as function arguments
   ['=add (2, A2)',       {error: 'Circular reference'}, 'A2', {},                       []],
   ['=add (A1)',          {error: 'Circular reference'}, 'A2', {A1: ['A3'], A3: ['A2']}, []],
   // Other functions
   ['=sub (2)',           {error: 'Takes exactly 2 arguments'}],
   ['=div (2)',           {error: 'Takes exactly 2 arguments'}],
   ['=mod (2)',           {error: 'Takes exactly 2 arguments'}],
   ['=sub (2, 4)',        {value: -2}],
   ['=div (2, 4)',        {value: 0.5}],
   ['=mod (4, 3)',        {value: 1}],
], function (input) {
   var tree = earleyParser (input [0], cellsGrammar, {collapseBranches: true}).tree;
   var result = evaluate (tree, input [2], input [3], input [4]);
   if (! teishi.eq (result, input [1])) return console.log ('Mismatch!', input [0], 'generated', result, 'but expected', input [1]);
});

views.cells = function () {
   return ['div', [
      // The style and markup was borrowed from Robin Rendle's amazing JS-less implementation of a scrollable spreadsheet-like table
      // https://css-tricks.com/idea-simple-responsive-spreadsheet/
      ['style', [
         ['div.sheet-wrapper', {'max-height': 700, 'max-width': 900, overflow: 'scroll'}, [
            ['table.sheet', {position: 'relative', border: '1px solid #ddd', 'border-collapse': 'collapse'}],
            ['th, td', {'white-space': 'nowrap', border: '1px solid #ddd', 'text-align': 'center', height: 60}],
            ['th', {
               'background-color': '#eee',
               position: 'sticky',
               top: -1,
               'z-index': '2',
            }],
            ['th:first-of-type', {left: 0, 'z-index': '3'}],
            ['tbody tr td:first-of-type', {
               'padding-left, padding-right': 20,
               'background-color': '#eee',
               position: 'sticky',
               left: -1,
               'text-align': 'left'
            }],
            ['td.cell', {'min-width': 120}],
            ['td.selected', {border: 'solid 2px black'}],
            ['td.editing', {padding: 0, border: 'none important!'}],
            ['td.editing input', {
               height: 60,
               width: 1,
               padding: 10,
               margin: 0,
               'box-sizing, -moz-box-sizing, -webkit-box-sizing': 'border-box'
            }],
         ]],
      ]],
      ['h2', ['Cells (Work in progress!)']],
      B.view ([['cells', 'rows'], ['cells', 'editing'], ['cells', 'selected']], function (rows, editing, selected) {
         return ['div', {'class': 'sheet-wrapper'}, ['table', {'class': 'sheet'}, [
            ['tr', {'class': 'header'}, dale.go (' ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split (''), function (column) {
               return ['th', column];
            })],
            dale.go (rows, function (row, k) {
               return ['tr', [
                  ['td', k + 1],
                  dale.go (row, function (cell, column) {
                     var edit   = teishi.eq (cell.coordinates, editing);
                     var select = teishi.eq (cell.coordinates, selected);
                     return ['td', {
                        'class': 'cell' + (edit ? ' editing' : '') + (select ? ' selected' : ''),
                        onclick: B.ev ('set', ['cells', 'selected'], cell.coordinates),
                        ondblclick: B.ev ('start', 'edit', cell.coordinates),
                     }, ! edit ? cell.value : ['input', {
                        value: cell.formula,
                        oninput: B.ev ('set', ['cells', 'editBuffer']),
                        onblur: B.ev ('save', 'edit')
                     }, cell.value]];
                  })
               ]];
            })
         ]]];
      })
   ]];
}

window.addEventListener ('keydown', function (ev) {
   B.call ('keydown', 'cells', ev.keyCode);
});

B.mrespond ([
   ['initialize', 'cells', function (x) {
      B.set (['cells', 'rows'], dale.go (dale.times (100), function (row) {
         return dale.obj ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split (''), function (column) {
            return [column, {coordinates: [row, column], formula: '', value: ''}];
         });
      }));
      B.call (x, 'change', ['cells', 'rows']);
   }],
   ['keydown', 'cells', function (x, keyCode) {
      var editing = B.get ('cells', 'editing'), selected = B.get ('cells', 'selected');
      if (! editing && ! selected) return;
      // ESC
      if (keyCode === 27) return B.call (x, 'cancel', 'edit');
      // Enter
      if (keyCode === 13) {
         if (editing) return B.call (x, 'save', 'edit');
         else         return B.call (x, 'start', 'edit', selected);
      }
      // Arrow keys
      if (! editing && keyCode >= 37 && keyCode <= 40) {
         if (keyCode === 37) B.call (x, 'set', ['cells', 'selected', 1], mapColumns (Math.max (0,  mapColumns (selected [1]) - 1)));
         if (keyCode === 39) B.call (x, 'set', ['cells', 'selected', 1], mapColumns (Math.min (25, mapColumns (selected [1]) + 1)));
         if (keyCode === 38) B.call (x, 'set', ['cells', 'selected', 0], Math.max (1,  selected [0] - 1));
         if (keyCode === 40) B.call (x, 'set', ['cells', 'selected', 0], Math.min (26, selected [0] + 1));
      }
   }],
   ['change', ['cells', 'editing'], {priority: -10000}, function (x) {
      var editing = B.get ('cells', 'editing');
      if (! editing) return;
      var input = c ('td.editing input') [0];
      // Put cursor at the end of the input
      input.setSelectionRange (input.value.length, input.value.length);
      input.focus ();
   }],
   ['start', 'edit', function (x, selected) {
      var cell = B.get ('cells', 'rows', selected [0] - 1, selected [1]);
      B.call (x, 'set', ['cells', 'editBuffer'], cell.value);
      B.call (x, 'set', ['cells', 'editing'], cell.coordinates);
   }],
   ['save', 'edit', function (x) {
      var editing = B.get ('cells', 'editing');
      // It might be the case that the `save edit` event is fired multiple times (one because of an ENTER keydown, another one from the `onblur` handler), so we check whether there is still a selection
      if (! editing) return;
      var value = B.get ('cells', 'editBuffer');
      var result = earleyParser (value, cellsGrammar, {skipNonterminals: true, collapseBranches: true});

      B.call (x, 'set', ['cells', 'rows', editing [0] - 1, editing [1], 'formula'], value);
      // TODO: add resolveReferences arguments
      // TODO: set/update cells that reference this cell
      B.call (x, 'set', ['cells', 'rows', editing [0] - 1, editing [1], 'value'],   evaluate (value, resolveReferences ('A1', {})));
      B.call (x, 'cancel', 'edit');
   }],
   ['cancel', 'edit', function (x) {
      B.call (x, 'rem', 'cells', 'editing');
      B.call (x, 'rem', 'cells', 'editBuffer');
   }],
]);

B.call ('initialize', 'cells');

B.mount ('body', views.cells);
