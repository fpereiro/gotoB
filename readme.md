# gotoв

> "The only software that I like is one that I can easily understand and solves my problems. The amount of complexity I'm willing to tolerate is proportional to the size of the problem being solved." --[Ryan Dahl](http://tinyclouds.org/rant.html)

gotoв is a framework for making the frontend of a web application (henceforth *webapp*).

## Current status of the project

The current version of gotoв, v2.3.2, is considered to be *stable* and *complete*. [Suggestions](https://github.com/fpereiro/gotoB/issues) and [patches](https://github.com/fpereiro/gotoB/pulls) are welcome. Besides bug fixes, and the completion of the tutorial in one of the appendixes, there are no changes planned.

gotoв is part of the [ustack](https://github.com/fpereiro/ustack), a set of libraries to build webapps which aims to be fully understandable by those who use it.

## Why gotoв?

gotoв is a framework optimized for understanding. Its purpose is to allow you to write webapps in a way that you can fully understand what's going on.

In my experience, understanding leads to short and beautiful code that can last for years in a production setting. It is my sincere hope that you'll be able to use gotoв to create reliable webapps and have a lot of fun while at it.

Because gotoв is optimized for understanding, if anything on this readme strikes you as unclear or confusing, please [let me know](https://github.com/fpereiro/gotoB/issues). I'll be glad to improve the explanation and make it better for you and everyone else.

## Installation

gotoв is written in Javascript. You can use it in the browser by loading the pre-built file, `gotoB.min.js`, in a `<script>` tag at the top of the `<body>`:

```html
<script src="gotoB.min.js"></script>
```

Or you can use this link to use the latest version - courtesy of [jsDelivr](https://jsdelivr.com).

```html
<script src="https://cdn.jsdelivr.net/gh/fpereiro/gotob@434aa5a532fa0f9012743e935c4cd18eb5b3b3c5/gotoB.min.js"></script>
```

gotoв uses non-ASCII symbols, so you also must specify an [encoding](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta) for your document (for example [UTF-8](https://en.wikipedia.org/wiki/UTF-8)) by placing a `<meta>` tag in the `<head>` of the document: `<meta charset="utf-8">`.

gotoв is exclusively a client-side library. Still, you can find it in npm: `npm install gotob`

Browser compatibility has been tested in the following browsers:

- Google Chrome 15 and above.
- Mozilla Firefox 3 and above.
- Safari 4 and above.
- Internet Explorer 6 and above.
- Microsoft Edge 14 and above.
- Opera 10.6 and above.
- Yandex 14.12 and above.

The author wishes to thank [Browserstack](https://browserstack.com) for providing tools to test cross-browser compatibility.

## Index

- [Examples](#examples)
- [Introduction](#introduction)
- [Frequently Asked Questions](#faq)
- [API reference](#api-reference)
- [Internals](#internals)
- [Annotated source code](#source-code)
- [License](#license)
- [Appendix: A brief history of the frontend](#a-brief-history-of-the-frontend)
- [Appendix: Lessons from the quest for IE6 compatibility](#lessons-from-the-quest-for-ie6-compatibility)
- [Appendix: Tutorial: So you want to write a frontend?](#tutorial-so-you-want-to-write-a-frontend)

## Examples

### Hello world

```javascript
var helloWorld = function () {
   return ['h1', 'Hello, world!'];
}

B.mount ('body', helloWorld);
```

### Counter

```javascript
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
```

### Todo list

```javascript
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
```

### Input

```javascript
var input = function () {
   return B.view ('input', function (input) {
      return ['div', [
         ['input', {value: input, oninput: B.ev ('set', 'input'), onchange: B.ev ('set', 'input')}],
         ['p', ['Value of input is ', ['strong', input]]]
      ]];
   });
}

B.mount ('body', input);
```

### Textarea

```javascript
var textarea = function () {
   return B.view ('textarea', function (textarea) {
      return ['div', [
         ['textarea', {value: textarea, oninput: B.ev ('set', 'textarea')}],
         ['p', ['Value of textarea is ', ['strong', textarea]]]
      ]];
   });
}

B.mount ('body', textarea);
```

### Select

```javascript
var select = function () {
   var options = ['Select one', 'Elephant Island', 'South Georgia'];
   return B.view ('select', function (select) {
      return ['div', [
         ['select', {onchange: B.ev ('set', 'select')}, dale.go (options, function (option) {
            return ['option', {value: option !== 'Select one' ? option : ''}, option];
         })]
      ]];
   });
}

B.mount ('body', select);
```

### Radio

```javascript
var radio = function () {
   var options = ['Clics', 'Peperina', 'Bicicleta'];
   return B.view ('radio', function (radio) {
      return ['div', [
         dale.go (options, function (option) {
            return [
               ['input', {type: 'radio', name: 'radio', checked: radio === option, onchange: B.ev ('set', 'radio'), value: option}],
               ['label', ' ' + option],
               ['br'],
            ];
         }),
         ['p', ['Value of radio is ', ['strong', radio]]]
      ]];
   });
}

B.mount ('body', radio);
```

### Checkboxes

```javascript
B.respond ('toggle', 'checkboxes', function (x, option) {
   var index = (B.get ('checkboxes') || []).indexOf (option);
   if (index === -1) B.call (x, 'add', 'checkboxes', option);
   else              B.call (x, 'rem', 'checkboxes', index);
});

var checkboxes = function () {
   var options = ['O\'ahu', 'Maui', 'Kauai'];
   return B.view ('checkboxes', function (checkboxes) {
      checkboxes = checkboxes || [];
      return ['div', [
         dale.go (options, function (option) {
            return [
               ['input', {type: 'checkbox', checked: teishi.inc (checkboxes, option), onclick: B.ev ('toggle', 'checkboxes', option)}],
               ['label', ' ' + option],
               ['br'],
            ];
         }),
         ['p', ['Selected islands: ', ['strong', checkboxes.sort ().join (', ')]]]
      ]];
   });
}

B.mount ('body', checkboxes);
```

### Table

```javascript
B.call ('set', 'table', [
   {id: 1, name: 'Top of line',     price: 100},
   {id: 2, name: 'Value for money', price: 65},
   {id: 3, name: 'Last resort',     price: 24}
]);

var table = function () {
   return B.view ('table', function (table) {
      table = table || [];
      return ['table', [
         ['tr', dale.go (table [0], function (v, k) {
            return ['th', k];
         })],
         dale.go (table, function (v) {
            return ['tr', dale.go (v, function (v2) {
               return ['td', v2];
            })];
         })
      ]];
   });
}

B.mount ('body', table);
```

You can find more examples [here](examples).

## Introduction

gotoв is a framework for writing the [frontend](https://en.wikipedia.org/wiki/Front_end_and_back_end) of a webapp. In the case of a webapp, the frontend consists of an user interface implemented with HTML and (almost always) some js that runs on the browser.

gotoв provides a solution to the [two main things](#a-brief-history-of-the-frontend) that a frontend framework must do:

1. Generate HTML.
2. Manage state.

Let's take the example of a [shopping cart](https://en.wikipedia.org/wiki/Shopping_cart_software). A shopping cart is an HTML page that displays a list of products that an user is interested in purchasing. The user can interact with the page to add and remove articles - and other parts of the page (for example, the total amount) will change accordingly.

To implement the shopping cart, we need to generate HTML to make it appear on the user's screen. Some parts of the shopping cart will change according to the selection of products (list of products, amounts), whlie others will remain the same (like the header or footer). It follows that the HTML must take into account both "fixed" elements and "variable" elements.

Besides generating HTML, we need also to keep track of the products and quantities the user has entered. This is the *state*. This state is essential, because without it the HTML page would be static and would not respond to user input! This state also has to be sent to the server to be processed when the purchase is finalized.

The HTML and the state are deeply interlocked. They interact in a yin-yang manner:

- The state determines how the HTML will look.
- Certain elements in the HTML (buttons, inputs) will perform changes to the state.

For example:
- When the user loads the shopping cart for the first time, the HTML shows an empty cart (state -> HTML).
- The user clicks on a button and adds a product (HTML -> state).
- Because a product was added, the HTML is changed (state -> HTML).

An interface can be understood as a *function of the state, which returns HTML*. This HTML, in turns, contains elements that can trigger further changes to the state. The hard part of implementing frontends is to fully close the circle, and make sure that when the state is updated, the HTML also changes. This is also the reason why frontend frameworks exist and are widely used.

All of the above is valid for any type of webapp. Let's explore now how gotoв solves these problems:

1. gotoв creates all the HTML in the browser using js: the presentation logic is fully separated from the server and the full power of js is available to generate HTML.
2. gotoв centralizes all the state into a js object: instead of having data spreaded out in different places (DOM elements, js variables), it centralizes all the state in a single location that can be easily queried and updated.
3. gotoв uses events to update the state *and* to update the HTML: by using events, the app can be updated efficiently without having to manually track dependencies between parts of the app.

Let's see each of these in turn:

### Generating HTML using js

gotoв uses [js object literals](https://github.com/fpereiro/lith) to generate HTML. Object literals are mere arrays (`[...]`) and objects (`{...}`) that conform to certain shapes. We call these literals `liths`. Let's see a few examples of some liths and their corresponding HTML:

- `['p', 'Hello'] -> <p>Hello</p>`
- `['div', {class: 'nice'}, 'Cool'] -> <div class="nice">Cool</div>`
- `['div', ['p', {id: 'nested'}, 'Turtles']] -> <div><p id="nested">Turtles</p></div>`

In general, a lith is an array with one to three elements. The first element is a string indicating the `tag`. There can be a second element for specifying attributes, which is an object. Finally, you can add `contents` to the lith; these contents can be a string, a number or another lith.

Besides liths, we also can write an array containing multiple liths, which is affectionally called *lithbag*. For example:

- `[['p'], ['p']] -> <p></p><p></p>`

A lithbag can also be a collection of text and number fragments. For example:

- `['i am', 'a', 1337, 'lithbag'] -> i ama1337lithbag`

You can put a lithbag as the contents to another lith:

- `['div', ['Some', ' ', 'text']] -> <div>Some text</div>`

Rather than writing standalone liths or lithbags, gotoв expects you to write **functions that return liths or lithbags**. For example, this function returns HTML for a `hello world` page:

```javascript
var helloWorld = function () {
   return ['h1', 'Hello, world!'];
}
```

If you come from other frontend frameworks, these functions are called *views*. To emphasize the fact that in gotoв views are always functions, we'll call them `vfuns` (short for *view functions*).

It is possible and even handy (but not required) to generate CSS with gotoв (see the details [here](https://github.com/fpereiro/lith#litcs)).

Using js object literals to generate HTML has two advantages:

- Because object literals are part of js, the views can live together with the rest of the code.
- Because object literals are just data, they're very easy to manipulate. You can write conditionals and loops in js that will output different object literals.

**Takeaway: use vfuns to generate HTML**.

### A single store for all the state

gotoв stores all the state of the application (rather, all the state that belongs to the frontend) into a single object. This is a plain js object. What makes it powerful is the fact that it is [the single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth) of the application. We call this object the `store`.

```
{
   // here is all the state!
}
```

The store is located at `B.store` and gotoв automatically creates it when the app is loaded. `B`, by the way, is the global variable where gotoв is available.

The following are examples of what can (and should!) be contained on the store:

- Data brought from the server.
- Name of the page that is currently being displayed.
- Data provided by the user that hasn't been submitted yet to the server.

**Takeaway: if it affects what's displayed on the screen or what is submitted to the server, it belongs in the store.**

### Using events

gotoв structures all operations [through events](https://github.com/fpereiro/recalc). All actions to be performed on the webapp can be modeled as events. This includes updating `B.store`, which is updated by gotoв's event system instead of being modified directly.

The function for **triggering** an event is `B.call`. We prefer the term *call* instead of other terms normally used with events (such as *trigger* or *fire*) because we see events as a form of communication. An event is a *call* to one or more parts of your code that might in turn *respond* to that call.

`B.call` receives as arguments a `verb`, a `path` and optional extra `arguments`.

Events are useless until another part of the program *responds* to them. Traditionally, these are called *event listeners* but we call these *responders*, since they *respond* to an event being called. To create `responders`, we will use the function `B.respond`, which we'll cover in a later section. For now, all you need to know is that `responders` are defined with a `verb` and a `path` (exactly like events) and are *matched* (triggered) by events with matching `verbs` and `paths`.

gotoв provides three built-in `responders` for modifying `B.store`: `set`, `add` and `rem`. These responders are already created and allow you to modify the store. Let's see them through examples:

```javascript
// At the beginning, B.store is merely an empty object

// We now call an event with verb `set`, path `username` and `mono` as its first argument.
B.call ('set', 'username', 'mono');

// Now, B.store is {username: 'mono'}

// We now call an event with verb `set`, path `['State', 'page']` and `main` as its first argument.
B.call ('set', ['State', 'page'], 'main');

// Now, B.store is {username: 'mono', State: {page: 'main'}}

// We now call an event with verb `rem`, path `[]` and `username` as its first argument.
B.call ('rem', [], 'username');

// Now, B.store is {State: {page: 'main'}}

// We now call an event with verb `rem`, path `State` and `page` as its first argument.
B.call ('rem', 'State', 'page');

// Now, B.store is {State: {}}

// We now call an event with verb `set`, path `['Data', 'items']` and `['foo', 'bar']` as its first argument.
B.call ('set', ['Data', 'items'], ['foo', 'bar']);

// Now, B.store is {State: {}, Data: {items: ['foo', 'bar']}}

// We now call an event with verb `add`, path `['Data', 'items']` and `boo` as its first argument.
B.call ('add', ['Data', 'items'], 'boo');

// Now, B.store is {State: {}, Data: {items: ['foo', 'bar', 'boo']}}

// We now call an event with verb `rem`, path `['Data', 'items']` and `0` as its first argument.
B.call ('rem', ['Data', 'items'], 0);

// Now, B.store is {State: {}, Data: {items: ['bar', 'boo']}}
```

It is important to note that events can be used for things other than updating `B.store`, as we will see later.

**Takeaway: modify `B.store` through events, using `B.call`.**

### Updating the page when the store changes

gotoв provides `B.view`, a function for creating views that automatically update themselves when the store changes. To make the app more understandable (and efficient), views can depend on a specific part of the store, instead of depending on the whole state. This means that if a view depends on a part X of the store, then if Y is modified (and Y is not contained inside X, nor X inside Y), the view will remain unchanged.

Let's see an example:

```javascript
var counter = function () {
   return B.view ('counter', function (counter) {
      counter = counter || 0;
      return ['h2', 'The counter is ' + counter];
   });
}

B.mount ('body', counter);
```

Whenever `B.store.counter` is updated, the `h2` element will be automatically updated.

```javascript
B.call ('set', 'counter', 1);

// <h2>The counter is 1</h2>

B.call ('set', 'counter', 2);

// <h2>The counter is 2</h2>
```

### Updating the state from the page

You might be wondering: how can we trigger events from the DOM itself? The example above doesn't show how to place a button that could increase the counter. One way of doing it would be the following:

```javascript
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
```

But it is much better to use `B.ev`, which will create a stringified call to `B.call` that we can put within the `onclick` attribute directly.

```javascript
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
```

### Summary

And that, in a nutshell, is how gotoв works:

1. Views are functions that return object literals (liths) to generate HTML.
2. The global store centralizes all of the state.
3. Events perform all actions, including updating the global store.
4. Views depend on parts of the store and are automatically updated whenever the relevant part of the store changes.
5. Views can contain DOM elements that can call events.

An app written with gotoв will mostly consist of *views* and *responders*, and most of its logic will live in `vfuns` (view functions) and `rfuns` (responder functions).

## FAQ

### Why did you write another javascript framework?!?

I experience two difficulties with existing javascript frontend frameworks:

1. They are hard to understand, at least for me.
2. They are constantly changing.

The combination of these two characteristics mean that I must constantly spend an enormous amount of time and effort to remain an effective frontend developer. Which makes me unhappy, because complex things frustrate me and I am quite lazy when it comes to things I don't enjoy.

Rather than submit to this grind or reject it altogether (and missing out the possibility of creating my webapps), I took a third way out, by deciding to write a frontend framework that:

1. Is optimized for understanding.
2. Built on fundamentals, so that the framework will change [less and less as time goes by](http://www.federicopereiro.com/asymptotic-software/).

And, of course, gotoв must be very useful for building a real webapp.

### Is gotoв for me?

**gotoв is for you if:**

- You have freedom to decide the technology you use.
- Complexity is a massive turn-off for you.
- You like old (ES5) javascript.
- You miss not having to compile your javascript.
- You enjoy understanding the internals of a tool, so that you can then use it with precision and confidence.
- You like technology that's a bit strange.
- You want to build a community together with me.

**gotoв is *not* for you if**:

- You need to support browsers without javascript.
- You need a widely supported framework, with a large community of devs and tools.
- You are looking for a framework that is similar to Angular, Ember or React.
- You need a very fast framework; gotoв chooses simplicity over performance in a couple of critical and permanent respects.

### What does gotoв care about?

- **Ease of use**: 90% of the functionality you need is contained in four functions (one for calling an event (`B.call`), one for setting up event responders (`B.respond`), one for stringifying an event call into a DOM attribute (`B.ev`) and one for creating dynamic DOM elements which are updated when the store changes (`B.view`)). There's also three more events for performing data changes that you'll use often. But that's pretty much it.
- **Fast reload**: the edit-reload cycle should take under two seconds. No need to wait until no bundle is completed.
- **Smallness**: gotoв and its dependencies are < 2048 lines of consistent, annotated javascript. In other words, it is less than 2048 lines on top of [vanilla.js](http://vanilla-js.com/).
- **Batteries included**: the core functionality for building a webapp is all provided. Whatever libraries you add on top will probably be for specific things (nice CSS, a calendar widget, etc.)
- **Trivial to set up**: add `<script src="https://cdn.jsdelivr.net/gh/fpereiro/gotob@434aa5a532fa0f9012743e935c4cd18eb5b3b3c5/gotoB.min.js"></script>` at the top of the `<body>`.
- **Everything in plain sight**: all properties and state are directly accessible from the javascript console of the browser. DOM elements have stringified event handlers that can be inspected with any modern browser.
- **Performance**: gotoв itself is small (~15kB when minified and gzipped, including all dependencies) so it is loaded and parsed quickly. Its view redrawing mechanism is reasonably fast.
- **Cross-browser compatibility**: gotoв is intended to work on virtually all the browsers you may encounter. See browser current compatibility above in the *Installation* section.

### What does gotoв *not* care about?

- **Browsers without javascript**: gotoв is 100% reliant on client-side javascript - if you want to create webapps that don't require javascript, gotoв cannot possibly help you create them.
- **Post-2009 javascript**: everything's written in a subset of ES5 javascript. This means no transpilation, no different syntaxes, and no type declarations. You can of course write your application in ES6 or above and gotoв will still work.
- **Module loading**: gotoв and its dependencies happily and unavoidably bind to the global object. No CommonJS or AMD.
- **Build/toolchain integration**: there's no integration with any standard tool for compiling HTML, CSS and js. gotoв itself is pre-built with a 50-line javascript file.
- **Hot-reloading**: better get that refresh finger ready!
- **Plugin system**: gotoв tries to give provide you all the essentials out of the box, without installation or configuration.
- **Object-oriented programming**: gotoв uses objects mostly as namespaces. There's no inheritance and no use of `bind`. Classes are nowhere to be found.
- **Pure functional programming**: in gotoв, [side-effects are expressed as events](https://github.com/fpereiro/recalc). The return values from event handlers are ignored, and every function has access to the global store. There's no immutability; the global state is modified through functions that update it in place.

## API reference

Before reading this section, it is highly recommended that you read the [introduction](#introduction) to have a conceptual overview of gotoв.

### The gotoв object: `B`

gotoв is automatically loaded on the global variable `B`.

`B.v` contains a string with the version of gotoв you're currently using. `B.t` contains a timestamp indicating the moment when the library is loaded - which can be an useful reference point for performance measurements.

While `B` is a global variable, I suggest assigning `B` to a local variable to make your code clearer:

```javascript
var B = window.B;
```

gotoв automatically loads its five dependencies on the following global variables:

- `dale`: [dale](https://github.com/fpereiro/dale)
- `teishi`: [teishi](https://github.com/fpereiro/teishi)
- `lith`: [lith](https://github.com/fpereiro/lith).
- `R`: [recalc](https://github.com/fpereiro/recalc).
- `c`: [cocholate](https://github.com/fpereiro/cocholate).

You can use these libraries at your discretion. If you do so, I recommend also assigning local variables to them, for clarity's sake:

```javascript
var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c;
```

You may have noticed I omitted recalc in the line of code above. This is because you'll most likely use this recalc through gotoв's functions instead of using it directly.

### `B.mount`

`B.mount` is the function that places your outermost view(s) on the page. This function takes two arguments: the `target` (the DOM element where the HTML will be placed) and a `vfun` (the function that generates the liths that will be converted to HTML). For example:

```javascript
var helloWorld = function () {
   return ['h1', 'Hello, world!'];
}

B.mount ('body', helloWorld);
```

`target` must always be a string. It can be either `'body'` or a string of the form `'#ID'`, where `ID` is the id of a DOM element that is already in the document. If `target` is not present in the document, the function will report an error and will return `false`.

 `B.mount` will execute the `vfun` passing no parameters to it. This function must return either a lith or a lithbag. If the function doesn't return a valid lith or lithbag, `B.mount` will report an error and return `false`.

The HTML generated will be placed at the *bottom* of the target. In the example above, the `<body>` will look like this:

```html
<body>
   <h1>Hello, world!</h1>
</body>
```

Optionally, the `target` string can have the form `TAG#ID`. For example, if you have an element `<div id="container"></div>` already inside the `<body>`, you can use either `'#container'` or `'div#container'` as the `target`.

```javascript
// Create first a `div` with `id` `container`
document.body.innerHTML += '<div id="container"></div>';

B.mount ('#container', function () {
   return ['p', 'Hello'];
});
```

`B.unmount` is a function to undo what was done by `B.mount`. It receives a `target` which is just like the `target` passed to `B.mount`. It will remove **all of the HTML** contained inside `target` - not just the HTML added there by `B.mount`. If an invalid or non-existing `target` is passed to `B.unmount`, the function will report an error and return `false`.

```javascript
B.unmount ('#container');

// `document.body.innerHTML` will now be an empty string.
```

Both `B.mount` and `B.unmount` will return `undefined` if the operation is successful.

In case you're wondering what's going under the hood, `B.mount` does very little: it just validates its inputs, executes `fun` and places the resulting HTML in the DOM. `B.unmount` is almost equally simple, except that it is in charge of removing the responders of the deleted views through `B.forget`. Which takes us to the following topic - events!

### Introduction to the event system: `B.call`, `B.respond`, `B.responders`, `B.forget`

gotoв is built around events. Its [event system](https://github.com/fpereiro/recalc) considers events as *communication* between different parts of the app with each other. Some parts of the program perform *calls* and other parts of the program *respond* to those calls.

The two nouns with which we can structure this paradigm is: *event* and *responder*. The two corresponding verbs are *call* and *match*: events are *called* (almost always by responders), responders are *matched* by events.

An event call can match zero, one or multiple responders. When a responder is matched, it is executed.

Events are more general than mere function calls. When a function is called, the function must exist and must be defined only once:

```
function call -> a function is executed
```

With events, we can have one-to-none, one-to-one or one-to-many execution relationships:

```
event call -> (nothing happens, no responders were matched)

event call -> exactly one responder matched

event call -> this responder is matched
         |--> this responder is also matched
```

This generality of events is extremely useful to model and write the code of interfaces, which is highly interconnected, asynchronous and triggered by user interactions. When a responder is matched by an event, its associated function (which we call `rfun` or *responder function*) is executed. The ultimate purpose of events and responders is to execute the `rfuns` (responder functions) at the right time; rfuns, together with their responders and with matching events, can replace direct function calls in most of the logic of the frontend.

In particular, if a certain event modifies a part of the data, multiple responders can be matched in response to that change, without the event having to bear the burden of knowing which responders to call. This makes all the difference in a frontend.

Events are called with the function `B.call`, which takes the following parameters:

- A `verb`, which is a string. For example: `'get'`, `'set'` or `'someverb'`.
- A `path`, which can be either a string, an integer, or an array with zero or more strings or integers. For example, `'hello'`, `1`, or `['hello', '1']`. If you pass a single string or integer, it will be interpreted as an array containing that element (for example, `'hello'` is considered to be `['hello']` and `0` is considered to be `[0]`).
- Optional extra arguments of any type (we will refer to them as `args` later). These arguments will be passed to matching responders.

If invalid parameters are passed to `B.call`, the function will report an error and return `false`.

An invocation to `B.call` will call an event once.

Responders are created with the function `B.respond`, which takes the following parameters:

- `verb`, which can be a string or a regex.
- `path`, which can be a string, an integer, a regex, or an array containing those types of elements.
- `options`, an optional object with additional options.
- `rfun`, the function that will be executed when the responder is matched. `rfun` is short for `responder function`. The responder receives a context object `x` as its first argument and optional extra arguments (`args`). We'll see what's inside `x` in a later section.

If invalid parameters are passed to `B.respond`, the function will report an error and return `false`.

If the invocation is valid, `B.respond` will create a responder and place it in `B.responders`. This responder will be matched (executed) by any matching event calls throughout the course of the program. Seen from this perspective, a single call to `B.respond` has a more lasting effect than a call to `B.call`.

When does an event match a responder? A full answer is contained [here](https://github.com/fpereiro/recalc#rrespond) and [here](https://github.com/fpereiro/recalc#rrespond-advanced-matching-wildcards--empty-paths). The short answer is: when both the `verb` and the `path` of the event and the responder match.

Let's define the following events and responders:

```
B.respond ('foo', 0, rfun)          // responder A
B.respond ('foo', '*', rfun)        // responder B
B.respond ('foo', ['*', '*'], rfun) // responder C
B.respond ('bar', [], rfun)         // responder D

B.call ('foo', 0);      // event A
B.call ('foo', 1);      // event B
B.call ('foo', [0, 1]); // event C
B.call ('bar', 0);      // event D
```

What will happen?

- Event `A`:
   - Will match responder A, because both their `verb` (`'foo'`) and `path` (`0`) are identical.
   - Will match responder B, because their `verb` (`'foo'`) is identical, and because the responder's `path` (`'*'`) will be matched by any event's `path` with length 1.
   - Will not match responder C, because while their `verb` (`'foo'`) is identical, responder C `path`'s will be matched only by events with `path`s of length 2.
   - Will not match responder D, because their `verb` is different (`'foo'` vs `'bar'`).
- Event `B`:
   - Will not match responder A, because while their `verb` is identical, their `path` is not.
   - Will match responder B, because their `verb` is identical and because the responder's `path` will be matched by any event's `path` with length 1.
   - Will not match responder C, because while their `verb` (`'foo'`) is identical, responder C `path`'s will be matched only by events with `path`s of length 2.
   - Will not match responder D, because their `verb` is different (`'foo'` vs `'bar'`).
- Event `C`:
   - Will not match responders A or B, because while their `verb` (`'foo'`) is identical, their `paths` don't match.
   - Will match responder C, because their `verb` (`'foo'`) is identical and because responder C `path`'s will be matched the `path` of event C, which has length 2.
   - Will not match responder D, because their `verb` is different (`'foo'` vs `'bar'`).
- Event `D`:
   - Will not match responders A, B or C, because their `verbs` are different.
   - Will not match responder D, because while their `verb` (`'bar'`) is identical, responder D will only be matched by events with `paths` of length 0.

Notice that in the example above we called `B.respond` before `B.call`; if we had done this the other way around, the event calls would have had no effect since the responders would have not been registered yet.

Wildcards (`'*'`) and regexes can be used in the `verbs` and `path` elements of responders, but not of events.

Regarding the optional `options` object passed to `B.respond`, please check [recalc's documentation](https://github.com/fpereiro/recalc#rrespond) for a full specification; the most useful ones are:
- `id` (a string or integer), to determine the responder's `id`
- `priority`, an integer value and determines the order of execution if multiple responders are matched by an event call; by default, `priority` is 0, but you can specify a number that's larger or smaller than that (the higher the priority, the earlier the responder will be executed). If two responders are matched and have the same priority, the oldest one takes precedence
- `match`, a function to let the responder decide whether it should be matched by any incoming event; this function supersedes the default `verb` and `path` matching logic with your own custom logic; the provided function receives two arguments, an object with the `verb` and `path` of the event being called, plus the responder itself.

Responders are stored in `B.responders`. To remove a responder, invoke `B.forget`, passing the `id` of the responder. The `id` of the responder will be that provided by you when creating it (if you passed it as an option), or the automatically generated `id` which will be returned if the invocation to `B.respond` was successful.

### Data: `B.store` and the built-in data responders (`'set'`, `'add'` and `'rem'`)

As we saw in the introduction, all the state and data that is relevant to the frontend should be stored inside `B.store`, which is a plain object where all the data is contained.

Rather than modifying the `store` directly, gotoв requires you to do it through the three built-in *data responders*, which have the following verbs: `'set'`, `'add'` and `'rem'`. Whenever you call an event with one of these three verbs (`set/add/rem`), these responders will be executed and they will do two things:

1. Update the store.
2. Call a `change` event.

`change` events are very important, because these are the ones that update the page! In fact, `B.view`, the function for creating reactive elements (which will cover below), creates event responders that are matched when `change` events are called.

Let's see now each of these responders:

#### `set`

The first data responder is `set`. This responder sets data into a particular location inside `B.store`. It takes a `path` and a `value`. `path` can be an integer, a string, or an array containing integers and strings (as any responder's `path`, really); `path` represents *where* we want to set the value inside `B.store`.

Let's see now a set of examples. In each of these examples, I'll consider that we start with an empty `B.store` so that we don't carry data from one example to the other.

```javascript
B.call ('set', 'title', 'Hello!');

// B.store is now {title: 'Hello!'}
```

As you can see, we pass `'set'` as the first argument; then we pass the `path` (`'title'`) and finally the value (`'Hello!'`). `set` also allows you to set nested properties:

```javascript
B.call ('set', ['user', 'username'], 'mono');

// B.store is now {user: {username: 'mono'}}
```

Notice how `B.store.user` was initialized to an empty object. Because the second element of the path is a string (`username`), the `set` data responder knows that `B.store.user` must be initialized to an object. Contrast this to the following example:

```javascript
B.call ('set', ['users', 0], 'mono');

// B.store is now {users: ['mono']}
```

In the example above, `B.store.users` is initialized to an array instead, since `0` is an integer and integers can only be the keys of arrays, not objects.

If your `path` has length 1, you can use a single integer or object as `path`:

```javascript
B.call ('set', 'foo', 'bar');

// B.store is now {foo: 'bar'}
```

If you pass an empty `path`, you will overwrite the entire `B.store`. In this case, `value` can only be an array or object, otherwise an error will be reported and no change will happen to `B.store`.

```javascript
B.call ('set', [], []);

// B.store is now []

B.call ('set', [], 'hello');

// B.store still is [], the invocation above will report an error and do nothing else.

B.call ('set', [], {});

// B.store is now {}
```

`set` will overwrite whatever part of the existing store stands in its way. Let's see an example:

```javascript
B.call ('set', ['Data', 'items'], [0, 1, 2]);

// B.store is now {Data: {items: [0, 1, 2]}}

B.call ('set', ['Data', 'key'], 'val');

// B.store is now {Data: {items: [0, 1, 2], key: 'val'}}

B.call ('set', ['Data', 0], 1);

// B.store is now {Data: [1]}
```

In the example above, when we set `['Data', 'key']`, `['Data', 'items']` is left untouched. However, when we set `['Data', 0]` to `1`, that assertion requires that `Data` be an array. Because it is an object, it will be overwritten completely and set to an array. This would also happen if `Data` were an array and a subsequent assertion required it being an object.

In summary, `set` will preserve the existing keys on the store unless there is a type mismatch, in which case it will overwrite the required keys with the necessary arrays/objects.

#### `add`

The second data responder is `add`. This responder puts elements at the end of an array. It takes a `path`, plus zero or more elements that will be placed in the array. These elements can be of any type.

```javascript
B.call ('set', ['Data', 'items'], []);

// B.store is now {Data: {items: []}}

B.call ('add', ['Data', 'items'], 0, 1, 2);

// B.store is now {Data: {items: [0, 1, 2]}}

B.call ('add', ['Data', 'items']);

// B.store is still {Data: {items: [0, 1, 2]}}
```

If `path` points to a location with value `undefined`, the array will be created automatically:

```javascript
B.call ('add', ['Data', 'items'], 0, 1, 2);

// B.store is now {Data: {items: [0, 1, 2]}}
```

If no elements are passed to `add` but `path` points to an undefined value, the containing array will still be created.

```javascript
B.call ('add', ['Data', 'items']);

// B.store is now {Data: {items: []}}
```

If `path` points to a location that is neither `undefined` nor an array, an error will be reported and no change will happen to `B.store`.

#### `rem`

The third and final data responder is `rem`. This responder removes keys from either an array or an object within the store. Like the other data responders, it receives a `path`, plus zero or more keys that will be removed.

```javascript
B.call ('add', ['Data', 'items'], 'a', 'b', 'c');

// B.store is now {Data: {items: ['a', 'b', 'c']}}

B.call ('rem', ['Data', 'items'], 1);

// B.store is now {Data: {items: ['a', 'c']}}

B.call ('rem', 'Data', 'items');

// B.store is now {Data: {}}

B.call ('rem', [], 'Data');

// B.store is now {}
```

If `path` points to an array, the keys must all be integers. If `path` points to an object, the keys must instead be all strings. If `path` points to neither an array nor an object, `rem` will report an error and do nothing.

```javascript
B.call ('add', ['Data', 'items'], 'a', 'b', 'c');

// B.store is now {Data: {items: ['a', 'b', 'c']}}

B.call ('rem', ['Data', 'items'], 'a');

// The last invocation will report an error and make no change on B.store

B.call ('rem', 'Data', 0);

// The last invocation will also report an error and make no change on B.store

B.call ('rem', ['Data', 'items', 0], 'foo');

// The last invocation will also report an error and make no change on B.store
```

An exception to the above rule is that if `path` points to `undefined`, `rem` will not produce any effect but no error will be printed.

```javascript
B.call ('rem', ['Data', 'foo'], 'bar');

// Nothing will happen.
```

Nothing will happen also if you pass no keys to remove.

```javascript
B.call ('rem', ['Data', 'items']);

// Nothing will happen.
```

You can pass multiple keys to remove in one call.

```javascript
B.call ('set', ['Data', 'items'], ['a', 'b', 'c']);

B.call ('rem', ['Data', 'items'], 0, 1);

// B.store is now {Data: {items: ['c']}}
```

Instead of passing the keys as arguments, you can also pass them all together as an array of keys.

```javascript
// These two invocations are equivalent:
B.call ('rem', ['Data', 'items'], 0, 1);
B.call ('rem', ['Data', 'items'], [0, 1]);

// These two invocations are equivalent:
B.call ('rem', [], 'Data', 'State');
B.call ('rem', [], ['Data', 'State']);
```

### Event calls from the DOM: `B.ev`

Since gotoв applications are structured around events and responders, user interactions must call events. This means that certain DOM elements need to call gotoв events from from their native event handlers (for example, the `onclick` should invoke `B.call`). For this purpose, you can use the function `B.ev`, which creates stringified event handlers that we can pass to DOM elements, in order to trigger events from them. Let's see an example:

```javascript
var button = function () {
   return ['button', {
      onclick: B.ev ('do', 'it')
   }, 'Do it!'];
}

B.mount ('body', button);
```

When the `button` above is placed in the DOM, clicking on it will call an event with `verb` `do` and `path` `it` - in other words, it's the equivalent of running `B.call ('do', 'it')`.

`B.ev` takes as arguments a `verb`, a `path`, and optional further arguments. In fact, it takes the same arguments as `B.call`! This is not a coincidence, since `B.ev` generates a string that, when executed by a javascript event, will perform a call to `B.call` with the same arguments.

Let's now see another example, to illustrate other aspects of `B.ev`: we'll create a button that, when clicked, will call an event with verb `submit` and path `data`.

```javascript
['button', {onclick: B.ev ('submit', 'data')}]
```

You can pass extra arguments when calling an event. For example, if you want to pass an object of the shape `{update: true}` you can instead write:

```javascript
['button', {onclick: B.ev ('submit', 'data', {update: true})}]
```

You can pass all sorts of things as arguments:

```javascript
['button', {onclick: B.ev ('submit', 'data', null, NaN, Infinity, undefined, /a regular expression/)}]
```

If you need to access properties that are within the event handler (like `event` or `this`), you can do so as follows:

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value'})}]
```

These are called `raw` arguments, because they are passed as they are, without stringifying them.

Any responder matched by this event will `this.value` as its first argument, instead of the string `'this.value'`. You could also pass the event instead:

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 'event'})}]
```

You can pass multiple raw arguments. For example, if you want to pass both `this.value` and `event` you can write this:

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value'}, {raw: 'event'})}]
```

If an object has a key `raw` but its value is not a string, it will be considered as a normal argument instead:

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 0})}]
```

The event responder above will receive `{raw: 0}` as its first argument.

If you pass an object with a `raw` key that contains a string, other keys within that object will be ignored.

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value', ignored: 'key'})}]
```

If you want to call more than one event within the same user interaction, you can do it by wrapping the event arguments into an array, and passing each array as an argument to `B.ev`.

```javascript
['button', {onclick: B.ev (['submit', 'data'], ['do', ['something', 'else']])}]
```

If the `onclick` handler for the button above is called, `B.call` will be called twice, first with `'submit', 'data'` as arguments and then with `'do', ['something', 'else']` as arguments.

If you need to submit an event only if a condition is met, you can use an empty array to signal a no-op.

```javascript
['button', {onclick: B.ev (cond ? ['submit', 'data'], [])}]
```

The same goes in the context of multiple events, out of which a single one should happen conditionally.

```javascript
['button', {onclick: B.ev (['submit', 'data'], cond ? ['do', 'something'], [])}]
```

If invalid inputs are passed to `B.ev`, the function will report an error and return `false`.

### Reactive views: `B.view`

An essential part of gotoв (or of any frontend framework, really) is the ability to write *reactive* views. What does *reactive* mean? It means that the view is automatically updated when the information on which it depends has changed - in other words, it *reacts* to relevant changes on the store.

Let's go back to the `counter` example we saw earlier:

```javascript
var counter = function () {
   return B.view ('counter', function (counter) {
      counter = counter || 0;
      return ['div', [
         ['h3', ['Counter is: ', counter || 0]],
         ['button', {
            onclick: B.ev ('set', 'counter', (counter || 0) + 1)
         }, 'Increment counter']
      ]];
   });
}

B.mount ('body', counter);
```

As you can see above, `B.view` takes two arguments:

- A `path`.
- A `vfun` (view function). Recall that `vfuns` are functions that return liths. This function receives as an argument the value of the store at `path`. This function must always return a lith.

When `B.store.counter` is updated, the `vfun` will be executed again and the view updated.

If you enter the following command on the developer console to update the store: `B.call ('set', 'counter', 1)`, you will notice that the view gets automatically updated!

If you, however, try to update `B.store.counter` directly by entering `B.store.counter = 2`, you'll notice that... nothing happens! This is because you changed the store directly instead of using an event. Most of the time, you'll change the store through events - though later we'll see how you can sidestep the event system to update the store directly.

`B.view` takes a `path` and a `vfun` as arguments. The `path` is exactly like the `path` passed to `B.call`, `B.listen` and `B.ev` and can be any of the following:

- A string: `counter`.
- An array of strings and integers: `['Data', 'counter']`.
- An array of arrays of strings and integers: `[['Data', 'counter'], ['State', 'page']]`.

If the `path` is `counter`, then the view will be updated when `B.store.counter` changes. If the path is instead `['Data', 'counter']`, then the view will be updated when `B.store.Data.counter` changes.

By the way, if you passed `['counter']` instead of `'counter'` as the path, the result would be the same: `B.view ('counter', ...` is the same as `B.view (['counter'], ...`.

If the `path` is a list of `paths`, as `[['Data', 'counter'], ['State', 'page']]`, then the view will be updated when *either* `Data.counter` or `State.page` change. If you pass multiple paths, the `vfun` will receive multiple arguments, one per path passed, each of them with the value of the relevant part of the store.

If you pass multiple `paths` to `B.view`, the view will be updated when any of the corresponding store elements change:

```javascript
var dashboard = function () {
   return B.view ([['stockPrice'], ['username']], function (stockPrice, username) {
      return ['div', [
         ['h3', ['Hi ', username]],
         ['h4', ['The current stock price is: ', stockPrice, 'EUR']]
      ]];
   });
}

B.mount ('body', dashboard);

// Here, the dashboard will have neither a name nor a stock price.

B.call ('set', 'username', 'Oom Dagobert');

// The dashboard now will display an username printed, but no stock price.

B.call ('set', 'stockPrice', 140);

// Now the dashboard will print both an username and a stock price.
```

The `vfuns` must return a single lith, not a lithbag. For example:

```javascript
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
```

By requiring every view to return a lith, there's a 1:1 relationship between a view and a DOM element. This makes both debugging and the implementation of the library simpler. (Why is the simplicity of the implementation important? Because gotoв is also meant to be understood, not just used. And simpler implementations are easier to understand).

If its inputs are valid, `B.view` returns the lith produced by the `vfun` passed as its second argument. Besides that, it sets up a responder that will be matched when a `change` event is fired with a `path` that was passed to `B.view`.

If it receives invalid inputs, or the `vfun` doesn't return a lith, `B.view` will report an error and return `false`.

Each invocation to `B.view` creates a responder with a verb `change`. gotoв uses the event system itself to redraw views, so that everything (even redraws) are part of the same event system.

Once gotoв sets a responder for a reactive view, gotoв expects the outermost DOM element of the view to 1) be placed in the DOM; 2) to be in the DOM exactly once, without being repeated. In this way, each view has a 1:1 relationship with a DOM element.

When the view has no corresponding DOM element, gotoв decides it is a "dangling view", which it considers to be an error. If you place the output of `B.view` in the DOM through `B.mount`, and you do this before calling any `change` events which might redraw the view, this will not happen.

A gotoв view can only be placed in the DOM once (and not more than once) because its corresponding outermost element has an id and as such can only exist once in the DOM.

If you want to encapsulate a view in a variable for later reuse in multiple places (even simultaneously), do it as a function that returns an invocation to `B.view`, instead of storing a direct invocation to `B.view`:

```javascript

// Please don't do this
var counter = B.view ('counter', function (counter) {
   counter = counter || 0;
   return ['h1', 'Counter is ' + counter];
});

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
```

It is particularly important to be aware of this, since using an invocation to `B.view` in multiple places or multiple times can trigger errors that are not immediate and that cannot be detected by gotoв.

By encapsulating the view into a function, you could have two counters simultaneously - each will have its own view:

```javascript
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
```

It is perfectly possible to nest reactive views:

```javascript
var app = function () {
   return B.view ('username', function (username) {
      return ['div', [
         ['h1', username],
         B.view ('counter', function (counter) {
            counter = counter || 0;
            return ['h2', ['Counter is ', counter]];
         })
      ];
   })
}

B.mount ('body', app);
```

If you pass an `id` to the lith returned by a `vfun`, an error will be reported. `B.view` uses specific ids to track which DOM elements are reactive. `B.view` adds also a `paths` attribute to the DOM elements, simply to help debugging; the `paths` attribute will contain a stringified list of the `paths` passed to the reactive view.

```javascript
var app = function () {
   return B.view (['Data', 'counter'], function (counter) {
      counter = counter || 0;
      // This will generate an error. Don't pass ids to the outermost element of a reactive view.
      return ['h1', {id: 'my-counter'}];
   });
}

B.mount ('body', app);

// The HTML for the <h1> will be something like <h1 id="в1" path="Data:counter"></h1>
```

If you nest views, you need to specify different elements for them - that is, one invocation to `B.view` cannot simply return another invocation to `B.view`.

```javascript

// This will not work, gotoB will return an error saying that you cannot specify an id on the element returned by the vfun.
var app = function () {
   return B.view ('username', function (username) {
      return B.view ('counter', function (counter) {
         return ['h1', [username, counter]];
      });
   });
}

// This will work - notice there's a `<div>` and inside of it, an `<h1>`.
var app = function () {
   return B.view ('username', function (username) {
      return ['div', B.view ('counter', function (counter) {
         return ['h1', [username, counter]];
      })];
   });
}
```

It is highly discouraged to call events from inside a `vfun`, unless you have a great reason to do so (if you do, I'm very curious about your use case, so please let me know!). `vfuns` make much more sense as pure functions. Events should be called from `rfuns` rather than `vfuns`.

```javascript
var app = function () {
   return B.view (['Data', 'counter'], function (counter) {
      counter = counter || 0;
      // Don't invoke B.call from inside a vfun, unless you have a great reason to!
      B.call ('side', ['effects', 'rule']);
      return ['h1', counter];
   });
}

B.mount ('body', app);
```

One final point: gotoв requires you to not manipulate the DOM elements of a reactive view. By default, gotoв expects full control over the outermost DOM element of a view and its children - if you modify it directly, gotoв won't be aware of the changes and so errors could happen if those elements are recycled after a redraw. In some situations, however, it is necessary to include an element that you (or more often, a library) will modify. For these cases, you can use the `opaque` property (please refer to the [advanced topics section](#advanced-topics)).

### Writing your own responders & tracking execution chains: `x`, `B.log`, `B.eventlog`, `B.get`, `B.mrespond`, advanced matching

Most of the logic of a gotoв application will be contained in responders that you write yourself; while you'll still be using the built-in responders (those with verbs `set`, `add` and `rem`), most apps will require you to define responders. In fact, many events will be called from inside responders (with the rest of the events being called directly by user interactions with the DOM).

As we noted above, responders are created with `B.respond` and are *matched* when an event with a matching `verb` and `path` is called. The logic for a responder goes in the `rfun` (*responder function*). This function receives `x` (a *context object*) as its first argument; it optionally receives further arguments if the matching event was called with extra arguments.

Responders (or more precisely, `rfuns`) is where most of the logic of a gotoв app lives.

Going back to the todo example defined above:

```javascript
B.respond ('create', 'todo', function (x) {
   var todo = prompt ('What\'s one to do?');
   if (todo) B.call (x, 'add', 'todos', todo);
});
```

This responder is defined to match events with a verb `create` and a path `todo`. The `rfun` only receives a context object as argument.

Quite often you might need to pass extra arguments to responders. This can be done as follows:

```javascript
B.respond ('create', 'todo', function (x, important) {
   var todo = prompt ('What\'s one to do?');
   if (todo) B.call (x, 'add', 'todos', todo);
   if (important) alert ('Important todo added.');
});

B.call ('create', 'todo', true);
```

The `true` passed to the event call after the `path` gets passed as the second argument to the `rfun`. If the event were to be called without extra arguments, `important` would be `undefined`.

In any case, the `rfun` receives always the context object as its first argument. This object contains the following:

- `verb`, the verb of the event that matched the responder.
- `path`, the path of the event that matched the responder.
- `args`, an array with extra arguments passed to the event. If no extra arguments were passed, this element will be undefined.
- `from`, the id of the event that matched this responder (which is the same value returned by the corresponding `r.call` invocation).
- `cb`, a callback function which you only need to use if your responder function is asynchronous.
- `responder`, the matched responder.

Most of these keys are there for completeness sake and are not really necessary most of the time; in fact, `args` is actually redundant, since the extra arguments are also passed directly to `rfun`. A full description of the context object is available [here](https://github.com/fpereiro/recalc#responder-functions).

The most useful key of `x` is `from`. It will contain the id of the event that was called and that in turned matched the responder. This allows to track *event chains*. For example: event X matches responder Y, then responder Y calls event Z.

To track event chains, *pass `x` as the first argument to calls to `B.call` that you do from inside the `rfun`*. For example:

```javascript
B.respond ('foo', 'bar', function (x) {
   B.call (x, 'do', 'something');
});
```

The event call `do something` will contain the id of the listener and in this way it will be possible to track where the call came from. More information is available [here](https://github.com/fpereiro/recalc#tracking-event--responder-chains).

gotoв stores a list of all the events called and all responders matched into `B.log`. Since gotoв applications are built around events, This can be extremely useful for debugging an app. Instead of inspecting `B.log` with the browser console, you can invoke `B.eventlog`, a function which will add an HTML table to the page where you can see all the information about the events. There's a [separate section](#logging-blog-beventlog-and-braddlog) dedicated to logging.

A function you will probably use quite a bit inside responders is `B.get`, which retrieves data from `B.store`. While you can directly access data from `B.store` without it, `B.get` is useful to access properties in the store in case they haven't been defined yet. For example, if `B.store.user.username` is not defined, if you try to do something like `var username = B.store.user.username` and `B.store.user` is not present yet, your program will throw an error.

If, instead, you write `var username = B.get ('user', 'username')`, if `B.store.user` is not present yet then `username` will be `undefined`.

```javascript
// B.store is {}

// This will throw an error!
var username = B.store.user.username;

// This will be either `undefined` or bring you the `username` if it's already defined.
var username = B.get ('user', 'username');
```

`B.get` takes either a list of integers and strings or a single array containing integers and strings. These integers and strings represent the *path* to the part of the store you're trying to access. This `path` is the same `path` that `B.call` (the event calling function) takes as an argument.

If you pass invalid arguments to `B.get`, it will return `undefined` and report an error to the console.

If you pass an empty `path` to `B.get` (by passing either an empty array or no arguments), you'll get back `B.store` in its entirety.

It is important to notice that B.get doesn't return copies of the referenced objects, but the actual object themselves. If `B.get` returns an array or object and you modify it, you'll also be modifying the corresponding object in the store. Most often, you don't want to do this since it can generate an inconsistency between the store and the views. To avoid this problem, you can copy the returned object or array before modifying it using `teishi.copy`.

```javascript
B.call ('set', [], {user: {username: 'foo', type: 'admin'}});
// B.store is {user: {username: 'foo', type: 'admin'}}

var user = B.get ('user');

// If you do this, you'll modify B.user.username!
user.seen = true;

// Better to do this
var user = teishi.copy (B.get ('user'));
user.seen = true;
```

Note that this is not necessary if 1) you don't need to modify the object or array; or 2) you bring a value that's neither an array nor an object, in which case javascript returns you a copy of the value, not a reference to the value itself.

Responders are active from the moment you create them (with `B.respond`) until you remove them with `B.forget` (with the exceptions of responders created with the `burn` flag, which will be forgotten after being matched once). There's no concept of lifecycle, and most responders will be active for the entire lifetime of you app.

To create multiple responders at once, you can use `B.mrespond`, which takes an array of arrays, where each internal array contains the arguments to be passed to `B.respond`:

```javascript
B.mrespond ([
   ['verb1', 'path1', function (x) {...}],
   ['verb2', ['another', 'path'], function (x) {...}],
   ...
]);
```

You can use regexes on both the `verb` and the `path` of a responder. For example, if you want to create a responder that is matched by events with `verbs` `get` and `post` you can write it as follows:

```javascript
B.respond (/^get|post$/, 'bar', function (x) {...});
```

This responder, however, will only be matched by events with `verb` `get` or `post` and a `path` equal to `bar`. To make it match all events with a path of length 1, you can use a wildcard for the path:

```javascript
B.respond (/^get|post$/, '*', function (x) {...});
```

To make a responder match *all* events with verbs `get` or `post`, you need to use the `match` property of the responder. For example:

```javascript
B.respond (/^get|post$/, [], {match: function (ev, responder) {
   if (ev.verb === 'get' || ev.verb === 'post') return true;
}}, function (x) {...});
```

The responder above will be matched by any event with verb `get` or `post`. The `match` parameter effectively supersedes the `verb` and `path` of the responder. If `match` function returns `true`, the responder will match the called event.

### The `change` event, the data functions (`B.set`, `B.add`, `B.rem`) and `B.changeResponder`

As we saw before, when you call an event with any of the built-in data verbs (`set`, `add` and `rem`), a `change` event with the same `path` will be called. More precisely, a `change` event will be called whenever you call a data verb with 1) valid arguments; and 2) when your invocation actually modifies the store. If the event is called with incorrect arguments or it doesn't modify the store, no `change` event will be triggered.

gotoв's function for creating reactive elements (`B.view`), relies on the `change` event to know when it should redraw a view. More precisely, every invocation to `B.view` creates a responder with `verb` `change` on a given path. This means that views are redrawn when a `change` event is emitted.

This is the reason for which you need to use events to modify the store. If you modified the store directly, the views depending on a part of the store would not be updated when the store changes!

The three data events internally call three respective data functions: `B.set`, `B.add` and `B.rem`. These functions receive a `path` as its first argument and then further arguments.

If you want to modify the store but avoid redrawing the views that depend on that part of the store, you can do two things: 1) invoke these functions directly; or 2) use the *mute* counterparts of the standard events: `madd`, `mrem` and `mset`. The advantage of using the mute data events is that they will still create entries in `B.log` and as such they improve the debugging experience. Using mute data events will be useful when you have multiple updates on a very short amount of time. Once the updates happen, you can then trigger the view redraw by firing a `change` event on the desired `path`. Let's see an example:

```javascript
var items = function () {
   return B.view ('items', function (items) {
      return ['ul', dale.go (items, function (item) {
         return ['li', ['Item is', item]];
      })];
   });
}

B.mount ('body', items);

var updateItems = function (items) {
   items.map (function (item, index) {
      var updatedItem = item + 'foo';
      // We modify the items on the store without calling a `change` event
      B.call ('mset', ['items', index], updatedItem);
   });
   // When we're done updating the store, we call a `change` event
   B.call ('change', 'items');
}
```

Most of the time, this will not be necessary (the example above, in fact, is a bit artificial: you could perfectly create a new `items` array and then `set` it as one operation).

In the example above, you could also modify the elements invoking `B.set` directly - however this will not generate entries in `B.log`.

```javascript
var updateItems = function (items) {
   items.map (function (item, index) {
      var updatedItem = item + 'foo';
      // We modify the items on the store directly.
      B.set ([items, index], updatedItem);
      // If you directly set the item on the store, it would be the same as calling `B.set` above (assuming that `B.store.items` already exists).
      B.store.items [index] = updatedItem;
   });
   // When we're done updating the store, we call a `change` event
   B.call ('change', 'items');
}
```

When calling an event with verb `change` on a given path, you always trigger a redraw on views that depend on that given path. The logic for detecting whether there was a change on the relevant part of the store (and preventing the firing of a `change` event if that part of the store didn't change) is in the data responders.

`B.view` uses a special match function `B.changeResponder` to redraw views not only when a `change` event is fired on its path, but also when a `change` event is fired with a path that could affect that path. It's best to explain this through an example:

```javascript
var todos = function () {
   return B.view ('todos', function (todos) {
      return ['ul', dale.go (todos, function (todo) {
         return ['li', todo];
      })];
   });
}

B.mount ('body', todos);

// At the beginning, B.store.todos is `undefined`, so no todos are listed.

// We add a todo.
B.call ('add', 'todos', 'write readme');

// The event above will trigger another event with verb `change` and path `todos`. This redraws the view, which has also the path `todos`.

// We modify a todo.
B.call ('set', ['todos', 0], 'Write readme and add examples.');

// The event above will trigger another event with verb `change` and path `['todos', 0]`. This will *also* redraw the view, because it affects the path `todos`.

// We completely remove the `todos` from the store.
B.call ('rem', [], 'todos');

// The event above will trigger another event with verb `change` and path `['todos']`. This will *also* redraw the view, because it affects the path `todos`.
```

You might have noticed: why does the last `rem` event fires a `change` event on `['todos']`, rather than on `[]`? The reason is that `rem` determines the affected path by adding each of the arguments to the received path. In general, if you pass a path `X` to `rem`, and then you want to remove a key `Y` from it, the `change` event will be fired on path `X.Y`. Interestingly enough, if you want to remove both `Y` and `Z` with the same event, you will trigger `change` events on both `X.Y` and `X.Z`.

In general, if a view has a path with n elements, it will be redrawn by any event with verb `change` that either:
1. Has the same path.
2. Has a longer path of which the first n elements match those of the view's path.
3. Has a shorter path of length m, and each of these elements match the corresponding elements of the view's path.

Tricky? Quite. It took me a couple of years to get this right. This logic is necessary because operations that are either more nested (longer paths) or less nested (shorter paths) can still modify data on a given path. In the examples above, you can see how an operation on a longer path `['todos', 0]` had an impact on `'todos'`. This would also be the case for an operation that modifies `[]`. However, an operation on a path that didn't share elements with `'todos'` would not be relevant (for example, if there was a change event on `['whatever']`).

If you want to create a responder with verb `change` that behaves exactly like those set up by `B.view`, you can do so by using `B.changeResponder` as the `match` function:

```javascript
B.respond ('change', 'counter', {match: B.changeResponder}, function (x, counter, previousCounterValue) {
   // Your logic goes here. This rfun will only be executed if `'counter'` changes or if you fire a `'change'` event yourself.
});
```

Note that the `rfun` above receives two arguments, one with the current value of `counter` and one with the previous value. This convenience is provided by the in-built data events of gotoв, which pass the current and the old value of the part of the store that changed. gotoв's internals don't rely on this, so you don't need to do it if you fire a change event yourself:

```javascript
// No need to pass extra arguments!
B.call ('change', 'counter');
```

However, if you fire a change event and your responders rely on receiving the current value of the changed part of the store, you can pass them as such:

```javascript
B.call ('change', 'counter', B.get ('counter'));

// If oldCounter was the old value of counter, you can also do this:
B.call ('change', 'counter', B.get ('counter'), oldCounter);
```

### Logging: `B.log`, `B.eventlog` and `B.r.addLog`

As we said in a previous section, gotoв stores a list of all the events called and all responders matched into `B.log`. This object contains a list of all the events called and responders matched by those events. This information can make debugging and performance improvements much simpler.

Instead of inspecting `B.log` with the browser console, you can invoke `B.eventlog`, a function which will add an HTML table to the page where you can see all the information about the events. The table presented by `B.eventlog` is ordered by time (so you can see what happened first and what later), it allows to track dependencies between events (if the context is passed in nested calls, see below) and it shows the time when the event was called relative to the initial loading of the application (which allows for performance benchmarking).

If you pass a string as the first argument to `B.eventlog`, the table will only show entries that have some text that match the string. The match is case-insensitive.

Logging is turned on by default and all events calls and responder matches are registered. In some cases you might need to change this behavior. For this reason, you can override `B.r.addLog`, the function which takes logs and pushes them into `B.log`.

- If you want to turn off all logging: `B.r.addLog = function () {}`.
- If you want to keep the last (say) 1000 log entries and delete the old ones:
```javascript
B.r.addLog = function (log) {
   if (B.log.length > 1000) B.log.shift ();
   B.log.push (log);
}
```
- If you want to filter out sensitive information (such as passwords):
```javascript
// In this example, the password is passed inside an object as the first argument to a responder.
B.r.addLog = function (log) {
   if (log.args && log.args [0] && log.args [0].password) {
      log.args [0].password = 'REDACTED';
   }
   B.log.push (log);
}
```

### Production mode, performance & debugging: `B.error`, `B.prod` and `B.internal.timeout`

If one of gotoв's functions is invoked with invalid arguments, gotoв will call a function `B.error` instead of logging the error to the console or throwing an exception. `B.error` calls an event with verb `error`; an in-built responder with verb `error` will get matched and, by default, show you a list of all the events fired and responders matched, so you can track what happened and fix the error faster. This list is generated by `B.eventlog`, which we described in the previous section.

Not using the console to show errors has some advantages: errors are more visible if they're shown in the main view rather than in the console; the table shown gives you quite more info than the immedaite error; and this also works on mobile browsers, where you don't have access to a development console.

If you set `B.prod` to `true`, you'll turn on *production mode*. When production mode is on, gotoв's functions will stop validating inputs and `B.error` will never be invoked. This will make your application faster, but if any of these functions is invoked with invalid arguments, you will either experience silent errors or your application will throw an exception. It is recommended that you only set this variable on a production environment only when your application has been thoroughly debugged.

With `B.prod` enabled, gotoв will be faster to create liths (since it will stop validating them) but the functions for diffing views and applying changes to the DOM will run at the same speed. By default, after 200 milliseconds gotoв gives up on performing diffs between the old and the new version of a view. To override this, you can set `B.internal.timeout` to another value. If gotoв spends more than that amount of time applying the diff algorithm, it gives up and instead creates a new set of DOM elements to replace the old ones. This is called *trampling*.

Every gotoв redraw calls an event with verb `redraw` and a `path` that is the same of that of the redrawn view. These events contain performance information, namely: how much time it took to `create` the lith, how much time it took to `prediff` it (an intermediate processing step), how much the actual `diff` computation took, how much time it took to apply the changes to the `DOM`, and a `total` amount of time. You can inspect these through `B.eventlog`. The event also informs the length of the `diff`, and how many edits the diff required (the more edits, the more different were the old and the new view, and the longer the diff takes to computed and to be applied to the DOM).

Most gotoв errors are quite straightforward: an invalid input is passed to one of the functions. The trickiest errors to understand are those related to the drawing (or redrawing) of views. Here's a list of common errors and what can be done about it:

- `View function at path ... must return a lith element but instead returned...`: this error is thrown by `B.view`; the error message will contain the `path` to help you locate the offending invocation to `B.view`. Make sure that your `vfun` returns a lith, instead of a lithbag or `undefined`. A typical problem is that you might have forgotten to add a comma between two arrays and so a part of the lith is considered as `undefined` - unfortunately, this is a javascript syntax issue that gotoв can do nothing about.
- `Attempt to redraw dangling element`: this error is thrown by a view that is redrawn before being placed in the DOM. gotoв expects the outermost element of each invocation to `B.view` to be already placed in the DOM (usually through `B.mount`). Make sure that the outputs of `B.view` are not "floating around", but rather contained in an element that has been mounted.
- `Redraw error: DOM element missing.`: this error means that, during a redraw, gotoв was expecting to find a certain DOM element somewhere and couldn't find it. This could happen for a number of reasons:
   - Your code (or another library) have performed DOM manipulations on the DOM element of a reactive view. The solution is to use an `opaque` attribute (see the next section for the details).
   - One of the views specifies markup that, while valid lith, is invalid HTML and is heavily modified by the browser. gotoв is oblivious to this manipulation and so it fails to find the DOM elements where it expects them to be. A typical case happens with tables, by putting elements that are not `<td>` directly into a `<tr>`.
   - There's a browser bug (or interesting feature) that gotoв hasn't accounted for. In this case, please report the issue!

If gotoв throws an exception (and you haven't enabled `B.prod`), it's almost certainly a bug in the library. Please report it!

Other types of errors will be unexpected behaviors, particularly after redraws. It is important to note that if you put values on inputs controlled by gotoв without using gotoв (that is, without specifying the `value` property in the `vfun`), then you should clear them out if you don't want those values popping up elsewhere if they're reused by gotoв after a redraw.

### Advanced topics

#### Opaque elements

gotoв expects the outermost DOM element of a reactive view, as well as its children, to not be modified directly by your code or that of another library. The reason is that if there's a 1:1 relationship between the output of a `vfun` and a DOM element, gotoв can rely on that information to recycle those elements in case of a view redraw.

It is possible to create `opaque` elements, by passing the property `opaque: true` to an element within the `vfun`. gotoв will treat `opaque` elements differently in case of a redraw: 1) it will always recreate them instead of updating them; 2) it won't recycle them to draw other parts of the view.

In my experience, `opaque` elements are mostly useful for 1) elements that need to be controlled by other libraries (for example, a date picker); and 2) non-HTML extensions to HTML, such as `<svg>`.

If, for example, you have a library that performs DOM manipulations on a given `<div>`, you could write your `vfun` as such:

```javascript
var calendar = function () {
   return B.view ('date', function (date) {
      // This element will be used by the date picker and can be arbitrarily manipulated.
      // Note that `date` will be placed as its value every time that the view is redrawn.
      return ['div', {opaque: true, value: date, class: 'datePicker'}];
   });
}

B.mount ('body', calendar);
```

Because opaque elements are completely remade every time that the reactive view is redrawn, you need to initialize the date picker every time there is a redraw. But gotoв doesn't provide hooks such as `afterRedraw` or the like. The way to do this is - you might have guessed it - through a responder with verb `change` and a path that's the same as that of the `vfun`:

```javascript
B.respond ('change', 'date', {priority: -1000}, function (x) {
   var datePicker = c ('.datepicker');
   // Here you initialize the date picker library passing `datePicker` to it.
});
```

Why the `priority: -1000` option? The details are explained in the [internals](#internals) section. But, in short, the reason is that you want the initialization to happen *after* the DOM of the view is redrawn, not *before*. The lower the priority of a responder, the later it gets executed. By using a priority with a very low number, you make sure that the responder gets matched after all DOM changes are performed by gotoв.

`vfuns` (through lith) support a `LITERAL` pseudo-tag, which lets you insert raw HTML into a view. If you use an HTML string to create DOM elements, you need to do it within an `opaque` element, otherwise you'd be changing the DOM tree of the view without gotoв knowing about it.

```javascript
// Don't do this!
var invalidOpaque = function () {
   return B.view ('foo', function (foo) {
      return ['div', ['LITERAL', '<a>Hello</a>']];
   });
}

// Rather, do this.
var validOpaque = function () {
   return B.view ('foo', function (foo) {
      return ['div', {opaque: true}, ['LITERAL', '<a>Hello</a>']];
   });
}
```

The example above is quite useless, but not so if you need to add SVG:

```javascript
var svg = function () {
   return B.view ('foo', function (foo) {
      return ['div', {opaque: true}, ['LITERAL', '<svg><circle cx="60" cy="60" r="50"/></svg>']];
   });
}
```

However, if you want to add some unescaped characters, you don't need to use `opaque` together with `LITERAL`:

```javascript
// This is fine and you don't need to make the element opaque
var text = function () {
   return B.view ('foo', function (foo) {
      return ['p', ['Hello', ['LITERAL', '&nbsp;'], 'Handsome']];
   });
}
```

#### Security and escaping

Please be aware that placing unfiltered user input into a `LITERAL` can easily expose your application to [Cross Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting).

```javascript
var username = '<script src="https://evil.domain.indeed/script.js">';

// pwned
var view = function () {
   return ['p', ['LITERAL', username]];
}
```

The same goes for receiving JSON inputs from users and inserting them into views without doing some filtering. For example, if a user gives you an array  and you place it in a view, the evil script will be loaded!

```javascript
var userdata = ['script', {src: 'https://evil.domain.indeed/script.js'}];

// pwned again
var view = function () {
   return ['div', userdata];
}
```

The following, however, is safe. The critical difference is that the array is not parsed, so it's interpreted as a string and properly escaped.

```javascript
var userdata = "['script', {src: 'https://evil.domain.indeed/script.js'}]";

// not pwned
var view = function () {
   return ['div', userdata];
}
```

Now for an interesting (if unlikely) corner case: can you write a normal reactive view within an opaque element? You could, and as long as you didn't modify its DOM element directly, it would be OK. It also has to be placed in the document, otherwise it would be considered a dangling element. Performance-wise, the nested reactive view will be completely redrawn if the outermost opaque element is redrawn.

```javascript
var corner = function () {
   return B.view ('date', function (date) {
      return ['div', {opaque: true}, [
         ['div', {class: 'calendar'}],
         B.view ('username', function (username) {
            return ['p', username];
         })
      ]];
   });
}
```

#### Redraw sequence and asynchronicity

As we described above, gotoв uses the event system to decide when to redraw reactive views. More precisely, when a `change` event is fired, those views with a path that match that of the event are redrawn. Views are implemented as responders.

The responders belonging to each view have negative priorities. This ensures that they are executed *after* responders with no priority defined (a responder with no priority define is assumed to have a priority of `0`). In this way, if a responder calls an event, your custom responders will be invoked before those that redraw the page. The purpose of this is to reduce the number of redraws.

The more nested a view is, the lower its priority is. This ensures that, if a view A contains a view B and both are affected by the same `change` event, only A will be redrawn. Since A contains B, B will be redrawn anyway, but just once, as part of the redrawing of A. Again, the purpose of this is to reduce the number of redraws.

gotoв performs all redraws synchronously. At any given time, there's at most one redraw being done. If further redraws are required while a redraw is taking place, they are queued and then executed in [First In First Out](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)).

Responder functions are also executed sequentially, one at a time, in a deterministic order. If your `rfuns` have asynchronous logic *and* you want the following responders to be matched *after* your asynchronous function finishes, you need to do two things: 1) return a `function`, so that the event system knows to wait until the asynchronous operation is complete; and 2) invoke `x.cb` when the `rfun` is done:

```javascript
B.respond ('wait', ['for', 'me'], function (x) {
   asyncOperation ('foo', 'bar', function () {
      x.cb ();
   });
   return x.cb;
});
```

Most often, this is not necessary, but it is good to be able to do it if needed. In particular, tightly controlling the asynchronous flow of execution can help optimize the number of requests done to the server.

#### Browser quirks (for old browsers)

For making `<select>` work properly in Firefox 3, add the property `autocomplete=off`.

Chrome <= 28 and Safari <= 8 sometimes require you to set the `value` of a `<select>` so that the correct option is selected, otherwise the first option is marked as selected even though there's another option that's selected:

```javascript
var select = function () {
   return B.view ('data', function (data) {
      // Note how we pass `value: data` on the <select> ; this is not needed on other browsers.
      return ['select', {value: data, onchange: B.ev ('set', 'data')}, dale.go (['a', 'b', 'c'], function (v) {
         return ['option', {selected: v === data, value: v}, v];
      })];
   });
}

B.mount ('body', select);
```

While gotoв itself (barely) works in Internet Explorer 8 and below, it doesn't come close to fixing all its broken edges. You'll have to do significant work to make your app work in those browsers. [This appendix](#lessons-from-the-quest-for-ie6-compatibility) might be of help.

## Internals

Most of gotoв's functions are quite transparent and have already been described in extensive detail. gotoв does rely heavily on the event system, but that's described in detail in [recalc's readme](https://github.com/fpereiro/recalc). The intrincate parts of gotoв are those that have to do with the reactive views created by `B.view` - that's what we'll cover in this section.

Reactive views are implemented as responders. There's a 1:1:1 relationship between a `vfun`, a DOM element and a responder with verb `change`. When an event with verb `change` matches the responder of a view, it's `rfun` executes the `vfun` and uses its output to either generate or update the DOM element.

Dangling views are not allowed by gotoв because if they were allowed, gotoв would not know when to delete their responders, if at all. This is particularly important with nested views: when an outermost view is redrawn, the responders of its nested reactive views are deleted. If a user wanted to repurpose some of these views, they would have to let gotoв know somehow. This complication can be completely eliminated by requiring this 1:1:1 relationship between `vfun`, responder and DOM element. `vfuns` can be reused, but not views. The performance hit of recreating views is minimal and the simplification of both the interface and implementation greatly benefits from this decision.

Assuming that its input is valid, an invocation to `B.view` will do two things:
- Return a lith that represents a single DOM element.
- Set up a responder for redrawing the view.

The first time that the view is drawn, the lith returned by `B.view` is taken by `B.mount` as an input, transformed into HTML and placed in the DOM. This is the *draw* flow.

When the view needs to be redrawn, the responder will be matched. The responder (or rather, the `rfun`) will invoke the same `vfun` (but passing new data to it) and pass the old version of the view plus the new version of the view to the function `B.redraw`. This is the *redraw* flow.

To make things more interesting, reactive views can be nested - actually, almost any non-trivial application needs nested reactive views. `B.view` uses a few tricks to manage this complexity:
- If a reactive view has reactive views as children, it links both the parent and the children together through some extra fields in the respective responders.
- Children reactive views have a responder with a lower priority than that of their reactive parent. In case that both the parent and the child need to be redrawn at the same time, the parent's redrawing takes priority, since that will also require a redraw of the children. So `B.view` also takes care to reduce the priority of all nested reactive views. The outermost reactive views will have a priority of -1, their immediate children a priority of -2, and so forth.

When a redraw happens, we need to do two things:
- Update the DOM.
- Eliminate the responders of the old nested reactive views, if any are present. This is necessary because nested reactive views are nested invocations to `B.view`; the nested invocations don't know anything about their surrounding context and they set up a new responder for themselves, so it's the parent's job to eliminate the responders of its old children.

Both jobs land on `B.redraw`. This function orchestates redraws and is invoked by the `rfun` of a reactive view. Before jumping into a redraw, however, `B.redraw` makes sure no other redraws are taking place simultaneously. For this, it implements a queue where the first redraws are done first and the other ones wait until the first ones conclude.

Once `B.redraw` goes forth with a particular redraw required by a `rfun`, it does the following:
- Delete the responders of the old children of the view being redrawn, through `B.forget`.
- Invoke `B.prediff` on the old and the new lith of the view. We'll cover this function shortly.
- Pass the prediffed liths to `B.diff` to obtain a minimal list of DOM operations to carry out.
- Pass the minimal list of DOM changes to `B.applyDiff`.
- If there are further redraws in the queue, invoke itself recursively, but making sure that the queued redraw hasn't been rendered irrelevant by the redraw that just happened (which may happen if the queued view was an old child of a just redrawn view).

`B.prediff` takes a lith and does the following:
- Flattens the lith structure (which is a tree) into a flat sequence of items, by using special notation to indicate the opening of a DOM element, the closing of a DOM element, opaque elements and literal elements.
- Takes any references to reactive views and updates them. This is necessary because parents might carry an out of date lith representation of their nested reactive views. For example, if view `x` contains view `y` and `y` is updated after `x`, `x`'s representation of `y` will be stale; by directly referecing `y`'s latest lith, this problem is avoided.
- In case there's a `<table>` in the diff, it makes sure that it contains a `<thead>` and a `<tbody>`, since these are automatically added by most browsers. In this way, the 1:1 relationship between the lith tree and the DOM is preserved.

`B.diff` is an implementation of the [Myers' diff algorithm](http://www.xmailserver.org/diff2.pdf) that takes the flattened liths outputted by `B.prediff` and produces a shortest edit script. The function gives us a minimal amount of changes that we need to perform on the DOM to go from the first array of strings to the second.

`B.diff` runs synchronously and blocks any other redraws (or any other js code running, really). Most of the time it runs quite quickly, but if the liths are very large, or they are very dissimilar to each other, the function will take too long to run. For this reason, after a certain amount of time, if the diff is not done, `B.diff` bails and declares that it cannot finish the diff in a reasonable amount of time. In this case, `B.redraw` will *trample* the old DOM element and create a new one from scratch that completely replaces it. By default, this happens after 200 milliseconds of running `B.diff`. *Tramples* are undesirable and can usually be eliminated by either reducing the sizes of liths by paginating long lists of items.

Most times, `B.diff` will produce a diff in time that can be then applied to the DOM. This task is picked up by `B.applyDiff`. For each element in the diff, it either `keeps` it, `adds` it or `removes` it. The types of elements are normal DOM elements, opaque elements (DOM elements that are treated as opaque entities) and literal elements (text). `B.applyDiff` performs the following operations:
- Do an entire pass on the diff to figure out the positions of the current DOM elements on the *old* lith.
- Perform a second pass to apply the diff:
   - Removed elements are sometimes recycled to transform them into added (new) elements.
   - Both kept and added elements are placed in the right parent element in the right position.

gotoв is fully deterministic:

- The ids of responders and reactive views are generated with a counter that gets incremented by one each time a reactive view is created, so that if the app code is also deterministic, the same responders and views will have the same ids when re-running the app. This is very helpful for debugging.
- The entire redraw flow (including the diff) is deterministic as well and will generate the same result, through the same operations, when re-running the app.

To quickly detect which DOM elements belong to reactive views, gotoв marks their id with the letter `в` followed by a number. This allows `B.unmount` to eliminate the responders of deleted views and `B.prediff` to know when to reference the lith of a nested reactive view.

```
Simplified execution diagram:

B.mount -> B.view -> B.listen

add|set|rem event -> change event -> responder set by B.view -> B.redraw

         -> B.prediff
B.redraw -> B.diff
         -> B.applyDiff
```

### Comparison to other frameworks

Although it provides the same functionalities than other frontend frameworks, gotoв's design is quite different to that of many frontend frameworks. Here's some things that are unusual (but not unique) about it:

- No compilation: gotoв expresses HTML & CSS with js object literals, so there's no need to take non-js markup and convert it into either HTML or js.
- A global event system: the store, the events and the responders all live in the same global space. Any scoping must be done through using a specific part of the store or by passing a specific prefix to event and responder paths. Because the state is global, there is no difficulty for any view to access any part of the view -- this means that there's no implicit lumping together of the organization of the state and the organization of the view.
- Redraws are synchronous and block the rest of the js.
- No lifecycle hooks for views: everything is expressed as either an event or a responder (including the redraw of views themselves). Everything is in [userland](https://en.wikipedia.org/wiki/User_space).
- No components: every view, responder and event lives in the same global space.
- Use of a textual diff algorithm to update views.
- Very see-through: the entire event system (including store, responders and events) can be inspected through the js console - all objects are exposed. They can also be directly modified.

## Source code

The complete source code is contained in `gotoB.js`. gotoв itself is about 680 lines long; its dependencies are about 1390 lines; the whole thing is about 2070 lines.

Below is the annotated source.

```javascript
/*
gotoB - v2.3.2

Written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

Please refer to readme.md to read the annotated source.
```

### Setup

We wrap the entire file in a self-executing anonymous function. This practice is commonly named [the javascript module pattern](http://yuiblog.com/blog/2007/06/12/module-pattern/). The purpose of it is to wrap our code in a closure and hence avoid making the local variables we define here to be available outside of this module.

```javascript
(function () {
```

If we're in node.js, we report an error and return `undefined`.

```javascript
   if (typeof exports === 'object') return console.log ('gotoв only works in a browser!');
```

We require the five dependencies of the library (available at global variables) and assign them to local variables:

- [dale](https://github.com/fpereiro/dale).
- [teishi](https://github.com/fpereiro/teishi).
- [lith](https://github.com/fpereiro/lith).
- [recalc](https://github.com/fpereiro/recalc).
- [cocholate](https://github.com/fpereiro/cocholate).

In the case of recalc, we initialize a recalc object and store it in the variable `r` - in the four other cases, the local variables are no more than a reference to the main object exported by each library.

```javascript
   var dale = window.dale, teishi = window.teishi, lith = window.lith, r = window.R (), c = window.c;
```

We create an alias to `teishi.type`, the function for finding out the type of an element. We also create an alias to `teishi.inc`, a function to determinen whether an element is contained in an array. We also create a function `time` to return the current time in milliseconds; if `Date.now` is not supported by the browser, we resort to `new Date ().getTime`.

```javascript
   var type = teishi.type, inc = teishi.inc, time = Date.now ? function () {return Date.now ()} : function () {return new Date ().getTime ()};
```

We define `B`, the main object of the library. Note we also attach it to `window.B`, so that it is globally available to other scripts.

This object has three keys that hold strings or numbers:

- `v`, a string containing the current version of the library.
- `B`, a one character string containing the [ve](https://en.wikipedia.org/wiki/Ve_(Cyrillic)) letter of the Cyrillic alphabet. This string is meant to be a handy reference to the letter, which will be used in some parts of the library.
- `t`, an integer timestamp to mark the time when gotoв is loaded. This is useful as an "instant zero" timestamp that can serve as reference for performance measurements.

The remaining seven keys of the main object map to recalc entities. The first one, `r`, maps to the single instance of recalc used by gotoв. The other six map to the public objects and methods of the recalc instance:

- `r.responders`, an array which contains all event responders.
- `r.store`, an object which is the global state.
- `r.log`, an array which contains all the events called and responders matched, used for debugging purposes.
- `r.call`, the function for emitting events.
- `r.respond`, the function for creating an event responder.
- `r.forget`, the function for deleting an event responder.

```javascript
   var B = window.B = {v: '2.3.2', B: 'в', t: time (), r: r, responders: r.responders, store: r.store, log: r.log, call: r.call, respond: r.respond, forget: r.forget};
```

gotoв is essentially a set of functions built on top of recalc. The last six keys are meant as shorthands to the corresponding recalc objects for quicker debugging from the browser console. If it wasn't for these shorthands, instead of writing `B.call`, for example, we'd have to write `B.r.call`, which is longer and doesn't look as nice.

### Error reporting

We define a function `B.error`, which we'll use to report errors when a gotoв function is used with invalid inputs. We will also store this function in `r.error`, so that recalc also uses it to report errors. This is necessary since we're directly exposing some recalc functions directly without writing gotoв wrappers for them - so we need these functions to pass its errors to gotoв so that gotoв can report them.

This function receives arguments which contain the contents of an error; it will emit an `error` event through `B.call` and return `false`.

```javascript
   r.error = B.error = function () {
```

If the first argument we receive is an object, we consider it to be a recalc execution context and store it in the local variable `x`.

```javascript
      var x = type (arguments [0]) === 'object' ? arguments [0] : undefined;
```

We collect all the arguments into a local variable `args`, taking care to ignore the context argument if it's present.

```javascript
      var args = dale.go (arguments, function (v) {return v}).slice (x ? 1 : 0);
```

We call an event through `B.call`, passing either the provided context (if present) or an empty context, plus the verb `error`, and the rest of the arguments, of which the first one will function as a path.

```javascript
      B.call.apply (null, [x || {}, 'error'].concat (args));
```

We return `false` and close the function. This return value is convenient since both recalc and some gotoв functions return `false` when they receive invalid inputs.

```javascript
      return false;
   }
```

We create an event responder for reporting an error. This responder has an `id` of `error` and will match any event with verb `error` (notice the `match` function, which only requires the event's verb to be `error` for the match to happen.

```javascript
   B.respond ({id: 'error', verb: 'error', path: [], match: function (ev) {return ev.verb === 'error'}}, function () {
```

The responder will add to the body a `<div>` with `id` `eventlog-snackbar` to the page to mark that there was an error. It will then remove it after 3 seconds through a timeout.

The `true` third argument passed to `lith.g` turns off lith's validation for this particular HTML generation, to make it faster.

```javascript
      document.body.innerHTML += lith.g (['div', {
         id: 'eventlog-snackbar', style: lith.css.style ({position: 'fixed', 'font-weight': 'bold', opacity: '0.8', top: 0, left: 0.1, width: 0.8, padding: 10, color: 'white', 'background-color': 'black', 'z-index': '10001', 'text-align': 'center'})
      }, 'There was an error.'], true);

      setTimeout (function () {
         if (c ('#eventlog-snackbar')) document.body.removeChild (c ('#eventlog-snackbar'))
      }, 3000);
```

We invoke `B.eventlog`, a function we'll define below and which will print a table with the events called and responders matched so far. We then close the responder.

```javascript
      B.eventlog ()
   });
```

We define `B.eventlog`, a function that prints a table with a list of the events called and the responders matched so far. This table can be very useful for debugging purposes. This function uses the information contained at `B.r.log`.

The function takes an single optional argument, `search`, a string that can be used to find for events and responders that have matching text.

```javascript
   B.eventlog = function (search) {
```

If there's already a DOM element with `id` `eventlog`, we remove it.

```javascript
      if (c ('#eventlog')) document.body.removeChild (c ('#eventlog'));
```

We define four variables for drawing the table of events:
- `index`, which will store the ordinal position of each event or responder.
- `colors`, a list of colors to assign to event & responder ids.
- `columns`, the columns for the table.
- `counter`, a variable that keeps track of how many rows we have added so far.
- `shorten`, a function that takes a string and returns a shortened version if the string is over `n` characters, also adding the number of characters omitted. If the string is more than `n` characters, it takes the extra characters from the middle of the string, rather than the end.

```javascript
      var index = {}, colors = ['#fe6f6c', '#465775', '#e086c3', '#8332ac', '#462749', '#044389', '#59c9a6', '#ffad05', '#7cafc4', '#5b6c5d'], columns = ['#', 'ms', 'type', 'id', 'from', 'verb', 'path', 'args'], counter = 0, shorten = function (s, n) {
         return s.length < n + 10 ? s : s.slice (0, Math.ceil (n * 2 / 3)) + ' [[[' + (s.length - n) + ' CHARACTERS OMITTED]]] ' + s.slice (- Math.floor (n / 3));
      }
```

We will add to the body a `<table>` element with `id` `eventlog`.


```javascript
      document.body.innerHTML += lith.g (['table', {id: 'eventlog'}, [
```

We add a `<style>` tag to add format to the `eventlog` table and some of its components.

```javascript
         ['style', ['#eventlog', {'display': 'block', 'table-layout': 'fixed', 'border-collapse': 'collapse', 'font-family': 'monospace', 'font-size': 18, position: 'absolute', 'top, left': 4, width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) - 22, 'z-index': '10000', border: 'solid 4px #4488DD'}, ['th, td', {'padding-left, padding-right': 10, 'border-bottom, border-right': 'solid 1px black', 'word-wrap': 'break-word', 'max-width': (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) / 4}]]],
```

We iterate the `columns` and generate a row with all the headers for the table.

```javascript
         ['tr', dale.go (columns, function (header) {
            return ['th', {style: lith.css.style ({'background-color': '#efefef'})}, header];
         })],
```

We iterate the entries of `B.log`, an array that contains a list of all the events called and all responders matched.

```javascript
         dale.go (B.log, function (entry) {
```

If `search` is defined, we filter out those entries that have no text that matches `search`. Note we perform case-insensitive search.

```javascript
            if (search !== undefined && ! JSON.stringify (entry).match (new RegExp (search, 'i'))) return;
```

We define a variable `responderFrom` that, in the case of a responder that has a `from` attribute, is of the form `ID/FROM` (`ID` being the `id` of the responder and `FROM` being the `id` of the event that matched the responder). If these conditions are not met, `from` is left as `undefined`.

```javascript
            var responderIndex = entry.id [0] !== 'E' && entry.from && entry.from.match (/^E\d+$/) ? (entry.id + '/' + entry.from) : undefined;
```

We set an entry in `index` to associate the event with element `id` with the position of this event or responder on the log. In the case of responders that have a `responderIndex`, we associate the entry with the string `responderId/eventId`; for all other responders and for events, we use the `id` itself.

Since a responder can be matched multiple times, using the `from` allows us to reference a particular matching of the responder. Since responders can only be matched by events, and events have unique ids, then an unambigous matching is possible if logging is turned on.

Note we use `counter` rather than the position of the entry on `B.log` in case we're filtering out some entries because `search` was passed to `B.eventlog`.

```javascript
            index [responderIndex || entry.id] = counter++;
```

We prepare the row on which we'll print the details of either the event or responder. We alternate a background color (with two types of grays). We also set two different classes for event vs. responder rows (`evlog-ev` and `evlog-resp`). For the `args` column, we make use of `shorten` (which we defined above) and `B.str` (which we'll define below). `B.str` is a function that will stringify each of the `args` so they can be printed properly.

```javascript
            return ['tr', {style: lith.css.style ({'background-color': {0: '#fcfcfc', 1: '#efefef'} [(counter - 1) % 2]}), 'class': entry.id [0] === 'E' ? 'evlog-ev' : 'evlog-resp'}, dale.go (['#' + counter, entry.t - B.t, entry.id.match (/^E\d+$/) ? 'event' : 'responder', entry.id, entry.from, entry.verb, entry.path.join (':'), shorten (dale.go (entry.args, B.str).join (', '))], function (value, k2) {
```

If we're printing the second column (`ms`), we round the value.

```javascript
               if (k2 === 1) return ['td', (value / 1000) + (! (value % 1000) ? '.0' : '') + (! (value % 100) ? '0' : '') + (! (value % 10) ? '0' : '') + 's'];
```

For all columns that are not the second (`ms`, already covered) or the fourth (`id`) or fifth (`from`), we merely print the corresponding value.

```javascript
               if (k2 !== 3 && k2 !== 4) return ['td', value];
```

For the `entry` and `from` columns (which contain references to events called), we add an `onclick` event to jump to that event on the table. We also apply a color taken from `colors` and based on the position of the event in the list. Note that for responders, since `index [value]` will be `undefined`, we use `index [from]` as the index.

In all cases, before using `row` we check whether it exists, since it may be absent if certain rows were filtered out by a `search` argument.

One more thing to notice about the `onclick` is that it performs a very simple animation when a row is selected, by using timeouts to set different gray backgrounds. This aids the visibility of the selected row and is compatible with all supported browsers.

```javascript
               var onclick = value === undefined ? '' : ('var row = c ({from: c ("#eventlog"), selector: "tr"}) [' + ((index [value] === undefined ? index [responderIndex] : index [value]) + 1) + ']; if (row) row.scrollIntoView (); if (row) row.style.background = "#8e8e8e"; if (row) setTimeout (function () {row.style.background = "#bebebe"}, 500); if (row) setTimeout (function () {row.style.background = "white"}, 1000);');
               return ['td', {onclick: onclick, style: lith.css.style ({cursor: 'pointer', 'font-weight': 'bold', color: colors [parseInt (index [value]) % colors.length]})}, value === undefined ? '' : value];
            })];
```

We close the iterating function and the call to `lith.g` - note the `true` parameter passed to `lith.g`, which will avoid validations when generating the HTML.

```javascript
         }),
      ]], true);
```

There's nothing left to do so we close the function.

```javascript
   }
```

### Data functions

In this section we define three functions for setting data and one for retrieving data from `B.store`. They are `add`, `rem`, `get` and `set`; the acronym *args* is a helpful mnemonic to remember them.

We start with `B.get`. This function takes as input a `path` (which can be a number, a string, or an array with zero or more numbers or strings).

```javascript
   B.get = function () {
```

 The `path` can be passed to `B.get` in two ways: either as an array, or as a list of arguments. For example, the path `['items', 0]` can be retrieved by either `B.get (['items', 0])` or `B.get ('items', 0)`.

If the first argument is an array, we will consider that array to be `path`. Otherwise, we will collect each of the arguments into an array and consider that array to be `path`.

```javascript
      var path = type (arguments [0]) === 'array' ? arguments [0] : dale.go (arguments, function (v) {return v});
```

If we're in production mode, we do not validate `path` to save execution time. We will see this pattern again in most of the functions of gotoв. If we're not in production mode, we invoke `r.isPath` to validate that `path` is a valid recalc `path` (that is, either an integer, a string, or an array made of strings and integers). If we validate `path` and it turns to be invalid, we report the error through `B.error`.

```javascript
      if (! B.prod && ! r.isPath (path)) return B.error ('B.get', 'Invalid path:', path) || undefined;
```

We create a local variable `target` pointing to `B.store`.

```javascript
      var target = B.store;
```

We will iterate `path`. If any of the iterations returns `false`, the loop will be interrupted.

```javascript
      return dale.stop (path, false, function (v, k) {
```

If we're not iterating the last element of `path` and `target [v]` is neither an object nor an array then the requested `path` is unreachable. For example, if `B.store` is empty and the requested `path` is `['items', 0]`, `B.get` will find that `B.store.items` is neither an array nor an object, in which case there's no point in trying to access `B.store.items [0]`. We will then return `false` to interrupt the iteration.

```javascript
         if (k < path.length - 1 && teishi.simple (target [v])) return false;
```

Otherwise, we update `target` to point to the specific object we're looking for. Here we can see that the iteration of `path` works by making `target` to be incrementally closer to the object we're looking for.

```javascript
         target = target [v];
```

If the iteration returns `false`, the `path` is unreachable, in which case we return `undefined`. Otherwise, we return `target`, which will contain the value we want to return. We close the function.

Notice that `target` may well be `undefined`, in which case `B.get` will also return `undefined`. This means that unreachable paths are by default considered to be `undefined` instead of throwing an error. This is the main reason for using `B.get` instead of accessing the properties of `B.store` directly.

```javascript
      }) === false ? undefined : target;
   }
```

We now define `B.set`, a function for setting a value into a certain path of the store.

This function will return `true` if successful and `false` if it encountered a validation error in its arguments.

```javascript
   B.set = function () {
```

This function takes two or three arguments:
- An optional context argument.
- `path`, the location in the store where `value` will be placed. If the context is present, this will be the second argument, otherwise it will be the first.
- `value`, which can be of any type. If the context is present, this will be the third argument, otherwise it will be the second.

```javascript
      var x    = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var path = arguments [x ? 1 : 0], value = arguments [x ? 2 : 1];
```

If we're not in production mode, we do not validate `path` to save execution time. Otherwise, we invoke `r.isPath` to validate that `path` is a valid recalc `path` (that is, either an integer, a string, or an array made of strings and integers). If we validate `path` and it turns to be invalid, we will report the error through `B.error` and return `false`.

```javascript
      if (! B.prod && ! r.isPath (path)) return B.error (x || {}, 'B.set', 'Invalid path:', path);
```

If `path` is not an array (in which case it must be either an integer or a string), we wrap it into an array.

```javascript
      if (type (path) !== 'array') path = [path];
```

If `path` has length 0, we will overwrite `B.store`:

```javascript
      if (path.length === 0) {
```

If we're not in production mode, we check that `value` is either an array or an object. If it's neither, we report an error and return `false`.

```javascript
         if (! B.prod && teishi.simple (value)) return B.error (x || {}, 'B.set', 'Cannot set B.store to something that is not an array or object:', value);
```

We set `B.store` to `value` and return `true`. There's nothing to do for this case, so we close the block.

```javascript
         B.store = value;
         return true;
      }
```

We check what's the type of the first element of `path`, to make sure that `B.store` is of the right type.

```javascript
      var storeType = type (path [0]) === 'string' ? 'object' : 'array';
```

If the store is an object and the first element of `path` is an integer, or the store is an array and the first element of `path` is a string, we overwrite the entire store with either an array or an object, respectively.

```javascript
      if (type (B.store) !== storeType) B.store = storeType === 'object' ? {} : [];
```

We create a local variable `target` pointing to `B.store`.

```javascript
      var target = B.store;
```

We iterate the elements of `path`. The purpose of the loop is to update `target` until we find the place in `B.store` where we can set `value`. This loop will also create (or overwrite) the necessary arrays and objects required by `path`.

```javascript
      dale.go (path, function (v, k) {
```

If we're iterating the last element the path, we set `target [v]` to `value` and exit the loop.

```javascript
         if (k === path.length - 1) return target [v] = value;
```

We check the type of the *next* element of the path and store it on `targetType`. If it's a string, the new target should be an object, otherwise it should be an array.

Notice that this check will happen for all elements of the path except the last (which we covered just above). Notice also that because we're looking ahead to the *next* value, we had to check the right type of `B.store` outside of the loop.

```javascript
         var targetType = type (path [k + 1]) === 'string' ? 'object' : 'array';
```

If `target [v]` is not of the right type, we overwrite it with either an empty object or array.

```javascript
         if (type (target [v]) !== targetType) target [v] = targetType === 'object' ? {} : [];
```

We set `target` to `target [v]`. There's nothing else within the loop, so we close it.

```javascript
         target = target [v];
      });
```

We return `true` and close the function.

```javascript
      return true;
   }
```

We now define `B.add`, which pushes elements onto an existing array. This function takes an optional context argument and a mandatory [recalc `path`](https://github.com/fpereiro/recalc#rcall), plus other optional arguments. These extra arguments are the elements that will be pushed onto the array located at `path`.

```javascript
   B.add = function () {
```

If the first argument is an object, we will consider it to represent a context argument. `path` will be either the first argument (if no context is present) or the second argument (if context is present).

```javascript
      var x    = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var path = arguments [x ? 1 : 0];
```

If we're not in production mode, we invoke `r.isPath` to validate that `path` is a valid recalc `path` (that is, either an integer, a string, or an array made of strings and integers). If we validate `path` and it turns to be invalid, we report the error through `B.error` and return `false`.

```javascript
      if (! B.prod && ! r.isPath (path)) return B.error (x || {}, 'B.add', 'Invalid path:', path);
```

We check the value of `path` using `B.get`. If `path` is still undefined, we set it to an empty array using `B.set`. For example, if `path` is `['items']` and `B.store` is empty, after this operation, `B.store.items` will be an empty array. If, instead, `path` is `['data', 'items']` and `B.store` is empty, after this operation `B.store.data` will be an object and `B.store.data.items` will be an empty array.

```javascript
      if (B.get (path) === undefined) B.set (path, []);
```

We define a local variable `target` where we will store a reference to the array where we want to push our items.

```javascript
      var target = B.get (path);
```

If we're not in production mode, we check whether `target` actually points to an array. If it doesn't, we report the error and return `false`.

```javascript
      if (! B.prod && type (target) !== 'array') return B.error (x || {}, 'B.add', 'Cannot add to something that is not an array. Path:', path);
```

We iterate the arguments received by the function.

```javascript
      dale.go (arguments, function (v, k) {
```

If we're iterating an argument that's neither the context nor `path`, we push it onto `target`. Notice that if we pass no arguments, no elements will be pushed onto `target`.

```javascript
         if (k > (x ? 1 : 0)) target.push (v);
      });
```

We return `true` and close the function.

```javascript
      return true;
   }
```

We now define `B.rem`, the last data function. Besides an optional context argument, this function takes a `path` as its first mandatory argument, and then additional arguments. These additional arguments represent *keys* that will be removed from the object or array at `path`.

```javascript
   B.rem = function () {
```

If the first argument is an object, we will consider it to represent a context argument. `path` will be either the first argument (if no context is present) or the second argument (if context is present).

```javascript
      var x    = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var path = arguments [x ? 1 : 0];
```

If we're not in production mode, we validate `path`. If it's invalid, we report the error through `B.error` and return `false`.

```javascript
      if (! B.prod && ! r.isPath (path)) return B.error (x || {}, 'B.rem', 'Invalid path:', path);
```

We define two local variables: `target`, to hold the object or array we will remove keys from; and `targetType`, a variable to hold the type of `target`.

```javascript
      var target     = B.get (path);
      var targetType = type (target);
```

We define `keys`, the list of keys to be removed from `target`. These can be provided in two ways: either as additional arguments, or with the argument coming after `path` being an array of keys. If the argument coming after `path` is an array, we will consider it to contain a list of keys; otherwise, we will collect all additional arguments into an array.

```javascript
      var keys       = type (arguments [x ? 2 : 1]) === 'array' ? arguments [x ? 2 : 1] : dale.go (arguments, function (v) {return v}).slice (x ? 2 : 1);
```

If we're not in production mode, we will perform further validations:

```javascript
      if (! B.prod && teishi.stop ('B.rem', [
```

`targetType` must be array, object or `undefined`. Why `undefined`? If we are trying to remove keys from a path that has nothing, we will consider this to be a [no-op](https://en.wikipedia.org/wiki/NOP_(code)), exactly like the case where no additional arguments are passed to `B.add`.

```javascript
         ['type of target', targetType, ['array', 'object', 'undefined'], 'oneOf', teishi.test.equal],
```

If `target` is an array, we check that each of `keys` are integers; and if `target` is an object, we check that each of `keys` are strings.

```javascript
         targetType === 'array'  ? ['keys of array target',  keys, 'integer', 'each'] : [],
         targetType === 'object' ? ['keys of object target', keys, 'string',  'each'] : []
```

If any of these validations is not passed, we report the error through `B.error` and return `false`.

Note that we pass `true` as the last argument to `teishi.v`, to avoid validating the rules that we pass to the function and hence improve performance. We will do this with all forthcoming invocations to `teishi.v` and `teishi.stop`.

```javascript
      ], function (error) {
         B.error (x || {}, 'B.rem', error, 'Path:', path);
      }, false)) return false;
```

If `targetType` is an object, we merely iterate `keys` and [`delete`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) them from the `target`.

```javascript
      if (targetType === 'object') dale.go (keys, function (v) {delete target [v]});
```

If `targetType` is an array:

```javascript
      if (targetType === 'array') {
```

We copy `keys` (which, in this case, contains integers) and then sort it so that the greatest keys come first. We copy the array so that if a `keys` array was passed, we don't modify it as a side effect of executing `B.rem`.

```javascript
         keys = teishi.copy (keys);
         keys.sort (function (a, b) {return b - a});
```

For each of the keys, we remove them from the array with splice - since we remove the keys from the end to the beginning, there's no possibility that the original indexes will be shifted. If we did this the other way around and (call) we removed the first element of the array, we would have to decrement all the `keys` by 1, otherwise we would be removing the wrong elements.

```javascript
         dale.go (keys, function (v) {target.splice (v, 1)})
      }
```

There's nothing else to do, so we return `true` and close the function. Note that if `targetType` is `undefined`, the function does nothing except for returning `true`.

```javascript
      return true;
   }
```

### `B.mrespond`

We define a helper function to perform multiple invocations to `B.respond`. This simplifies a pattern where a group of responders are defined one after the other.

This function takes an array of arrays as argument. Each of these arrays is a list of arguments to be passed to `B.respond`.

```javascript
   B.mrespond = function (responders) {
```

We iterate `responders` and `apply` them, one by one, to `B.respond`. There's nothing else to do, so we close the function.

```javascript
      dale.go (responders, function (responder) {
         B.respond.apply (null, responder);
      });
   }
```

### Change responders

We're now ready to define the three data responders. These functions are wrappers around the three data functions that modify the store: `add` for `B.add`, `rem` for `B.rem` and `set` for `B.set`.

These responders do the following: 1) invoke the underlying data function; 2) if the data function executed correctly (because its arguments were valid) *and* the store was modified, a `change` event will be triggered.

We will also add three *mute* data responders, which will do the same as their talkative counterparts, except for calling `change` events. In other words, mute data responders will invoke the underlying data function but will **not** trigger `change` events.

We iterate the six verbs.

```javascript
   dale.go (['add', 'rem', 'set', 'madd', 'mrem', 'mset'], function (verb, k) {
```

For each of these verbs, we invoke `B.respond` to create an event responder. We set both its `id` and `verb` to the verb itself, and we set its path to an empty array. By setting the path to an empty array, this event will be triggered by any event that has the same verb, regardless of its path.

We pass a `match` function to use special matching logic for these functions.

```javascript
      B.respond ({id: verb, verb: verb, path: [], match: function (ev, responder) {
```

The `match` function will return `true` if the verb of the event matches that of the responder. This means that as long as both verbs match, this responder will be matched by an event with any path.

```javascript
         return r.compare (ev.verb, responder.verb);
      }}, function (x) {
```

For the mute responders, we will invoke the corresponding data function with the context as the first argument, the `path` as its second argument and passing along further arguments (if they're there). That will be the only action performed by the mute responders, so we can `return`.

```javascript
         if (k > 2) return B [verb.replace (/^m/, '')].apply (null, [x, x.path].concat (x.args || []));
```

We create a reference to the existing value of `x.path` and store it on a local variable `previousValue`. If the operation is `add` or `rem`, we copy the value, because if the target is an array or object and we modify it through this operation, we will lose its original value and hence cannot know whether it will have changed. If the operation is `set`, we don't need to copy it since it will either be overwritten with a new object/array, or with the already existing one.

```javascript
         var previousValue = verb === 'set' ? B.get (x.path) : teishi.copy (B.get (x.path));
```

If we're here, the responder is a non-mute one. We invoke the corresponding data function with the context as the first argument, the `path` as its second argument and passing along further arguments (if they're there). If this function invocation returns `false`, there was an error in the arguments passed to the function, so the handler will stop executing. If this function invocation didn't return `false`, but the part of the store at `path` did not change, the handler will also stop executing, since all remaining actions are concerned with firing `change` events.

```javascript
         if (B [verb].apply (null, [x, x.path].concat (x.args || [])) === false || teishi.eq (previousValue, B.get (x.path))) return;
```

If we're here, we are dealing with the cases of `add` and `set` after a successful execution of a data function that modified the store. We trigger a `change` event on the path. We also pass `previousValue` as an extra argument since it will be useful for `change` responders to detect whether there was a change in the value of their path.

```javascript
         if (verb !== 'rem') return B.call (x, 'change', x.path, B.get (x.path), previousValue);
```

For the case of `rem`, we might have to fire multiple `change` events. This is because multiple elements can be removed with a single call - more precisely, one per each of the `args`. To give an example: if `path` is `X`, and we pass `[Y, Z]` as `args`, then `change` events should be fired on `X.Y` and `X.Z`.

To do this, we will iterate `x.args` and fire `change` events on each of these paths that are built by concatenating each `arg` to the `path`.

```javascript
         dale.go (x.args, function (arg) {dale.go (arg, function (arg) {
            B.call (x, 'change', x.path.concat (arg), undefined, previousValue [arg]);
         })});
```

There's nothing else to do, so we close both the handler for the responder and the iterating function.

```javascript
      });
   });
```

We now define `B.changeResponder`, a helper function meant to be passed as a `match` paramter to certain responders on the `change` event.

This function solves the following problem: if a certain reactive element depends on a path `a.b.c`, it shouldn't only be redrawn when `a.b.c` is changed; it should also be redrawn when `a.b`, `a` and even the root path changes. It should also be redrawn when any path starting with `a.b.c` is changed as well. This is what this function will do.

This function is meant to be used as a `match` parameter passed to a responder. Those parameters are functions that receive two elements, an `event` and a `responder`.

```javascript
   B.changeResponder = function (ev, responder) {
```

If the verb of both the event and the responder don't match, we return `false` to indicate there's no match. Notice we use `r.compare` to perform the comparisons, instead of a mere equality. `r.compare` contains logic to support wildcards and regexes.

```javascript
      if (! r.compare (ev.verb, responder.verb)) return false;
```

If either path is empty, there must be a match - following the logic we're implementing, an event with empty path affects all responders with a matching verb, whereas a responder with an empty path is concerned with any event with a matching verb.

```javascript
      if (ev.path.length === 0 || responder.path.length === 0) return true;
```

We take whatever is shortest, the event's path or the responder's path, and we compare each of their elements. If all of them match, the function will return `true`, or `false` otherwise.

```javascript
      return dale.stop (dale.times (Math.min (ev.path.length, responder.path.length), 0), false, function (k) {
         return r.compare (ev.path [k], responder.path [k]);
      });
```

We close the function.

```javascript
   }
```

### `B.ev`

We start this section by defining `B.str`, a helper function only used by `B.ev`. This function has the purpose of stringifying its input so that it can be placed within a DOM event handler. This function takes an `input` of any type.

Additionally, it takes an optional `noQuotesOnString` flag that, if `input` is a string, will prevent `B.str` from putting quotes around it. Only `B.eventlog` will invoke `B.str` using this flag.

```javascript
   B.str = function (input, noQuotesOnString) {
```

We note the type of `input`.

```javascript
      var inputType = type (input);
```

If `input` is neither an array nor an object, we're dealing with a single value. If it is a string, we stringify it (but only if `noQuotesOnString` is disabled) and return it. Otherwise, we coerce it into a string and return it. By coercing non-strings into strings, we can obtain strings that represent javascript values that cannot be stringified, like `NaN`, `Infinity`, `undefined` or regular expressions.

```javascript
      if (inputType !== 'array' && inputType !== 'object') return inputType === 'string' ? (noQuotesOnString ? input : teishi.str (input)) : (input + '');
```

If `input` is an array, we recursively invoke `B.str` on all its elements, join the results by a comma and a space; we finally wrap the output with square brackets and return the resulting string.

```javascript
      if (inputType === 'array') return '[' + dale.go (input, function (v) {return B.str (v)}).join (', ') + ']';
```

If we're here, `input` is an object. We iterate the object; for each of its items, we stringify the key and append a colon, a space and the value of recursively invoking `B.str` on the value itself. We join these results by a comma and a space, and finally wrap the whole thing with curly brackets. We return the resulting string and close the function.

```javascript
      return '{' + dale.go (input, function (v, k) {
         return teishi.str (k) + ': ' + B.str (v);
      }).join (', ') + '}';
   }
```

We define a helper function, `B.evh`, to retrieve the attributes of a given DOM element. This function will be used from the stringified event handlers created by `B.ev` below.

```javascript
   B.evh = function (element) {
```

We retrieve the attributes from the element using `c.get`, iterate them and create an object out of them, ignoring those attribute names that start with the prefix `on` (which are event handlers that we want to skip). We return this object and close the function.

```javascript
      return dale.obj (c.get (element), function (v, k) {
         if (! k.match (/^on/)) return [k, v];
      });
   }
```

We now define `B.ev`, one of the core functions of gotoв. This function has the purpose of creating stringified event handlers that we can place into DOM elements.

```javascript
   B.ev = function () {
```

If `B.ev` receives an array as its first argument, we expect each of the events to be wrapped in an array. Otherwise, we expect all the arguments received by `B.ev` to represent a single event. Notice that if no arguments are received, we consider `B.ev` to receive no events at all. We collect all the events in an array named `evs`.

```javascript
      if (type (arguments [0]) === 'array') var evs = arguments;
      else                                  var evs = arguments.length === 0 ? [] : [dale.go (arguments, function (v) {return v})];
```

If we're not in production mode, we make sure that each of the elements of `evs` is 1) an array, where 2) the first element is a string and 3) the second element is a valid path. If any of these conditions is not met, an error will be notified through `B.error` and `B.ev` will return `false`. An exception to 2) and 3) is when the array itself is empty, which means this is a no-op.

```javascript
      if (! B.prod && teishi.stop ('B.ev', dale.go (evs, function (ev) {
         return [
            ['ev', ev, 'array'],
            ev.length ? function () {return [
               ['ev.verb', ev [0], 'string'],
               function () {
                  return r.isPath (ev [1]) ? true : B.error ('B.ev', 'Invalid path:', ev [1], 'Events:', evs);
               }
            ]} : []
         ];
      }), function (error) {
         B.error ('B.ev', error, 'Events:', evs);
      }, false)) return false;
```

We create `output`, a string that will contain the output of a function.

We initialize `output` with the code needed to invoke `B.call` with the following arguments: `'ev'` as the verb, `event.type` (a string with the name of the event being called) as the `path`; as its third argument, we pass the result of invoking `B.evh` with `this` (the DOM element which received the event) as its only argument. This third argument will contain an object with all attribute names and values, *except* for those that are event handlers and start with *on* (i.e.: `onclick`, `oninput`).

If `event` is not defined (which can happen with an event handler triggered directly instead of through an event), instead of `event.type` we pass as path an `"undefined event"` string.

Invoking `B.call` will generate an id. We store this id in a variable `id` that is local to the event handler.

```javascript
      var output = 'var id = B.call ("ev", event ? event.type : "undefined event", B.evh (this));';
```

We iterate each of the events to be called. For each of them, we will append to `output` an invocation to `B.call`.

```javascript
      dale.go (evs, function (ev) {
```

We define a `defaultValue` that we will use if `ev` only has a verb and a path. In all browsers except for Firefox 3 and below, it will be `'this.value'`, which is a reference to the value of the element. To work around a quirk of Firefox <= 3, if that value is not present we default to  `this.attributes.value.nodeValue`, or an empty string if that value is also falsy.

```javascript
         var defaultValue = ! B.internal.oldFF ? 'this.value' : 'this.value || (this.attributes.value ? this.attributes.value.nodeValue : "")';
```

We invoke `B.call` passing as its first argument a context object with the `from` key set to `id` (so that this event can be tracked to the DOM event that generated it.

After this, we iterate the elements of `ev` - notice that if this `ev` has only a verb and a path, we add a third argument `{raw: defaultValue}`, which we'll review in a minute.

Notice also we concatenate items to the `output` only if the event itself is not an empty array - that is, if it doesn't represent a no-op.

```javascript
         if (ev.length) output += ' B.call ({"from": id}, ' + dale.go (ev.length === 2 ? ev.concat ({raw: defaultValue}) : ev, function (v, k) {
```

`B.ev` has a mechanism to allow you to pass raw arguments to `B.call`. A raw event is a string that is not stringified, and thus can be used to access the event properties directly. For example, if you want to access the value of an `input` field, you would need the raw argument `this.value`. To represent raw elements, `B.ev` expects an object with a key `raw` and a value that is a string.

Going back to the default value of `{raw: defaultValue}`: when no arguments are passed, a very useful default is to return the value of the element - for example, for handlers with `<input>` or `<textarea>` elements.

If we're iterating the third element of the `ev` onwards (which means that we've already covered `verb` and `path`) and the object has a `raw` key with a string as value, we merely return the value without stringifying it. Notice that if any other keys are present in the object, we ignore them.

```javascript
            if (k > 1 && type (v) === 'object' && type (v.raw) === 'string') return v.raw;
```

If the element doesn't represent a `raw` argument, we stringify it through `B.str` and return it.

```javascript
            return B.str (v);
```

We join the elements by a comma and a space; then append a closing parenthesis (to close the invocation to `B.call`) and a semicolon.

```javascript
         }).join (', ') + ');';
```

We close the iteration of each `ev`.

```javascript
      });
```

 We return `output` and close the function.

```javascript
      return output;
   }
```

### `B.mount` & `B.unmount`

We now define `B.mount`, a function that will place liths onto a target element.

```javascript
   B.mount = function (target, fun) {
```

If we're not in production mode, we check that `target` is a string that identifies either the `body` or an `id` selector - otherwise, we report an error and return `false`.

```javascript
      if (! B.prod && type (target) !== 'string' || ! target.match (/^(body|[a-z0-9]*#[^\s\[>,:]+)$/)) return B.error ('B.mount', 'Target must be either \'body\' or an id selector, but instead is:', target);
```

We find the `element` and store it in a local variable.

```javascript
      var element = target === 'body' ? document.body : document.getElementById (target.replace (/.*#/g, ''));
```

If `B.prod` is falsy, we make sure that `element` exists and that `fun` is a function.

```javascript
      if (! B.prod) {
         if (! element)                 return B.error ('B.mount', 'Target not found:', target);
         if (type (fun) !== 'function') return B.error ('B.mount', 'fun must be a function but instead is', fun, 'with type', type (fun));
      }
```

`fun` is the function that will return an element (or multiple elements) in the shape of a lith. We invoke this function with no arguments and store the result in a variable `elem`.

```javascript
      var elem = fun ();
```

If we're not in production mode, we validate `result` through `B.validateLith`. `result` must be either a lith or a lithbag, otherwise an error will be reported and the function will return `false`.

```javascript
      if (! B.prod) {
         var result = B.validateLith (elem);
         if (result !== 'Lith' && result !== 'Lithbag') return B.error ('B.mount', 'function returned invalid lith or lithbag', result.error);
      }
```

We generate HTML from `elem` using `lith.g` - note we pass `true` as a second argument to avoid `lith.g` validating its input again. We then place it at the bottom of the `target`, using `c.place`.

```javascript
      c.place (target, 'beforeEnd', lith.g (elem, true));
```

We close the function.

```javascript
   }
```

We now define `B.unmount`, a function that will clear a `target` (presumably already mounted by `B.mount`) and `forget` all the event responders of the reactive views contained within `target`.

```javascript
   B.unmount = function (target) {
```

If we're not in production mode, we check that `target` is a string that identifies either the `body` or an `id` selector - otherwise, we report an error and return `false`.

```javascript
      if (! B.prod && type (target) !== 'string' || ! target.match (/^(body|[a-z0-9]*#[^\s\[>,:]+)$/)) return B.error ('B.unmount', 'Target must be either \'body\' or an id selector, but instead is ' + target);
```

We find the `element` and store it in a local variable.

```javascript
      var element = target === 'body' ? document.body : document.getElementById (target.replace (/.*#/g, ''));
```

If we're not in production mode, we make sure that `element` exists.

```javascript
      if (! B.prod && ! element) return B.error ('B.unmount', 'Target not found:', target);
```

We iterate all the elements within `element` - if their `id` has a `в` followed by a string of alphanumeric characters, it represents a reactive element. We then apply `B.forget` to it. Since some of these elements are nested, they might have been just deleted by their parent just being forgotten - for that reason, we check that they still exist before calling `B.forget`.

```javascript
      c ({selector: '*', from: element}, function (child) {
         if (child.id && child.id.match (/^в[0-9a-f]+$/g) && B.responders [child.id]) B.forget (child.id);
      });
```

We overwrite the `innerHTML` of `element` with an empty string and close the function.

```javascript
      element.innerHTML = '';
   }
```

### `B.view`

We now define the main function of the library, `B.view`. This function returns DOM viewents that are updated when a certain part of the store is updated. The function takes two arguments: `path` and `fun`.

```javascript
   B.view = function (path, fun) {
```

`path` can represent either a single path or an array of paths. To make the implementation simpler, we create a variable `paths` that will represent an array of paths.

```javascript
      var paths;
```

If `paths` is not an array, it should be either a string or a number. In this case, we wrap `path` with two arrays; one to convert the single-element path into an array with one element; and the second one, to convert it into an array of paths.

If `paths` is an array but its first element is not an array, then we're dealing with a single path. If this is the case, we wrap it in an array so that `paths` represents a list of paths.

Otherwise, `path` must be an array of paths, in which case we set `paths` to it.

```javascript
      if      (type (path) !== 'array')     paths = [[path]];
      else if (type (path [0]) !== 'array') paths = [path];
      else                                  paths = path;
```

If we're not in production mode, we perform validations on the input.

```javascript
      if (! B.prod && teishi.stop ('B.view', [
```

We iterate `paths` and apply `r.isPath` to determine whether they are valid paths. If any of these validations fail, an error will be notified through `B.error`.

```javascript
         dale.stopNot (paths, false, function (path) {
            return r.isPath (path) ? true : B.error ('B.view', 'Invalid path:', path);
         }),
```

`fun` must be a function. Note we wrap this rule in a function to avoid [conditional capture](https://github.com/fpereiro/teishi#conditional-rules).

```javascript
         function () {return ['fun', fun, 'function']}
```

If any of these conditions is not met, an error will be notified through `B.error` and `B.view` will return `false`.

```javascript
      }), function (error) {
         B.error ('B.view', 'Validation error:', error, 'Path:', path);
      }, false)) return false;
```

We define `id`, a variable that will hold the id for the element that will contain the produced view. The id will start with `B.B` (`в`) and will be appended with a counter (that is stored on `B.internal.count`). gotoв expects the container elements of its reactive views to have ids comprised of `в` followed by digits.

```javascript
      var id = B.B + B.internal.count++;
```

We define `makeElement`, a function that will contain most of the implementation logic for `B.view`; we put this logic inside a function because we will invoke it more than once within `B.view`.

```javascript
      var makeElement = function () {
```

We copy the current value of `B.internal.count` and define an empty array `children`.

```javascript
         var count = B.internal.count, children = [];
```

We invoke `fun`, passing the current values of each of `paths` as an argument (we fetch the values through `B.get`. We store the result in a variable `elem`. We also create a variable `validation`, which if we're in production mode will merely be `Lith`; if we're not in production mode, we will invoke `B.validateLith` (which is defined below) and place its result there.

```javascript
         var elem = fun.apply (null, dale.go (paths, B.get)), validation = B.prod ? 'Lith' : B.validateLith (elem);
```

If `elem` is not a lith, we report an error through `B.error` and return `false`.

```javascript
         if (validation !== 'Lith') return B.error ('B.view', 'View function at path', path, 'must return a lith element but instead returned' + (validation.error ? ' an invalid lith: ' : ' a lithbag') + (validation.error || ''));
```

If we're not in production mode, we check that `elem` doesn't contain an `id` attribute, since that attribute must be set by `B.view`. This also prevents a `vfun` returning the direct output of another `vfun`, which would break the 1:1 correspondence between a responder and a reactive DOM element.

```javascript
         if (! B.prod && type (elem [1]) === 'object' && elem [1].id !== undefined) return B.error ('B.view', 'View function at path', path, 'must return a lith element without an id attribute but instead returned an element with id ' + elem [1].id);
```

We now find the reactive views that are children of the current one (if any). To do this, we make use of the fact that all reactive views have as id `в` followed by a number. Nested calls to `B.view` will by now have been executed, so `B.internal.count` will be updated.

For example, if this invocation to `B.view` has id `в1`, and it has two nested reactive views (`в2` and `в3`), `count` will be 2 and `B.internal.count` will be 4. We create a list of integers, starting with `count` and continuing until the number of the last reactive view. For each of the children:

```javascript
         dale.go (dale.times (B.internal.count - count - 1, count), function (k) {
```

As we'll see in a moment, reactive views are implemented as responders. We store the responder into a variable. Note that the id of the responder is the same as the id of the view.

```javascript
            var responder = B.responders [B.B + k];
```

If the `responder` has no parent, we add the responder to `children` and set the `parent` of the responder to the `id` of the current view. Note that `children` will only contain nested views that are only one level deep; doubly nested views will not be in the `children` array for the current view.

```javascript
            if (! responder.parent) {
               children.push (responder.id);
               responder.parent = id;
            }
```

We reduce the `priority` of the responder by the priority of the outermost view. This will ensure that in case that two reactive views are matched with the same event, outermost routes will be redrawn first. Our goal is to have a priority of -N-1 for reactive views that are N-deep nested into other reactive views, with the outermost reactive views having a priority of -1.

This line requires more explanation. Once a redrawing takes place, the nested views are redrawn from the inside out - that's simply how the pattern works, a function A that calls a function B has to wait until function B is executed to finish its own execution. Let's cover a few cases:

- An outermost nested view (priority -1) with a nested view is redrawn; the nested view is created from scratch with a responder with a priority of -1. Then, when we update the outermost nested view, we'll lower the nested view's priority by 1, so it will again have the proper priority, -2. We don't touch the responder of the outermost redrawn view.
- An outermost nested view (priority -1) with a nested view with another nested view inside. The outermost view is redrawn; the execution starts with the innermost nested view, it gets a priority of -1. Then the middle nested view is redrawn, it gets a priority of -1 and it reduces the priority of the innermost view by -1, so it's now -2. Then the outermost view finishes and it reduces the priorities of both nested views by -1, to -2 and -3 respectively.
- A non-outermost nested view (priority -3, say) with a nested view with another nested view inside. The outermost view is redrawn; the execution starts with the innermost nested view, it gets a priority of -1. Then the middle nested view is redrawn, it gets a priority of -1 and it reduces the priority of the innermost view by -1, so it's now -2. Then the outermost view finishes and it reduces the priorities of both nested views by -3, to -4 and -5 respectively.

```javascript
            responder.priority = responder.priority + B.responders [id].priority;
```


We are done iterating the nested reactive views.

```javascript
         });
```

We create an `attribute` objects. If the second element of `elem` is an object, we iterate it using `dale.obj` - otherwise, we iterate an empty object.

In both cases, we use a new base object with the desired `id` and `path`. The `path` property of the element consists of all the `paths`, stringified and joined by `, `. This provides a quick way to identify the path(s) of a reactive view from the DOM inspector.

In case a `path` is `[]`, which means a reference to the entire `B.store`, we represent the `path` as a single colon.

```javascript

         var attributes = dale.obj (type (elem [1]) === 'object' ? elem [1] : {}, {
            id: id,
            path: dale.go (paths, function (path) {return path.join (':') || ':'}).join (', ')
```

We set the attributes from the original attributes (if any), ignoring `id` and `path`. Note we lowercase the attribute name before comparing the attribute names.

```javascript
         }, function (v, k) {
            if (! inc (['id', 'path'], k.toLowerCase ())) return [k, v]
         });
```

You may ask: why do we create a new `attributes` object if there's one there already? This is because we always want `id` and `path` to appear first in the list of properties of the element, for consistency purposes. When DOM elements are recycled, user defined properties will appear after `id` and `path` (which remain unchanged if the reactive element is recycled). By enforcing this order, HTML properties will always be in the same order. Besides, having `id` and `path` always at the beginning make it easier to scan the DOM.

We create a shallow copy of `elem` - a new array with each of its elements being the same of those of `elem`. We overwrite the local variable `elem` with this new array. The reason for this is that we will overwrite or add attributes to `elem`, and we don't want to modify the original `elem` returned by `makeElement` in case `makeElement` directly references a lith in the store.

```javascript
         elem = elem.slice ();
```

If the returned lith has no attributes, we add `attributes` in its second position. We use `splice` instead of `push` since the element might include contents, and the attributes must go between the tag and the contents.

Otherwise, we overwrite the second element of `elem` with `attributes`.

```javascript
         if (type (elem [1]) !== 'object') elem.splice (1, 0, attributes);
         else                              elem [1] = attributes;
```

We set the `id` of the element.

```javascript
         elem [1].id    = id;
```

```javascript
         elem [1].path = dale.go (paths, function (path) {return path.join (':')}).join (', ');
```

We update the `responder` with two properties: the element itself (`elem`) and the array with its topmost nested reactive views (`children`). This will be necessary for redraws.

```javascript
         B.responders [id].elem     = elem;
         B.responders [id].children = children;
```

We return `elem` and close `makeElement`.

```javascript
         return elem;
      }
```

We register a responder for the reactive view. The responder has the following properties:

- It will match only events with verb `change`.
- Its path is set to `[]`, but this is just a placeholder. It is in fact overridden by the `match` function, which we'll see in a moment.
- Its `id` is the id we defined above.
- Its priority is -1; this means that redraw elements will be matched after all responders with no priority or positive priority. In this way, redraws are executed as late as possible within the sequence of execution.

```javascript
      B.respond ('change', [], {id: id, priority: -1, match: function (ev) {
```

The `match` function iterates all the `paths` and uses `B.changeResponder` to determine whether a `change` event has a path that will match this view. When the first path is found that fulfills this condition, we stop iterating the `paths` and will consider this responder matched by the incoming event.

```javascript
         return dale.stop (paths, true, function (path) {
            return B.changeResponder (ev, {verb: 'change', path: path});
         });
```

The responder function itself performs three actions:

- Save a copy of the `elem` and the `children` stored inside the responder.
- Note the current time (`t`).
- Invoke `makeElement`.
- If `makeElement` is successful (which means that its output is a valid lith), the responder will invoke `B.redraw` with five arguments:
   - The context (`x`).
   - The id of the view.
   - The old version of the element.
   - The old list of children.
   - The number of milliseconds it took to create the view (including subviews).

```javascript
      }}, function (x) {
         var oldElement = B.responders [id].elem, oldChildren = B.responders [id].children, t = time ();
         if (makeElement ()) B.redraw (x, id, oldElement, oldChildren, time () - t);
```

We close the responder.

```javascript
      });
```

After defining the responder, we invoke `makeElement` once (which will create the element and return a lith). We return the lith and close the function.

Note that `B.view` operates both with return values and side effects: it returns a lith, but it also registers a responder and stores its output inside the responder for future reference.

```javascript
      return makeElement ();
   }
```

### Internals

We define `B.internal`, an object with the following keys:

- `count`, for counting the reactive views already generated - this is used by `B.view`.
- `timeout`, for specifying the maximum allowed duration for a diff; this is used by `B.diff`.
- `queue`, for holding a list of views that have to be redrawn; this is used by `B.redraw`.
- `redrawing`, to determine whether a view is currently being redrawn; this is used by `B.redraw`.

```javascript
   B.internal = {count: 1, timeout: 200, queue: [], redrawing: false}
```

We create variables within `B.internal` for compatibility with old browsers:
- `B.internal.oldIE` for Internet Explorer 8 or lower. We get this by checking for the presence of `fireEvent` (IE only) and the absence of `dispatchEvent` (present in IE>=9).
- `B.internal.olderIE` for Internet Explorer 7 or lower. We get this by checking whether we're in an old IE *and* there's an abasence of `querySelectorAll`.
- `B.internal.oldFF` for Firefox 3 or lower. We get this by making sure we're not in an old Internet Explorer *and* there's an absence of `querySelectorAll`.
- `B.internal.oldOpera` for Opera 12 or lower. We get this by checking whether the user agent of the navigator contains `'Opera'` - [higher versions are based on a different engine](https://en.wikipedia.org/wiki/Opera_(web_browser)#History).

```javascript
   if (document.body.fireEvent && ! document.body.dispatchEvent) B.internal.oldIE    = true;
   if (! document.querySelectorAll && B.internal.oldIE)          B.internal.olderIE  = true;
   if (! document.querySelectorAll && ! B.internal.oldIE)        B.internal.oldFF    = true;
   if (navigator.userAgent.match ('Opera'))                      B.internal.oldOpera = true;
```

We define `B.validateLith`, a helper function to determine the validity of a lith or lithbag (which will be the first argument, `input`). This function is a wrapper around `lith.v` and `lith.css.v`. This wrapper is needed to 1) perform a deep validation on the lith/lithbag; and 2) return the error instead of reporting it directly to the console.

This function will return `'Lith'` if the input is a lith, `'Lithbag'` if its a lithbag, and a string with an error if the input is invalid.

```javascript
   B.validateLith = function (input) {
```

We invoke `lith.v`, passing `true` as a second argument, and store it in a variable `v`; if `input` is invalid, this will make `lith.v` return an error instead of printing it directly to the console.

```javascript
      var v = lith.v (input, true);
```

If `v` is neither `'Lith'` nor `'Lithbag'`, we return the error.

```javascript
      if (v !== 'Lith' && v !== 'Lithbag') return v;
```

If the input is a lith:

```javascript
      if (v === 'Lith') {
```

If the last element of `input` is not an array, we don't need to perform a validation on its contents, so we return `'Lith'`.

```javascript
         if (type (teishi.last (input)) !== 'array') return 'Lith';
```

If the last element of `input` is an array, we need to validate its contents. If this is a `style` tag, we invoke `B.validateLitc` on the contents of the lith (we'll define this function in a moment). If it's not a `style` tag, then we perform a recursive call to `B.validateLith`. In either case, we store the result of this validation in a variable `result`.

```javascript
         var result = input [0] === 'style' ? B.validateLitc (teishi.last (input)) : B.validateLith (teishi.last (input));
```

If we're dealing with a valid litc, `B.validateLitc` will return `true`; if we're dealing with a valid lith or lithbag, `B.validateLith` will return either `'Lith'` or `'Lithbag'`. If this is the case, `input` is then a valid lith, so we return `Lith`. But if `input` is invalid on account of its contents, then we return `result`, which will contain a detailed error.

```javascript
         return (result === 'Lith' || result === 'Lithbag' || result === true) ? 'Lith' : result;
```

We're done with the case of a lith. Let's see now the case of the lithbag.

```javascript
      }
```

We iterate the element of the lithbag to see if we can find an invalid one. The simple elements (anything but an array) have already been validated, so we ignore them.

```javascript
      return dale.stopNot (input, undefined, function (v) {
         if (type (v) !== 'array') return;
```

If we find a nested element, we validate it with a recursive call. If its either a lith or a lithbag, `input` is valid; but if it's not, then input is invalid, in which case we return an error.

```javascript
         var result = B.validateLith (v);
         if (result !== 'Lith' && result !== 'Lithbag') return result;
```

If our iteration over the elements of the lithbag returned an error, we return an error; otherwise we return `'Lithbag'` to denote that `input` is a valid lithbag. We then close the function.

```javascript
      }) || 'Lithbag';
   }
```

We define `B.validateLitc`, a function to perform a deep validation of a litc. This function will return either `true` or a string with an error.

```javascript
   B.validateLitc = function (input) {
```

We validate `input` through `lith.css.v`. If it's not valid, we return the error.

```javascript
      var result = lith.css.v (input, true);
      if (result !== true) return result;
```

If the first element in the `input` is an array, we're dealing with a litcbag. We iterate the elements of `input`, apply `B.validateLitc` and return the first value not to be `true` (which will represent an error); if all of them are valid, the function will return `true`.

```javascript
      if (type (input [0]) === 'array') return dale.stopNot (input, true, B.validateLitc);
```

If this is a litc and not a litcbag, and its contents are not an array, we return `true`.

```javascript
      if (type (teishi.last (input)) !== 'array') return true;
```

If the contents are an array (another litc), we invoke `B.validateLitc` recursively and return the result. We then close the function.

```javascript
      return B.validateLitc (teishi.last (input));
   }
```

We define a polyfill for `document.body.contains` - this will only be necessary for Firefox 8 and below. The purpose of this function is to determine if a node is in the body (as a direct or nested child) or not.

```javascript
   if (! document.body.contains) document.body.contains = function (el) {
```

While the element has a parent, we set `el` to its parent.

```javascript
      while (el = el.parentNode) {
```

If `el` is now the body, we return `true`.

```javascript
         if (el === document.body) return true;
      }
```

Otherwise, we return `false` and close the function.

```javascript
      return false;
   }
```

We define `B.redraw`, the main internal function of gotoв. This function is only invoked by the responder functions of reactive views and is in charge of updating the views.

It takes six arguments: a context object (`x`), the `id` of the view to redraw, the lith of the old version of the view (`oldElement`), a list of the toplevel nested reactive views before the redraw (`oldChildren`), the amount of time it took to create the view (`msCreate`) and a boolean flag `fromQueue` (which we'll see in a moment).

```javascript
   B.redraw = function (x, id, oldElement, oldChildren, msCreate, fromQueue) {
```

As a central design decision, gotoв only updates one view at a time. This helps keep things simple and understandable, even if it might make them somewhat slower sometimes.

Despite both the event system and the redraws being fully synchronous (performing no calls to `setTimeout` or `setInterval`), we still need to add queuing logic to prevent overlapping redraws. This can happen when (for example) a user interacts with a DOM element and an event is called that triggers a redraw, all while another view is being redrawn.

We use the `B.internal.redrawing` variable to determine whether a redraw is taking place already. If it does, and `fromQueue` is not `true` (which means that the function was called from a responder function), we wrap the arguments into an array and push them on `B.internal.queue`, to queue this redraw for later. We also `return` to stop the execution flow. The return value of `B.redraw`, by the way, is meaningless, since this function operates exclusively through side-effects.

```javascript
      if (B.internal.redrawing && ! fromQueue) return B.internal.queue.push ([x, id, oldElement, oldChildren, msCreate]);
```

If we're here, there was either no redraw taking place, or this redraw was triggered by the queuing logic. In case its the former, we set `B.internal.redrawing` to `true`, to denote that a redraw is taking place.

```javascript
      B.internal.redrawing = true;
```

We find the corresponding `responder` and `element` to the view and assign them to corresponding local variables. We also store the current time in a timestamp `t0`.

```javascript
      var responder = B.responders [id], element = document.getElementById (id), t0 = time ();
```

If we're not in production mode and there's no corresponding DOM element for the view, or the element exists but it is not attached to the body of the document, we have encountered a *dangling view* error: gotoв requires views to be placed in the DOM after being generated - if they're not placed, they are said to be *dangling*.

If this is the case, an error is reported through `B.error`. No further action will take place. Also, no more views will be redrawn, since `B.internal.redrawing` will still be set to `true`, and the other redraws in the queue (if any) will also not be executed. This is an embodiment of *auto-activation*, in that abnormal behavior stops the normal flow and is brought to the attention of the operator.

Note that we check whether the element is attached to the body of the document through the [contains method](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains), which performs a recursive search.

```javascript
      if (! B.prod && (! element || ! document.body.contains (element))) return B.error (x, 'B.redraw', 'Attempt to redraw dangling element.', 'Responder:', responder);
```

We invoke `B.prediff` on both the old lith and the new lith. This will yield two arrays with which we'll compute the actual diff in a minute. The old lith has been passed to `B.redraw` as `oldElement`, whereas the new is already stored at `responder.elem` - when the responder was matched, it already executed `makeElement` and placed its result inside `responder.elem`. This, by the way, is the reason we pass `oldElement` as an argument, since if we don't, the old `responder.elem` will be overwritten by the new one.

We also note the current time in a variable `t1`.

```javascript
      var prediffs = [B.prediff (oldElement), B.prediff (responder.elem)], t1 = time ();
```

We compute the diff between the old lith and the new lith, using the values just produced by `B.prediff`. We also note the current time in a variable `t2`. The reason for noting these timestamps is the same reason for which we perform the call to `B.prediff` and `B.diff` on separate lines: we want to track the amount of time each step takes, for performance tracking purposes.

```javascript
      var diff = B.diff (prediffs [0], prediffs [1]), t2 = time ();
```

We now delete the responders for the reactive views nested inside the old version of the view; they are no longer needed, and will become dangling views after we apply the changes to the DOM. It is for this reason that we pass `oldChildren` as an argument.

We delete the responders *after* computing the diff because `B.prediff` makes use of the them.

Nested reactive views that are doubly nested (or more) are deleted recursively through `B.forget` itself, so we only need to delete the top-level ones, contained in `oldChildren`.

```javascript
      dale.go (oldChildren, function (id) {B.forget (id)});
```

If the diff takes too long, `B.diff` will return `false`. In this case, we generate a new element to replace the old one wholesale.

we generate the lith for the responder with `lith.g`, passing a `true` flag to prevent lith validation (since validations, if production mode is not enabled, will already have happened when creating the element in the responder). The resulting HTML is placed inside the corresponding DOM element for the view, replacing any existing contents. This is what we call a *trample*, where all the HTML inside the view is replaced wholesale. This should not happen often, only when the old and the new views are very different, or when they are very large.

```javascript
      if (diff === false) {
```

We define variables for the existing element (`element`), the parent of the element (`parentNode`) and the next sibling to `element` (`nextSibling`).

```javascript
         var element = document.getElementById (id), parentNode = element.parentNode, nextSibling = element.nextSibling;
```

We create the HTML of the new view (`responder.elem`) using `lith.g`, passing `true` as a second argument since this lith has already been validated.

```javascript
         var html = lith.g (responder.elem, true);
```

We remove the old `element` before inserting the new HTML. It is for this reason that we created references to `parentNode` and `nextSibling` before removing the element, so we wouldn't lose them once we remove `element` from the DOM.

```javascript
         parentNode.removeChild (element);
```

If there's a sibling element after `element`, and that sibling element an actual DOM element (not a text node), we insert the HTML before it.

If the sibling element after `element` is not a DOM element (usually a text element), we do an on-the-spot polyfill to insert all the HTML inside `html` after it. This is a very, very rare case and was only discovered through a bug.

If there is no subling element after `element`, this means that `element` was the last child of `parentNode`, in which case we append the HTML to `parentNode`. For the first and the third case, we use `insertAdjacentHTML`, which is polyfilled by cocholate.

```javascript
         if      (nextSibling && nextSibling.insertAdjacentHTML) nextSibling.insertAdjacentHTML ('beforeBegin', html);
         else if (nextSibling && ! nextSibling.insertAdjacentHTML) {
            var container = document.createElement ('div');
            container.innerHTML = html;
            while (container.firstChild) parentNode.insertBefore (container.firstChild, nextSibling);
         }
         else parentNode.insertAdjacentHTML ('beforeEnd', html);
```

This concludes the case where we trample the existing `element`.

```javascript
      }
```

If the diff was computed, we apply it through a function `B.applyDiff`, passing the `element` and `diff` as arguments. If `B.applyDiff` returns an `errorIndex` (the index of the diff item where a DOM element was not found) and we're not in production mode, we report it through `B.error` and return `false`. As with the dangling element error, if there is an error during the redraw, no further action will take place. Also, no more views will be redrawn, since `B.internal.redrawing` will still be set to `true`, and the other redraws in the queue (if any) will also not be executed.

If `B.applyDiff` doesn't return an `errorIndex`, the operation is successful.

```javascript
      else {
         var errorIndex = B.applyDiff (element, diff);
         if (! B.prod && errorIndex !== undefined) return B.error (x, 'B.redraw', 'Redraw error: DOM element missing.', {diffIndex: errorIndex, diffElement: diff [errorIndex], diff: diff, responder: responder.id});
      }
```
✓✓
We call an event with verb `redraw`, `x.path` as its path (which will be the path of the event that triggered the redraw in the first place) and an object with three fields:

- The id of the `responder`
- `ms`, an object with the performance information of the redraw, measuring how many milliseconds each part of the redrawing process took. The keys are the following: `create`, with the time taken by the invocation of the responder to draw the view; `diff`, with the time taken by the diffing algorithm, including the prediffing; `DOM`, with the time taken to apply the changes to the DOM; and finally, `total`, the sum of these three.
- `diff`, which is either `false` in case of a trample, or an object with the `length` of the diff, as well as the number of `edits` required by the diff.

```javascript
      B.call (x, 'redraw', x.path, {responder: responder.id, ms: {create: msCreate, prediff: t1 - t0, diff: t2 - t1, DOM: time () - t2, total: time () - t0 + msCreate}, diff: diff === false ? false : {length: diff.length, edits: diff.edits}});
```

We iterate the queue to find the next queued redraw, if any. If the queue is empty, nothing will happen.

```javascript
      var nextRedraw = dale.stopNot (B.internal.queue, undefined, function () {
```

We pull the first element out of the queue and assign it to a local variable `next`.

```javascript
         var next = B.internal.queue.shift ();
```

We check whether the responder associated with the queued view still exists. Why do we check for this? If it is a nested reactive view, and one of its parents (direct or indirect) was redrawn while this view was in the queue, the view will no longer exist, so nothing should be done. If the responder still exists, we return it as the next view to be redrawn.

```javascript
         if (B.responders [next [1]]) return next;
      });
```

If there was a view in the queue that wasn't deleted, we invoke `B.redraw` recursively. Note we pass `true` as its fifth argument (after the original four arguments from the original call) to tell `B.redraw` to proceed with this redraw, despite the fact that `B.internal.redrawing` is still `true`. We keep `B.internal.redrawing` as `true` without modifying it, to ensure that queued elements are processed before any new incoming redraws.

```javascript
      if (nextRedraw) B.redraw.apply (null, next.concat (true));
```

If there's no pending views to be redrawn, we merely set `B.internal.redrawing` to `false` to enable further redraws in the future.

```javascript
      else            B.internal.redrawing = false;
```

We close the function.

```javascript
   }
```

We define `B.prediff`, a function that will take a lith and output a list of items that can be diffed by `B.diff`. The function is invoked with one argument (the `input`, or lith) by `B.redraw`, but it invokes itself recursively, passing to itself an `output` array where the diff elements will be placed.

The `input` is assumed to be a valid lith - if we're not in production mode, the chain of execution will have already validated the lith.

The `output` will be an array of strings of the form:
- `O ...`, for the opening of a tag.
- `C ...`, for the closing of a tag.
- `L ...`, for literal HTML fragments.
- `P ...`, for an opaque tag.

```javascript
   B.prediff = function (input, output) {
```

If `input` is not an array:

```javascript
      if (type (input) !== 'array') {
```

If `input` is either `undefined` or an empty string, no HTML will be generated from it. If this is the case, `output` must already present (because `B.prediff` will be invoked for the first time with a lith, which is an array, and this call then must be a recursive one). We merely return `undefined`. Note: the return value on recursive calls will be ignored.

```javascript
         if (input === undefined || input === '') return;
```

If the previous element of the `output` is not a literal, we push a literal element to the output; note that it will be a string starting with `L `, with the resulting HTML appended to it. We pass `true` to `lith.g`, since this should be a valid lith. We don't check for the existence of at least one element in the output since there must be already at least an element for opening the tag, since the `input` to the first call of `B.prediff` must be a tag.

We use `substr (0, 1)` instead of `[0]` for compatibility with IE7 and below.

```javascript
         if (output [output.length - 1].substr (0, 1) !== 'L') return output.push ('L ' + lith.g (input, true));
```

If the previous element of `output` is a literal, we merely append the HTML for this element to it. This concludes the recursive case of a simple `input`

```javascript
         return output [output.length - 1] += lith.g (input, true);
      }
```

If we're in the first (non-recursive) call to `B.prediff`, we initialize `output` to an empty array.

```javascript
      output = output || [];
```

If `input` is a lithbag, we iterate its element and invoke `B.prediff` recursively on them. Note we pass `output` as the second parameter to each call, which will enable the recursive calls to append their outputs to `output`. There's nothing else in this case but to return. The return value is irrelevant, since the outermost call to `B.prediff` is on a lith, not a lithbag, and it's only on the outermost case that the return value of the function is useful.

```javascript
      if (! inc (lith.k.tags, input [0])) return dale.go (input, function (v) {B.prediff (v, output)});
```

If we're here, we're dealing with a tag. The rest of the function will be dedicated to this case.

If the tag has attributes and an `id` comprised of `в` followed by hexadecimal digits (`0-9`, `a-f`), it is a reactive view. In this case, we reference the lith stored inside the corresponding responder (which also has the same `id`). The reason is subtle: if this nested reactive view was redrawn after its parent (with the parent being the view currently being redrawn), the parent's representation of its nested view might be stale! For this reason, we reference the fresh version of the lith, contained inside the responder, and we ignore that of the parent.

Because the outermost view being redrawn is also a reactive view, instead of using `input`, we will use the copy of the lith stored at the responder's `elem` property as well; but since they should be equivalent, this will represent no problem.

The reason we need a precise representation of the nested views is that they are a representation of the DOM as it stands before the redraw. This allows gotoв to know what's in the DOM without having to query it directly, which is complex to implement and slow.

Note that in case `input [1].id` is present, we convert it to a string before matching it; this is because, while being truthy, it could also be a number or a boolean.

Note an exception: if `output` has no length, it means we're prediffing the first element of the input, which must be the outermost element of a reactive view; in this case, we want the *old* version of the element (the one passed to `B.prediff`) rather than the new one, which by the time that `B.prediff` is called, will be already stored in `responder.elem`. So, when processing an outermost reactive view, we don't reference its `elem`.

```javascript
      if (input [1] && input [1].id && (input [1].id + '').match (/^в[0-9a-f]+$/g) && output.length) input = B.responders [input [1].id].elem;
```

We create a local variable `attributes` to hold the attributes of the lith, if any. If the second element of `input` is not an object, they will be undefined. Otherwise, we iterate them and build a new object, filtering out those attributes that have a value of `undefined`, `false`, `null` or an empty string (which all represent the absence of the attribute).

Note that in case this is the lith of a reactive view, we do this *after* referencing the lith inside the corresponding responder. If we didn't do this, and the reactive view was nested and changed its own class, this change would not be reflected in the `attributes`. Another interesting observation is that the id of the nested reactive view would not change - indeed, this is one of the reasons for which we overwrite the ids of reactive views in `B.view`.

```javascript
      var attributes = type (input [1]) !== 'object' ? undefined : dale.obj (input [1], function (v, k) {
         if (! inc (['', null, false, undefined], v)) return [k, v];
      });
```

We create a local variable `contents` to point to the contents of the lith, which will be either the second or third element of `input`, depending on whether `attributes` are present or not.

```javascript
      var contents = input [attributes ? 2 : 1];
```

We append a new element to `output`, comprised of `O `, followed by the tag itself.

```javascript
      output.push ('O ' + input [0]);
```

If there are `attributes`, we stringify them and append them (after a single space) to the element we just created above.

A more precise way of listing the attributes would be as an array of the shape `[[key1, value1], [key2, value2], ...]`, where the keys are sorted. This would allow for two objects with the keys in different order to be considered the same element; however, this is probably overkill, since objects for the same views are written usually in the same order. So we'll stick to the object representation, even though it might consider two equivalent `attributes` as different. The solution will be correct anyway, although it might perform more DOM operations than it would otherwise; it might well be the case than the time we spend sorting this array of arrays is larger than going with the unordered iteration of objects that most of the time will have the keys in the same order.

```javascript
      if (attributes) output [output.length - 1] += ' ' + JSON.stringify (attributes);
```

If the lith is `opaque`, we first note the length of the last element of `output`, which is of the form `O TAG {...}`, with the attributes being optional.

```javascript
      if (attributes && attributes.opaque) {
         var length = output [output.length - 1];
```

We replace the last element of `output` with a string of the following form: `P LENGTH TAG {...} CONTENTS`. `length` will be included in this string so that the function that applies changes to the DOM can know where the attributes (if any) end and where the contents (if any) start.

The contents of an opaque element may be raw HTML. Note we pass `true` to `lith.g`, since the lith is already validated, so there's no need to validate it again. The resulting HTML might be empty, it might be a text node, or it may be a tag (or multiple tags). gotoв will accept it wholesale.

```javascript
         output [output.length - 1] = 'P ' + length + output [output.length - 1].slice (1) + ' ' + lith.g (contents, true);
```

In this case, there's nothing else to do except to push another element to denote the closing of the tag (`C ` plus the tag itself) and return `output`.

```javascript
         return output;
      }
```

If the element is a `<style>` that contains a litc, we convert its elements to CSS using `lith.css.g`. Notice we pass the `prod` flag to `lith.css.g`, since all inputs have already been validated.

```javascript
      if (input [0] === 'style' && type (contents) === 'array') contents = lith.css.g (contents, true);
```

If the element is a `<table>`, we store the current length of `output` in a variable `tableIndex`. We'll see why shortly.

```javascript
      if (input [0] === 'table') var tableIndex = output.length;
```

We invoke recursively the function on the `contents`, taking care to pass `output` as its second argument (so that the outputs of the recursive call are appended to `output`).

```javascript
      B.prediff (contents, output);
```

We now check whether the current element is a `<table>` with contents. If so, we must take care to insert a `<tbody>` element in the right place, if the `<tbody>` is not specified on the `contents`. The reason for this is that the browser will automatically insert a `<tbody>` on non-empty tables if they don't have one; by inserting a `<tbody>` into the output of `B.prediff`, we can have an accurate representation of the DOM.

`output [tableIndex]` will represent the first element inside the `<table>`, if any, which will be already in `output` after the recursive call we just did to `B.prediff`. Note we saved `tableIndex` just before invoking `B.prediff` recursively, to know what the index was before appending the contents of `<table>` to `output`.

```javascript
      if (input [0] === 'table' && output [tableIndex]) {
```

If a `<thead>` is present in the lith, we iterate the elements of `output` starting on the one at `tableIndex`. The purpose of this block of code is to find the end of the `<thead>`. It would be simpler to just find an element of the form `C thead`, but this `<table>` might contain another `<table>` inside, so we need to track the depth of the tags being opened and closed.

```javascript
         if (output [tableIndex].match (/^O thead/)) {
            var depth = 0;
```

If we open a tag (including that of the `<thead>`), we increment `depth`; if we close a tag, we decrement `depth`. When `depth` is 0, we've reached the end of the outermost `<thead>`. We set `tableIndex` to the current index plus 1 (to start at the next element) and return a non-undefined value to stop the iteration.

We use `substr (0, 1)` instead of `[0]` for compatibility with IE7 and below.

```javascript
            var index = dale.stopNot (dale.times (output.length - tableIndex, tableIndex), undefined, function (k) {
               if (output [k].substr (0, 1) === 'O') depth++;
               if (output [k].substr (0, 1) === 'C') depth--;
               if (depth === 0) return tableIndex = k + 1;
            });
         }
```

If there's still contents inside `<table>`, but there is not a `<tbody>`, then we add it:

```javascript
         if (output [tableIndex] && ! output [tableIndex].match (/^O tbody/)) {
            output.splice (tableIndex, 0, 'O tbody');
```

We assume there's nothing in the `<table>` after the `<tbody>`, so we push an element to mark the closing of the `<tbody>` we just added. This would be incorrect if the user would use a [`<tfoot>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot), but I have never seen an instance of this use case; unless required by someone, this case will be ignored - if we had to implement support for this, we would have to scan the depth of `output` like we did with `<thead>` and add this element in the right place (when `depth` is 0), instead of at the end of `output`.

```javascript
            output.push ('C tbody');
         }
```

If we're in Internet Explorer 7 or older and there's no `<tbody>`, we add it ourselves. This is necessary because the browser adds a `<tbody>` automatically when the `<table>` has a `<thead>` but no `<tbody>`.

```javascript
         if (B.internal.olderIE && ! output [tableIndex]) output.splice (tableIndex, 0, 'O tbody', 'C tbody');
```

This closes the case of a `<table>`.

```javascript
      }
```

If we're in Internet Explorer 7 or older and the table has no contents, we add a `<tbody>` to match what the browser does.

```javascript
      if (B.internal.olderIE && input [0] === 'table' && ! output [tableIndex]) output.splice (tableIndex, 0, 'O tbody', 'C tbody');
```

Finally, we push an element to `output` to denote the closing of the tag. We return `output` and close the function.

```javascript
      output.push ('C ' + input [0]);
      return output;
   }
```

We define `B.applyDiff`, the function in charge of applying a diff to the DOM. This function is only called by `B.redraw`. It takes two arguments: `rootElement` (which corresponds to the DOM element of the reactive view being redrawn) and `diff`.

```javascript
   B.applyDiff = function (rootElement, diff) {
```

Of all the functions in gotoв, this has been by far the hardest function to design, implement and debug.

`diff` is a set of operations that need to be performed to update the DOM. `diff` is array of arrays, one per element, each of them with the following shape: `['add|rem|keep', 'O|C|L|P ...']`. The first part of each array specifies whether the element should be added, removed, or kept in place. The second element of each of these arrays is a string produced by `B.prediff`, and it can represent the opening of a tag, the closing of a tag, a literal HTML fragment or an opaque tag.

The design entails two passes: we first iterate `diff` and construct a map of both the existing DOM elements and the new elements (many of which will already exist). Once we build this representation, we will perform the actual changes on the DOM in a second pass.

While a one-pass design is probably possible, a clear and understandable formulation of it has eluded me. The main difficulty in implementing it lies in how the DOM changes while changes are being implemented, which renders much harder to figure out the position of existing and new elements.

We define five variables that we will need across the scope of the entire function:

- `elements`, an array of DOM elements (both normal elements & text node elements), each corresponding to the k-th item on the diff. For example, if the first element of the diff refers to the `rootElement`, `elements [0]` will point to the `rootElement`.
- `positions`, an array of arrays, one per each diff item. Each of the internal arrays has zero or more integers denoting the *desired position* of the item in question. For example, if the first element of the diff corresponds to the root element, `positions [0]` will be `[]`. If the k-th element of the diff is the second child of the root element, then `positions [k]` will be `[1]`. For deeply nested elements, the logic is extended. If, for example, the k-th element of the diff corresponds to the first child of the first child of the root element, then `positions [k]` will be `[0, 0]`.
- `references`: this object will link a `position` with the index of a diff item. If, for example, the first child of the first child of the root element is on the k-th diff element, there will be an entry `0,0` equal to `k`. This is used later to find the DOM element corresponding to a parent (by looking it up in `elements` using the provided index).
- `rootElementParent`: a mere reference to the parent of the `rootElement`. This is necessary later in case the actual `rootElement` is removed from the DOM.
- `rootElementSibling`: a mere reference to the next sibling of `rootElement`. This is necessary later in case the actual `rootElement` is removed from the DOM.
- `active`: a reference to the active element of the page (usually an input or textarea), if any.

```javascript
      var elements = [], positions = [], references = {}, rootElementParent = rootElement.parentNode, rootElementSibling = rootElement.nextSibling, active;
```

We define two variables that we'll only need in the first pass:
- `tree`: an array with a list of DOM elements; the first element is initialized to the `rootElement` and the second one to `null`, to indicate that we're iterating a tag that might contain child elements. We'll see more about this variable later.
- `position`: an array with the form of those saved inside `positions`, but which we'll modify as we go through the diff items. In fact, the arrays stored inside `positions` are copies from this array, taken at different moments.

```javascript
      var tree = [rootElement, null], position = [];
```

We now start the first pass over the diff items. The goal of this pass is to fill `elements` (a list of DOM references), `positions` (a list of desired positions) and `references` (a way to link a desired position with an actual DOM reference). On this pass, we'll refrain from modifying the DOM itself - that will be done on the second pass.

As we iterate through the diff items, we will note whether there's a DOM element that should be there (according to the lith representing the old view) that is actually missing. If there's such an absence, we'll save it in a variable `errorIndex` and stop the iteration.

```javascript
      var errorIndex = dale.stopNot (diff, undefined, function (v, k) {
```

We deal first with the case of a diff item that represents the closing a tag.

```javascript
         if (v [1].substr (0, 1) === 'C') {
```

If this is an `add` or `keep` item, it has import over the desired position of all the diff items. We do two things: remove the last element of `position`, and increment the last element of `position` (which a moment ago was the next-to-last element).

```javascript
            if (v [0] !== 'rem') {
               position.pop ();
               position [position.length - 1]++;
            }
```

If this is a `keep` or `rem` item, it has import over the walking over the existing DOM elements. We only need to remove the last element of `tree`.

```javascript
            if (v [0] !== 'add') tree.pop ();
```

We've completely covered the case of a closing tag; we return and close the block.

```javascript
            return;
         }
```

We now cover the case for all other `add` or `keep` items, which have import over `position` and `references`. These items can belong to the opening of a normal DOM element (`'O'`), an opaque element (`'P'`) or a literal/text element (`'L'`).

```javascript
         if (v [0] !== 'rem') {
```

We store the current `position` on the k-th item of `positions`. Notice we perform a shallow copy of `position` by using `slice` on it.

```javascript
            positions [k] = position.slice ();
```

If this item concerns the opening of a normal DOM element, we add an entry for it in the k-th element of `references`. The key will be the stringified `position` of this element, joined by commas; the value will be the diff index (`k`). For example, if we're on the k-th element and its position is `[x, y, z]`, this entry will be added to `references`: `x,y,z: k`.

This reference is only added for the opening of a normal DOM element (not opaques or text elements), because it will only be required to locate the parent of a child element; because text elements cannot have children, and opaque elements' children are not managed by gotoв, we don't need to add entries in `references` for them.

```javascript
            if (v [1].substr (0, 1) === 'O') {
               references [positions [k].join (',')] = k;
```

We add a `0` to `position`, to mark the position for a possible first child of the current element. This concludes the operations regarding `position`.

```javascript
               position.push (0);
            }
```

We now cover the case for all other `keep` or `rem` elements, which have import over `tree` and DOM references.

```javascript
         if (v [0] !== 'add') {
```

Our main goal in this section is to find the corresponding DOM element for this diff item. We set a variable `element` to store it.

```javascript
            var element;
```

If we're in the first element of the diff, we must refer to the `rootElement`. If the `rootElement` is kept, it will be in first position. And if it's removed, then the entry for its removal will preceed that of its replacement, because `B.diff` places deletions before insertions. In this way, we can always be sure that `k === 0` refers to `rootElement`.

```javascript
            if (k === 0)                       element = rootElement;
```

If the last element of `tree` is falsy (`null`, actually), we look for the first child of the next-to-last element in `tree`.

```javascript
            else if (! tree [tree.length - 1]) element = tree [tree.length - 2].firstChild;
```

Otherwise, we look for the next sibling of the last element of `tree`.

```javascript
            else                               element = tree [tree.length - 1].nextSibling;
```

If we're not in production mode and we cannot find `element`, there is a mismatch between the DOM and the old lith representing the view. We return the index of the current diff element, to inform the error that will be reported by `B.redraw`.

```javascript
            if (! B.prod && ! element) return k;
```

We set `elements [k]` to `element.`

```javascript
            elements [k] = element;
```

If `element` is the active element of the document, we set `active` to it.

```javascript
            if (element === document.activeElement) active = element;
```

We update the last element of `tree` with element.

```javascript
            tree [tree.length - 1] = element;
```

If this diff item refers to opening a tag, we push `null` to `tree` as a marker so that the next diff element that references the DOM will know to look for the first child of the `element`.

```javascript
            if (v [1].substr (0, 1) === 'O') tree.push (null);
```

This concludes the first pass over the diff.

```javascript
         }
      });
```

If `errorIndex` is not `undefined`, we return it to interrupt the function's course and make `B.redraw` report an error.

```javascript
      if (errorIndex !== undefined) return errorIndex;
```

Before going into the second pass, we now define five helper functions:
- `extract`, to get either the tag or the attributes from a diff item.
- `place`, to place an element into the DOM in a desired position.
- `processOpaque`, which splits an opaque element string into a normal element string and the contents of the opaque element.
- `make`, to create a normal DOM element, an opaque element or a text/literal element.
- `recycle`, to take a DOM element and update its attributes so it can be reused.

We start with `extract`, which starts with `elementString` (the second element of a diff item) and `part` (which will be either `'tag'` or `'attributes'`).

```javascript
      var extract = function (elementString, part) {
```

If we want to extract the tag, we return the non-whitespace characters that are immediately after `'O '` or `'P '` - note that `extract` will only be used for diff items of either normal or opaque tags, so we don't need to contemplate any other cases.

```javascript
         if (part === 'tag') return elementString.match (/(O|P) [^\s]+/) [0].replace (/(O|P) /, '')
```

If we want to extract the attributes, we check whether there's a `{` or not in the string.

If there's no `{`, it must be a normal HTML element without attributes (opaque elements all have attributes, even if it's only the `opaque` attribute that they have); if there's no attributes, we return an empty object.

Otherwise, we select all the characters after the `{` until the end of `elementString` and parse them, returning the resulting object. This imposes the following condition on `elementString`: there must not be anything after the attributes. While this happens automatically in the case of the diff item of a normal tag, the contents of an opaque element must be removed before invoking this function (we'll take care of this in the `make` function, defined below).

There's nothing else to do, so we close the function.

```javascript
         else                return elementString.match ('{') ? JSON.parse (elementString.replace (/[^{]+/, '')) : {};
      }
```

We now define `place`, which is in charge of placing a DOM element into a certain position in the DOM. It takes two arguments: `position` (which is an array of integers with positions and matches the `position` computed for each diff item that is added or kept) and `element` (the DOM element itself).

```javascript
      var place = function (position, element) {
```

We define a variable `Parent` to determine the parent node of `element`. If `position` has length 0, `element` must be the outermost DOM element from this view, therefore `rootElementParent` should be its parent.

For all the other cases, we must find the parent, we remove one element from `position`, join the resulting array by commas and use that key to find the index of that DOM element inside `references`. Armed with that index, we use it to retrieve the actual DOM element from `elements`. This is the only use of `references` we make in the entire function: it is merely a way to retrieve the desired parent of a certain element.

```javascript
         var Parent = position.length === 0 ? rootElementParent : elements [references [position.slice (0, -1).join (',')]];
```

We define a variable `children` to reference the children of `Parent`.

In case we're in Firefox 3, we use `Parent.childNodes` instead of `Parent.children`, since the latter is not supported.

```javascript
         var children = Parent.children || Parent.childNodes;
```

We now check whether `element` is already where it should be; this can happen when elements are recycled.

If `position` has length 0, `element` is the outermost element of the view being redrawn.

```javascript
         if (position.length === 0) {
```

If there's a `rootElementSibling` and `element` is already its `previousSibling`, `element` is already where it should be, so we `return`.

```javascript
            if (rootElementSibling && rootElementSibling.previousSibling === element) return;
```

If there's no `rootElementSibling`, it means that `Parent` must be the last element of `Parent`. If that's the case, then `element` is already where it should be, so we `return`.

```javascript
            if (! rootElementSibling && children [children.length - 1] === element) return;
         }
```

If `position` has length, `element` is not the outermost element of the view being redrawn. In this case, if its desired position (the last element of `position` is the actual position of `element` within `Parent`, then `element` is where it should be, so we `return`.

```javascript
         if (position.length > 0 && children [position [position.length - 1]] === element) return;
```

If we're here, we need to place `element` in the correct position inside `Parent`.

We determine whether there is a DOM element inside `Parent` that will go after `element`. We store it in `nextSibling`. If there's no element that will go after `element`, we set `nextSibling` to `null`. In the case where we're positioning the `rootElement`, we use `rootElementSibling` as our `nextSibling`.

```javascript
         var nextSibling = position.length === 0 ? rootElementSibling : children [position [position.length - 1]] || null;
```

We invoke `insertBefore` on `Parent`, passing `element` and `nextSibling`; this will insert `element` just before `nextSibling`, inside `Parent`. If `nextSibling` is `null`, `element` will be placed as the last child of `Parent`.

Note that in case `element` is an element that is somewhere else in the DOM, there's no need to remove it before placing it somewhere else, since `insertBefore` takes care of removing it from its current position in the DOM before inserting it where it should go.

This concludes the function.

```javascript
         Parent.insertBefore (element, nextSibling);
      }
```

We now define `processOpaque`, a function that takes the element string of an opaque element and separates the tag + attributes from the contents.

```javascript
      var processOpaque = function (elementString) {
```

The `elementString` of an opaque element (as constructed by `B.prediff`) has the following structure: `P LENGTH TAG {...} CONTENTS`. `LENGTH` is the length of `elementString` when it only has the following: `P TAG {...}`.

What we want to do here is to extract the `contents` into another string and remove them from `elementString`. We first start by finding the `LENGTH`, which will be the first set of digits surrounded by whitespace. We parse it into an integer.

```javascript
         var length = parseInt (elementString.match (/ \d+ /) [0].replace (/\s/g, ''));
```

We remove the `length` and its subsequent whitespace from `elementString`.

```javascript
         elementString = elementString.replace (length + ' ', '');
```

We return an object of the form `{element: ..., contents: ...}`, each of the values being a string. We use `length` to know where the tag & attributes finish and where the contents start. Note that we use `length + 1` in the case of contents to ignore the whitespace that was added by `B.prediff` to separate them from the attributes.

This concludes the function.

```javascript
         return {element: elementString.slice (0, length), contents: elementString.slice (length + 1)};
      }
```

We now define `make`, the function that will make and return a new text element, normal DOM element or opaque DOM element. This function takes a single argument, `elementString`, which is the second element of a diff item.

```javascript
      var make = function (elementString) {
```

If the string starts with `'L'`, we're dealing with a literal (text) element.

```javascript
         if (elementString.substr (0, 1) === 'L') {
```

We create a new `<div>` in the variable `container`.

```javascript
            var container = document.createElement ('div');
```

We set `container`'s innerHTML to `elementString` (except for its first two characters, which are `'L '`. `B.prediff` already created the text that should go inside the text node, so there's no need to invoke `lith.g`.

You may be wondering: why not use `createTextNode`? The reason is that `createTextNode` escapes all HTML entities (like `&` to `&amp;`); but it might be the case that we might want to insert HTML entities directly as text without them being escaped. Using `innerHTML` on a new element sidesteps this problem.

```javascript
            container.innerHTML = elementString.slice (2);
```

We retrieve the first child of `container`, which will be a text node, and return it. Note that we don't do anything else with `container`.

This concludes the case of a literal/text element.

```javascript
            return container.firstChild;
         }
```

If the first character of `elementString` is `P`, we're dealing with an opaque element.

```javascript
         if (elementString.substr (0, 1) === 'P') {
```

We split with `processOpaque` the tag & attributes from the contents and store it in a variable `processedOpaque`.

```javascript
            var processedOpaque = processOpaque (elementString);
```

We overwrite `elementString` with the version of the `elementString` that has no contents or length and thus has the same format as the `elementString` of a normal element.

```javascript
            elementString = processedOpaque.element;
```

This concludes the logic that is exclusive to opaque elements. From now on, the function will deal with both opaque and normal DOM elements.

```javascript
         }
```

We extract the `tag` using `extract` and create a new DOM element.

```javascript
         var element = document.createElement (extract (elementString, 'tag'));
```

We extract the `attributes` using `extract` and iterate them:

```javascript
         dale.go (extract (elementString, 'attributes'), function (v, k) {
```

If `v` is neither an empty string nor `false` nor `null`, we set the attribute on `element` using `setAttribute`. If we're in Internet Explorer 7 and below, we set `className` instead of `class`.

```javascript
            if (! inc (['', null, false], v)) element.setAttribute (B.internal.olderIE && k === 'class' ? 'className' : k, v);
         });
```

If we're constructing an opaque element, we set its `innerHTML` to its contents.

```javascript
         if (elementString.substr (0, 1) === 'P') element.innerHTML = processedOpaque.contents;
```

We return `element` and close the function.

```javascript
         return element;
      }
```

We define the fifth and last helper function, `recycle`, which updates the attributes of a DOM element that has been recycled. This function takes three arguments: `element`, `old` and `New`; the last two are `elementStrings` for elements that are not opaque and have the same tag.

The function will return the recycled `element`, unless it decides it cannot recycle the `element`, in which case it will return `undefined`.

```javascript
      var recycle = function (element, old, New) {
```

We extract the `oldAttributes` and `newAttributes` using `extract`.

```javascript
         var oldAttributes = extract (old, 'attributes'), newAttributes = extract (New, 'attributes');
```

If we're in Internet Explorer 8 and below and either the old or new version of the element has an attribute `type` that needs to be changed, we skip recycling the element, since these browsers don't allow changing it. In this case, we return `undefined` to signify that the recycling couldn't be done.

```javascript
         if (B.internal.oldIE && oldAttributes.type !== newAttributes.type) return;
```

In rare cases, if the current redraw is triggered by a click on the element being recycled, placing the `href` attribute on it immediately will make the browser follow the link on the `href` attribute after the view is redrawn. For this reason, if the element being recycled had an `onclick` property and it is being repurposed to have a `href` attribute, we won't recycle it. Ideally, this should be done only in the case that the element being recycled is the one that when clicked triggered the redraw, but since it would be cumbersome to pass enough state to figure this out, we instead avoid recycling all elements that had an `onclick` and will have an `href` property. As on the line above, we return `undefined` to signify that the recycling couldn't be done.

```javascript
         if (oldAttributes.onclick !== undefined && newAttributes.href !== undefined) return;
```

We iterate `newAttributes` and ignore those attributes that are neither an empty string nor `false` nor `null`. We also ignore attributes for which their values are the same in `oldAttributes` and `newAttributes`.

```javascript
         dale.go (newAttributes, function (v, k) {
            if (v === oldAttributes [k] || inc (['', null, false], v)) return;
```

We set the attribute on `element` using `setAttribute`. If we're in Internet Explorer 7 and below, we set `className` instead of `class`.

If `k` is `value`, we also set the `value` of the `element`. This is sometimes necessary to update properly an element's value.

```javascript
            element.setAttribute (B.internal.olderIE && k === 'class' ? 'className' : k, v);
            if (k === 'value')   element.value = v;
```

If `k` is `checked`, we also set the `checked` property of the `element` to `true`. This is sometimes necessary when recycling checkboxes.

```javascript
            if (k === 'checked') element.checked = true;
```

Before closing the iteration of `newAttributes`, we provide workarounds for a bug in Opera <= 12, where we need to set explicitly the `selected` property.

```javascript
            if (B.internal.oldOpera && k === 'selected') element.selected = v;
         });
```

We iterate the `oldAttributes`. If they are different to the corresponding entry from `newAttributes` or an empty string, `false` or `null`, we ignore them. If there's no corresponding entry for them in `newAttributes`, we remove the attributes from `element` (since otherwise they would have been overwritten already). In the case of Internet Explorer 7 and below, we remove `className` instead of `class`.

In the case where we're removing the `value` from an element, we also have to set the value explicitly to an empty string - this seems to be necessary only sometimes. We also set `checked` to false if `k` is `checked`.

```javascript
         dale.go (oldAttributes, function (v, k) {
            if (v === newAttributes [k] || inc (['', null, false], v)) return;
            if (inc (['', null, false, undefined], newAttributes [k])) {
               element.removeAttribute (B.internal.olderIE && k === 'class' ? 'className' : k, v);
               if (k === 'value')   element.value = '';
               if (k === 'checked') element.checked = false;
            }
         });
```

We return `element` and close the function.

```javascript
         return element;
      }
```

We create an object `recyclables`, which will hold DOM elements that we have removed and we might recycle into new elements. We also create an object `toRemove`, which will hold DOM elements that need to be removed from the DOM.

```javascript
      var recyclables = {}, toRemove = {};
```

We now perform the second pass on the diff, to apply the changes to the DOM. As on the first pass, we iterate all the elements of the diff.

```javascript
      dale.go (diff, function (v, k) {
```

Since we'll be using it a few times, we note the type of element we're working with into a variable `elementType`.

```javascript
         var elementType = v [1].substr (0, 1);
```

If we're closing an element, we don't need to do anything on this pass.

```javascript
         if (elementType === 'C') return;
```

We start with the case where we want to keep an element.

```javascript
         if (v [0] === 'keep') {
```

If we're in Internet Explorer 7 and below and we're dealing with a normal element that has a `checked` attribute, we need to set explicitly the attribute. This is actually only actually required on Internet Explorer 6 (!).

```javascript
            if (B.internal.olderIE && elementType === 'O' && extract (v [1], 'attributes').checked) elements [k].setAttribute ('checked', true);
```

If we're keeping an item that is not an opaque element (either a literal or a normal element), we will invoke the `place` function defined above with the desired position of the item and the corresponding DOM element. There's nothing else to do in this case, so we return.

```javascript
            if (elementType !== 'P') return place (positions [k], elements [k]);
```

If we're keeping an opaque element, we will remove it from the DOM. The reason is that opaque elements could have been modified directly, so gotoв cannot know whether its contents are still those specified by the view functions. The only safe course here is to re-make the element from scratch and remove the old version. While the element (and not its contents) could be recycled, I don't think it's necessary.

Note we don't return in this case, since we still need to add the new opaque element.

```javascript
            elements [k].parentNode.removeChild (elements [k]);
         }
```

If we're removing an item:

```javascript
         if (v [0] === 'rem')  {
```

If the item is a DOM element, we mark the diff index (`k`) and store it into the `recyclables` element, into the key for its corresponding tag. For example, if this element is a `div`, we set `recyclables.div` to the index. This marks the element as a "recyclable" `<div>`, which can be used by a subsequent new `<div>` element.

This implementation of recycling is quite simplistic, but it seems to cover many cases. A more sophisticated implementation would implement a stack of elements per tag, or a queue (first-in first-out). This might be changed in the future, but for now seems to suffice.

We also set `toRemove [k]` to `true`, to indicate that we might have to remove this element if it's not recycled. Also note we `return` and do nothing in the case that the element might be recycled.

```javascript
            if (elementType === 'O') {
               recyclables [extract (v [1], 'tag')] = k;
               return toRemove [k] = true;
            }
```

Unless the element is of type `O`, we remove the element from the DOM. There's nothing to do in the case of removing an item, so we return and close the conditional.

```javascript
            return elements [k].parentNode.removeChild (elements [k]);
         }
```

If we're here, we're either adding a new item of any kind or keeping an opaque item.

If the item is a literal/text element, we invoke `place`, passing to it the desired position and the actual element. The actual element is built through the `make` function defined above. This also covers the case when an opaque element is kept - we previously removed the old version and now we add the new version.

```javascript
         if (elementType === 'L') return place (positions [k], make (v [1]));
```

If we're here, we're going to add a normal DOM element or add/keep an opaque element. We note the `tag` of the element and the index of a recyclable element of the same tag, if any. We also set up a variable to hold the DOM element that we'll either create or recycle.

```javascript
         var tag = extract (v [1], 'tag'), recycleIndex = recyclables [tag], element;
```

We now either create or recycle a DOM element, depending on we're dealing with an opaque element or not and whether `recycleIndex` is present or not. If we're dealing with an opaque element, or there's no recyclable element with the tag we need, we create the element from scratch using `make`.

```javascript
         if (elementType === 'P' || recycleIndex === undefined) element = make (v [1]);
```

Otherwise, we use `elements [recycleIndex]` as our DOM element. We pass it to `recycle`, a function we defined above, also passing the diff element of this item (which has the info for the desired attributes of the element) and the diff element of the old entry (which has the existing attributes of the element). `recycle` modifies the `element` and returns it.

```javascript
         else {
            element = recycle (elements [recycleIndex], diff [recycleIndex] [1], v [1]);
```

If `recycle` didn't return an element, it must be that the element cannot be recycled. In this case, we make a new one invoking `make`.

```javascript
            if (! element) element = make (v [1]);
```

Otherwise, we were able to recycle the element. We clear out `recyclables [tag]` (since we've already used this element here) and `toRemove [recycleIndex]` (to avoid removing the recycled element from the DOM).

```javascript
            else recyclables [tag] = toRemove [recycleIndex] = undefined;
         }
```

Now that we have a DOM element (either new or recycled) that matches with this diff item, we set it in the corresponding spot inside `elements`. This will be necessary when positioning child elements inside of this element.

```javascript
         elements [k] = element;
```

We invoke `place`, passing the desired position and the actual DOM element.

This is a good moment to ask: why do we remake a kept opaque element from scratch? The answer is that because opaque elements can change because of direct DOM manipulation, the only way to ensure that they contain whatever the view function initially determines is to remake them from scratch (and apply the DOM manipulations again, wherever needed). This means that opaque elements not only are never recycled; they always are remade from scratch in the case of a redraw.

```javascript
         place (positions [k], element);
```

We define a variable `olderIEAttributes` that will contain the attributes if we're in Internet Explorer 7 or lower. We extract the attributes with the `extract` function defined above.

Note that if we're working with an opaque element, we use `processOpaque` to normalize the shape of the `elementString` before passing it to `extract`.

```javascript
         var olderIEAttributes = B.internal.olderIE ? extract (elementType === 'O' ? v [1] : processOpaque (v [1]).element, 'attributes') : {};
```

If we're in Internet Explorer 7 or lower and the element has a `checked` attribute, we need to set it explicitly.

```javascript
         if (olderIEAttributes.checked)   element.setAttribute ('checked', true);
```

If we're in Internet Explorer 7 or lower and the element has a `class` attribute, we need to set it explicitly - note we set `className` instead of `class`.

```javascript
         if (olderIEAttributes ['class']) element.className = olderIEAttributes ['class'];
```

We close the loop of the second pass over the diff.

```javascript
      });
```

We iterate the elements of `toRemove`; if the values are `true`, the element was not recycled and hence it needs to be removed from the DOM.

```javascript
      dale.go (toRemove, function (v, k) {
         if (v === true) elements [k].parentNode.removeChild (elements [k]);
      });
```

If there's an `active` element that is still in the body and is not the `activeElement` of the document, we set it as active through `focus`.

```javascript
      if (active && document.body.contains (active) && active !== document.activeElement) {
         active.focus ();
```

Internet Explorer 8 and below need an extra nudge, so we invoke `focus` again on the `active` element.

```javascript
         if (B.internal.oldIE) active.focus ();
      }
```

After this, there's nothing else to do, so we close the function.

```javascript
   }
```

We define `B.diff`, the last function of gotoв. This function takes two arrays of strings and performs the [Myers' diff algorithm](http://www.xmailserver.org/diff2.pdf) on them, producing a shortest edit script. In essence, this algorithm gives us a minimal amount of changes that we need to perform to go from the first array of strings to the second.

I'd like to thank [Nicholas Butler](https://www.codeproject.com/Articles/42279/Investigating-Myers-diff-algorithm-Part-1-of-2) and [James Coglan](https://blog.jcoglan.com/2017/02/12/the-myers-diff-algorithm-part-1/) for their wonderful explanation of the implementation of the Myers' diff algorithm.

Before going into the implementation, it's very helpful to understand the algorithm. To do this, I will write down my notes as I understand the algorithm by following James Coglan's article.

The Myers' diff algorithm gives us a *minimal set of changes* that can convert a string `A` to a string `B`. Changes can be either deletions or insertions. To use the example given by James Coglan in his article:

- `A`: abcabba
- `B`: cbabac

One way to convert `A` into `B` is to remove `abcabba` and then add `cbabac`. That would imply 13 changes (7 deletions and 6 insertions). But there are ways of changing them that would require far fewer edits. For example: remove `ab`, leave `c` in place, add a `b`, leave `ab` in place, remove `b`, leave `a` in place and add `c`. In total, there are 5 changes only (3 deletions and 2 insertions). Note that when characters are left in place, those don't count as changes.

Interestingly enough, there is more than one way to change `A` into `B` with only 5 edits. For example, you could remove `ab`, leave `c` in place, remove an `a`, leave `b` in place, add an `a`, leave `ba` in place and add `c`. Both this solution and the previous one require 5 changes. Both are *minimal*, because there is no way to change one string into the other with less than 5 edits.

How do we pick a set of changes if there are multiple ones that will get the job done in the minimal amount of changes? There are two other considerations:

1. Prioritize deletions over insertions; that is, if the algorithm can delete `x` and then add `y`, it should do it in that order instead of adding `y` first and removing `x` afterwards.
2. Instead of interleaving out deletions and insertions, batch them. So, for example, if `xz` have to be removed and `yw` added, instead of removing `x`, adding `y`, removing `z` and adding `z`, it is preferred to first remove `xz` and then add `yw`.

So the four requirements are then: 1) transform a string `A` into a string `B`; 2) with a minimal amount of edits (deletions & insertions); 3) doing deletions first, then insertions; 4) if possible, batching deletions and then insertions instead of interleaving them.

A way to represent the problem graphically is to put the original string (`A`) in the horizontal axis and desired string in the vertical axis. To go back to the previous example:

```
  abcabba

c   \
b  \  \\
a \  \  \
b  \  \\
a \  \  \
c   \

```

The diagonals represent those positions where both characters are the same. Those are places where the characters are the same in both strings. They represent free movements, in that they don't cost any edits (as you may remember, we're trying to minimize the amount of edits).

An edit script can be seen as a way through this graph. The first solution that had 13 edits could be graphed like this:

```
  abcabba
 ├───────┐
c        │
b        │
a        │
b        │
a        │
c        │
         x
```

Notice that each deletion is graphed as a move to the right and each insertion as a move downwards. The `x` [marks the spot](https://en.wikipedia.org/wiki/Indiana_Jones_and_the_Last_Crusade) to where we want to get to.

The following solution we saw, with 5 edits only, could be graphed like this:

For example: remove `ab`, leave `c` in place, add a `b`, leave `ab` in place, remove `b`, leave `a` in place and add `c`. In total, there are 5 changes only (3 deletions and 2 insertions). Note that when characters are left in place, those don't count as changes.

```
  abcabba
 ├──
c   \
b    |
a    \
b     \─
a       \
c        |
         x
```

Note that the graph above has four diagonals, which represent characters left in place. The edits are the three deletions and two insertions.

The other solution we mentioned, also a minimal edit, can be graphed like this:

```
  abcabba
 ├──
c   \─
b     \
a      |
b      \
a       \
c        |
         x
```

If we see the graph again, we can use cartesian coordinates to represent each possible path. `(0, 0)` would be the beginning of the graph; in the example above with strings `A` and `B`, `(7, 6)` would be the end result. Note that `(0, 0)` corresponds to the first two characters of each string, whereas `(7, 6)` is a point "beyond" both strings which denotes the end state.

```
   01234567
   abcabba
0 c
1 b
2 a
3 b
4 a
5 c
6         x
```

Going back to the requirements of the algorithm, seen in terms of the graph:

1. Transform `A` into `B`: this is represented as going from `(0, 0)` to `(7, 6)`.
2. Minimal amount of edits: maximize the amount of diagonals and hence minimize the number of horizontal or vertical moves.
3. Deletions first: if given a choice, move right first, then downwards.
4. Batch deletions and insertions: if given a choice, move in one direction, then in the next one.

Now that we have a more clear idea of what the algorithm is about, we go to Myers' original paper:

- Strings `A` (source, length `N`) and `B` (target, length `M`).
- Edit graph: start at `(0, 0)` and end at `(N, M)`, made of edges (lines). Its edges can be horizontal `(x - 1, y) -> (x, y)`, vertical `(x, y - 1) -> (x, y)` or diagonal `(x - 1, y - 1) -> (x, y)` edges that form a directed acyclical graph. The points `(x, y)` where `A [x]` is equal to `B [y]` are called *match points*.
- Trace: a sequence of `L` match points such that `x [i] < x [i + 1]` and `y [i] < y [i + 1]` for successive points.
- A path through the graph takes you from `(0, 0)` to `(N, M)`.
- From a trace, a path can always be reconstructed by connecting the diagonal edges with vertical and horizontal edges. However, multiple paths can correspond to a given trace - these paths might differ from each other only in their non-diagonal edges.
- A subsequence of a string is a string obtained by deleting zero or more symbols from the given string. A common subsequence of two strings is a subsequence of both.
- Each trace gives rise to a common subsequence of A and B and viceversa. The intuition for this is that a trace is a list of points where the characters for both strings are the same. So, there's a 1:1 relationship between common subsequences and traces.
- An edit script is a set of insertion and deletion commands that transform A into B. Delete takes a character from A (a horizontal edge); insert adds a character into A (a vertical edge). The delete command `xD` deletes the symbol `A [x]` from A; the insert command `x I b [w], b [x], ...` inserts symbols b [w], b [x], ... after the character after position `x`. All actions should be thought of as being executed simultaneously - otherwise, insertions/deletions at the beginning of A would affect insertions/deletions towards the end of A.
- The length of an edit script is the number of deletions and insertions.
- There's a 1:1 correspondence between a trace and an edit script. For every trace of length L, there is a corresponding edit script of length D = N + M - 2L.
- However, there could be multiple paths per trace. How can this be? The explanation is that the edit script is a list of operations, but it doesn't specify their order. What makes a specific path is the order in which these edit operations take place.
- To map an edit script to a trace, perform all deletes on A, see that the result is a common subsequence of A and B, and then map the subsequence to its unique trace.
- Going back to the example of `abcabba` and `cbabac`: common subsequences of length 4: `caba`, `baba`, `cbba`. Each of them maps to a trace: `caba: (3, 1) (4, 3) (5, 4) (7, 5)`, `baba: (2, 2) (4, 3) (5, 4) (7, 5)` and `cbba: (3, 1) (5, 2) (6, 4) (7, 5)`. But note the multiple paths: to go from `(0, 0)` to `(1, 1)` (the last point being the starting point of the diagonal that takes you to `(2, 2)`) you need one insertion and one deletion, which can be done in any order. In that case, there are two paths that map to the same trace and the same edit script.
- "The problem of finding the longest common subsequence (LCS) is equivalent to finding a path from `(0, 0)` to `(N, M)` with the maximum number of diagonal edges. The problem of inding a shortest edit script (SES) is equivalent to finding a path from `(0, 0)` to `(N, M)` with the minimum number of non-diagonal edges. These are dual problems as a path with the maximum number of diagonal edges has the minimal number of non-diagonal edges (D+2L = M+N). Consider adding a weight or cost to every edge. Give diagonal edges weight 0 and non-diagonal edges weight 1. The LCS/SES problem is equivalent to finding a minimum-cost path from (0,0) to (N,M) in the weighted edit graph and is thus a special instance of the single-source shortest path problem."
- "The problem of finding a shortest edit script reduces to finding a path from (0,0) to (N,M) with the fewest number of horizontal and vertical edges."
- D-path: a path starting at `(0, 0)` that has exactly D non-diagonal edges. A 0-path only has diagonal edges. By induction, a D path is a D-1 path followed by a non-diagonal edge and then a possibly empty sequence of diagonal edges called a *snake*. The snake is this sequence of diagonal edges at the end, which can also have length 0.
- Number diagonals in the graph: diagonal k is that where the points `x - y = k`, so for example, diagonal 0 is that where `x = y`. The range of diagonals goes from -M to N. A vertical edge of length 1 starting on diagonal k ends on diagonal k - 1; an horizontal edge starting on diagonal k ends on diagonal k + 1; a snake (which is a sequence of diagonal edges) stays on the same diagonal where it starts.
- Lemma 1 of the proof: a D-path must end on diagonal `k ∈ {-D, -D+2, ..., D-2, D}`. Proof is by induction: if D is 0, the path is made of diagonals and starts and ends on diagonal 0. Assuming inductively that a D-path must end on diagonal `k ∈ {-D, -D+2, ..., D-2, D}.` A D+1 path is a D-path ending on a diagonal k and followed by a non-diagonal edge (that goes to either k-1 or k+1) and a snake (that stays on the same diagonal). So then every D+1 path ends on diagonal `∈ {-D±1, -D+2±1, ..., D-2±1, D±1}`, which is equivalent to `{-D-1, -D+1, ..., D-1, D+1}`. "The result holds by induction. The lemma implies that D-paths end solely on odd diagonals when D is odd and even diagonals when D is even."
- To make this more my speed: if D is 0, the path starts and ends at diagonal 0. If D is 1, the path starts at diagonal 0 and ends either at diagonal 1 or diagonal -1. If D is 2, it ends either in diagonal 1+1 (2), 1-1 (0), -1+1 (0) or -1-1 (-2). If D is 3, it ends in diagonal 2+1 (3), 2-1 (1), 0+1 (1), 0-1 (-1), -2+1 (-1) or -2-1 (-3).
- "A D-path is furthest reaching in diagonal k if and only if it is one of the D-paths ending on diagonal k whose end point has the greatest possible row (column) number of all such paths." That is, the furthest reaching path is the one that ends the farthest from the origin.
- Lemma 2 gives "an inductive characterization of furthest reaching D-paths and embodies a greedy principle: furthest reaching D-paths are obtained by greedily extending furthest reaching D-1 paths."
- Lemma 2:
   - "A furthest reaching 0-path ends at `(x,x)`, where x is `min (z - 1 || a[z] ≠ b[z] or z>M or z>N)`." The `x, x` point is because it being a 0 diagonal, x must be equal to y. x must be equal to the index of the last uninterrupted matching character of both strings or it must be either M or N, if both strings are the same.
   - "A furthest reaching D-path on diagonal k can without loss of generality be decomposed into a furthest reaching (D − 1)-path on diagonal k − 1, followed by a horizontal edge, followed by the longest possible snake or it may be decomposed into a furthest reaching (D − 1)-path on diagonal k+1, followed by a vertical edge, followed by the longest possible snake." So, a furthest reaching D-path equals a furthest reaching D-1 path plus a horizontal or vertical edge, plus a snake (remember the snake is a sequence of diagonal edges with length 0 or more).
- Proof of lemma 2:
   - D path = D-1 path + non-diagonal edge + snake.
   - Final snake must be maximal, otherwise D-path would not be furthest reaching.
   - Suppose the D-1 path is not furthest reaching. "But then a furthest reaching (D − 1)-path can be connected to the final snake of the D-path with an appropriate non-diagonal move. Thus the D-path can always be decomposed as desired."
- The last step sounds problematic to me. How do we know that if the furthest reaching D path is (say) at diagonal k, the furthest reaching D-1 path is either at diagonal k-1 or k+1? This lemma is the justification for the optimality of the greediness, that you don't get stuck in a local maximum if you follow the diagonals when you find them without considering alternatives. At this point, in the interest of keeping things moving, I'm going to assume the correctness of Lemma 2. If by some remote chance you're reading this and you're interested on this topic (and perhaps hopefully you understand Lemma 2 better than I do), please contact me or open an issue!
- General outline of the algorithm:
   - D is the number of non-diagonal edges of a path. It can be as low as 0 (for two identical strings) or M+N (for two strings without any common characters).
   - The outer loop: we iterate on D, starting with D=0 and going in increments of 1 until potentially reaching M+N. If the inner loop stops us, D will end up being less. The algorithm, if correct, ensures that D is equal to the minimum edit distance, that is, the minimum number of edits that can convert string A into B. You might wonder: if the strings are of different length (M is larger or smaller than N), why not start at D=abs(m-n)? And I think the answer is: despite knowing that a low value of D is impossible, we still need to calculate the further reaching paths for low values of D.
   - The inner loop:
      - For k=-D to k=D, incrementing in steps of 2: find the endpoint of the furthest reaching D-path in diagonal k. How is this found?
      - If the endpoint is (n, m) then the D-path is an optimal solution and both loops stop.
      - The justification for only using odd diagonals if D is odd, and even diagonals if D is even, is given by Lemma 1. And k cannot be less than -D or more than D because if you do a maximum of D moves to the right (or down), you cannot go further than diagonals -D or D.
- Detailed implementation of the algorithm:
   - The outer loop:
      - The array `V` contains the furthest reaching paths in elements `V [-D], V [-D+2], ... V [D-2], V [D]`. Because the endpoints for a D path and a D+1 path are disjoint (if the former are odd indexes, the latter are even indexes, or the other way around), we can just use one array instead of two.
      - In case there's a snake (a set of diagonals) going from (0,0), the algorithm starts at a fictitious endpoint (-1, 0) and then moves down to (0, 0), to use the same code that follows the diagonal to follow any possible diagonals starting at (0, 0). Myers: "Note that a fictitious endpoint, (0, − 1), set up in Line 1 of the algorithm is used to find the endpoint of the furthest reaching 0-path." Why downards and not
      - To record an endpoint `(x, y)` in diagonal k it suffices to retain just x because y is known to be x - k. "Consequently, V is an array of integers where `V [k]` contains the row index of the endpoint of a furthest reaching path in diagonal k."
      - The algorithm as presented can only yield D (the minimum edit distance) and the final k for one of the optimal paths. To compute the diff, at the end of each iteration of D (the outer loop), a copy of `V` is stored. At the end of the process, we backtrack to determine an optimal path, and from there the diff itself.
      - Once all the iterations of the inner loop finish, increment D by one. Keep on going until D reaches N + M (this will only happen if both strings have no characters in common).
   - The inner loop:
      - 1. Decide whether you move down or right. Case 1: move down when k = -D (because you cannot move right from a diagonal k=-D-1, since k=-D is the minimum diagonal on this iteration of the outer loop); case 2: move right when k = D (because you cannot move down from a diagonal k=D+1, since k=D is the maximum diagonal on this iteration of the outer loop); case 3: move down if the x value for diagonal k + 1 is *larger* than the x value for diagonal k - 1; case 4: move right if the x value for diagonal k - 1 is *larger or equal* than the x value for diagonal k + 1. Note the asymmetry between cases 3 and 4: if the x values are the same, we prefer moving right than moving down; through this mechanism, we prioritize deletions over insertions.
      - 2. Once you move down or right, check if the s1 [x] and s2 [x - k] are the same. If so, you're in a diagonal, so increase x. Keep on going until they stop matching or you reach (n, m). In this way, snakes (contiguous diagonals) are followed.
      - 3. Once you reach the end of the snake (which might have length 0 or more), register the x position in V [D] [k].
      - 4. Unless (n, m) is reached, increment k by 2 and keep on going.
   - Reconstructing the diff: when reaching the result (x is equal to N and x - k (y) is equal to M), we know the right value of both x and k. From here, using the values of V at the end of each outer loop iteration, we backtrack to reconstruct the path, and as we do that, we assemble the actual diff:
      - While x > 0:
         - Decide to move up or left. This is exactly the same as the condition for the inner loop, but in reverse. Case 1: move up when k = -D; Case 2: move left when k = D; case 3: move up if the x value for diagonal k + 1 is *larger* than the x value for diagonal k - 1; case 4: move left if the x value for diagonal k - 1 is *larger or equal* than the x value for diagonal k + 1.
         - If we move up:
            - Increment k
            - Follow the snake:
               - If x is greater than the x value reached on diagonal k at position D, then there's a snake of length one or more (this means that there are matching characters). While x is greater than this x value reached on diagonal k at position D, add `keep` elements and decrement x.
               - If we're already on diagonal 0 and x is not 0 yet, we go back all the way to the origin (0,0), adding `keep` elements and decrementing x, since in this case there must be a snake that takes us to the origin.
            - If D > 0, add an `add` element to the diff. If D is 0, x will already have gone up all the way to the origin, so there's no need to add it.
         - If we move left:
            - Decrement k.
            - Decrement x, since we are moving left.
            - Follow the snake:
               - If x is greater than the x value reached on diagonal k at position D, then there's a snake of length one or more (this means that there are matching characters). While x is greater than this x value reached on diagonal k at position D, add `keep` elements and decrement x.
            - Add a `rem` element to the diff. If D is 0, x will already have gone up all the way to the origin, so there's no need to add it.
         - Decrement D

Let's now follow the example above (`abcabba -> cbabac`), doing the same computations that the algorithm does.

- Set V [0] to {1: 0}
- D = 0:
   - k = 0: move down from -1,0 to 0,0 because k = -D
   - V [0] is now {0: 0, 1: 0}
- D = 1:
   - k = -1: move down  from 0,0 to 0,1 because k = -D
   - k =  1: move right from 0,0 to 1,0 because k =  D
   - V [1] is {-1: 0, 0: 0, 1: 1}
- D = 2:
   - k = -2: move down  from 0,1 to 0,2 because k = -D; move from 0,2 to 1,3 because s1 [0] (a) is equal to s2 [2] (a) (snake has length 1).
   - k =  0: move down  from 1,0 to 1,1 because V [1] [1] (1) > V [1] [-1] (0); move from 1,1 to 2,2 because s1 [1] (b) is equal to s2 [1] (b) (snake has length 1).
   - k =  2: move right from 1,0 to 2,0 because k =  D; move from 2,0 to 3,1 because s1 [2] (a) is equal to s2 [0] (a) (snake has length 1).
   - V [2] is {-2: 1, -1: 0, 0: 2, 1: 1, 2: 3}
- D = 3:
   - k = -3: move down  from 0,2 to 0,3 because k = -D
   - k = -1: move down  from 2,2 to 2,3 because V [2] [0] (2) > V [2] [-2] (1).
   - k =  1: move down  from 3,1 to 3,2 because V [2] [2] (3) > V [2] [0] (2); move from 3,2 to 4,3 because s1 [3] (a) is equal to s2 [2] (a) and from 4,3 to 5,4 because s1 [4] (b) is equal to s2 [3] (b) (snake has length 2).
   - k =  3: move right from 3,1 to 4,1 because k =  D
   - V [3] is {-3: 0, -2: 1, -1: 2, 0: 2, 1: 5, 2: 3, 3: 4}
- D = 4:
   - k = -4: move down  from 0,3 to 0,4 because k = -D; move from 0,4 to 1,5 because s1 [0] (a) is equal to s2 [4] (a) (snake has length 1).
   - k = -2: move down  from 2,3 to 2,4 because V [3] [-1] (2) > V [3] [-3] (0).
   - k =  0: move down  from 5,4 to 5,5 because V [3] [1] (5) > V [3] [-1] (2).
   - k =  2: move right from 5,4 to 6,4 because V [3] [1] (5) >= V [3] [-1] (2); move from 6,4 to 7,5 because s1 [6] (a) is equal to s2 [4] (a).
   - k =  4: move right from 4,1 to 5,1 because k =  D; move from 5,1 to 6,2 because s1 [5] (b) is equal to s2 [1] (b), then from 6,2 to 7,3 because s1 [6] (a) is equal to s2 [2] (a) (snake has length 2).
   - V [4] is {-4: 0, -3: 0, -2: 2, -1: 2, 0: 5, 1: 5, 2: 7, 3: 4, 4: 7}
- D = 5:
   - k = -5: move down from 1,5 to 1,6 because k = -D
   - k = -3: move down from 2,4 to 2,5 because V [4] [-2] (2) > V [4] [-4] (0); move from 2,5 to 3,6 because s1 [2] (c) is equal to s2 [5] (c) (snake has length 1).
   - k = -1: move down from 5,5 to 5,6 because V [4] [0] (5) > V [4] [-2] (2)
   - k =  1: move down from 7,5 to 7,6 because V [4] [2] (7) > V [4] [0] (5). We've reached 7,6 which is the endpoint. Stop. Hammertime!
   - We now know that a shortest path exists in k = 1 and D = 5.
   - V [4] is {-5: 1, -4: 0, -3: 2, -2: 2, -1: 5, 0: 5, 1: 7, 2: 7, 3: 4, 4: 7}
- Reconstructing the diff:
   - First movement:
      - D = 5, k = 1, x = 7
      - We move up because V [4] [2] (7) > V [4] [0] (5). k is now incremented to 2.
      - V [4] [2] is 7, which is the same as x, so the snake has length 0.
      - We add an `add` element to the diff, with value s2 [x - k], which is s2 [5] (`c`). Diff is now `[['add', 'c']]`.
      - We decrement D to 4.
   - Second movement:
      - D = 4, k = 2, x = 7
      - We move left because V [3] [1] (5) >= V [3] [3] (4). k is now decremented to 1 and x is decremented to 6.
      - We compare x (6) to V [3] [1] (5). Since x is larger, there is a snake with length 1. We add a `keep` element with value s1 [6] (a). Diff is now `[['keep', 'a'], ['add', 'c']]`. We decrement x to 5. Now, x is the same as V [3] [1], so we don't add any more `keep` elements.
      - We add a `rem` element with value s1 [5] (b). Diff is now `[['rem', 'b'], ['keep', 'a'], ['add', 'c']]`.
      - We decrement D to 3.
   - Third movement:
      - D = 3, k = 1, x = 5
      - We move up because V [3] [2] (3) > V [3] [0] (2). We increment k to 2.
      - We compare x (5) to V [2] [2] (3). Since x is larger by 2, the snake has length 2. We add a `keep` element with value s1 [4] (b), decrement x to 4, add a `keep` element with value s1 [3] (b) and decrement x to 3. Diff is now `[['keep', 'a'], ['keep', 'b'], ['rem', 'b'], ['keep', 'a'], ['add', 'c']].
      - We add an `add` element to the diff, with value s2 [x - k], which is s2 [1] (b). Diff is now `[['add', 'b'], ['keep', 'a'], ['keep', 'b'], ['rem', 'b'], ['keep', 'a'], ['add', 'c']]`.
      - We decrement D to 2.
   - Fourth movement:
      - D = 2, k = 2, x = 3
      - We move left because k === D. We decrement k to 1 and x to 2.
      - We compare x (2) to V [1] [1] (1). Since x is larger by 1, the snake has length 1. We add a `keep` element with value s1 [2] (c) and decrement x to 1. Diff is now `[['keep', 'c'], ['add', 'b'], ['keep', 'a'], ['keep', 'b'], ['rem', 'b'], ['keep', 'a'], ['add', 'c']]`.
      - We add a `rem` element with value s1 [1] (b). Diff is now `[['rem', 'b'], ['keep', 'c'], ['add', 'b'], ['keep', 'a'], ['keep', 'b'], ['rem', 'b'], ['keep', 'a'], ['add', 'c']]`.
      - We decrement D to 1.
   - Fifth movement:
      - D = 1, k = 1, x = 1
      - We move left because k === D. We decrement k to 0 and x to 0.
      - We compare x (0) to V [0] [0] (0). Since they are the same, the snake has length 0.
      - We add a `rem` element with value s1 [0] (a). Diff is now `[['rem', 'a'], ['rem', 'b'], ['keep', 'c'], ['add', 'b'], ['keep', 'a'], ['keep', 'b'], ['rem', 'b'], ['keep', 'a'], ['add', 'c']]`.
      - We decrement D to 0.
   - Because x is 0, the loop that reconstructs the diff is now complete.

Let's now see how `B.diff` is implemented.

This function takes two arrays of strings, `s1` and `s2`. `s1` represents the old list of strings; `s2` represents the new list, to which we want to get from `s1`.

While we don't use it like this, it would be possible for `s1` and `s2` to be strings instead of arrays of strings. As long as the arguments are accessible through by bracket notation and strict equality is expected, the function will work properly.

```javascript
   B.diff = function (s1, s2) {
```

The algorithm, as implemented here, is the first version of the algorithm presented on the paper, which takes linear time but uses quadratic space. Myers presents a linear space version of the algorithm (the one used by Git) but that is more complex in implementation terms and, more importantly (according to Myers) "is roughly twice as slow as the basic O(ND) algorithm". We choose here the version that takes less time and uses more space.

This function is heavily optimized since it represents a large part of the running time of gotoв. For that reason, the programming style is somewhat different from that of the rest of the library and its dependencies.

We define as many variables as possible in the outer loop to improve performance on certain (older) browsers. Here are the variables:

- `diff`: the array where we'll store the diff to be returned by the function.
- `VList`: a list of position lists. Each of these position lists is a snapshot of `V` (as defined in the paper) for a given value of `D`.
- `VLast`: a reference to the last element of `VList`.
- `VNew`: the current element of `VList` being constructed.
- `D`, `k` and `x`.
- `t`, a timestamp used to determine whether `B.diff` has been running for too long.

```javascript
      var diff = [], VList = [], VLast, VNew, D = 0, k, x, t = time ();
```

The outer loop increments `D` from 0 until the length of both inputs, incrementing it by 1. As we saw above, `D` represents the minimum number of edits necessary to convert `s1` into `s2`. In the case where both inputs are the same, `D` will be 0; at the opposite end, if both inputs are completely dissimilar, `D` can reach the sum of both their lengths (but not more).

```javascript
      while (D <= s1.length + s2.length) {
```

If `B.internal.timeout` is set and the current running time of the current execution of `B.diff` exceeds it, we will return `false`. In this way, `B.diff` stops itself from running for too long when comparing two long inputs that are very dissimilar. If `B.internal.timeout` is not set, `B.diff` will run until it completes the diff.

```javascript
         if (B.internal.timeout && (time () - t > B.internal.timeout)) return false;
```

Within the outer loop, we do a number of operations:
- Set `k` to `-D`.
- Set `VLast` to the last element stored in `VList`. If no such element is present (because we're doing the first iteration of the outer loop), we initialize `VLast` to `{1: 0}`. More on this below.
- Set `VNew` to a new object.
- Push `VNew` into `VList`. `VList` will contain a number of objects, each of which contains the the indexes of the farthest reaching paths for each diagonal. `VList` is in effect a list of snapshots of this object containing the indexes of the farthest reaching paths, and it will contain one snapshot per value of `D`.

```javascript
         k = -D;
         VLast = VList [VList.length - 1] || {1: 0};
         VNew = {};
         VList.push (VNew);
```

We enter the inner loop, which goes from -D to D in jumps of 2.

```javascript
         while (k <= D) {
```

Within the inner loop, we need to decide whether we move down or we move right to the current diagonal. We move down if one of the following circumstances applies:
- `k` is equal to `-D`. Since this is the lowest possible diagonal, the previous point needs to be up, not to its left, otherwise it would be at a non-existing diagonal -D-1.
- `k` is *not* equal to `D` *and* the value of `VLast` for the `k + 1` diagonal is *larger* than that of the `k - 1` diagonal. The first part of the condition is the analogue of the previous condition: to reach the highest possible diagonal, we cannot reach it by moving down from a non-existing diagonal D+1. Notice that we prefer to move *right* rather than *down* if the value of `k + 1` is the same of `k - 1`. This is the way in which the algorithm prefers deletions (moving right) over insertions (moving down).

An interesting implementation consequence of the way this algorithm works is that by performing deletions first, it is much easier to recycle DOM elements: the discarded elements are kept in a variable and can be re-used as needed - `B.applyDiff` does this extensively. If the algorithm would prioritize insertions, we'd have to implement a lookahead for recycling DOM elements.

We set `x` to the value of `x` reached by the furthest reaching path in diagonal `k + 1`. As we move down, we don't need to further change the value of `x`.

```javascript
            if (k === -D || (k !== D && VLast [k + 1] > VLast [k - 1])) x = VLast [k + 1];
```

Otherwise, we move right. This only happens if one of the following circumstances applies (all of them are the opposite of the ones we just saw for moving left):

- `k` is equal to `D`.
- `k` is *not* equal to `-D` *and* the value of `VLast` for the `k - 1` diagonal is *larger or equal* than that of the `k + 1` diagonal.

We set `x` to the value of `x` reached by the furthest reaching path in diagonal `k - 1`, plus 1. This plus 1 indicates we're moving right.

```javascript
            else                                                        x = VLast [k - 1] + 1;
```

Why do we set `VLast` to `{1: 0}` in the first iteration? This is because when D is 0 and we're starting the first iteration, `k` is equal to `-D`. In this case, we move down from diagonal 1 and the value of `x` will be set 0, which is the right value for starting the process.

We now follow the snake by checking whether there are elements of both inputs that are the same (what the paper calls *matching points*). While we don't exceed the length of `s1` or `s2`, as long as their values are the same, we increment `x`. Note this can happen zero times, in which case the snake has then length 0.

Remember that `x - k` is equal to `y`, since `k === x - y`. The only reason we haven't defined an `y` variable is to make the function as fast as possible.

```javascript
            while (x < s1.length && (x - k) < s2.length && s1 [x] === s2 [x - k]) x++;
```

Once we followed the snake, we set the index in `VNew` for the furthest reaching path in `k`. This concludes our work for this execution of the inner loop for this combination of values for `D` and `k`.

```javascript
            VNew [k] = x;
```

While `x` is less than the length of the first input, and `y` is smaller than the length of the second one, we keep on going by incrementing `k` by 2 and doing another iteration of the inner loop.

```javascript
            if (x < s1.length || (x - k) < s2.length) {
               k += 2;
               continue;
            }
```

If we're here, we're done! The current value of `D` and `k` will give us an optimal path from `s1` to `s2`. We now have to reconstruct the path taken and build the diff in the process.

Before we reconstruct the path, we set the value of `D` inside `diff.edits` so we know how many edits were required to turn `s1` into `s2`.

```javascript
            diff.edits = D;
```

Since we're going to reconstruct a path back to the origin, we'll be retracing our steps until `x` is 0.

```javascript
            while (x > 0) {
```

We now decide whether we have to move up or left. The condition is the same as the one we used to determine earlier whether we would move down or right. The only difference is that we now use the `D - 1` element of `VList`, which represents the previous snapshot of `V`. The condition below, if true, indicates a move upwards.

```javascript
               if (k === -D || (k !== D && VList [D - 1] [k + 1] > VList [D - 1] [k - 1])) {
```

If we move up, we increment `k`.

```javascript
                  k++;
```

We now follow the snake. If `D` is 0, we attempt to trace `x` all the way to the origin; otherwise, we trace it until the position of x reached in the furthest reaching path of the diagonal `k + 1`.

The case where `D` is 0 can only happen on this branch, since it covers the case where `k === -D` - remember that the only possible value for `k` when `D` is 0 is also 0.

```javascript
                  while (x > (D === 0 ? 0 : VList [D - 1] [k])) {
```

For each matching element between `s1` and `s2`, we add a `keep` element to the diff, referencing an element from `s1`. Note that we subtract 1 from `x` since arrays in javascript are zero-indexed (so that, say, the third element has index `2`). We then decrement `x` by 1. Also note that we add the element to the beginning of the diff, since we're reconstructing the diff backwards.

Instead of referencing an element from `s1`, we could have referenced element `x - k` from `s2` here instead. The result would have been the same.

```javascript
                     diff.unshift (['keep', s1 [x - 1]]);
                     x--;
                  }
```

At this point, we're done following the snake. We now add an `add` element to the `diff`, referencing an element from `s2` and using `x - k` as our index.

```javascript
                  if (D > 0) diff.unshift (['add', s2 [x - k]]);
               }
```

If we move left, we decrement both `k` and `x` by 1. `x` needs to be decremented because we're moving to a lower diagonal. `k` is decremented since `y` (`x - k`) should stay the same in this case.

```javascript
               else {
                  k--;
                  x--;
```

We now follow the snake until `x` has the same value as the furthest reaching path from diagonal `k - 1`.

```javascript
                  while (x > VList [D - 1] [k]) {
```

For each matching element between `s1` and `s2`, we add a `keep` element to the diff, referencing an element from `s1`. Note that we don't subtract 1 from `x` since we just decremented `x` before following the snake.

We then decrement `x` by 1.

```javascript
                     diff.unshift (['keep', s1 [x]]);
                     x--;
                  }
```

At this point, we're done following the snake. We now add a `rem` element to the `diff`, referencing an element from `s1` and using `x` as our index.

```javascript
                  diff.unshift (['rem', s1 [x]]);
               }
```

Whether we move up or left, we decrement `D` by 1. This concludes the logic for reconstructing the diff.

```javascript
               D--;
            }
```

At this point, the diff is ready, so we return it.

```javascript
            return diff;
```

We close the inner loop.

```javascript
         }
```

We increment `D` and close the outer loop.

```javascript
         D++;
      }
```

There's nothing else to do, so we close the function.

```javascript
   }
```

We close the module.

```javascript
}) ();
```

## License

gotoв is written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.

## Appendixes

### A brief history of the frontend

gotoв exists to facilitate writing the frontend of a webapp. The best way to understand gotoв is to understand the problems it solves; when the problems become clear, then the solution follows. Also, by understanding the problems, you can better judge the solutions to them instead of taking them at face value. My hope is that this conceptual introduction to gotoв will also help you to better understand other frameworks and webapps in general. A map of the frontend, so to speak, and *a* way (not necessarily *the* way) to traverse it.

In this section, we'll go over the main problems and design decisions of a frontend. To make concepts clearer, a very down-to-earth example will accompany us along our conceptual journey: a shopping cart! Not only it is concrete; it is also extremely practical and as such quite fertile - in fact, an essential piece of web technology (HTTP cookies) [owes its existence](https://en.wikipedia.org/wiki/HTTP_cookie#Background) to it.

The first step in our conceptual journey is to understand **the difference between a website and a webapp**. Websites started existing in the Christmas of 1990 when the World Wide Web was launched. A website is 1) a document composed of HTML; 2) that is identified by an Uniform Resource Locator (URL). A web browser, when visiting a given URL, will load and then display the document.

The web was revolutionary because - ruthlessly summarizing - 1) HTML could be interpreted by different browsers to fit different screen sizes; and 2) there was a single information space (the web) on which every document could live, accessible under its own URL. A third crucial feature of the web are links. Links allow connecting one webpage to another. By doing so, the web space can be traversed in different ways, allowing all sorts of possibilities. As natural as the web seems to us in 2020, these were real innovations, not obvious in the least. They are the bedrock on which webapps are built.

Webpages are stored as files on a server, and are served as-is to a web browser that requested them. Webpages, thus, are *static*. The same URL yields the same HTML. If a webpage is updated, then the HTML will change, but it will change for everyone that requests the page since the update.

To the best of my knowledge, the first webapp followed the creation of the web by about [five years](https://en.wikipedia.org/wiki/Viaweb). Webapps leverage the web (HTML, URLs and the HTTP protocol to enable communication between the browser and the server) to provide functionality hitherto provided by native apps. Instead of distributing software programs that users should install on their computers, webapps allow users to use the app *through their web browser, without installing any additional software*. This proved to be perhaps as revolutionary as the web itself.

In my view, the boundary between a webpage and a webapp is the following: at a given moment in time, an URL pointing to a webpage will return identical HTML documents; whereas an URL pointing to a webapp will return distinct HTML documents, depending on the previous interactions of the user with the server. A webapp is *dynamic*, in that it doesn't show the same content with a given URL. To make things more concrete, let's introduce our example, the shopping cart.

Let's say that I own an online store. The URL for the shopping cart is at http://myshop.com/cart. Is this a webpage or a webapp? According to the definition just provided, it is a webapp, because if user A added Gummi Bears to his cart, and user B added pencils to her cart, then the same URL will show a different HTML document, at the same moment in time.

Why do webapps show different things to different users? Because webapps reflect all the previous interactions of a user with the app. Webapps (and apps, in general) are *stateful*, whereas webpages are *stateless*. Webpages always start fresh; all you can do with them is load them, read them, then click on another link to repeat the process on another webpage. Webapps, however, remember your previous interactions, and don't start from scratch.

(Incidentally, I believe that dynamic webpages and webapps are the same thing; both show different things to different users with the same URL. There might be a couple of exceptions you could think of that I'd agree with, but for the most part, this point is valid).

To summarize: webapps are stateful, thus show different documents for the same URL. This implies that *the HTML has to be generated according to the stored state of the webapp for a given user*. Webpages can be stored as HTML files on a disk and served directly, whereas webpages need to be created with some logic, according to the state. In other words: a webpage is a *constant*, while a webapp is a *function of the state*. To summarize:

- Webpage: one URL, always the same document, stateless, static, a constant.
- Webapp (actually, a *page* of a webapp): one URL, the document changes according to the state, stateful, dynamic, a function of the state.

Even shorter:

- Webpage: URL -> HTML
- Webapp: URL + state -> HTML

A small but important note: a webapp is a collection of URLs that serve dynamic HTML documents. A more precise comparison would be between websites and webapps, but I didn't to complicate things too much at the beginning. We can still talk about a webapp having different pages, one per URL.

Going back to our example: users A and B have different products on their respective shopping carts (the products being stored on their respective cookies). When they request the shopping cart page (which is available at the same URL, `http://myshop.com/cart`), the server will generate different HTML files, depending on the *state of the application* for each of the users. One HTML document will have some HTML to display 8 Gummi Bear bags; the other will have some HTML to display 3 books.

As we just saw, every page of a webapp is a function of the state. Some parts, though, are always the same. For example, in the shopping cart, a lot of things (like the header and the footer of the document and its CSS) are the same for every user. Dynamic pages are implemented as *templates*, or functions that receive an input (*the state*) and produce HTML, some of it the same, some of it changing according to the state. We'll come back to templating soon.

Early webapps generated all their HTML on the server and served a fully finished HTML document. The state would usually be stored in the cookie (which is a piece of text send by the browser to the server on every interaction) and often also on a database accessible to the web server. Wih each request coming from a web browser, the web server created a fresh HTML document and served it to the browser. The user would then interact with this HTML by clicking on links (which took them to another page of the webapp) or by submitting forms. In any case, every user interaction *generated a page refresh*, either because the user went to a new page or because the form submitted by the user updated the state of the app, hence the server had to generate fresh HTML to update the page displayed to the user.

Around 1999, Microsoft had won the [first browser war](https://en.wikipedia.org/wiki/Browser_wars). Almost inadvertently, it introduced a feature that revolutionized webapps: [the ability for the browser to send and receive information with the server without triggering a page refresh](https://en.wikipedia.org/wiki/XMLHttpRequest#History). This is the second step in our journey: to understand the implications of the browser communicating with the server without a page refresh. This functionality is now known as AJAX (we'll explain the acronym a little later). For now, consider AJAX as a way to say *communication without a page refresh*.

Thanks to AJAX, webapps could now offer a much better experience to users, even rivaling that of native applications. Before AJAX, every user interaction that either retrieved data or sent it required a page refresh. This entailed three drawbacks:

1. **Performance**: it took some time to retrieve the full page from the server (the internet was also much slower back then), and then some more time to re-render the page in the browser.

2. **Abrupt transitions**: page transitions blanked the browser, especially if the connection was slow. Users had to wait for a while and hope that the webapp would come back after the page refresh.

3. **Generic error page if the connection was lost**: if the connection was lost during a page refresh, the browser would show a generic error page. If the page refresh was triggered by data sent by the user, this data would be lost. In other words, the webapp was completely gone if the connection had an issue.

AJAX allowed to minimize all of these drawbacks:

1. **Performance**: if a page is already loaded, it is faster to retrieve new data and update it on the page than to retrieve the entire page (with all the associated markup, style and scripts) from the server.

2. **Seamlessness of transitions**: page changes can be much smoother visually if only parts of the page change.

3. **Offline ability**: if the network connection (or the server) is down, instead of losing all state, the page can hold its state, warn the user, and attempt to communicate with the server until the connection is restored. Also as important, the page can be saving state to the server constantly without the user having to submit data and waiting for a reload.

Going back to the shopping cart, let's do a before-and-after comparison:
- When you add a product:
   - Without AJAX: the browser goes blank, takes some time, then shows you the updated cart.
   - With AJAX: the app is always visible and is updated after a shorter frame of time, without blanking the page.
- When you lose the connection with the server and you add a product:
   - Without AJAX: you get a browser error.
   - With AJAX: you get a message within the app saying that there's an issue with the connection. If the connection comes back, the app can submit your request and update the cart.

As we mentioned before, XMLHTTPRequest enabled AJAX. [AJAX itself](https://en.wikipedia.org/wiki/Ajax_(programming)) stands for *asynchronous javascript and XML*. XMLHTTPRequest allowed to perform communication with the server in both a blocking and non-blocking way. The blocking or synchronous way would send a request to the server and *freeze the page* until the server responded; the non-blocking or asynchronous way, which didn't freeze the page, allowed the user to continue using the page while the browser waited for a response from the server. As you can imagine (or remember), non-blocking/asynchronous communication became dominant because of the vastly improved user experience it enabled. [XML](https://en.wikipedia.org/wiki/XML), the second leg of AJAX, is a file format for interchanging information between the browser and the server. XML was rapidly displaced by [JSON](https://en.wikipedia.org/wiki/JSON), another file format for interchanging data which is a subset of js.

As of 2005, these two technologies (asynchronous XMLHTTPRequests, mostly interchanging JSON between the browser and the server) became mainstream and powered a new generation of webapps.

Interestingly enough, both technologies are fused with js: js is needed to perform asynchronous requests, while js also must be used to process the responses sent by the server (usually in JSON format). The triumph of AJAX was, quite simply, the triumph of js.

While js was used before AJAX for purposes like animations or browser-side validations, it now became the main communication channel between the browser and the server - hence, it became *essential* for the creation of webapps. What started happening is the following:

1. Modifications to the state by the client start to be handled through js instead of HTML forms. So js starts collecting certain parts of the state of the app and sends them to the server.
2. HTML comes from the server and is handed to js, so that js can place it in the right place of the page.

This means that js started having a growing role in the two central operations of a webapp:

1. Manage the state of the app.
2. Redrawing the page in consequence to changes to the state.

Not surprisingly, frontend frameworks started emerging to solve these two problems that the first generation of webapps didn't have to face.

Now that the browser had both the need (and the ability) to manage the state and redraw the page, the question emerged: how much of either should it do? A novel answer to this question (and by no means a definitive one) was provided by [single page applications](https://en.wikipedia.org/wiki/Single-page_application). In a SPA, the first request to the server loads some basic HTML and all the js application logic; then all the HTML generation happens on the browser. Over the course of a session, the browser interacts with the server asynchronously and updates its own HTML accordingly. SPAs move all the HTML generation to the browser, transforming the server into an [API](https://en.wikipedia.org/wiki/Application_programming_interface).

Properly constructed SPAs require the addition of logic for handling navigation between pages (to preserve the correspondence between an URL and a page in the webapp); this became possible with [hash navigation](https://en.wikipedia.org/wiki/Fragment_identifier). More importantly, SPAs require the browser to use js to render the page, effectively making it essential for any operation. This represents a long distance indeed from HTML static pages.

The SPA approach became dominant - despite the fact that its merits are debatable. SPAs coexist with more traditional webapps (which generate most or all of their HTML on the server).

### Lessons from the quest for IE6 compatibility

Here's a list of things I learned from making gotoв and its dependencies compatible with very old browsers, including Internet Explorer 6.

This would have been impossible without [Browserstack](https://browserstack.com) - thanks to them, I could extensively test cross-browser compatibility.

It is *remarkable* how many elements of the modern web are already present in IE6 (2001), no matter how crude or buggy its implementation. Most importantly, AJAX is already supported, which enables apps that can retrieve data from the server without a page refresh.

With that said, the leap from [ES5 js](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition) (published in 2009) to ES3 js (published in 1999) is large. ES3 lacks the following basic niceties:
- Native JSON support. But if you include json as a [script](https://cdn.jsdelivr.net/gh/douglascrockford/JSON-js@aef828bfcd7d5efaa41270f831f8d27d5eef3845/json2.min.js) before loading other scripts, that solves the problem.
- If you use a reserved word as the key of an object, you need to put it between quotes: `{'class': ...}`.
- Trailing commas are not allowed in object literals. Something like `[1, 2, 3,]` or `{a: 1,}` will throw an error.
- No `querySelectorAll`.

Before ES3, however, [here be dragons](https://en.wikipedia.org/wiki/Here_be_dragons): no AJAX support, not even regular expressions! I haven't even dared to try to make gotoв work there.

Some particular quirks of ES3 browsers:
- To access the `n`th character of a string `s`, don't use `s [n]` because that won't work - rather, use `s.substr (n, n + 1)`. (IE6/IE7)
- IE8 seems to escapes unicode characters on the output of `JSON.stringify`.
- No `Date.now`; use `new Date ().getTime` instead.
- The developer console was something that emerged over time. Old browsers didn't have it, or had a very limited version of it! This was an inspiration for `B.eventlog`, which turns out to be useful even in modern browsers.

gotoв and its dependencies implement the following three [polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)):
- [`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) for arrays.
- [`insertAdjacentHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)
- [`contains`](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)

No other polyfills were required. The rest of the functionality needed to make gotoв work has been provided by helper functions that sometimes extensively check for browser quirks, such as [teishi.type](https://github.com/fpereiro/teishi#teishitype).

Why even bother with making gotoв compatible on old browsers that nobody uses anymore? I'm not entirely sure, but I can offer the following reasons:

- **Minimalism**: demanding little from js or the browser has already worked well for other libraries of the [ustack](https://github.com/fpereiro/ustack). The ustack was originally built for ES5 js and it purposefully avoided modern (>= ES6) features. This decision encouraged minimalism in the language constructs used, which stimulated the simplicity of the implementation.
- **Reliability**: implementing gotoв in the unforgiving terrain of older browsers spurred me to think deeper about the fundamentals of its implementation. Making it run in old browsers was a stress test, a way to raise the bar and test both the concepts and the solidity of how they are implemented. Despite the artificiality of the challenge, useful changes emerged in the process.
- **Fun**: It was fun to do! gotoв v1 was already ES5 compatible. When rewriting gotoв (from v1 to v2), I decided to see how far I could take this. I couldn't help but see how far I could take it back and understand which quirks were possible to overcome and which ones would render the project impossible. And when things got frustrating, the sheer amount of progress already done kept me going. The project started with [dale](https://github.com/fpereiro/dale), the most basic dependency, and grew gradually from there. By the time all the dependencies were ES3 compatible, I was still doubtful that gotoв could be ES3 compatible. But it ended up being possible!
- **Trying something different**: most js frameworks and libraries are constantly moving in the direction of dropping support for older browsers. I figured it would be interesting to do the opposite - and indeed it was!

To restate the first point: it is remarkable that a modern web framework can be at all implemented in browsers that are (as of 2021) 20 years old. This is not a testament to gotoв's prowess, but rather to the prowess of js as a language, and that of the browser as an application platform. Even if their ES3 implementations have aged badly, their fundamentals have aged extremely well.

### Tutorial: So you want to write a frontend?

[Here you can find](tutorial/tutorial.md) a tutorial consisting of a conceptual introduction to webapps, followed by a gentle introduction on how to implement the frontend of a webapp. The tutorial requires only basic knowledge of HTML, javascript and programming. If you are just beginning and you want to understand the basic concepts of a webapp, you may find it useful. If you are a more experienced developer that is interested in reconsidering the concepts of the frontend from the ground up, you might be interested in it too.
