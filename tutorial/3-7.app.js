var todoList = [];

var makeTodo = function (task) {
   var onclickHandler = 'removeTodo (' + JSON.stringify (task) + ')';

   return lith.g ([
      ['p', task],
      ['button', {onclick: onclickHandler}, 'Mark as complete']
   ]);
}

var placeTodos = function () {
   var allTodos = '';

   todoList.map (function (task) {
      allTodos = allTodos + makeTodo (task);
   });

   document.getElementById ('todos').innerHTML = allTodos;
}

var addTodo = function () {
   var todo = prompt ('What do you want to do?');
   todoList.push (todo);
   placeTodos ();
   saveTodos ();
}

var removeTodo = function (task) {
   todoList.splice (todoList.indexOf (task), 1);
   placeTodos ();
   saveTodos ();
}

var loadTodos = function () {
   var loadedTodos = localStorage.getItem ('todos');
   if (loadedTodos) todoList = JSON.parse (loadedTodos);
}

var saveTodos = function () {
   localStorage.setItem ('todos', JSON.stringify (todoList));
}

loadTodos ();
placeTodos ();
