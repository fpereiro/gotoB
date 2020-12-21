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
