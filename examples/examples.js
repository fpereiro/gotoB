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
      counter = counter || 0;
      return ['div', [
         ['h2', 'Counter'],
         ['h3', ['Counter is: ', counter]],
         ['button', {
            onclick: B.ev ('set', 'counter', counter + 1)
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
            return ['li', ['', todo, ['span', {'class': 'action', onclick: B.ev ('rem', 'todos', index)}, 'Remove']]];
         })];
      }),
      ['button', {onclick: B.ev ('create', 'todo')}, 'Create todo']
   ];
}

B.mount ('body', todoList);

// *** DATA EVENTS ***

B.call ('set', 'username', 'mono');
if (! teishi.eq (B.store, {username: 'mono'})) alert ('Data event error #1.');

B.call ('set', ['State', 'page'], 'main');
if (! teishi.eq (B.store, {username: 'mono', State: {page: 'main'}})) alert ('Data event error #2.');

B.call ('rem', [], 'username');
if (! teishi.eq (B.store, {State: {page: 'main'}})) alert ('Data event error #3.');

B.call ('rem', 'State', 'page');
if (! teishi.eq (B.store, {State: {}})) alert ('Data event error #4.');

B.call ('set', ['Data', 'items'], ['foo', 'bar']);
if (! teishi.eq (B.store, {State: {}, Data: {items: ['foo', 'bar']}})) alert ('Data event error #5.');

B.call ('add', ['Data', 'items'], 'boo');
if (! teishi.eq (B.store, {State: {}, Data: {items: ['foo', 'bar', 'boo']}})) alert ('Data event error #6.');

B.call ('rem', ['Data', 'items'], 0);
if (! teishi.eq (B.store, {State: {}, Data: {items: ['bar', 'boo']}})) alert ('Data event error #7.');

B.call ('set', [], {});
if (! teishi.eq (B.store, {})) alert ('Data event error #8.');

// *** COUNTER 2 ***

var counter = function () {
   return B.view ('counter', function (counter) {
      counter = counter || 0;
      return ['h2', 'The counter is ' + counter];
   });
}

B.mount ('body', counter);
B.call ('set', 'counter', 1);
B.call ('set', 'counter', 2);

// *** COUNTER 3 ***

var counter = function () {
   return B.view ('counter', function (counter) {
      counter = counter || 0;
      return ['div', [
         ['h2', 'The counter is ' + counter],
         ['button', {
            onclick: "B.call ('set', 'counter', " + (counter + 1) + ")"
         }, 'Increment counter']
      ]];
   });
}

B.mount ('body', counter);

// *** COUNTER 4 ***

var counter = function () {
   return B.view ('counter', function (counter) {
      counter = counter || 0;
      return ['div', [
         ['h2', 'The counter is ' + counter],
         ['button', {
            onclick: B.ev ('set', 'counter', counter + 1)
         }, 'Increment counter']
      ]];
   });
}

B.mount ('body', counter);

// *** B.MOUNT/UNMOUNT INTO A SPECIFIED ELEMENT ***

document.body.innerHTML += '<div id="container"></div>';

B.mount ('#container', function () {
   return ['p', 'Hello'];
});

B.unmount ('#container');

// *** DATA EVENTS 2 ***


B.call ('set', [], {});
B.call ('set', 'title', 'Hello!');
if (! teishi.eq (B.store, {title: 'Hello!'})) alert ('Data event error #9.');
B.call ('set', [], {});

B.call ('set', ['user', 'username'], 'mono');
if (! teishi.eq (B.store, {user: {username: 'mono'}})) alert ('Data event error #10.');
B.call ('set', [], {});

B.call ('set', ['users', 0], 'mono');
if (! teishi.eq (B.store, {users: ['mono']})) alert ('Data event error #11.');
B.call ('set', [], {});

B.call ('set', 'foo', 'bar');
if (! teishi.eq (B.store, {foo: 'bar'})) alert ('Data event error #12.');
B.call ('set', [], {});

B.call ('set', [], []);
if (! teishi.eq (B.store, [])) alert ('Data event error #13.');

B.responders.error.disabled = true;
B.call ('set', [], 'hello');
B.responders.error.disabled = false;

if (! teishi.eq (B.store, [])) alert ('Data event error #14.');

B.call ('set', [], {});
if (! teishi.eq (B.store, {})) alert ('Data event error #15.');

B.call ('set', ['Data', 'items'], [0, 1, 2]);
if (! teishi.eq (B.store, {Data: {items: [0, 1, 2]}})) alert ('Data event error #16.');

B.call ('set', ['Data', 'key'], 'val');
if (! teishi.eq (B.store, {Data: {items: [0, 1, 2], key: 'val'}})) alert ('Data event error #17.');

B.call ('set', ['Data', 0], 1);
if (! teishi.eq (B.store, {Data: [1]})) alert ('Data event error #18.');
B.call ('set', [], {});

B.call ('set', ['Data', 'items'], []);
if (! teishi.eq (B.store, {Data: {items: []}})) alert ('Data event error #19.');

B.call ('add', ['Data', 'items'], 0, 1, 2);
if (! teishi.eq (B.store, {Data: {items: [0, 1, 2]}})) alert ('Data event error #20.');

B.call ('add', ['Data', 'items']);
if (! teishi.eq (B.store, {Data: {items: [0, 1, 2]}})) alert ('Data event error #21.');
B.call ('set', [], {});

B.call ('add', ['Data', 'items'], 0, 1, 2);
if (! teishi.eq (B.store, {Data: {items: [0, 1, 2]}})) alert ('Data event error #22.');
B.call ('set', [], {});

B.call ('add', ['Data', 'items']);
if (! teishi.eq (B.store, {Data: {items: []}})) alert ('Data event error #23.');

B.call ('set', [], {});
B.call ('add', ['Data', 'items'], 'a', 'b', 'c');
if (! teishi.eq (B.store, {Data: {items: ['a', 'b', 'c']}})) alert ('Data event error #24.');

B.call ('rem', ['Data', 'items'], 1);
if (! teishi.eq (B.store, {Data: {items: ['a', 'c']}})) alert ('Data event error #25.');

B.call ('rem', 'Data', 'items');
if (! teishi.eq (B.store, {Data: {}})) alert ('Data event error #26.');

B.call ('rem', [], 'Data');
if (! teishi.eq (B.store, {})) alert ('Data event error #27.');

B.call ('add', ['Data', 'items'], 'a', 'b', 'c');

B.responders.error.disabled = true;
B.call ('rem', ['Data', 'items'], 'a');
B.responders.error.disabled = false;

if (! teishi.eq (B.store, {Data: {items: ['a', 'b', 'c']}})) alert ('Data event error #28.');

B.responders.error.disabled = true;
B.call ('rem', 'Data', 0);
B.responders.error.disabled = false;

if (! teishi.eq (B.store, {Data: {items: ['a', 'b', 'c']}})) alert ('Data event error #29.');

B.responders.error.disabled = true;
B.call ('rem', ['Data', 'items', 0], 'foo');
B.responders.error.disabled = false;

if (! teishi.eq (B.store, {Data: {items: ['a', 'b', 'c']}})) alert ('Data event error #30.');

B.call ('rem', ['Data', 'foo'], 'bar');
if (! teishi.eq (B.store, {Data: {items: ['a', 'b', 'c']}})) alert ('Data event error #31.');

B.call ('rem', ['Data', 'items']);
if (! teishi.eq (B.store, {Data: {items: ['a', 'b', 'c']}})) alert ('Data event error #32.');

B.call ('set', ['Data', 'items'], {a: 1});
B.call ('rem', ['Data', 'items'], 'a');
if (! teishi.eq (B.store, {Data: {items: {}}})) alert ('Data event error #33.');

B.call ('set', ['Data', 'items'], {a: 1});
B.call ('rem', ['Data', 'items'], ['a']);
if (! teishi.eq (B.store, {Data: {items: {}}})) alert ('Data event error #34.');
B.call ('set', [], {});

B.call ('set', [], {Data: {}, State: {}});
B.call ('rem', [], 'Data', 'State');
if (! teishi.eq (B.store, {})) alert ('Data event error #35.');

B.call ('set', [], {Data: {}, State: {}});
B.call ('rem', [], ['Data', 'State']);
if (! teishi.eq (B.store, {})) alert ('Data event error #36.');

// *** B.EV ***

var button = function () {
   return ['button', {
      onclick: B.ev ('do', 'it')
   }, 'Do it!'];
}

B.mount ('body', button);

var buttons = function () {
   return ['div', [
      ['button', {onclick: B.ev ('submit', 'data')}],
      ['button', {onclick: B.ev ('submit', 'data', {update: true})}],
      ['button', {onclick: B.ev ('submit', 'data', null, NaN, Infinity, undefined, /a regular expression/)}],
      ['button', {onclick: B.ev (['submit', 'data'], ['clear', 'data'])}],
      ['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value'})}],
      ['button', {onclick: B.ev ('submit', 'data', {raw: 'event'})}],
      ['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value'}, {raw: 'event'})}],
      ['button', {onclick: B.ev ('submit', 'data', {raw: 0})}],
      ['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value', ignored: 'key'})}],
      ['button', {onclick: B.ev (['submit', 'data'], ['do', ['something', 'else']])}]
   ]];
}

B.mount ('body', buttons);

B.respond ('submit', 'data', teishi.clog);

// *** B.VIEW ***

var dashboard = function () {
   return B.view ([['stockPrice'], ['username']], function (stockPrice, username) {
      return ['div', [
         ['h3', ['Hi ', username]],
         ['h4', ['The current stock price is: ', stockPrice, 'EUR']]
      ]];
   });
}

B.mount ('body', dashboard);

B.call ('set', 'username', 'Oom Dagobert');

B.call ('set', 'stockPrice', 140);

var validVfun1 = function () {
   return ['h1', 'Hello'];
}

var validVfun2 = function () {
   return ['div', [
      ['h2'],
      ['h3']
   ]];
}

// This view is invalid because it returns a lithbag.
var invalidVfun1 = function () {
   return [
      ['h2'],
      ['h3']
   ];
}

// The view is invalid because it returns `undefined`.
var invalidVfun2 = function () {
   return;
}

// Instead, do this
var counter = function () {
   return B.view ('counter', function (counter) {
      counter = counter || 0;
      return ['h1', 'Counter is ' + counter];
   });
}

// Then, you can use it like this
B.mount ('body', counter);

// Or instead, you can use it like this
var app = function () {
   return [
      ['h1', 'App'],
      counter ()
   ];
}

B.mount ('body', app);

var counter = function () {
   return B.view ('counter', function (counter) {
      counter = counter || 0;
      return ['h1', 'Counter is ' + counter];
   });
}

var app = function () {
   return ['div', [
      counter (),
      counter ()
   ]];
}

B.mount ('body', app);

var app = function () {
   return B.view ('username', function (username) {
      return ['div', [
         ['h1', username],
         B.view ('counter', function (counter) {
            counter = counter || 0;
            return ['h2', ['Counter is ', counter]];
         })
      ]];
   })
}

B.mount ('body', app);

var app = function () {
   return B.view (['Data', 'counter'], function (counter) {
      counter = counter || 0;
      return ['h1'];
      // This will generate an error. Don't pass ids to the outermost element of a reactive view.
      return ['h1', {id: 'my-counter'}];
   });
}

B.mount ('body', app);

var app = function () {
   return B.view (['Data', 'counter'], function (counter) {
      // Don't invoke B.call from inside a vfun, unless you have a great reason to!
      B.call ('side', ['effects', 'rule']);
      return ['h1', counter];
   });
}

B.mount ('body', app);

// *** RESPONDERS ***

B.respond ('create', 'todo', function (x, important) {
   var todo = prompt ('What\'s one to do?');
   if (todo) B.call (x, 'add', 'todos', todo);
   if (important) alert ('Important todo added.');
});

B.respond ('foo', 'bar', function (x) {
   B.call (x, 'do', 'something');
});

// B.store is {}

try {
   // This will throw an error!
   var username = B.store.user.username;
}
catch (error) {
   // This will be either `undefined` or bring you the `username` if it's already defined.
   var username = B.get ('user', 'username');
}

B.call ('set', [], {user: {username: 'foo', type: 'admin'}});
// B.store is {user: {username: 'foo', type: 'admin'}}

var user = B.get ('user');

// If you do this, you'll modify B.user.username!
user.seen = true;

// Better to do this
var user = teishi.copy (B.get ('user'));
user.seen = true;

B.mrespond ([
   ['verb1', 'path1', function (x) {}],
   ['verb2', ['another', 'path'], function (x) {}]
]);

B.respond (/^get|post$/, 'bar', function (x) {});

B.respond (/^get|post$/, '*', function (x) {});

B.respond (/^get|post$/, [], {match: function (ev, responder) {
   if (ev.verb === 'get' || ev.verb === 'post') return true;
}}, function (x) {});

// *** THE CHANGE EVENT ***

// TODO: add remaining examples





var opaque = function () {
   return B.view ([], function (store) {
      return ['pre', {opaque: true}, JSON.stringify (store)];
   });
}

B.mount ('body', opaque);

var validOpaque = function () {
   return B.view ('foo', function (foo) {
      return ['div', {opaque: true}, ['LITERAL', '<a>Hello</a>']];
   });
}

B.mount ('body', validOpaque);

var svg = function () {
   return B.view ('foo', function (foo) {
      return ['div', {opaque: true}, ['LITERAL', '<svg><circle cx="60" cy="60" r="50"/></svg>']];
   });
}

B.mount ('body', svg);

var text = function () {
   return B.view ('foo', function (foo) {
      return ['p', ['Hello', ['LITERAL', '&nbsp;'], 'Handsome']];
   });
}

B.mount ('body', text);

var userdata = "['script', {src: 'https://evil.me/script.js'}]";

B.mount ('body', function () {
   // not pwned
   return ['div', userdata];
});

