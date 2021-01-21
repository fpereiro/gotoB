var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c, B = window.B;

var type = teishi.type;

var views = {};

// *** HELLO WORLD ***

var helloWorld = function () {
   return ['h1', 'Hello, world!'];
}

B.mount ('body', helloWorld);

// *** COUNTER ***

var counter = function () {
   return B.view ('counter', function (counter) {
      return ['div', [
         ['h2', 'Counter'],
         ['h3', ['Counter is: ', counter || 0]],
         ['button', {
            onclick: B.ev ('set', 'counter', (counter || 0) + 1)
         }, 'Increment counter']
      ]];
   });
}

B.mount ('body', counter);

// *** TODO LIST ***

B.respond ('create', 'todo', function (x) {
   var todo = prompt ('What\'s one to do?');
   if (todo) B.call (x, 'add', 'todos', todo);
});

var todoList = function () {
   return [
      ['style', [
         ['span.action', {color: 'blue', cursor: 'pointer', 'margin-left': 10}],
      ]],
      ['h2', 'Todos'],
      B.view ('todos', function (todos) {
         return ['ul', dale.go (todos, function (todo, index) {
            return ['li', [todo, ['span', {class: 'action', onclick: B.ev ('rem', 'todos', index)}, 'Remove']]];
         })];
      }),
      ['button', {onclick: B.ev ('create', 'todo')}, 'Create todo']
   ];
}

B.mount ('body', todoList);

// TODO: add remaining examples
