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

B.respond ('change', ['flight', /departure|return/, 'input'], function (x, value) {
   var date = value.split ('.');
   date = new Date (date [2] + '-' + date [1] + '-' + date [0]).getTime ();
   if (isNaN (date)) return B.call (x, 'rem', ['flight', x.path [1]], 'date');
   B.call (x, 'set', ['flight', x.path [1], 'date'], date);
});

B.respond ('flight', 'book', function (x) {
   var message = 'You have booked a ' + (B.get ('flight', 'type') || 'one-way') + ' flight on ' + B.get ('flight', 'departure', 'input');
   if (B.get ('flight', 'type') === 'return') message += ' returning on ' + B.get ('flight', 'return', 'input');
   alert (message);
});

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

B.respond ('update', 'timer', function (x, value) {
   B.call (x, 'set', ['timer', 'total'], value);
});

B.respond ('timer', 'tick', function (x) {
   var time = B.get ('timer', 'elapsed') || 0;
   if (time > B.get ('timer', 'total')) return;
   B.call (x, 'set', ['timer', 'elapsed'], (Math.round (time * 10) + 1) / 10);
});

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
      ]],
      ['h2', ['Circle drawer (under construction)']],
      ['div', [
         ['button', 'Undo'],
         ['button', 'Redo'],
      ]],
      B.view (['drawer', 'circles'], function (circles) {
         return ['div', ['LITERAL', '<svg width="300" height="200">' + dale.go (circles, function (circle) {
            return '<circle cx="' + circle.x + '" cy="' + circle.y + '" r="' + circle.r + '" stroke="black" stroke-width="1" fill="gray" />';
         }).join ('\n')]];
      }),
      ['input', {
         type: 'range',
         min: 0,
         max: 60,
         value: 20,
         oninput: B.ev ('set', ['drawer', 'circles', 0, 'r'], {raw: 'this.value'})
      }]
   ]];
}

// 'drawer', 'circles'
// 'drawer', 'history'

B.respond ('circle', 'create', function (x, xcoord, ycoord, size) {
   B.call (x, 'add', ['drawer', 'circles'], context);
});

B.mount ('body', views.drawer);

B.call ('add', ['drawer', 'circles'], {x: 50, y: 50, r: 20});
B.call ('add', ['drawer', 'circles'], {x: 20, y: 20, r: 3});

// *** CELLS ***

views.cells = function () {
   return ['div', [
      ['style', [
      ]],
      ['h2', ['Cells (under construction)']],
   ]];
}

B.mount ('body', views.cells);
