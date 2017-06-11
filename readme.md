# gotoв

> "The only software that I like is one that I can easily understand and solves my problems. The amount of complexity I'm willing to tolerate is proportional to the size of the problem being solved." --[Ryan Dahl](http://tinyclouds.org/rant.html)

gotoв is a set of tools for building the frontend of a web application (henceforth webapp).

## Current status of the project

The current version of gotoв, v0.3.0, is considered to be *unstable* and *somewhat complete*. [Suggestions](https://github.com/fpereiro/gotoB/issues) and [patches](https://github.com/fpereiro/gotoB/pulls) are welcome. Besides bug fixes, these are the future changes planned:

- Add remaining parts of readme.
- Add `prod mode` & performance improvements.
- Extend cross-browser compatibility.
- Add tests for TodoMVC example.
- Annotated source code.

## Installation

gotoв is written in Javascript. You can use it in the browser by sourcing the pre-built file, `gotoB.min.js`.

```html
<script src="gotoB.min.js"></script>
```

Or you can use these links to use the latest version - courtesy of [RawGit](https://rawgit.com) and [MaxCDN](https://maxcdn.com).

```html
<script src=""></script>
```

gotoв is exclusively a client-side library. Still, you can find it in npm: `npm install gotob`

gotoв is pure ES5 javascript. Browser compatibility is as follows:

- Chrome 15 and above.
- Firefox 22 and above.
- Safari 5.1 and above.
- IE9 and above.
- Opera 11.6 and above.

The author wishes to thank [Browserstack](https://browserstack.com) for providing tools to test cross-browser compatibility.

<a href="https://www.browserstack.com"><img src="https://bstacksupport.zendesk.com/attachments/token/kkjj6piHDCXiWrYlNXjKbFveo/?name=Logo-01.svg" width="150px" height="33px"></a>

## Design

gotoв focuses exclusively on solving the unavoidable problems that arise when building the frontend of a webapp.

The unavoidable problems are three:

1. **Templating**, or generating HTML and CSS.
2. **Events**, or handling side-effects.
3. **Portability**, or cross-browser compatibility.

To deal with **templating**, gotoв uses [lith](https://github.com/fpereiro/lith). lith uses javascript object literals to generate HTML and CSS. Using lith has the following consequences:

- All HTML and CSS can be expressed in plain javascript object literals.
- HTML and CSS can be rendered client-side, server-side, or as a combination of both. I normally render everything in the client.
- Performing client-side rendering makes it considerably easier to create [single page applications](https://en.wikipedia.org/wiki/Single-page_application).
- You can express presentation logic with functions that return object literals. As I argued [elsewhere](https://www.toptal.com/software/declarative-programming), this combines the advantages of a DSL and those of code.

Regarding **events**, the frontend of a webapp is structurally permeated by side-effects, by which I mean actions performed by the user *and* background updates sent from the server. This means that your code has multiple entry points and that your data has to be shared by different parts of the application. The main difficulty stemming from this is redrawing the page effectively. I believe that most large frameworks for frontend web development exist to solve this problem.

The way gotoв approachs events is based on [recalc](https://github.com/fpereiro/recalc), a library which sets up a shared data store and allows you to write event listeners and fire events. By listening and firing arbitrary events that interact through a shared data store (which is a simple javascript object literal, as in `var store = {}`), you **update data through events** which in turn fire one or more event listeners.

But what about redrawing the page? And what about firing events out of user interactions? For these purposes, gotoв provides you two functions: one for creating a view that is automatically and efficiently redrawn when its input data changes (`B.view`), and another one for creating stringified event calls when an user does something with the browser (`B.ev`). In the background, gotoв uses [Myers' diff algorithm](http://www.xmailserver.org/diff2.pdf) to compute the view changes and apply them selectively to the DOM. Because we generate views with object literals, we already have a tree-like representation of the view (which we feed to the diff algorithm).

Regarding **portability**, the solution is to use a subset of javascript ES5 and have a small, tailored polyfill within [cocholate](https://github.com/fpereiro/cocholate), a sort of miniature jQuery replacement.

### Practices and features that gotoв happily ignores

- **Browsers without javascript**: gotoв is 100% reliant on client-side javascript - if you want to create applications that don't require javascript, gotoв cannot possibly help you create them.
- **Post-2009 javascript**: everything's written in a subset of ES5 javascript. This means no transpilation, no different syntaxes, and no type declarations.
- **Module loading**: gotoв and its dependencies happily and unavoidably bind to the global object. No CommonJS or AMD.
- **Build toolchain integration**: there's no integration with any standard tool for compiling HTML, CSS and js. gotoв itself is pre-built with a 20-line javascript file.
- **Hot-reloading**: better get that F5 finger ready!
- **Plugin system**: gotoв tries to give provide you all the essentials out of the box, without installation or configuration. Whatever is not essential is up to you to build upon.
- **Object-oriented programming**: gotoв uses objects mostly as namespaces. There's no inheritance and no use of `bind`. Classes are nowhere to be found.
- **Pure functional programming**: side-effects are expressed as events. The return values from event handlers are ignored, and every function has access to the global store. There's no immutability; the global state is modified through functions that update it in place.

### What does gotoв care about?

- **Ease of use**: almost all the functionality you need is contained in four functions (one for listening to an event, one for firing an event, one for making the DOM generate an event and one for creating dynamic views).
- **Fast reload**: the edit-reload cycle should take under two seconds. I don't want to wait until no bundle is completed.
- **Smallness**: gotoв and its dependencies are < 2000 lines of consistent, annotated javascript. In other words, it is less than 2000 lines on top of [vanilla.js](http://vanilla-js.com/).
- **Batteries included**: the core functionality is all provided. Whatever libraries you add on top will probably be for specific things (nice CSS, a calendar widget, etc.)
- **Trivial to set up**: add `<script src=""></script>` at the bottom of the `<body>`.
- **Everything in plain sight**: all properties and state are directly accessible from the javascript console of the browser. DOM elements have stringified event handlers that can be inspected with any modern browser.
- **Performance**: gotoв itself is small (~10kb when minified and gzipped, including all dependencies). Most of its code is concerned with efficiently redrawing the DOM. Though there's a lot of work still to be done, gotoв intends to successfully compete, performance-wise, with state of the art tools.
- **Cross-browser compatibility**: a work in progress (see browser current compatibility above in the *Installation* section). I'm working on making gotoв work on IE6 and above.

## The rest of the readme

Coming soon. I'm working on 1) a step-by-step tutorial; and 2) an API guide.

Meanwhile, you might want to take a look at gotoв's implementation of TodoMVC, in the folder `example` of this repo.

## Source code

The complete source code is contained in `gotoB.js`. It is about 550 lines long.

Annotated source code will be forthcoming when the library stabilizes.

## License

gotoв is written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.
