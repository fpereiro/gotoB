# gotoв

> "The only software that I like is one that I can easily understand and solves my problems. The amount of complexity I'm willing to tolerate is proportional to the size of the problem being solved." --[Ryan Dahl](http://tinyclouds.org/rant.html)

gotoв is a framework for building the frontend of a web application (henceforth webapp).

## Current status of the project

The current version of gotoв, v1.0.0, is considered to be *somewhat stable* and *mostly complete*. [Suggestions](https://github.com/fpereiro/gotoB/issues) and [patches](https://github.com/fpereiro/gotoB/pulls) are welcome. Besides bug fixes, these are the future changes planned:

- Add missing documentation.
- Extend cross-browser compatibility.
- Performance improvements.
- Add annotated source code.

## Installation

gotoв is written in Javascript. You can use it in the browser by sourcing the pre-built file, `gotoB.min.js`.

```html
<script src="gotoB.min.js"></script>
```

Or you can use these links to use the latest version - courtesy of [RawGit](https://rawgit.com) and [MaxCDN](https://maxcdn.com).

```html
<script src="https://cdn.rawgit.com/fpereiro/gotoB/0ad05a5091dbc171bc3d6b0a139f81c0f9ecc18a/gotoB.min.js"></script>
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

## Why another javascript framework?!?

I experience two difficulties with existing javascript frontend frameworks:

1. They are hard to understand, at least for me.
2. They are constantly changing.

The combination of these two characteristics mean that I must constantly spend an enormous amount of time and effort to remain an effective frontend developer. Which makes me unhappy, because complex things frustrate me and I am quite lazy when it comes to things I don't enjoy.

Rather than submit to this grind or reject it altogether (and missing out the possibility of creating my web applications), I took a third way out, by deciding to write a frontend framework that:

1. Is optimized for understanding.
2. Built on fundamentals, so that the framework will change [less and less as times goes by](https://en.wikipedia.org/wiki/Asymptote).

And, of course, gotoв must be very useful for building a real web application.

## Is gotoв for me?

### gotoв is probably **not** for you if

- You need to support browsers without javascript.
- You need a widely supported framework, with a large community of devs and tools.
- You need a fully proven approach for building very large applications; gotoв has never been used at a large scale so it is unknown whether its abstractions can support large projects.
- You are looking for a framework that is similar to Angular, Ember or React.
- You need a very fast framework; gotoв chooses simplicity over performance in a couple of critical and permanent respects.
- You need to get started with a project very quickly; gotoв requires some upfront effort to understand its core concepts.

### gotoв might be a good choice for you if

- You have freedom to decide the technology you use.
- Complexity is a massive turn-off for you.
- You have a bit of time upfront to understand gotoв's core concepts.
- You enjoy understanding the internals of a tool, so that you can then use it with precision and confidence.
- You like technology that's a bit strange.
- You want to build from scratch a small gotoв community together with me.

### Practices and features that gotoв happily *ignores*

- **Browsers without javascript**: gotoв is 100% reliant on client-side javascript - if you want to create applications that don't require javascript, gotoв cannot possibly help you create them.
- **Post-2009 javascript**: everything's written in a subset of ES5 javascript. This means no transpilation, no different syntaxes, and no type declarations.
- **Module loading**: gotoв and its dependencies happily and unavoidably bind to the global object. No CommonJS or AMD.
- **Build/toolchain integration**: there's no integration with any standard tool for compiling HTML, CSS and js. gotoв itself is pre-built with a 20-line javascript file.
- **Hot-reloading**: better get that F5 finger ready!
- **Plugin system**: gotoв tries to give provide you all the essentials out of the box, without installation or configuration.
- **Object-oriented programming**: gotoв uses objects mostly as namespaces. There's no inheritance and no use of `bind`. Classes are nowhere to be found.
- **Pure functional programming**: [side-effects are expressed as events](https://github.com/fpereiro/recalc). The return values from event handlers are ignored, and every function has access to the global store. There's no immutability; the global state is modified through functions that update it in place.

### What does gotoв care about?

- **Ease of use**: almost all the functionality you need is contained in four functions (one for listening to an event, one for firing an event, one for stringifying an event call into a DOM attribute and one for creating dynamic views which rely on events). There's three more functions to effect data changes.
- **Fast reload**: the edit-reload cycle should take under two seconds. No need to wait until no bundle is completed.
- **Smallness**: gotoв and its dependencies are < 2k lines of consistent, annotated javascript. In other words, it is less than 2048 lines on top of [vanilla.js](http://vanilla-js.com/).
- **Batteries included**: the core functionality for building a web application is all provided. Whatever libraries you add on top will probably be for specific things (nice CSS, a calendar widget, etc.)
- **Trivial to set up**: add `<script src="https://cdn.rawgit.com/fpereiro/gotoB/0ad05a5091dbc171bc3d6b0a139f81c0f9ecc18a/gotoB.min.js"></script>` at the bottom of the `<body>`.
- **Everything in plain sight**: all properties and state are directly accessible from the javascript console of the browser. DOM elements have stringified event handlers that can be inspected with any modern browser.
- **Performance**: gotoв itself is small (~11kb when minified and gzipped, including all dependencies) so it is loaded and parsed quickly. It's view redrawing mechanism is not slow, but it trades speed in exchange for ease of use.
- **Cross-browser compatibility**: a work in progress (see browser current compatibility above in the *Installation* section). My goal is to make gotoв work on IE6 and above.

## Why use a javascript framework *at all*?

So glad you asked.

Before we had web applications, we had web pages. A web page is something quite simple: an HTML file, with perhaps a bit of CSS to make it look better, plus a little bit of javascript to give it a couple of nifty edges. If the user clicks on a link on the page, another page is opened and the process is repeated again. If the user fills a form and submits it, when the server receives it, it redirects the user's browser to another page.

All of this means two things: web pages need to 1) hold very little state; 2) once drawn, they don't change much (or at all).

[With the advent of XMLHTTPRequest and ajax](https://www.youtube.com/watch?v=Fv9qT9joc0M&list=PL7664379246A246CB&index=4), everything changed. XMLHTTPRequest essentially allows a web browser to retrieve information from the server *without redirecting to another page*. This is where a web page crosses the boundary and becomes a web application. Not redirecting the user to another page improves the user experience for two reasons:

1. Performance: if a page is already loaded, it is faster to retrieve new data and update it on the page than to retrieve the entire page (with all the associated markup, style and scripts) from the server.

2. Offline ability: if the network connection (or the server) is down, instead of losing all state, the page can hold its state, warn the user, and attempt to communicate with the server until the connection is restored. Also as important, the page can be saving state to the server constantly without the user having to submit data and waiting for a reload. The archetypic incarnation of this approach is Gmail's web interface.

These two advantages have two drawbacks: 1) we need to manage the state of the application; and 2) we must redraw the page when a relevant part of the state changes.

In my experience, this added complexity is not easy to solve with straightforward imperative code. If you are writing a non-trivial web application and you do it without recourse to libraries that help you deal with these two problems, you will probably encounter issues. Don't take my word for it though; besides, attempting to do this can be a great learning experience.

## Quick start guide

I'm on it like there's no tomorrow. If you want to turn up the heat, open [an issue](https://github.com/fpereiro/gotoB/issues) so I'll be compelled to finish it even sooner.

Meanwhile, you can check out [the examples](https://github.com/fpereiro/gotoB/tree/master/examples)!

## API reference

Same.

## Implementation functions

Lemme finish the other two first.

## Source code

The complete source code is contained in `gotoB.js`. gotoв itself is about 640 lines long; its dependencies are about 1260 lines; the whole thing is about 1900 lines.

Annotated source code will be forthcoming when the library stabilizes.

## License

gotoв is written by Federico Pereiro (fpereiro@gmail.com) and released into the public domain.
