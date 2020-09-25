# Tutorial

This tutorial is conceived as a small book that gently explains how to develop the frontend of a web application (henceforth, *webapp*).

This tutorial requires you to have some knowledge of HTML, CSS and js (Javascript) - but only a little bit!

This will be most useful for those just dipping their feet into developing webapps. Experienced frontend devs might get bored, especially in the first sections.

This is the resource I wanted to find back when I started writing webapps back in 2009; ten years later, I'm writing it for those of you who are today starting out.

## Part 1: basic concepts

### Why develop webapps?

You're probably familiar with three types of applications:

- Native mobile applications, both the ones that come preinstalled on a phone or tablet, plus those you can install from either Google's Play Store or Apple's App Store.
- Native desktop applications, such as Microsoft's Office suite.
- Webapps, which run on web browsers on both mobile and desktop devices, without requiring installation. For example: Google Docs (the one on your browser!).

Webapps are different from native applications in a few ways:

- **No installation required**: the user accesses the application directly from the browser, which is already installed.
- **One application for all devices**: if properly written, a webapp can be seamlessly used from both mobile and desktop devices.
- **It is a service**: instead of storing most of its information on the users' device like native applications do, webapps retrieve and store information on a server that is accessible through an internet connection.

What are the benefits of webapps?
- **No installation**. By merely requiring a device with internet and a web browser, webapps allow you to reach billions of people with minimal friction.
- **Use the application from any device**. By providing a service that stores information, webapps prevent users from having their data locked into a single device.

### How does a webapp work?

As we just saw, a webapp is an application that runs on a web browser. When you click on a link (or write an address in the URL bar of a browser), a webpage is loaded. This webpage contains HTML, CSS and usually some js.

The HTML and CSS represent the actual content of the page. HTML is what is shown on the page, while the CSS changes the way that the HTML looks. js is usually there to produce some changes on the HTML and CSS, but it is not strictly necessary and it is actually possible to write webapps without js.

HTML, CSS and js are text files, really. They have to conform to certain rules (very strict ones in the case of js), but they are humanly readable and can be opened on any text editor.

When you load a webpage, an HTML file (which is text that conforms to certain rules, nothing else) may contain further CSS or js inside of it. These CSS or js files are also text, also conforming to certain rules.

The browser, when receiving HTML, CSS and js, starts putting things on the screen - and that's what you see when the page is fully loaded.

### The two sides of a webapp

You might have heard the terms *frontend*, *backend*, *client* and *server* in the context of webapps. These terms are fundamentally important.

The terms *frontend* and *client* refer to the same thing: the HTML, CSS and js that gets loaded in the browser and is seen by your users. The client code is the program that a web browser runs.

The terms *backend* and *server* refer to the same thing: a program that provides files (like HTML, CSS and js, plus images) to a web browser, and also handles other operations like storing user data. The backend code is a program run on a server connected to the internet (if you're starting out, it might also be good to know that a server is merely a computer running somewhere 24/7).

The *frontend* and the *backend* - or the *client* and the *server*, if you prefer - interact with each other through the internet.

**In essence, a webapp is two programs: one that runs on a web browser and another one that runs on a server**. Frontend and backend are the two sides of the coin of a webapp. To fully build a webapp, you need to do both.

This tutorial only covers the frontend aspect of webapp development. We will however learn how to make requests to the backend so that when you get around to write your server, your frontend will be ready for it!

### Is it a webpage or is it a webapp?

In the beginning of the web, we only had webpages. Now, webpages are easy to understand: each webpage is a merely some HTML, CSS & js that gets loaded on the browser. Every time the user opens the page, that HTML, CSS & js gets loaded and the page is displayed. And, unless the owner of the webpage decides to change it, the webpage will be the same from here until the end of time.

Because webpages are always the same (unless updated), we consider them to be **static**.

An example of this is the homepage of a newspaper. Sure, it might be updated all the time, but between updates, the page is the same for everyone.

Webapps are a different game, because the HTML, CSS & js depends on **the state of the application**.

An example of a webapp is the inbox of your web email, such as Gmail or Outlook.com. It is still HTML, CSS & js, but it will depend on what emails you have in your inbox!

State of the application: can be changed by user, it can also be changed by third party (someone sending you an email).

Take the example of a shopping cart: the first time you load a shopping cart, it will be empty. If you add an item, the shopping cart will no longer be empty, and certain elements in the page will have changed, such as the list of products and the total amount.

It is very important to understand the main difference between a webpage and a webapp.

A webpage is static: this means that, at a given moment, two users that load the webpage will obtain an identical result.

A webapp, in contrast, is dynamic: this means that two users that load the webapp will obtain a different result.

Website: same URL, same HTML! Static, doesn't change.

Webapp: can change.

The first step in our conceptual journey is to understand **the difference between a website and a webapp**. Websites started existing in the Christmas of 1990 when the World Wide Web was launched. A website is 1) a document composed of HTML; 2) that is identified by an Uniform Resource Locator (URL). A web browser, when visiting a given URL, will load and then display the document.

At the beginning, app loads a webpage! But are we creating webpages or webapps? Let's see this historically, to understand it and also because it is fun!

webpage + user provided data = webapp.

The WWW is about documents. Christmas 1990. One format. Go ask the server. Browser shows it.

- A website is a collection of webpages. The main distinction we need to grasp is that between a web*page* and a web*app*.

A webpage is a document. One direction.

User input! A form that sends an email. But that doesn't change anything! If you refresh the page, see empty form again.

Application: send content and return it. Very simple app: put your name!

viaweb, first app!

requires login or local state (cookies).
https://en.wikipedia.org/wiki/HTTP_cookie#History
Magic cookies were already used in computing when computer programmer Lou Montulli had the idea of using them in web communications in June 1994.[8] At the time, he was an employee of Netscape Communications, which was developing an e-commerce application for MCI. Vint Cerf and John Klensin represented MCI in technical discussions with Netscape Communications. MCI did not want its servers to have to retain partial transaction states, which led them to ask Netscape to find a way to store that state in each user's computer instead. Cookies provided a solution to the problem of reliably implementing a virtual shopping cart.[9][10]

apps mounted on top of pages.

A webapp is an interface. Bidirectional.

Diagrams!

Then keep explaining.

bidirectional? or having some data that modifies the page? a shopping cart doesn't transfer data to the server!

Webpages are static and embody the original purpose of the web: to share documents. A webpage is some HTML and CSS that is the same for every browser that loads it. A webpage allows for limited user interactions, the main one being clicking on links to navigate to another page. But, as a general rule, webpages cannot be changed by those using them.

Webapps are dynamic! While they use HTML and CSS (and perhaps js) to draw the page, they respond to user input. That is, the HTML and CSS served to each user is potentially different.

What makes a webpage into a webapp is the possibility of a user providing information through the server, and that change being seen on the page! A shopping cart would be a great example!

A webpage is static and doesn't change. In contrast, an application is a webpage that is more than just a webpage, because it has the potential to receive information from an user and then be updated. The distinctive feature of an application is that what the user sees on the screen is updated by user input.

Main implementation breakthrough: background loading (ajax), without refreshing the page.

### The birth of templates

With documents, repeating parts or whatever it's just all there. A few documents there. A lot of websites perfectly happy to be done by hand.

You have now user data, and put that within somewhere (you're not just sending the raw data).

This structure is called template!

Server code takes data (from the browser or stored on the database), fills the template and sends it to the user!

template is a function! receives parameters/arguments.

Types of replacement:
- variable replacement.
- conditionals.
- iteration.
- call another template.

### The ascent of js

js was meant originally to create small animations that would make HTML and CSS look a bit niftier. It was also there to help validating user-submitted forms. Over time it grew in importance and nowadays it is essential for the creation of webapps. It is important to understand why.

Webpages are static and don't change after they are loaded in a browser. After the page is loaded, a user can click on a link and go to another page, which will also be loaded. It is possible to create applications by loading a new page after each user operation, but the experience was not comparable to those of existing native applications.

Page refreshes affect user experience negatively in two ways: first, they slow down the user's interaction with the application. Second, they get rid of valuable state that is either lost or has to be painstakingly reproduced (for example, how far down a user has scrolled down a list).

Around 2005, it became possible for js to retrieve information from the server and update the page without a *page refresh*. For many, including me, this marks the birth of true webapps, since the redrawing of the same page without triggering a full refresh completely changed the quality of the users' experience. This allowed webapps to compete with native applications.

The role of js is essential: it both retrieves information from the server *in the background* (i.e.: without triggering a page refresh) and updates the HTML (and perhaps the CSS) in the page.

Small modifications like shopping cart get harder.

Most webapps today are dependent on js for both retrieving information and updating the page. Some still rely on the server sending most of the HTML and CSS, only using js for visual effects.

send templates & data to client, let the client draw it with js!

gotoв takes a once radical, but today quite mainstream approach: it relies 100% on js to *create and update* all of the HTML and CSS. This means that gotoв is 100% reliant on js.

### Why js and not HTML & CSS?

js is a powerful programming language. In it, you can define any logic you need in a short and expressive way. HTML and CSS, in contrast, are not programming languages - they are *markup languages*.

Markup languages tell you what's there - it is akin to a roll call: *A, then B, then C...*. Markup languages don't have the power of a programming language. A markup language cannot do things like *do something depending on a condition* (conditional), *repeat something a certain number of times* (iteration) or *replacing something with something else* (variables/interpolation).

To write any non-trivial webapp, you will need logic to modify the HTML on the screen. This is, in my view, the first central problem of webapps: *how to generate HTML (and perhaps some CSS) using a programming language*.

The traditional solution to this problem is HTML templates. A template is a chunk of HTML where certain parts get updated. Historically, the code responsible to "fill in" the HTML templates was executed by the *server*, which then served the HTML page to the browser. Many apps are still built in this way.

Over time another approach emerged, which is to use js on the client (that is, on the browser itself) to fill in the template for the user. In this scenario, the client asks the server for the templates plus the user data, and then cooks up the HTML without having to trouble the server.

gotoв takes a further step on this direction: it generates (almost) all its HTML and CSS using js itself, on the client, and with no templates! We will see how very soon. Because gotoв uses js to generate its HTML and CSS, it is 100% reliant on js.

A webapp powered by gotoв only requests data from the server, but almost no HTML or CSS.

## The name of the game

merge with the top
Not design, implementation! This is core. Iteration, but not the same. We're concerned here with implementation.

HTMC: html and perhaps some css. CSS also comes from external stylesheets.


data + templates = the page!
the two parts of the page.
things that are related to how things are seen, and then things that go in!

variable replacement.
conditional (hide/show, for example, or different color).
iteration.
template replacement: call one template from the other to avoid repetition.

The browser doesn't care: it's all HTMC to it!

data continuum: more and less durable. Also a decision, usually not all durable, and you need durable.
Why not in pages? No user input!

User accesses & changes data. This perhaps defines the application! Rethink what I said above about no page refresh.

changes in data must be reflected in the page.
and elements in the page trigger changes in data. This is the eternal loop.

Typical pattern: change data, refresh the page.
Refresh partially, through browser mechanism.





## Part 2: vanilla js apps

on top of vanilla, we'll use gotoB!

To make you lose fear of code - in case you have any - we're going to create together a webapp from scratch! You only need the following:

- A computer.
- A text editor.
- A web browser.

### Step 1-1: create a folder to contain the files of your application

You can call it `app` - put this folder somewhere where you can easily find it later.

### Step 1-2: create a base HTML file

Wait! Didn't we say that gotoв is pure js? Well, almost! Before starting to *draw* our application, we need to create a page that our browser will open to get things started. Remember that web browsers still open HTML pages - this is how all webapps (even the most sophisticated ones) get loaded.

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

Rather than hurrying to show you how to build apps with gotoв, my goal in this tutorial is to explain the essential concepts that are needed to build the frontend of a webapp.

We will start building the simplest possible webapp - a counter! My hope is that by going slowly and surely, not only you will understand the library, but all the underlying concepts of any webapp, so that you can then build them with clarity and utmost confidence.

### Step 2-1: specifying a counter

We are going to build a counter app with pure js (also called [vanilla js](http://vanilla-js.com/)). We won't use gotoв yet. The only restriction we have is that we're doing everything from js, instead of adding elements to the HTML file we created on step 1-2.

Here's the specification for our counter:

- There should be a `<p>` (paragraph) element telling us what's the value of the counter.
- The counter value should start at 0.
- There should be a button that increments the counter by 1 every time we click it.

Simple as it is, this app has most of the core patterns of a frontend, namely:

- Some information (the counter value) that affects what the user sees.
- A place where that information is displayed (the `<p>` element).
- A button where a user interaction (`click`) changes the counter value and hence the `<p>` that displays it.

### Step 2-2: adding an element on the page

Let's start by adding a paragraph element that will tell the user what's the current value of the counter. It could look something lke this:

```javascript
var paragraph = '<p>Counter is 0</p>';
```

Note that inside `<p>` (the opening tag of the paragraph) and `</p>` (the closing tag of the paragraph), there is the text `Counter is 0`.

It's time to **RTP** (refresh the page, please)! What do you see? Wait, it's blank!

The reason that the page is blank is the following: while we created an HTML string, we didn't put it anywhere within the page. For HTML to be visible, we need to put it somewhere within the page. A good place to do it is in the `<body>` of the document.

```javascript
var paragraph = '<p>Counter is 0</p>';

document.body.innerHTML = paragraph;
```

*RTP*, and you should see the text `Counter is 0`, just as expected.

Side note: If you're using any modern browser, you will have access to the browser's developer tools, which can show you what elements are drawn on the page. The easiest way to open the developer tools is to right-click on an element of the page (in our case it could be on the paragraph element we just created) and select the option that says either `Inspect Element` or simply `Inspect`.

### Step 2-3: adding a button

We now need to add a button that will increase the value of the counter when we click it. This could look something like this:

```javascript
var paragraph = '<p>Counter is 0</p>';

var button = '<button>Increment counter</button>';

document.body.innerHTML = paragraph + button;
```

RTP. You'll now see a button that says `Increment counter` but doesn't do a thing when we click it. Let's fix that by adding an *event handler*.

```javascript
var paragraph = '<p>Counter is 0</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

document.body.innerHTML = paragraph + button;
```

The string `increment ()` will now be executed when clicking on the button.

RTP. When you click on this button, nothing will happen. If you open the developer console, you'll see an error that says something along the lines of `increment is not defined`. This is because we need to define a function that will actually increment the counter!

Side note: annoying as they may be, error messages are very useful because they can help you figure out where your code is going wrong. Resist the temptation to ignore them!

### Step 2-4: figuring out how to increment the counter

Before we write the code for `increment` (which will be our first function), let's think about what it should do:

1. Figure out what's the current value of the counter.
2. Add 1 to it.
3. Update the paragraph to reflect the new value of the counter.

### Step 2-5: extracting a value from the paragraph

Let's first try to make our `increment` function get the value of the counter, which currently is contained within the text of the paragraph.

```javascript
var paragraph = '<p>Counter is 0</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

document.body.innerHTML = paragraph + button;

var increment = function () {
   var paragraphs = document.body.getElementsByTagName ('p');
   var paragraph = paragraphs [0];
   var value = paragraph.innerHTML;
   alert (value);
}
```

Well, that's quite a bit. Let's see what the function does, line by line:

- Get all the `<p>` elements from the body.
- Select the first paragraph from this list of elements.
- Get the contents (`innerHTML`) of this paragraph.
- Fire a popup window with the contents of the paragraph.

RTP and click the button. You should see a popup that says `Counter is 0`. We're on the right track!

Side note: in case you're wondering, the variable `paragraph` we defined within `increment` is independent from the variable `paragraph` we defined at the beginning of the script. The `paragraph` variable inside the function can only be accessed from within that function.

This solution has a couple of problems:

- If we add more paragraphs to the app (which may perfectly happen as we add functionality or improve its interface), we need to know exactly what paragraph is the one with the counter information.
- We still need to extract the counter value from the entire message contained in the paragraph.

A way to solve the first problem is to add an `id` attribute to the paragraph, to make it easier to find.

```javascript
var paragraph = '<p id="counter">Counter is 0</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

document.body.innerHTML = paragraph + button;

var increment = function () {
   var paragraph = document.getElementById ('counter');
   var value = paragraph.innerHTML;
   alert (value);
}
```

RTP and check that this still works.

We still need to extract the counter value from the paragraph. One way to do it is like this:

```javascript
var paragraph = '<p id="counter">Counter is 0</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

document.body.innerHTML = paragraph + button;

var increment = function () {
   var paragraph = document.getElementById ('counter');
   var value = paragraph.innerHTML.replace ('Counter is ', '');
   alert (value);
}
```

Notice that on the second line of the function we replace the string `Counter is ` with an empty string, to get rid of everything except for the number.

RTP and click on the button. You'll see only the value `0` being printed. We're making progress!

Let's now try adding 1 to this value.

```javascript
var paragraph = '<p id="counter">Counter is 0</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

document.body.innerHTML = paragraph + button;

var increment = function () {
   var paragraph = document.getElementById ('counter');
   var value = paragraph.innerHTML.replace ('Counter is ', '');
   value = value + 1;
   alert (value);
}
```

RTP and click on the button. We see the value `01` printed, instead of `1`! This happens because the `0` we extracted from the paragraph is a string (text), and not a number. Let's fix that.

```javascript
var paragraph = '<p id="counter">Counter is 0</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

document.body.innerHTML = paragraph + button;

var increment = function () {
   var paragraph = document.getElementById ('counter');
   var value = paragraph.innerHTML.replace ('Counter is ', '');
   value = parseInt (value) + 1;
   alert (value);
}
```

RTP. We now print the value `1`. Hurray!

### Step 2-6: update the paragraph

Instead of showing the message in an alert box, let's now update the paragraph instead.

```javascript
var paragraph = '<p id="counter">Counter is 0</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

document.body.innerHTML = paragraph + button;

var increment = function () {
   var paragraph = document.getElementById ('counter');
   var value = paragraph.innerHTML.replace ('Counter is ', '');
   value = parseInt (value) + 1;
   paragraph.innerHTML = 'Counter is ' + value;
}
```

RTP. And wouldn't you know it, we have a functioning counter app!

### Step 2-7: store the value in js, not HTML

You might be thinking: that's quite a bit of code to get this thing working! I'm with you. There's also the problem that if you change the text of the paragraph, but forget to update the `increment` function, our code will break!

There's actually a way to simplify the code and also make it more resilient to errors. This change requires us to *store the value of the counter in js, instead of within an HTML element*. How would this work in practice?

```javascript
var value = 0;

var paragraph = '<p id="counter">Counter is ' + value + '</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

document.body.innerHTML = paragraph + button;

var increment = function () {
   var paragraph = document.getElementById ('counter');
   value = value + 1;
   paragraph.innerHTML = 'Counter is ' + value;
}
```

RTP to see that this will still yield the same result.

Notice a few changes:
- We define a `value` variable at the top, which holds the current value of the counter.
- We reference this value when constructing `paragraph` the first time.
- `increment` is much simpler, since it merely references `value` instead of having to extract it from some text and convert it to a number. This is because `value` already is available as a js variable.

### Step 2-8: seeing the overall pattern of the app

This app, simple as it may be, contains a great deal of the elements you'll encounter later when creating more complex apps. Let's add some comments to the code to see what the counter app can teach us about apps in general:

```javascript
// Here we define values that will be used in the HTML and also updated by js.
var value = 0;

// Here we create HTML strings that we'll put into the page.
var paragraph = '<p id="counter">Counter is ' + value + '</p>';

var button = '<button onclick="increment ()">Increment counter</button>';

// Here we put the HTML strings into the page so that they can be seen.
document.body.innerHTML = paragraph + button;

// Here we define an event handler that will 1) update a value; 2) update the HTML.
var increment = function () {
   var paragraph = document.getElementById ('counter');
   value = value + 1;
   paragraph.innerHTML = 'Counter is ' + value;
}
```

If we were to abstract this to see the general pattern, we could put it like this:

- Define an **initial state**: we set `value` to 0. Note we do this in js after what we learned in step 2-7.
- Define an **initial view**: we create HTML for both the `paragraph` and the `button`. The button has an **event handler** which calls `increment`, a **listener** (see below).
- **Draw** the initial view: we take the initial view and put it inside the page so that the user can see it.
- Define a **listener to perform operations**: the function `increment` contains logic for both updating the **state** and updating the **view**. Notice that this listener is referenced by `button`.
- When the user clicks on `button`, the listener is **executed** and both the **state** and the **view** are **updated**.

This is a bunch, so let's break it down even more:

- **State**: data that lives in js and is required to display accurate information.
- **View**: all the HTML & CSS that is in the page and is seen by the user.
- **Listener**: a function that updates both the state and the view.
- **Event handler**: something that connects a user action on a certain element (like clicking or inputting text) with a listener.

The above are the fantastic four! State, view, listener and event handler.

In section 2-7 we saw that it is convenient to separate the state and the view, so that why we have two things instead of one. Think of these two things, state and view, as pure data. One is usually numbers and text. The other one is always HTML and CSS. That's it!

As for the other two, they represent the dynamic aspect of the app. A listener is a function that changes the state and the view. Why both? If you only change the state, the view would be out of sync with the data! And if the view was changed but not the data, then the data would be out of sync with the view! State and view can change, but they must do so consistently. This consistency requirement is essential.

Move it to the front, start with the end in mind: HTML & CSS. Change it. That's the starting point!
changes: by the user and by the server!! start with the end in mind!!

The button (in HTML, with an event) calls `increment`. `increment` increases the value, then updates the HTML. That's the cycle!

```



              ┌──╌ HTML ╌────────────────────────────┐
              │                                      │
internet <────┼──paragraph

──────e <──────> local filesystem  │
(localhost)   │                   ┬ ┬                            │
              │                   │ └────────> redis             │
              │                   │                              │
              │                   └──────────────────────────────┼───> AWS S3 & SES
              └──────────────────────────────────────────────────┘

```

Note: string references increment. That's how the circle is closed! Text diagram here!

- Using the same data in multiple places.
- Having two different sources for the info.

- Two way data binding: if something can be modified from more than one place.
- Efficient long list updating: example of long list with scroll?
- Make up unique names for update functions, or have them global?
- Update functions need to know what depends on the view. with state, it's the other way around!
- HTML generation & escaping it.
- Having a boundary around the element. But wouldn't it be eough to write it in one place? You want disambiguated names anyway!








```javascript
var B = window.B;

var view = function () {
   return B.view ('counter', function (counter) {
      if (counter === undefined) counter = 0;
      return ['div', [
         ['p', ['Counter is: ', counter]],
         ['button', {onclick: B.ev ('set', 'counter', counter + 1)}, 'Increment counter']
      ]];
   });
}

B.mount ('body', view);
```

### Step 3: a shopping cart!

Let's now do something more interesting:







other events: still modify the store, or modify the server! perhaps some transitions, things not stored? the third are pure side effects :).



pure functions: views! don't receive x and don't call events. why this? to not trigger redraws while we're in the middle of one! mechanism will still queue. what are the implications? depending on what you do, if it's dangling it will stop everything. gotoB non-prod will make sure it doesn't break anything. so it is conceptual.
if it receives an x, it can say things.
