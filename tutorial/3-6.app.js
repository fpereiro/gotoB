var todoList = ['Write tutorial', 'Play civ2', 'Improve <button> look in todo app'];

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
}

var removeTodo = function (task) {
   todoList.splice (todoList.indexOf (task), 1);
   placeTodos ();
}

placeTodos ();
