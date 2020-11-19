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
      ['h2', 'Flight booker'],

      ['select', [
         ['option', {value: 'oneway'}, 'one-way flight'],
         ['option', {value: 'return'}, 'return flight'],
      ]],
      ['br'],
      ['input'],
      ['br'],
      ['input'],
      ['br'],
      ['button', 'Book']
   ]];
}

B.mount ('body', views.booker);
