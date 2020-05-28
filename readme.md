# gotoв

> "The only software that I like is one that I can easily understand and solves my problems. The amount of complexity I'm willing to tolerate is proportional to the size of the problem being solved." --[Ryan Dahl](http://tinyclouds.org/rant.html)

gotoв is a framework for making the frontend of a web application (henceforth *webapp*).

## Current status of the project

The current version of gotoв, v2.0.0, is considered to be *somewhat stable* and *mostly complete*. [Suggestions](https://github.com/fpereiro/gotoB/issues) and [patches](https://github.com/fpereiro/gotoB/pulls) are welcome. Besides bug fixes, there are no changes planned.

gotoв is part of the [ustack](https://github.com/fpereiro/ustack), a set of libraries to build webapps which aims to be fully understandable by those who use it.

## Why gotoв?

gotoв is a framework optimized for understanding. Its purpose is to allow you to write webapps in a way that you can fully understand what's going on.

In my experience, understanding leads to short and beautiful code that can last for years in a production setting. It is my sincere hope that you'll be able to use gotoв to create webapps and have a lot of fun while at it.

## Installation

gotoв is written in Javascript. You can use it in the browser by loading the pre-built file, `gotoB.min.js`, in a `<script>` tag at the top of the `<body>`:

```html
<script src="gotoB.min.js"></script>
```

Or you can use this link to use the latest version - courtesy of [jsDelivr](https://jsdelivr.com).

```html
<script src="https://cdn.jsdelivr.net/gh/fpereiro/gotob@.../gotoB.min.js"></script>
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

<a href="https://www.browserstack.com"><img src="https://bstacksupport.zendesk.com/attachments/token/kkjj6piHDCXiWrYlNXjKbFveo/?name=Logo-01.svg" width="150px" height="33px"></a>

## Tutorial

An in-depth tutorial is available [here](tutorial/tutorial.md). The tutorial covers the general principles of building a webapp and introduces gotoв as a possible solution to the fundamental problems of building a frontend. It requires only basic knowledge of HTML, javascript and programming, so if you're learning how to build webapps, it might be a good place to start.

## Index

- [Examples](https://github.com/fpereiro/gotob#examples)
- [A conceptual explanation of gotoв](https://github.com/fpereiro/gotob#a-conceptual-explanation-of-gotoв)
- [API reference](https://github.com/fpereiro/gotob#api-reference)
- [Internals](https://github.com/fpereiro/gotob#internals)
- [Frequently Asked Questions](https://github.com/fpereiro/gotob#faq)
- [Annotated source code](https://github.com/fpereiro/gotob#source-code)
- [License](https://github.com/fpereiro/gotob#license)

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
   return B.elem ('counter', function (counter) {
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

### Todo list

```javascript
B.listen ('create', 'todo', function (x) {
   var todo = prompt ('What\'s one to do?');
   if (todo) B.say (x, 'add', 'todos', todo);
});

var todoList = function () {
   return [
      ['style', [
         ['span.action', {color: 'blue', cursor: 'pointer', 'margin-left': 10}],
      ]],
      ['h3', 'Todos'],
      B.elem ('todos', function (todos) {
         return ['ul', dale.go (todos, function (todo, index) {
            return ['li', [todo, ['span', {class: 'action', onclick: B.ev ('rem', 'todos', index)}, 'Remove']]];
         })];
      }),
      ['input', {onclick: B.ev ('create', 'todo')}, 'Create todo']
   });
}

B.mount ('body', todoList);
```

You can find more examples [here](https://github.com/fpereiro/examples/list.md).

## A map of the front(end)

gotoв exists to facilitate writing the frontend of a webapp. The best way to understand gotoв is to understand the problems it solves; when the problems become clear, then the solution follows. Also, by understanding the problems, you can better judge the solutions to them instead of taking them at face value. My hope is that this conceptual introduction to gotoв will also help you to better understand other frameworks and webapps in general. A map of the frontend, so to speak, and *a* way (not necessarily *the* way) to traverse it.

In this section, we'll go over the main problems and design decisions of a frontend. To make concepts clearer, a very down-to-earth example will accompany us along our conceptual journey: a shopping cart! Not only it is concrete; it is also extremely practical and as such quite fertile - in fact, an essential piece of web technology (HTTP cookies) [owes its existence](https://en.wikipedia.org/wiki/HTTP_cookie#Background) to it.

The first step in our conceptual journey is to understand **the difference between a website and a webapp**. Websites started existing in the Christmas of 1990 when the World Wide Web was launched. A website is 1) a document composed of HTML; 2) that is identified by an Uniform Resource Locator (URL). A web browser, when visiting a given URL, will load and then display the document.

The web was revolutionary because - ruthlessly summarizing - 1) HTML could be interpreted by different browsers to fit different screen sizes; and 2) there was a single information space (the web) on which every document could live, accessible under its own URL. A third crucial feature of the web are links. Links allow connecting one webpage to another. By doing so, the web space can be traversed in different ways, allowing all sorts of possibilities. As natural as the web seems to us in 2020, these were real innovations were not obvious in the least. They are the bedrock on which webapps are built.

Webpages are stored as files on a server, and are served as-is to a web browser that requested them. Webpages, thus, are *static*. The same URL yields the same HTML. If a webpage is updated, then the HTML will change, but it will change for everyone that requests the page since the update.

To the best of my knowledge, the first webapp followed the creation of the web by about [five years](https://en.wikipedia.org/wiki/Viaweb). Webapps leverage the web (HTML, URLs and the HTTP protocol to communicate between the browser and the server) to provide functionality hitherto provided by native apps. Instead of distributing software programs that users should install on their computers, webapps allow users to use the app *through their web browser, without installing any additional software*. This proved to be perhaps as revolutionary as the web itself.

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

Around 1999, Microsoft had won the [first browser war](https://en.wikipedia.org/wiki/Browser_wars). Almost inadvertently, it introduced a feature that revolutionized webapps: [the ability for the browser to send and receive information with the server without triggering a page refresh](https://en.wikipedia.org/wiki/XMLHttpRequest#History). This is the second step in our journey: to understand the implications of the browser communicating with the server without a page refresh - henceforth, we'll use the acronym *CWAPR* to refer to *communication without a page refresh*.

Thanks to CWAPR, webapps could now offer a much better experience to users, even rivaling that of native applications. Before CWAPR, every user interaction that either retrieved data or sent it required a page refresh. This represented three drawbacks:

1. **Performance**: it took some time to retrieve the full page from the server (the internet was also much slower back then), and then some more time to re-render the page in the browser.

2. **Abrupt transitions**: page transitions blanked the browser, especially if the connection was slow. Users had to wait for a while and hope that the webapp would come back after the page refresh.

3. **Generic error page if the connection was lost**: if the connection was lost during a page refresh, the browser would show a generic error page. If the page refresh was triggered by data sent by the user, this data would be lost. In other words, the webapp was completely gone if the connection had an issue.

CWAPR allowed to minimize all these drawbacks:

1. **Performance**: if a page is already loaded, it is faster to retrieve new data and update it on the page than to retrieve the entire page (with all the associated markup, style and scripts) from the server.

2. **Seamlessness of transitions**: page changes can be much smoother visually if only parts of the page change.

3. **Offline ability**: if the network connection (or the server) is down, instead of losing all state, the page can hold its state, warn the user, and attempt to communicate with the server until the connection is restored. Also as important, the page can be saving state to the server constantly without the user having to submit data and waiting for a reload.

Going back to the shopping cart, let's do a before-and-after comparison:
- When you add a product:
   - Without CWAPR: the browser goes blank, takes some time, then shows you the updated cart.
   - With CWAPR: the app is always visible and is updated after a shorter frame of time, without blanking the page.
- When you lose the connection with the server and you add a product:
   - Without CWAPR: you get a browser error.
   - With CWAPR: you get a message within the app saying that there's an issue with the connection. If the connection comes back, the app can submit your request and update the cart.

CWAPR is done exclusively through Javascript (js, henceforth), the browser's scripting language. While js was used before CWAPR for purposes like animations or browser-side validations, it now became the main communication channel between the browser and the server - hence, it became *essential* for the creation of webapps. What started happening is the following:

1. Modifications to the state by the client start to be handled through js instead of HTML forms. So js starts collecting certain parts of the state of the app and sends them to the server.
2. HTML comes from the server and is handed to js, so that js can place it in the right place of the page.

This means that js started having a growing role in the two central operations of a webapp:

1. Manage the state of the app.
2. Redrawing the page in consequence to changes to the state.

Not surprisingly, frontend frameworks started emerging to solve these two problems that the first generation of webapps didn't have to face.

Let's go back to our example to understand these two problems:

TODO -- below only are rough notes

- state: products in cart, billing information
- updates: show products in cart, show billing information (if validated)

- extract state from DOM - potentially put it there too

Now that the browser had both the need (and the ability) to both manage the state and redraw the page, the question emerged: how much of either should it do?
Spa (gotoB can be not that, but geared towards it).

State: Dom vs js. Centralized
State management, who to update, invert control
Events! Many listeners. Incidentally, server! Ordered, one at a time.
Events also for doing other things. Go beyond just touching the state. In the end, state gets modified.
Log states and chains, to see what happens.
Your app: events, listeners and bricks
Events as fun executions
No lifecycle hooks, use change
Negative priorities as nestedness
Opaque and literal
Trample and perflogs
(Perhaps drop ev in "ev listener")


API ref
Please start at conceptual
Errors first
Events: basic, data, your own, logic in the listeners, context, order and async (,ref to recakc)
Bricks: b.elem connected to events, brick rules, no reuse, literals, all of it.
B.ev to fire events from within. Bev before belem.
Design principles and comparisons with other frameworks
Self contained in func
Some libraries are used directly, some are conveniences (and also used internally)
No compilation
All global
No components and no classes. Instead, namespace in events and in store
Lightweight, see through in Dom and in global object

Internals
Change event
Elem stashing things and redraw, use shallow of the stashed only
Flatten and reference
Diff
Apply diff but give up

## Fundamentals

gotoв is built on four fundamental ideas:

1. Use of object literals to generate HTML & CSS.
2. All the state and data of the application are stored on a global store object.
3. The store is updated by an event system.
4. Reactive DOM elements are functions that return object literals (#1), use the global store as input (#2) and are triggered by events (#3).

Let's go through them in more detail.

### #1: Use of object literals to generate HTML & CSS

Modern webapps redraw parts of the page without a page refresh. This requires them to generate HTML directly on the browser, using javascript. There are many ways to do this. gotoв chooses to use object literals in order to generate HTML. Object literals are merely [arrays and objects](https://github.com/fpereiro/lith). These arrays and objects are then transformed into HTML.

For example, to generate the following HTML:

```html
<div id="header" class="left">
   <h1>This is a header!</h1>
   <p>And this is a paragraph...</p>
</div>
```

You write the following object literals:

```javascript
['div', {id: 'header', class: 'left'}, [
   ['h1', 'This is a header!'],
   ['p',  'And this is a paragraph...']
]]
```

Object literals have the following advantages:
- They *are* javascript: there's no separate syntax for them.
- They can be easily parsed by javascript.

The rules for writing HTML with object literals are straightforward:

- To generate a tag `<whatever>`, use an array of the form `['whatever', ...]`.
- To add attributes to a tag, use an object with keys and values as its second element: `['whatever', {attribute1: value1, attribute2: value2}]`.
- To add contents to a tag, place them as the *last* element to it. In the example above, `<h1>` and `<p>` have a single string as their content; while the `<div>` contains an array with two other tags.

CSS can be also generated with the same type of straightforward mapping. You can see a detailed description [here](https://github.com/fpereiro/lith#litcs).

**Takeaway: all HTML (and perhaps some CSS) is written as object literals, which are then converted into HTML & CSS.**

### #2: All the state and data of the application are stored on a global store object

In webapps, information can be in many places, such as inside DOM elements or anywhere in the javascript code.

gotoв centralizes all the information of the webapp on a single javascript object, `B.store`. This object has all the information and can be considered the [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth). The following are examples of what can be contained on the store:

- Data brought from the server.
- Name of the page that is currently being displayed.
- Data provided by the user that hasn't been submitted yet to the server.

**Takeaway: if it affects what's displayed on the screen or what is submitted to the server, it belongs in `B.store`.**

### #3: Events perform all actions, including updating the global store

gotoв structures all operations through events. All actions to be performed on the webapp can be modeled as events. This includes updating `B.store`, which is updated by gotoв's event system instead of being modified directly.

The function for **triggering** events is `B.say`. It receives as arguments a `verb`, a `path` and optional extra `arguments`.

gotoв provides three `verbs` for modifying `B.store`: `set`, `add` and `rem`. Let's see them through examples:

```javascript
// At the beginning, B.store is merely an empty object

// We now say an event with verb `set`, path `username` and `mono` as its first argument.
B.say ('set', 'username', 'mono');

// Now, B.store is {username: 'mono'}

// We now say an event with verb `set`, path `['State', 'page']` and `main` as its first argument.
B.say ('set', ['State', 'page'], 'main');

// Now, B.store is {username: 'mono', State: {page: 'main'}}

// We now say an event with verb `rem`, path `[]` and `username` as its first argument.
B.say ('rem', [], 'username');

// Now, B.store is {State: {page: 'main'}}

// We now say an event with verb `rem`, path `State` and `page` as its first argument.
B.say ('rem', 'State', 'page');

// Now, B.store is {State: {}}

// We now say an event with verb `set`, path `['Data', 'items']` and `['foo', 'bar']` as its first argument.
B.say ('set', ['Data', 'items'], ['foo', 'bar']);

// Now, B.store is {State: {}, Data: {items: ['foo', 'bar']}}

// We now say an event with verb `add`, path `['Data', 'items']` and `boo` as its first argument.
B.say ('add', ['Data', 'items'], 'boo');

// Now, B.store is {State: {}, Data: {items: ['foo', 'bar', 'boo']}}

// We now say an event with verb `rem`, path `['Data', 'items']` and `0` as its first argument.
B.say ('rem', ['Data', 'items'], 0);

// Now, B.store is {State: {}, Data: {items: ['bar', 'boo']}}
```

It is important to note that events can be used for things other than updating `B.store`, as we will see later.

**Takeaway: modify `B.store` by triggering events with `B.say`.**

### #4: Reactive elements are event listeners that take information from `B.store` and return object literals

`B.elem` is the gotoв function for creating HTML elements that are updated when the relevant part of the store changes. That's why they're called *reactive*, because they *react to a (relevant) change by updating themselves*. Let's see an example:

```javascript
var counter = function () {
   return B.elem ('counter', function (counter) {
      return ['h2', 'The counter is ' + counter];
   });
}
```

`counter` returns a reactive element. Whenever `B.store.counter` is updated, the `h2` reactive element will be automatically updated.

```javascript
B.say ('set', 'counter', 1);

// <h2>The counter is 1</h2>

B.say ('set', 'counter', 2);

// <h2>The counter is 2</h2>
```

You might be wondering: how can we trigger events from the DOM itself? One way of doing it would be the following:

```javascript
var counter = function () {
   return B.elem ('counter', function (counter) {
      return ['div', [
         ['h2', 'The counter is ' + counter],
         ['button', {
            onclick: "B.say ('set', 'counter', " + (counter + 1) + ")"
         }, 'Increment counter']
      ]];
   });
}
```

But it is much better to use `B.ev`, which will create a stringified call to `B.say` that we can put within the `onclick` attribute directly.

```javascript
var counter = function () {
   return B.elem ('counter', function (counter) {
      return ['div', [
         ['h2', 'The counter is ' + counter],
         ['button', {
            onclick: B.ev ('set', 'counter', counter + 1)
         }, 'Increment counter']
      ]];
   });
}
```

And that, in a nutshell, is how gotoв works:

1. Object literals generate HTML and CSS.
2. The global store takes care of our state & data.
3. Events perform all actions, including updating the global store.
4. Reactive elements are event listeners that return object literals and are automatically updated when a relevant part of the store changes.

## API reference

### The gotoв object

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

You can use these libraries at your discretion. If you do so, I recommend also assigning local variables to them:

```javascript
var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c;
```

You may have noticed I omitted recalc in the line of code above. This is because you'll most likely use this recalc through gotoв's functions instead of using it directly.

### Generating HTML

gotoв generates HTML directly on the browser, using javascript. This HTML, when placed on the page, becomes the interface to the webapp.

Our first stop is to understand how to write HTML using javascript. gotoв does this through [lith](https://github.com/fpereiro/lith), a library that uses javascript object literals to generate HTML. Object literals are mere arrays (`[...]`) and objects (`{...}`), nothing more than that! We call these literals that generate HTML as `liths`. Let's see a few examples of some liths and their corresponding HTML:

- `['p', 'Hello'] -> <p>Hello</p>`
- `['div', {class: 'nice'}, 'Cool'] -> <div class="nice">Cool</div>`.
- `['div', ['p', {id: 'nested'}, 'Turtles']] -> <div><p id="nested">Turtles</p></div>`.

*Note for crazy people supporting very old browsers like Firefox 3 and Internet Explorer 8*: put quotes around `class` (`{'class': ...` instead of `{class: ...`) to make the second example work.

In general, a lith is an array with one to three elements. The first element is a string indicating the `tag`. There can be a second element for specifying attributes, which is an object. Finally, you can add `contents` to the lith; these contents can be a string, a number or another lith.

Besides liths, we also can write an array containing multiple liths, which is affectionally called *lithbag*. For example:

- `<p></p><p></p>`: `[['p'], ['p']]`.

A lithbag can also be a collection of text and number fragments. For example:

- `i ama1337lithbag`: `['i am', 'a', 1337, 'lithbag']`.

You can put a lithbag as the contents to another lith:

- `<div>Some text</div>`: `['div', ['Some', ' ', 'text']]`.

Rather than writing standalone liths or lithbags, gotoв expects you to write **functions that return liths or lithbags**. For example, this function returns HTML for a `hello world` page:

```javascript
var helloWorld = function () {
   return ['h1', 'Hello, world!'];
}
```

If you come from other frontend frameworks, these functions are called *views*. Breaking with existing convention, we won't call them that, because that term is neither intuitive nor accurate. We shall call them something rather more concrete: *bricks*. Why? Because they produce HTML, which then gets transformed by the browser into visible elements on the screen. Bricks are the visible part of the application.

From now on, a `brick` will be a function that returns either liths or lithbags.

It is possible and even handy (but not mandatory) to generate CSS with gotoв (see the details [here](https://github.com/fpereiro/lith#litcs)), but we can leave that for later.

How do we go from a brick to putting something on the screen? Enter `B.mount`.

### `B.mount`

To convert the output of our brick into HTML and place it somewhere on the page, gotoв provides `B.mount`. This function takes two arguments: the `target` (the DOM element where the HTML will be placed) and a brick (the function that generates the liths that will be converted to HTML). For example:

```javascript
var helloWorld = function () {
   return ['h1', 'Hello, world!'];
}

B.mount ('body', helloWorld);
```

`target` must always be a string. It can be either `'body'` or a string of the form `'#ID'`, where `ID` is the id of a DOM element that is already in the document. If `target` is not present in the document, the function will notify an error and will return `false`.

The brick must be, as we defined it above, a function. `B.mount` will execute this function passing no parameters to it. This function must return either a lith or a lithbag. If the function doesn't return a valid lith or lithbag, `B.mount` will notify an error and return `false`.

The HTML generated will be placed at the *top* of the target. In the example above, the `<body>` will look like this:

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

`B.unmount` is a function to undo what was done by `B.mount`. It receives a `target` which is just like the `target` passed to `B.mount`. It will remove *all* of the HTML contained inside `target`. If an invalid or non-existing `target` is passed to `B.unmount`, the function will notify an error and return `false`.

```javascript
B.unmount ('#container');

// `document.body.innerHTML` will now be an empty string.
```

`B.mount` nor `B.unmount` will both return `undefined` if the operation is successful.

### Introduction to the event system

- store
- perform
- listen

gotoв uses an event system to structure all the *actions* that happen in your webapp. Events are how things happen in a gotoв application.


The hard part of programming frontends is figuring out which parts should be updated when the data changes. The reason is the following: even in very simple webapps, different components influence and affect each other in subtle ways. This is the main reason, in my view, for the existence of frontend frameworks - otherwise, we'd just write straightforward code and be done with it!

gotoв tackles this problem by 1) centralizing all the application data on a single object (called the *store*) and 2) using an event system to update both the store and the relevant parts of the interface.

The *store* is a plain object on which you can put arbitrary data. What matters is that all the information that affects the interface should be placed there. From the perspective of the entire frontend, the *store* is the [single source of truth](https://en.wikipedia.org/wiki/Single_source_of_truth).

By having all the information centralized in one place, we avoid having to retrieve information from multiple places (like DOM elements or loose variables) and instead retrieve it from the store directly. Even more importantly, by updating the store through events, we can elegantly solve the problem of when to update a certain part of the interface. Let's see how with an example.

Let's consider an application with three components (C1, C2 and C3). These components depend on different parts of the state:
- C1 depends on S1.
- C2 depends on S1 and S3.
- C3 depends on S1, S2 and S3.

These components also modify parts of the state:
- C1 can modify S1, S2 and S3.
- C3 can modify S1 and S2.

In a straightforward implementation, every time we modify S1, S2 and S3, we would have to keep track of which components depend on them, and update them. So we'd need functions to modify every part of the state and make sure we call them from the components that can modify those parts of the state.

Real life applications (even very simple ones), can easily have a dozen components and two dozen pieces of information on which they depend. Things can get entangled very, very quickly.

An event system is a way out of this pickle. Instead of having dedicated functions to update the store and then certain components, we simply trigger an event when modifying a part of the store. Then, all the components that rely on that part of the store *listen* to that event and automatically update themselves.

When a component (or an action coming from a different place, perhaps a timer or a notification from the server) wants to update the state, it does it **through an event**. What's so special about performing actions through an event? Glad you asked: when an operation is done through an event, all the concerned parties are notified automatically and they react in consequence. If your code uses events, there can be functions that get automatically notified/updated when a certain type of event is triggered. The difference in effort is the same between staffing a sit-down restaurant vs a buffet: in the sit-down restaurant, you need to take orders and fulfill them for each of the persons sitting down. In the buffet, you just bring the food to the common areas with hot plates and trays, and the patrons get up and get it themselves.

The store where we keep all the data is an object located at `B.store`. The function for triggering events is `B.say`. This function takes a `verb`, a `path` and optional arguments. Why do we call this function `B.say` and not `B.trigger` or `B.fire`? To emphasize the key point: an event system is about *communication* between parts of a program. The event system is a channel of communcation, where some functions *say events* and some functions *listen to them*.

Before going deeper into the event system, let's see how we can create bricks that will be automatically updated when the state changes. Events are quite abstract, so having something as concrete as a brick can help us see it more clearly.

To get started, let's just fire an event to update the store. We'll set the `counter` property to `1` and jump to our first brick that is automatically updated.

```javascript
// Initially, `B.store` is an empty object.

B.say ('set', 'counter', 0)

// Now, `B.store` is `{counter: 0}`
```

### Introduction to `B.elem`

Let's create our first *reactive* brick. What does *reactive* mean? It means that it automatically updates itself when the information on which it depends has changed - in other words, it *reacts* to relevant changes on the store.

So far, we have set `B.store.counter` to `0`. Let's create a brick that shows us the counter:

```javascript
var counter = function () {
   return ['div', [
      ['h2', 'The counter is ' + counter],
   ]];
}

B.mount ('body', counter);
```

The problem with the brick above is that it will never change on its own, no matter what we do with `counter`. To create bricks that react to changes in the store, we use the function `B.elem`:

```javascript
var counter = function () {
   return B.elem ('counter', function (counter) {
      return ['div', [
         ['h2', 'The counter is ' + counter],
      ]];
   });
}

B.mount ('body', counter);
```

If you enter the following command on the developer console to update the store: `B.say ('set', 'counter', 1)`, you will notice that the brick gets automatically updated!

If you, however, try to update `B.store.counter` directly by entering `B.store.counter = 2`, you'll notice that... nothing happens! This is because you changed the store directly instead of using an event. Most of the time, you'll change the store through events - though by the end of this guide, we'll cover some cases where you can sidestep the event system to update the store.

`B.elem` takes a `path` and a `brick` as arguments. The `path` can be any of the following:
- A string: `counter`.
- An array of strings and integers: `['Data', 'counter']`.
- An array of arrays of strings and integers: `[['Data', 'counter'], ['State', 'page']]`.

If the `path` is `counter`, then the brick will be updated when `B.store.counter` changes. If the path is instead `['Data', 'counter']`, then the brick will be updated when `B.store.Data.counter` changes.

If the `path` is a list of `paths`, as `[['Data', 'counter'], ['State', 'page']]`, then the brick will be updated when *either* `Data.counter` or `State.page` change.

We'll explore mutiple `paths` soon. For now, let's go with the simpler example:

```javascript
var counter = function () {
   return B.elem ('counter', function (counter) {
      return ['div', [
         ['h2', 'The counter is ' + counter],
      ]];
   });
}

B.mount ('body', counter);
```

Notice that the value of `counter` is directly passed to the brick as its first argument.

By the way, if you passed `['counter']` instead of `'counter'` as the path, the result would be the same: `B.elem ('counter', ...` is the same as `B.elem (['counter'], ...`.

This brick not very useful, unless you expect your user to update the app through the developer console. To complete the counter, let's add a button that when clicked, will execute a function that updates the counter.

```javascript
var counter = function () {
   return B.elem ('counter', function (counter) {
      return ['div', [
         ['h2', 'The counter is ' + counter],
         ['button', {
            onclick: 'incrementCounter ()'
         }, 'Increment counter'],
      ]];
   });
}

window.incrementCounter = function () {
   B.say ('set', 'counter', B.store.counter + 1);
}

B.mount ('body', counter);
```

This will work, but it's not a good solution because it requires creating a global function for that particular purpose. This function is doing no more than firing an event through `B.say` to update `B.store.counter`. We could just pass the call to `B.say` within the event handler for `onclick`:

```javascript
var counter = function () {
   return B.elem ('counter', function (counter) {
      return ['div', [
         ['h2', 'The counter is ' + counter],
         ['button', {
            onclick: 'B.ev ("set", "counter", ' + (counter + 1) + ')'
         }, 'Increment counter'],
      ]];
   });
}

B.mount ('body', counter);
```

This is better, but still error prone, because you need to quote and unquote things properly. If we had to pass multiple arguments or arrays or objects, it would be even trickier.

For this reason, gotoв provides `B.ev`, a function to stringify calls to `B.say` so we can put them in the DOM.

### `B.ev`

As we just said, `B.ev` creates stringified event handlers that we can pass to DOM elements, in order to trigger events from them. Let's go back to our previous example:

```javascript
var counter = function () {
   return B.elem ('counter', function (counter) {
      return ['div', [
         ['h2', 'The counter is ' + counter],
         ['button', {
            onclick: B.ev ('set', 'counter', counter + 1)
         }, 'Increment counter'],
      ]];
   });
}

B.mount ('body', counter);
```

`B.ev` takes as arguments a `verb`, a `path`, and optional further arguments. In fact, it takes the same arguments as `B.say`! This is not a coincidence, since `B.ev` generates a string that, when executed by a javascript event, will perform a call to `B.say` with the same arguments.

When `counter` is 0, the call to `B.ev` will generate a string that looks like this: `"B.say ('set', 'counter', 1)"`.

If the user clicks on the button, `counter` will be updated, the brick function will be updated, and then the button's event handler will look like this: `"B.say ('set', 'counter', 2)"`.

Let's now see another example, to illustrate other aspects of `B.ev`: we'll create a button that, when clicked, will say an event with verb `submit` and path `data`.

```javascript
['button', {onclick: B.ev ('submit', 'data')}]
```

You can pass extra arguments when saying an event. For example, if you want to pass an object of the shape `{update: true}` you can instead write:

```javascript
['button', {onclick: B.ev ('submit', 'data', {update: true})}]
```

You can pass all sorts of things as arguments:

```javascript
['button', {onclick: B.ev ('submit', 'data', null, NaN, Infinity, undefined, /a regular expression/)}]
```

If you want to say more than one event within the same user interaction, you can do it by wrapping the event arguments into an array, and then wrapping them into another array:

```javascript
['button', {onclick: B.ev (['submit', 'data'], ['clear', 'data'])}]
```

If you need to access properties that are within the event handler (like `event` or `this`), you can do so as follows:

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value'})}]
```

These are called `raw` arguments, because they are passed as they are, without stringifying them.

In the example above, the event linstener will receive `this.value`, instead of the string `'this.value'`. You could also pass the event instead:

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 'event'})}]
```

You can pass multiple raw arguments. For example, if you want to pass both `this.value` and `event` you can write this:

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value'}, {raw: 'event'})}]
```

If an object has a key `raw` but its value is not a string, it will be considered as a literal argument instead:

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 0})}]
```

The event listener above will receive `{raw: 0}` as its first argument.

If you pass an object with a `raw` key that contains a string, other keys within that object will be ignored.

```javascript
['button', {onclick: B.ev ('submit', 'data', {raw: 'this.value', ignored: 'key'})}]
```

If invalid inputs are passed to `B.ev`, the function will report an error and return `false`.

Now that we have covered the main elements of gotoв, let's go back to see the event system in detail.

### The event system in detail

gotoв's event sytem is provided by [recalc](https://github.com/fpereiro/recalc), a library that implements the basic functions of the event system. We won't, however, be using recalc's functions directly - rather, we'll use event functions provided by gotoв.

The two main operations of an event system are 1) saying an event; and 2) setting event listeners that get notified when certain events are said.

To say an event, we use the function [`B.say`](https://github.com/fpereiro/recalc#rsay). This function takes the following arguments:

- An [optional context object](https://github.com/fpereiro/recalc#tracking-event-chains) (`x`), to keep track of what previous events (if any) triggered this event. We'll see more about this object below.
- A `verb`, which is a string. For example: `'add'`, `'set'` or `'someverb'`.
- A `path`, which can be either a string, an integer, or an array with zero or more strings or integers. For example, `'hello'`, `1`, or `['hello', '1']`. If you pass a single string or integer, it will be interpreted as an array containing that element (for example, `'hello'` is considered to be `['hello']` and `0` is considered to be `[0]`).
- You can pass unlimited additional arguments when you say an event. These arguments can be of any type.

You might ask: why use a combination of `verb` and `path` instead of just having a single event name instead? The answer is: too often we see event names like `toggleFooter`, `updateUser`, `savePosition`. By splitting an event name into a verb and a path, we achieve more clarity and versatility; very often, actions like `toggle`, `update`, `save` can be generalized. A great example of this are *data verbs*, which we already saw in the examples above and we'll describe now.

### Data verbs

gotoв sets event listeners for three data verbs: `add`, `rem` and `set`. Whenever an event is said that has one of these three verbs, these listeners will be executed and they will do two things:

1. Update the store.
2. Say a `change` event.

`change` events are very important, because these are the ones that update the page! In fact, `B.elem`, the function for creating reactive elements, creates event listeners that are executed when `change` events are said.

Let's see now how each of these events operate:

#### `set`

The first data *verb* is `set`. This verb sets data into a particular location inside `B.store`. It takes a `path` and a `value`. `path` can be an integer, a string, or an array containing integers and strings; `path` represents *where* we want to set the value inside `B.store`.

Let's see now a set of examples. In each of these examples, I'll consider that we start with an empty `B.store` so that we don't carry data from one example to the other.

```javascript
B.say ('set', 'title', 'Hello!');

// B.store is now {title: 'Hello!'}
```

As you can see, we pass `'set'` as the first argument; then we pass the `path` (`'title'`) and finally the value (`'Hello!'`). `set` also allows you to set nested properties:

```javascript
B.say ('set', ['user', 'username'], 'mono');

// B.store is now {user: {username: 'mono'}}
```

Notice how `B.store.user` was initialized to an empty object. Because the second element of the path is a string (`username`), the `set` data verb knows that `B.store.user` must be initialized to an object. Contrast this to the following example:

```javascript
B.say ('set', ['users', 0], 'mono');

// B.store is now {users: ['mono']}
```

In the example above, `B.store.users` is initialized to an array instead, since `0` is an integer and integers can only be the keys of arrays, not objects.

If your `path` has length 1, you can use a single integer or object as `path`:

```javascript
B.say ('set', 'foo', 'bar');

// B.store is now {foo: 'bar'}
```

If you pass an empty `path`, you will overwrite the entire `B.store`. In this case, `value` can only be an array or object, otherwise an error will be printed and no change will happen to `B.store`.

```javascript
B.say ('set', [], []);

// B.store is now []

B.say ('set', [], 'hello');

// B.store still is [], the invocation above will report an error and do nothing else.

B.say ('set', [], {});

// B.store is now {}
```

`set` will overwrite whatever part of the existing store stands in its way. Let's see an example:

```javascript
B.say ('set', ['Data', 'items'], [0, 1, 2]);

// B.store is now {Data: {items: [0, 1, 2]}}

B.say ('set', ['Data', 'key'], 'val');

// B.store is now {Data: {items: [0, 1, 2], key: 'val'}}

B.say ('set', ['Data', 0], 1);

// B.store is now {Data: [1]}
```

In the example above, when we set `['Data', 'key']`, `['Data', 'items']` is left untouched. However, when we set `['Data', 0]` to `1`, that assertion requires that `Data` be an array. Because it is an object, it will be overwritten completely and set to an array. This would also happen if `Data` were an array and a subsequent assertion required it being an object.

In summary, `set` will preserve the existing keys on the store unless there is a type mismatch, in which case it will overwrite the required keys with the necessary arrays/objects.

#### `add`

The second data verb is `add`. This verb puts elements at the end of an array. It takes a `path`, plus zero or more elements that will be placed in the array. These elements can be of any type.

```javascript
B.say ('set', ['Data', 'items'], []);

// B.store is now {Data: {items: []}}

B.say ('add', ['Data', 'items'], 0, 1, 2);

// B.store is now {Data: {items: [0, 1, 2]}}

B.say ('add', ['Data', 'items']);

// B.store is still {Data: {items: [0, 1, 2]}}
```

If `path` points to `undefined`, the array will be created automatically:

```javascript
// B.store is now {}

B.say ('add', ['Data', 'items'], 0, 1, 2);

// B.store is now {Data: {items: [0, 1, 2]}}
```

If no elements are passed to `add` but `path` points to an undefined value, the containing array will still be created.

```javascript
// B.store is now {}

B.say ('add', ['Data', 'items']);

// B.store is now {Data: {items: []}}
```

#### `rem`

The third and final data verb is `rem`. This verb removes keys from either an array or an object within the store. Like the other data verbs, it receives a `path`, plus zero or more keys that will be removed.

```javascript
B.say ('add', ['Data', 'items'], 'a', 'b', 'c');

// B.store is now {Data: {items: ['a', 'b', 'c']}}

B.say ('rem', ['Data', 'items'], 1);

// B.store is now {Data: {items: ['a', 'c']}}

B.say ('rem', 'Data', 'items');

// B.store is now {Data: {}}

B.say ('rem', [], 'Data');

// B.store is now {}
```

If `path` points to an array, the keys must all be integers. If `path` points to an object, the keys must instead be all strings. If `path` points to neither an array nor an object, `rem` will report an error and do nothing.

```javascript
B.say ('add', ['Data', 'items'], 'a', 'b', 'c');

// B.store is now {Data: {items: ['a', 'b', 'c']}}

B.say ('rem', ['Data', 'items'], 'a');

// The last invocation will report an error and make no change on B.store

B.say ('rem', 'Data', 0);

// The last invocation will also report an error and make no change on B.store

B.say ('rem', ['Data', 'items', 0], 'foo');

// The last invocation will also report an error and make no change on B.store
```

If `path` points to `undefined`, `rem` will not produce any effect but no error will be printed.

```javascript
B.say ('rem', ['Data', 'foo'], 'bar');

// Nothing will happen.
```

Nothing will happen also if you pass no keys to remove.

```javascript
B.say ('rem', ['Data', 'items']);

// Nothing will happen.
```

Instead of passing the keys as arguments, you can also pass them all together as an array of keys.

```javascript
// These two invocations are equivalent:
B.say ('rem', ['Data', 'items'], 'a');
B.say ('rem', ['Data', 'items'], ['a']);

// These two invocations are equivalent:
B.say ('rem', [], 'Data', 'State');
B.say ('rem', [], ['Data', 'State']);
```

#### The `change` event and calling the data functions directly

When you call any of the data verbs through `B.say`, a `change` event with the same `path` will be fired. More precisely, a `change` event will be fired whenever you call a data verb with 1) valid arguments; and 2) when your invocation actually modifies the store. If the event is fired with incorrect arguments or it doesn't modify the store, no `change` event will be triggered.

gotoв's function for creating reactive elements (`B.elem`), relies on the `change` event to know when it should redraw a view. `B.elem` essentially creates a listener function on the `change` event on a given path. This means that views are redrawn when a `change` event is emitted.

This is the reason for which you need to use events to modify the store. If you modified the store directly, the views depending on a part of the store would not be updated when the store changes!

The three data events internally call three respective data functions: `B.set`, `B.add` and `B.rem`. These functions receive a `path` as its first argument and then further arguments.

If you want to modify the store but avoid redrawing the views that depend on that part of the store, you can invoke these functions directly. This might be useful when you have multiple updates on a very short amount of time. Once the updates happen, you can then trigger the view redraw by firing a `change` event on the desired `path`. Let's see an example:

```javascript
B.elem ('items', function (items) {
   return ['ul', items.map (function (item) {
      return ['li', ['Item is', item]];
   })];
});

var updateItems = function (items) {
   items.map (function (item, index) {
      var updatedItem = ...;
      // We modify the items on the store directly.
      B.set (['items', index], updatedItem);
   });
   // When we're done updating the store, we say a `change` event
   B.say ('change', 'items');
}
```

Most of the time, this will not be necessary (the example above, in fact, is a bit artificial: you could perfectly create a new `items` array and then `set` it as one operation). A good approach is to not update the store directly unless a particular situation calls for it on the grounds of performance.

#### `B.store` & `B.get`

As we saw earlier, gotoв uses a global store to hold all the information that is relevant to your frontend app. This store is a simple object, which you can find at `B.store`.

`B.get` is a function for retrieving data from `B.store`. You can directly access data from `B.store` without it. However, `B.get` is useful to access properties in the store in case they haven't been defined yet.

For example, if `B.store.user.username` is not defined, if you try to do something like `var username = B.store.user.username` and `B.store.user` is not present yet, your program will throw an error.

If, instead, you write `var username = B.get ('user', 'username')`, if `B.store.user` is not present yet then `username` will be `undefined`.

Using this function is completely optional - it is just provided for your convenience.

`B.get` takes either a list of integers and strings or a single array containing integers and strings. These integers and strings represent the *path* to the part of the store you're trying to access. This `path` is the same `path` that `B.say` (the event saying function) takes as an argument.

If you pass invalid arguments to `B.get`, it will return `undefined` and report an error to the console.

If you pass an empty `path` to `B.get` (by passing either an empty array or no arguments), you'll get back `B.store` in its entirety.

#### Writing your own event listeners

Change listeners: common patterns: check if matching is precise; and get value. Show function doing this and think about whether to include it. `B.changeListener`
lifecycle hooks

listeners vs events
server: routes vs requests
code: function definition vs function call

interaction of events with the store. everything represented like this.
store events.

Instead of logging to the console, emit events and then see them in B.debug! Very useful also for environments where there's no console, like mobile browsers.

Two things in error reporting: visibility, and once you see it, identifiability, which means to track it quickly and certainly to which part of the code is making it. For the second, we put valuable info (including the `from` in some cases), but not more than necessary.

`B.mlisten`.

Instead of lifecycle hooks: events with very negative priority.

### `B.elem` in detail

As we said above, `B.elem` takes two elements: a `path` (or `paths`) and a brick function.

If you pass multiple `paths` to `B.elem`, the brick will be updated when any of the corresponding store elements change:

```javascript
var dashboard = function () {
   return B.elem ([['stockPrice'], ['username']], function (stockPrice, username) {
      return ['div', [
         ['h3', ['Hi ', username]],
         ['h4', ['The current stock price is: ', stockPrice, 'EUR']]
      ]];
   });
}

B.mount ('body', dashboard);

// Here, the dashboard will have neither a name nor a stock price.

B.say ('set', 'username', 'Oom Dagobert');

// The dashboard now will display an username printed, but no stock price.

B.say ('set', 'stockPrice', 140);

// Now the dashboard will print both an username and a stock price.
```

Bricks must return a single lith, not a lithbag. For example:

```javascript
var validBrick1 = function () {
   return ['h1', 'Hello'];
}

var validBrick2 = function () {
   return ['div', [
      ['h2'],
      ['h3']
   ]];
}

// This brick is invalid because it returns a lithbag.
var invalidBrick1 = function () {
   return [
      ['h2'],
      ['h3']
   ];
}

// The brick is invalid because it returns `undefined`.
var invalidBrick2 = function () {
   return;
}
```

By requiring every brick to return a lith, there's a 1:1 relationship between a brick and a DOM element. This makes both debugging and the implementation of the library simpler. (Why is the simplicity of the implementation important? Because gotoв is also meant to be understood, not just used. Simple implementations are easier to understand).

`B.elem` will generate two outputs:
- A lith structure with a DOM element.
- Set up an event listener that .

TODO
- cannot pass id, will be overwritten.
- to debug, use paths attribute.
- don't reference if outer is redrawn

### Production mode

If you set `B.prod` to `true`, you'll turn on *production mode*. When production mode is on, gotoв's functions will stop validating inputs. This will make your application faster, but if any of these functions is invoked with invalid arguments, you will either experience silent errors or your application will throw an exception. It is recommended that you only set this variable on a production environment once your application has been mostly debugged.

### Debugging

gotoв stores a list of all the events fired into `B.log`. Since gotoв applications are built around events, This can be extremely useful for debugging an app. Instead of inspecting `B.log` with the browser console, you can invoke `B.eventlog`, which will add an HTML table to the page where you can see all the information about the events.

The table presented by `B.eventlog` is ordered by time (so you can see what happened first and what later), it allows to track dependencies between events (if the context is passed in nested calls, see below) and it shows the time when the event was fired relative to the initial loading of the application (which allows for performance benchmarking).

If one of gotoв's functions is invoked with invalid arguments, an `error` event will be emitted. There's an `error` event listener that will report an error message, plus an invocation to `B.eventlog`. The end result is that you'll see the error as the last row of the `eventlog` immediately after the error happens. Note that this won't happen if `B.prod` is enabled. If you wish to turn off this behavior, run this command at the top of your application: `B.forget ('error')`.

If you wish to turn off logging of events, (what happens if error?)
B.r.log, turn off if needed.

redraw error: 1) modified something not-opaque; or 2) invalid markup. Or 3) actual gotoв bug.

if you put values on inputs without gotoв, then you should clear them out if you don't want them popping up elsewhere.

### Internals

- debugging: `node build dev`

## FAQ

### Why did you write another javascript framework?!?

I experience two difficulties with existing javascript frontend frameworks:

1. They are hard to understand, at least for me.
2. They are constantly changing.

The combination of these two characteristics mean that I must constantly spend an enormous amount of time and effort to remain an effective frontend developer. Which makes me unhappy, because complex things frustrate me and I am quite lazy when it comes to things I don't enjoy.

Rather than submit to this grind or reject it altogether (and missing out the possibility of creating my webapps), I took a third way out, by deciding to write a frontend framework that:

1. Is optimized for understanding.
2. Built on fundamentals, so that the framework will change [less and less as times goes by](https://en.wikipedia.org/wiki/Asymptote).

And, of course, gotoв must be very useful for building a real webapp.

### Is gotoв for me?

**gotoв is for you if:**

- You have freedom to decide the technology you use.
- Complexity is a massive turn-off for you.
- You like ES5 javascript.
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

- **Ease of use**: 90% of the functionality you need is contained in three functions (one for saying an event (`B.say`), one for stringifying an event call into a DOM attribute (`B.ev`) and one for creating dynamic elements which are updated automatically (`B.elem`)). There's also three more events for performing data changes that you'll use often. But that's pretty much it.
- **Fast reload**: the edit-reload cycle should take under two seconds. No need to wait until no bundle is completed.
- **Smallness**: gotoв and its dependencies are < 2k lines of consistent, annotated javascript. In other words, it is less than 2048 lines on top of [vanilla.js](http://vanilla-js.com/).
- **Batteries included**: the core functionality for building a webapp is all provided. Whatever libraries you add on top will probably be for specific things (nice CSS, a calendar widget, etc.)
- **Trivial to set up**: add `<script src="https://cdn.jsdelivr.net/gh/fpereiro/gotob@/gotoB.min.js"></script>` at the top of the `<body>`.
- **Everything in plain sight**: all properties and state are directly accessible from the javascript console of the browser. DOM elements have stringified event handlers that can be inspected with any modern browser.
- **Performance**: gotoв itself is small (~13kb when minified and gzipped, including all dependencies) so it is loaded and parsed quickly. Its view redrawing mechanism is reasonably fast.
- **Cross-browser compatibility**: gotoв is intended to work on virtually all the browsers you may encounter. See browser current compatibility above in the *Installation* section.

### What does gotoв *not* care about?

- **Browsers without javascript**: gotoв is 100% reliant on client-side javascript - if you want to create webapps that don't require javascript, gotoв cannot possibly help you create them.
- **Post-2009 javascript**: everything's written in a subset of ES5 javascript. This means no transpilation, no different syntaxes, and no type declarations. You can of course write your application in ES6 or above and gotoв will still work.
- **Module loading**: gotoв and its dependencies happily and unavoidably bind to the global object. No CommonJS or AMD.
- **Build/toolchain integration**: there's no integration with any standard tool for compiling HTML, CSS and js. gotoв itself is pre-built with a 70-line javascript file.
- **Hot-reloading**: better get that refresh finger ready!
- **Plugin system**: gotoв tries to give provide you all the essentials out of the box, without installation or configuration.
- **Object-oriented programming**: gotoв uses objects mostly as namespaces. There's no inheritance and no use of `bind`. Classes are nowhere to be found.
- **Pure functional programming**: in gotoв, [side-effects are expressed as events](https://github.com/fpereiro/recalc). The return values from event handlers are ignored, and every function has access to the global store. There's no immutability; the global state is modified through functions that update it in place.

## Source code

The complete source code is contained in `gotoB.js`. gotoв itself is about XXX lines long; its dependencies are about 1320 lines; the whole thing is about XXX lines.

Below is the annotated source.

```javascript
/*
gotoB - v2.0.0

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

We create an alias to `teishi.type`, the function for finding out the type of an element.

```javascript
   var type = teishi.type;
```

We define `B`, the main object of the library. Note we also attach it to `window.B`, so that it is globally available to other scripts.

This object has three keys that hold strings or numbers:

- `v`, a string containing the current version of the library.
- `B`, a one character string containing the [ve](https://en.wikipedia.org/wiki/Ve_(Cyrillic)) letter of the Cyrillic alphabet. This string is meant to be a handy reference to the letter, which will be used in some parts of the library.
- `t`, an integer timestamp to mark the time when gotoв is loaded. This is useful as an "instant zero" timestamp that can serve as reference for performance measurements.

The remaining seven keys of the main object map to recalc entities. The first one, `r`, maps to the single instance of recalc used by gotoв. The other six map to the public objects and methods of the recalc instance:

- `r.listeners`, an array which contains all event listeners.
- `r.store`, an object which is the global state.
- `r.log`, an array which contains all the events fired, used for debugging purposes.
- `r.say`, the function for emitting events.
- `r.listen`, the function for creating an event listener.
- `r.forget`, the function for deleting an event listener.

```javascript
   var B = window.B = {v: '2.0.0', B: 'в', t: teishi.time (), r: r, listeners: r.listeners, store: r.store, log: r.log, say: r.say, listen: r.listen, forget: r.forget};
```

gotoв is essentially a set of functions built on top of recalc. The last six keys are meant as shorthands to the corresponding recalc objects for quicker debugging from the browser console. If it wasn't for these shorthands, instead of writing `B.say`, for example, we'd have to write `B.r.say`, which is longer and doesn't look as nice.

### Error reporting

We define a function `B.error`, which we'll use to report errors when a gotoв function is used with invalid inputs. We will also store this function in `r.error`, so that recalc also uses it to inform errors. This is necessary since we're directly exposing some recalc functions directly without writing gotoв wrappers for them - so we want their errors to be reported by gotoв proper.

This function receives arguments which contain the contents of an error; it will emit an `error` event through `B.say` and return `false`.

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

We fire an event through `B.say`, passing either the provided context (if present) or an empty context, plus the verb `error`, and the rest of the arguments, of which the first one will function as a path.

```javascript
      B.say.apply (null, [x || {}, 'error'].concat (args));
```

We return `false` and close the function. This return value is needed since both recalc and some gotoв functions return `false` when they receive invalid inputs.

```javascript
      return false;
   }
```

We create an event listener for reporting an error. This listener have an `id` of `error` and will match any event with verb `error` (notice the `match` function, which only requires the event's verb to be `error` for the match to happen.

```javascript
   B.listen ({id: 'error', verb: 'error', path: [], match: function (ev) {return ev.verb === 'error'}}, function () {
```

The listener will add to the body a `<div>` with `id` `eventlog-snackbar` to the page to mark that there was an error. It will then remove it after 3 seconds through a timeout.

The `true` third argument passed to `lith.g` turns off lith's validation for this particular HTML generation, to make it faster.

```javascript
      document.body.innerHTML += lith.g (['div', {
         id: 'eventlog-snackbar', style: lith.css.style ({position: 'fixed', 'font-weight': 'bold', opacity: '0.8', top: 0, left: 0.1, width: 0.8, padding: 10, color: 'white', 'background-color': 'black', 'z-index': '10001', 'text-align': 'center'})
      }, 'There was an error.'], true);

      setTimeout (function () {
         if (c ('#eventlog-snackbar')) document.body.removeChild (c ('#eventlog-snackbar'))
      }, 3000);
```

We invoke `B.eventlog`, a function we'll define below and which will print a table with all the events fired so far. We then close the listener.

```javascript
      B.eventlog ()
   });
```

We define `B.eventlog`, a function that prints a table with a list of all the events fired so far. This table can be very useful for debugging purposes. This function prints a subset of the information contained at `B.r.log`.

```javascript
   B.eventlog = function () {
```

If there's already a DOM element with `id` `eventlog`, we remove it.

```javascript
      if (c ('#eventlog')) document.body.removeChild (c ('#eventlog'));
```

We define three variables for drawing the table of events:
- `index`, which will store the ordinal position of each event id.
- `colors`, a list of colors to assign to event numbers.
- `columns`, the columns for the table.

```javascript
      var index = {}, colors = ['maroon', 'red', 'olive', 'green', 'purple', 'fuchsia', 'teal', 'blue', 'black', 'gray', 'salmon', 'darkcyan', 'darkviolet', 'indigo', 'limegreen', 'coral', 'orangered'], columns = ['ms', 'entry', 'from', 'verb', 'path', 'args'];
```

We will add to the body a `<table>` element with `id` `eventlog`.


```javascript
      document.body.innerHTML += lith.g (['table', {id: 'eventlog'}, [
```

We add a `<style>` tag to add format to the `eventlog` table and some of its components.

```javascript
         ['style', ['#eventlog', {'border-collapse': 'collapse', 'font-family': 'serif', 'font-size': 18, position: 'absolute', 'right, top': 4, width: Math.min (window.innerWidth, 800), 'z-index': '10000', border: 'solid 4px #4488DD'}, ['th, td', {'padding-left, padding-right': 10, 'border-bottom, border-right': 'solid 1px black'}]]],
```

We iterate the `columns` and generate a row with all the headers for the table.

```javascript
         ['tr', dale.go (columns, function (header) {
            return ['th', {style: lith.css.style ({'background-color': '#bababa'})}, header];
         })],
```

We iterate the entries of `B.log`, an array that contains a list of all the events fired.

```javascript
         dale.go (B.log, function (entry, k) {
```

We set an entry in `index` to associate the event with element `id` with the position of this event on the log.

```javascript
            index [entry.id] = k;
```

We prepare the row on which we'll print the details of the event fired. We alternate a background color (with two types of grays).

```javascript
            return ['tr', {style: lith.css.style ({'background-color': {0: '#eaeaea', 1: '#bababa'} [k % 2]})}, dale.go ([entry.t - B.t, k, index [entry.from], entry.verb, entry.path.join (':'), dale.go (entry.args, B.str).join (', ')], function (value, k2) {
```

If we're printing the first column (`ms`), we round the value.

```javascript
               if (k2 === 0) return ['td', (value / 1000) + (! (value % 1000) ? '.0' : '') + (! (value % 100) ? '0' : '') + (! (value % 10) ? '0' : '') + 's'];
```

For all columns that are not the first three, we merely print the corresponding value.

```javascript
               if (k2 !== 1 && k2 !== 2) return ['td', value];
```

For the `entry` and `from` columns (which contain references to events fired), we add an `onclick` event to jump to that event on the table. We also apply a color taken from `colors` and based on the position of the event in the list.

```javascript
               var onclick = value === undefined ? '' : ('c ("tr") [' + (value + 1) + '].scrollIntoView ()');
               return ['td', {onclick: onclick, style: lith.css.style ({cursor: 'pointer', 'font-weight': 'bold', color: colors [value % colors.length]})}, value === undefined ? '' : ((k2 === 2 ? 'from ' : '') + '#' + (value + 1))];
            })];
```

We close the iterating function and the call to `lith.g` - note the `true` parameter passed to `lith.g`, which will avoid validations when generating the HTML.

```javascript
         }),
      ]], true);
```

We scroll to the last row of the table (representing the last element fired) using the `scrollIntoView` method. There's nothing left to do so we close the function.

```javascript
      c ('tr') [B.log.length].scrollIntoView ();
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

If we're in production mode, we do not validate `path` to save execution time. We will see this pattern again in most of the functions of gotoв. If we're not in production mode, we invoke `r.isPath` to validate that `path` is a valid recalc `path` (that is, either an integer, a string, or an array made of strings and integers). If we validate `path` and it turns to be invalid, we notify the error through `B.error`.

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

If we're not in production mode, we do not validate `path` to save execution time. Otherwise, we invoke `r.isPath` to validate that `path` is a valid recalc `path` (that is, either an integer, a string, or an array made of strings and integers). If we validate `path` and it turns to be invalid, we will notify the error through `B.error` and return `false`.

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
         if (! B.prod && teishi.simple (value)) return B.error (x || {}, 'B.set', 'Cannot set B.store to something that is not an array or object.');
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

We now define `B.add`, which pushes elements onto an existing array. This function takes an optional context argument and a mandatory [recalc `path`](https://github.com/fpereiro/recalc#rsay), plus other optional arguments. These extra arguments are the elements that will be pushed onto the array located at `path`.

```javascript
   B.add = function () {
```

If the first argument is an object, we will consider it to represent a context argument. `path` will be either the first argument (if no context is present) or the second argument (if context is present).

```javascript
      var x    = type (arguments [0]) === 'object' ? arguments [0] : undefined;
      var path = arguments [x ? 1 : 0];
```

If we're not in production mode, we invoke `r.isPath` to validate that `path` is a valid recalc `path` (that is, either an integer, a string, or an array made of strings and integers). If we validate `path` and it turns to be invalid, we notify the error through `B.error` and return `false`.

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

If we're not in production mode, we check whether `target` actually points to an array. If it doesn't, we notify the error and return `false`.

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

If we're not in production mode, we validate `path`. If it's invalid, we notify the error through `B.error` and return `false`.

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

If any of these validations is not passed, we will notify the error through `B.error` and return `false`.

```javascript
      ], function (error) {
         B.error (x || {}, 'B.rem', error, 'Path:', path);
      })) return false;
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

For each of the keys, we remove them from the array with splice - since we remove the keys from the end to the beginning, there's no possibility that the original indexes will be shifted. If we did this the other way around and (say) we removed the first element of the array, we would have to decrement all the `keys` by 1, otherwise we would be removing the wrong elements.

```javascript
         dale.go (keys, function (v) {target.splice (v, 1)})
      }
```

There's nothing else to do, so we return `true` and close the function. Note that if `targetType` is `undefined`, the function does nothing except for returning `true`.

```javascript
      return true;
   }
```

### Change listeners

We're now ready to define the three data listeners. These functions are wrappers around the three data functions that modify the store: `add` for `B.add`, `rem` for `B.rem` and `set` for `B.set`.

These listeners do the following: 1) invoke the underlying data function; 2) if the data function executed correctly (because its arguments were valid) *and* the store was modified, a `change` event will be triggered.

We iterate the three verbs.

```javascript
   dale.go (['add', 'rem', 'set'], function (verb) {
```

For each of these verbs, we invoke `B.listen` to create an event listener. We set both its `id` and `verb` to the verb itself, and we set its path to an empty array. By setting the path to an empty array, this event will be triggered by any event that has the same verb, regardless of its path.

We pass a `match` function to use special matching logic for these functions.

```javascript
      B.listen ({id: verb, verb: verb, path: [], match: function (ev, listener) {
```

The `match` function will return `true` if the verb of the event matches that of the listener. This means that as long as both verbs match, this listener will be matched by an event with any path.

```javascript
         return r.compare (ev.verb, listener.verb);
      }}, function (x) {
```

We create a reference to the existing value of `x.path` and store it on a local variable `previousValue`. If the operation is `add` or `rem`, we copy the value, because if the target is an array or object and we modify it through this operation, we will lose its original value and hence cannot know whether it will have changed. If the operation is `set`, we don't need to copy it since it will either be overwritten with a new object/array, or with the already existing one.

```javascript
         var previousValue = verb === 'set' ? B.get (x.path) : teishi.copy (B.get (x.path));
```

We invoke the corresponding data function with the context as the first argument, the `path` as its second argument and passing along further arguments (if they're there). If this function invocation returns `false`, the handler will stop executing.

```javascript
         if (B [x.verb].apply (null, [x, x.path].concat (dale.go (arguments, function (v) {return v}).slice (1))) === false) return;
```

If we're here, the corresponding data function was executed successfully. If the relevant part of the store changed, we trigger a `change` event on the path. We also pass `previousValue` as an extra argument since it will be useful for `change` listeners to detect whether there was a change in the value of their path.

```javascript
         if (! teishi.eq (previousValue, B.get (x.path))) B.say (x, 'change', x.path, previousValue);
```

There's nothing else to do, so we close the listener and the iterating function.

```javascript
      });
   });
```

We now define `B.changeListener`, a helper function meant to be passed as a `match` paramter to certain listeners on the `change` event.

This function solves the following problem: if a certain reactive element depends on a path `a.b.c`, it shouldn't only be redrawn when `a.b.c` is changed; it should also be redrawn when `a.b`, `a` and even the root path changes. It should also be redrawn when any path starting with `a.b.c` is changed as well. This is what this function will do.

This function is meant to be used as a `match` parameter passed to a listener. Those parameters are functions that receive two elements, an `event` and a `listener`.

```javascript
   B.changeListener = function (ev, listener) {
```

If the verb of both the event and the listener don't match, we return `false` to indicate there's no match. Notice we use `r.compare` to perform the comparisons, instead of a mere equality. `r.compare` contains logic to support wildcards and regexes.

```javascript
      if (! r.compare (ev.verb, listener.verb)) return false;
```

If either path is empty, there must be a match - following the logic we're implementing, an event with empty path affects all listeners with a matching verb, whereas a listener with an empty path is concerned with any event with a matching verb.

```javascript
      if (ev.path.length === 0 || listener.path.length === 0) return true;
```

We take whatever is shortest, the event's path or the listener's path, and we compare each of their elements. If all of them match, the function will return `true`, or `false` otherwise.

```javascript
      return dale.stop (dale.times (Math.min (ev.path.length, listener.path.length), 0), false, function (k) {
         return r.compare (ev.path [k], listener.path [k]);
      });
```

We close the function.

```javascript
   }
```

### `B.ev`

We start this section by defining `B.str`, a helper function only used by `B.ev`. This function has the purpose of stringifying its input so that it can be placed within a DOM event handler. This function takes a single argument of any type.

```javascript
   B.str = function (input) {
```

We note the type of `input`.

```javascript
      var inputType = type (input);
```

If `input` is neither an array nor an object, we're dealing with a single value. If it is a string, we stringify it and return it. Otherwise, we coerce it into a string and return it. By coercing non-strings into strings, we can obtain strings that represent javascript values that cannot be stringified, like `NaN`, `Infinity`, `undefined` or regular expressions.

```javascript
      if (inputType !== 'array' && inputType !== 'object') return inputType === 'string' ? teishi.str (input) : (input + '');
```

If `input` is an array, we recursively invoke `B.str` on all its elements, join the results by a comma and a space; we finally wrap the output with square brackets and return the resulting string.

```javascript
      if (inputType === 'array') return '[' + dale.go (input, B.str).join (', ') + ']';
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

If we're not in production mode, we make sure that each of the elements of `evs` is 1) an array, where 2) the first element is a string and 3) the second element is a valid path. If any of these conditions is not met, an error will be notified through `B.error` and `B.ev` will return `false`.

```javascript
      if (! B.prod && teishi.stop ('B.ev', dale.go (evs, function (ev) {
         return [
            ['ev', ev, 'array'],
            function () {return [
               ['ev.verb', ev [0], 'string'],
               function () {
                  return r.isPath (ev [1]) ? true : B.error ('B.ev', 'Invalid path:', ev [1], 'Events:', evs);
               }
            ]}
         ];
      }), function (error) {
         B.error ('B.ev', error, 'Events:', evs);
      })) return false;
```

We create `output`, a string that will contain the output of a function.

We initialize `output` with the code needed to invoke `B.say` with the following arguments: `'ev'` as the verb, `event.type` (a string with the name of the event being fired) as the `path`; as its third argument, we pass the result of invoking `B.evh` with `this` (the DOM element which received the event) as its only argument. This third argument will contain an object with all attribute names and values, *except* for those that are event handlers and start with *on* (i.e.: `onclick`, `oninput`).

Invoking `B.say` will generate an id. We store this id in a variable `id` that is local to the event handler.

```javascript
      var output = 'var id = B.say ("ev", event.type, B.evh (this));';
```

We iterate each of the events to be fired. For each of them, we will append to `output` an invocation to `B.say`.

```javascript
      dale.go (evs, function (ev) {
```

We invoke `B.say` passing as its first argument a context object with the `from` key set to `id` (so that this event can be tracked to the DOM event that generated it.

After this, we iterate the elements of `ev` - notice that if this `ev` has only a verb and a path, we add a third argument `{raw: 'this.value'}`, which we'll review in a minute.

```javascript
         output += ' B.say ({"from": id}, ' + dale.go (ev.length === 2 ? ev.concat ({raw: 'this.value'}) : ev, function (v, k) {
```

`B.ev` has a mechanism to allow you to pass raw arguments to `B.say`. A raw event is a string that is not stringified, and thus can be used to access the event properties directly. For example, if you want to access the value of an `input` field, you would need the raw argument `this.value`. To represent raw elements, `B.ev` expects an object with a key `raw` and a value that is a string.

Going back to the default value of `{raw: 'this.value'}`: when no arguments are passed, a very useful default is to return the value of the element - for example, for handlers with `<input>` or `<textarea>` elements.

If we're iterating the third element of the `ev` onwards (which means that we've already covered `verb` and `path`) and the object has a `raw` key with a string as value, we merely return the value without stringifying it. Notice that if any other keys are present in the object, we ignore them.

```javascript
            if (k > 1 && type (v) === 'object' && type (v.raw) === 'string') return v.raw;
```

If the element doesn't represent a `raw` argument, we stringify it through `B.str` and return it.

```javascript
            return B.str (v);
```

We join the elements by a comma and a space; then append a closing parenthesis (to close the invocation to `B.say`) and a semicolon.

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
      if (! B.prod && type (target) !== 'string' || ! target.match (/^(body|[a-z0-9]*#[^\s\[>,:]+)$/)) return B.error ('B.mount', 'Target must be either \'body\' or an id selector, but instead is ' + target);
```

We find the `element` and store it in a local variable.

```javascript
      var element = target === 'body' ? document.body : document.getElementById (target.replace (/.*#/g, ''));
```

If `B.prod` is falsy, we make sure that `element` exists and that `fun` is a function.

```javascript
      if (! B.prod) {
         if (! element)                 return B.error ('B.mount', 'Target not found:', target);
         if (type (fun) !== 'function') return B.error ('B.mount', 'fun must be a function but instead is', fun);
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
         if (result !== 'Lith' && result !== 'Lithbag') return B.error ('B.mount', 'function returned invalid lith or lithbag', result);
      }
```

We generate HTML from `elem` using `lith.g` - note we pass `true` as a second argument to avoid `lith.g` validating its input again. We then place it at the top of the `target`, using `c.place`.

```javascript
      c.place (target, 'afterBegin', lith.g (elem, true));
```

We close the function.

```javascript
   }
```

We now define `B.mount`, a function that will clear a `target` (presumably already mounted by `B.mount`) and `forget` all the event listeners of the reactive views contained within `target`.

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
         if (child.id && child.id.match (/^в[0-9a-f]+$/g) && B.listeners [child.id]) B.forget (child.id);
      });
```

We overwrite the `innerHTML` of `element` with an empty string and close the function.

```javascript
      element.innerHTML = '';
   }
```














### `B.elem`

We now define the main function of the library, `B.elem`. This function returns DOM elements that are updated when a certain part of the store is updated. The function takes two arguments: `paths` and `fun`.

```javascript
   B.elem = function (paths, fun) {
```

If `paths` is an array whose first element is not an array, then it must be a single path. If this is the case, we wrap it in an array so that `paths` represents a list of paths.

```javascript
      if (type (paths) === 'array' && type (paths [0]) !== 'array') paths = [paths];
```

If we're not in production mode, we perform validations on the input.

```javascript
      if (! B.prod && teishi.stop ('B.elem', [
```

We iterate `paths` and apply `r.isPath` to determine whether they are valid paths. If any of these validations fail, an error will be notified.

```javascript
         dale.stopNot (paths, false, function (path) {
            return r.isPath (path) ? true : B.error ('B.elem', 'Invalid path:', path, 'Arguments', {paths: paths, options: options, fun: fun});
         }),
```

`fun` must be a function.

```javascript
         ['fun', fun, 'function']
```

If any of these conditions is not met, an error will be notified through `B.error` and `B.elem` will return `false`.

```javascript
      }), function (error) {
         B.error ('B.elem', error, {paths: paths});
      })) return false;
```








## License

gotoв is written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.
