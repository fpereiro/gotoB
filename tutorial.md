# Tutorial

This tutorial is conceived as a small book that gently explains how to develop the frontend of a web application using gotoв.

This tutorial requires you to have some knowledge of HTML, CSS and js (Javascript), but only a little bit.

## Introduction

### Why develop web applications

You're probably familiar with three types of applications:

- Native mobile applications, both the ones that come preinstalled on a phone or tablet, plus those you can install from either Google's Play Store or Apple's App Store.
- Native desktop applications, such as Microsoft's Office suite.
- Web applications, which run on web browsers on both mobile and desktop devices, without requiring installation.

Web applications are different from native applications in a few respects:

- **No installation required**: the user accesses the application directly from the browser, which is already installed.
- **One application for all devices**: if properly written, a web application can be seamlessly used from both mobile and desktop devices.
- **It is a service**: instead of storing most of its information on the users' device like native applications do, web applications retrieve and store information on a server that is accessible through an internet connection.

By merely requiring a device with internet a web browser, and no installation, web applications allow you to reach billions of people with minimal friction. And by providing a service that stores information, web applications prevent users from losing data or being locked into a single device; web applications provide an ultimate level of access and mobility to their users.

### How does a web application work?

As we just saw, a web application is an application that runs in a web browser. When you click on a link (or write an address in the URL bar of a browser), a web page is loaded. This web page contains HTML, CSS and usually some js.

The HTML and CSS represent the actual content on the page. HTML is what is shown on the page, while the CSS changes the way that the HTML looks. js is usually there to produce some changes on the HTML and CSS, but it is not strictly necessary and it is actually possible to write web applications without js.

HTML, CSS and js are text files, really. They have to conform to certain rules (very strict ones in the case of js), but they are humanly readable and can be opened on any text editor.

When you load a web page, an HTML file (which is text that conforms to certain rules, nothing else) may contain further CSS or js inside of it. These CSS or js files are also text, also conforming to certain rules.

The browser, while receiving HTML, CSS and js, starts putting things on the screen - and that's what you see when the page is fully loaded.

### What is the difference between a web page and a web application?

A web page is static and doesn't change. In contrast, an application is a web page that is more than just a web page, because it has the potential to receive information from an user and then be updated. The distinctive feature of an application is that what the user sees on the screen is updated without the page being refreshed or a link being clicked.

### The two sides of a web application

You might have heard the terms *frontend*, *backend*, *client* and *server* in the context of web applications. These terms are important.

The terms *frontend* and *client* refer to the same thing: the HTML, CSS and js that gets loaded in your browser and is seen by your users.

The terms *backend* and *server* refer to the same thing: a program that provides files (like HTML, CSS and js, plus images) to a web browser, and also handles other operations like storing user data.

The *frontend* and the *backend* are connected through the internet.

Frontend and backend are the two sides of the coin of a web application. To fully build a web application, you need to do both.

In a web application, frontend and backend interact constantly.

gotoв is a frontend library, so by itself it cannot allow you to create a complete web application. We will however create a small "mock server" that will allow our tutorial to look pretty much like the real thing, so that when you have your server, your frontend will be ready for it!

### js... what is it good for?

js was meant originally to create small animations that would make HTML and CSS look a bit niftier. It was also there to help validating user-submitted forms. Over time it grew in importance and nowadays it is essential for the creation of web applications. It is important to understand why.

Mere web pages are static and don't change after they are loaded in a browser. After a page is loaded, a user can click on a link and go to another page, which will also be loaded. It is possible to create applications by loading a new page after each user operation, but the experience was not comparable to those of existing native applications.

Page refreshes affect user experience negatively in two ways: first, they slow down the user's interaction with the application. Second, they get rid of valuable state that is either lost or has to be painstakingly reproduced (for example, how far down a user has scrolled down a list).

Around 2005, it became possible for js to retrieve information from the server and update the page without a *page refresh*. For many, including me, this marks the birth of true web applications, since the redrawing of the same page without triggering a full refresh completely changed the quality of the users' experience. This allowed web applications to compete with native applications.

The role of js is essential: it both retrieves information from the server *in the background* (i.e.: without triggering a page refresh) and updates the HTML (and perhaps the CSS) in the page.

Most web applications today are dependent on js for both retrieving information and updating the page. Some still rely on the server sending most of the HTML and CSS, only using js for visual effects.

gotoв takes a once radical, but today quite mainstream approach: it relies 100% on js to *create and update* all of the HTML and CSS. This means that gotoв is 100% reliant on js.

### Why js and not HTML & CSS?

js is a powerful programming language. In it, you can define any logic you need in a short and expressive way. HTML and CSS, in contrast, are not programming languages - they are *markup languages*.

Markup languages tell you what's there - it is akin to a roll call: *A, then B, then C...*. Markup languages don't have the power of a programming language. A markup language cannot do things like *do something depending on a condition* (conditional), *repeat something a certain number of times* (iteration) or *replacing something with something else* (interpolation).

To write any non-trivial web application, you will need logic to modify the HTML on the screen. This is, in my view, the first central problem of web applications: *how to generate HTML (and perhaps some CSS) using a programming language*.

The traditional solution to this problem is HTML templates. A template is a chunk of HTML where certain parts get updated. Historically, the code responsible to "fill in" the HTML templates was executed by the *server*, which then served the HTML page to the browser. Many apps are still built in this way.

Over time another approach emerged, which is to use js on the client (that is, on the browser itself) to fill in the template for the user. In this scenario, the client asks the server for the templates plus the user data, and then cooks up the HTML without having to trouble the server.

gotoв takes a further step on this direction: it generates (almost) all its HTML and CSS using js itself, on the client, and with no templates! We will see how very soon. Because gotoв uses js to generate its HTML and CSS, it is 100% reliant on js.

A web application powered by gotoв only requests data from the server, but almost no HTML or CSS.

## Chapter 1 - into the code

To make you lose fear of code - in case you have any - we're going to create together a web application from scratch! You only need the following:

- A computer.
- A text editor.
- A web browser.

### Step 1-1: create a folder to contain the files of your application

You can call it `app` - put this folder somewhere where you can easily find it later.

### Step 1-2: create a base HTML file

Wait! Didn't we say that gotoв is pure js? Well, almost! Before starting to *draw* our application, we need to create a page that our browser will open to get things started. Remember that web browsers still open HTML pages - this is how all web applications (even the most sophisticated ones) get loaded.

Side note: what does the term *drawing* mean? It means 1) generating HTML; and 2) putting it on the page so that the user can see it.

Let's now create a base HTML file that will set up the ground to get our application running.

With your text editor, create a new file named `index.html` within the work folder you created on Step 1-1. In it, place the following content:

```html
<!DOCTYPE HTML>
<html>
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
   </head>
   <body>
      <script src="https://cdn.jsdelivr.net/gh/fpereiro/gotob@/gotoB.min.js"></script>
      <script src="app.js"></script>
   </body>
</html>
```

Let's break this down:

1. `<!DOCTYPE HTML>` declares the page to be [HTML5](https://en.wikipedia.org/wiki/HTML5).
2. `<html>` and `</html>` delimit the entire contents of the page.
3. `<head>` and `</head>` delimit the head of the page.
4. `<body>` and `</body>` delimit the body of the page.
5. Inside the head there are two `<meta>` elements. The first one allows to cleanly display non-[ASCII](https://en.wikipedia.org/wiki/ASCII) characters, which is something essential. The second one allows for creating applications that will look good on mobile devices.
6. Inside the head there's a `<link>` element which an loads an external CSS file called [Normalize.css](https://necolas.github.io/normalize.css). While this is not strictly necessary, it is extremely useful because it makes CSS behavior more consistent across different browsers.
7. Inside the body there's two `<script>` elements. The first one loads an external js file which contains gotoв, the library itself. The second `<script>` is our application, also a js file!

This HTML will load three files in total:
- A CSS stylesheet (Normalize.css).
- A js library (gotoв).
- A js file containing the code of the application.

Side note: all three files loaded above are all text files (the first being CSS, the last two being js). Remember: they're all just text files, interpreted in a certain way by the browser.

### Step 1-3: create a js file to contain the code for the application

In the same folder, create an empty file named `app.js`.

### Step 1-4: start your app!

After this is done, open the HTML file in your browser. You should see an empty page . Keep this page open! Every time we complete a step, you can go back to the page, refresh it, and see your changes.

## Chapter 2 - the counter app

Rather than hurrying to show you how to build apps with gotoв, my goal in this tutorial is to explain the essential concepts that are needed to build the frontend of a web application.

We will start building the simplest possible web application - a counter! My hope is that by going slowly and surely, not only you will understand the library, but all the underlying concepts of any web application, so that you can then build them with clarity and utmost confidence.

### Step 2-1: vanilla counter

We are going to build a counter app with pure js (also called [vanilla js](http://vanilla-js.com/)). The only restriction we have is that we're doing everything from js, instead of adding things to the HTML file we created on step 1-2.

Here's the specification for our counter:

- There should be a `<p>` (paragraph) element telling us what's the value of the counter.
- The counter value should start at 0.
- There should be a button that increments the counter by 1 every time we click it.

Simple as it is, this app has most of the core patterns of a frontend, namely:

- Some information (the counter value) that affects what the user sees.
- A place where that information is displayed (the `<p>` element).
- A button where a user interaction (`click`) changes the counter value and hence the `<p>` that displays it.

Let's start by adding a paragraph element that will tell the user what's the current value of the counter. It could look something lke this:

```javascript
var paragraph = '<p>Counter is 0</p>';
```

Note that inside `<p>` (the opening tag of the paragraph) and `</p>` (the closing tag of the paragraph), there is the text `Counter is 0`.

It's time to **RTP** (refresh the page)! What do you see? Yep, it's blank!

We need now to put this piece of HTML somewhere that will be visible. Let's put it in the `<body>` of the document.

```javascript
var paragraph = '<p>Counter is 0</p>';

document.body.innerHTML = paragraph;
```

Developer tools:
