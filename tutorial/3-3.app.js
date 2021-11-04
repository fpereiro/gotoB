var todoList = ['Write tutorial', 'Play civ2'];

var makeTodo = function (task) {
   return '<p>' + task + '</p><button>Mark as complete</button>';
}

var allTodos = '';

todoList.map (function (task) {
   allTodos = allTodos + makeTodo (task);
});

document.getElementById ('todos').innerHTML = allTodos;
