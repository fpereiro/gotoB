var todoList = ['Write tutorial', 'Play civ2', 'Improve <button> look in todo app'];

var makeTodo = function (task) {
   return lith.g ([
      ['p', task],
      ['button', 'Mark as complete']
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

placeTodos ();
