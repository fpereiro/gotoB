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
      // We slice circles to copy it, so we can sort it without affecting the original.
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

/*
- left click in empty area creates unfilled circle with fixed size and center in the click
- circle with center closest to the mouse and that has a radius larger than that distance will be grayed
- right click makes a popup appear to adjust diameter of circle at X Y, slider adjusts immediately
- closing popup frame is a change on undo/redo
- undo either removes circle or a change of size
- redo is the opposite
- if a change is made with some redos, redos are eliminated
*/

B.mount ('body', views.drawer);

// *** CELLS ***

views.cells = function () {
   return ['div', [
      ['style', [
      ]],
      ['h2', ['Cells (under construction)']],
   ]];
}

B.mount ('body', views.cells);
