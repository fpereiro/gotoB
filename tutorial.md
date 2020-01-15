# Tutorial

This tutorial is conceived as a small book that gently explains how to develop the frontend of a web application using gotoX.

This tutorial requires you to have some knowledge of HTML, CSS and js (Javascript), but only a little bit.

## Introduction

### Why develop web applications

Let's start at the beginning. A web application is an application that runs on a web browser. This allows your application to run on any device that has a web browser and is connected to the internet. Web applications require no installation.

Let's rephrase that: if you write a web application, you have the potential to reach anyone with a smartphone or a computer, without requiring any installation.

Billions of people are one click away from using your application. And if you write your application in a certain way, you can provide most (if not all) of your users with a great experience, no matter what device or browser they are using.

### How does a web application work?

A web application is an application that runs in a web browser. When you click on a link (or write an address in the URL bar of a browser), a web page is loaded. This web page contains HTML, CSS and perhaps some js.

The HTML and CSS represent the actual content on the page. HTML is what is shown on the page, while the CSS changes the way that the HTML looks. js is usually there to produce some changes on the HTML and CSS, but it is not strictly necessary.

### What is the difference between a web page and a web application?

A web page is static and doesn't change. In contrast, an application is a web page that is more than just a web page, because it has the potential to receive information from an user and then reflect it back. The distinctive feature of an application is that it receives user data and responds to it.

### The two sides of a web application

You might have heard the terms *frontend*, *backend*, *client* and *server* in the context of web applications. These terms are important.

The terms *frontend* and *client* refer to the same thing: the HTML, CSS and js that gets loaded in your browser and is seen by your users.

The terms *backend* and *server* refer to the same thing: a program that provides files to a web browser, and also handles other operations like storing user data.

Frontend and backend are the two sides of the coin of a web application. To fully build a web application, you need to do both.

In a web application, frontend and backend interact constantly.

gotoX is a frontend library, so by itself it cannot allow you to create a complete web application. We will however create a small "mock server" that will allow our tutorial to look pretty much like the real thing, so that when you have your server, your frontend will be ready!

### js... what is it good for?

js was meant originally to create small animations that would make HTML and CSS look a bit niftier. Over time it grew in importance and nowadays it is essential for the creation of web applications. It is important to understand why.

Mere web pages are static and don't change after they are loaded in a browser. After a page is loaded, a user can click on a link and go to another page, which will also be loaded.

Around 2005, it became possible for js to retrieve information from the server and update the page without a *page refresh*. For many, including me, this marks the birth of true web applications, since the redrawing of the same page without triggering a full refresh completely changed the quality of the users' experience.

Most web applications today use js to update its views. Some still rely on the server sending most of the HTML and CSS.

gotoX takes a once radical, but today quite mainstream approach: it relies 100% on js to create and update its HTML and CSS. This means that gotoX is 100% reliant on js.

### Really, why js?

js is a powerful programming language. In it, you can define any logic you need in a short and expressive way. HTML and CSS, in contrast, are not programming languages - they are *markup languages*.

Markup languages tell you what's there. But they don't have the full power of a programming language available. This means essentially, that a markup language cannot do things like *do something depending on a condition* (conditional), *repeat something a certain number of times* (iteration) or *replacing something with something else* (interpolation).

Using js to create and update HTML and CSS can make our application short and expressive, which means less development time, easier maintenance and less bugs.

## Chapter 1 - into the code

To make you lose fear of code, I'm going to make you start a web application from scratch! You only need the following:

- A computer.
- A text editor.
- A web browser.

### Step 1-1: create a folder to contain the files of your application

You can call it `app` - put it somewhere where you can easily find it later.

### Step 1-2: create a base HTML file

Wait! Didn't we say that gotoX is pure js? Well, almost! Before starting to *draw* our application, we need to create a page that our browser will open. Remember that web browsers still open HTML pages.

This HTML will do a few things to set up the ground to get our js running. In particular, it will load two things:

- gotoX, which is a js file.
- Another js file which will contain our application logic.

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
5. Inside the head there are two `<meta>` tags. The first one allows to cleanly display non-[ASCII](https://en.wikipedia.org/wiki/ASCII) characters, which is something essential. The second one allows for creating applications that will look good on mobile devices.
6. Inside the head there's a `<link>` tag which an loads an external CSS file called [Normalize.css](https://necolas.github.io/normalize.css). While this is not strictly necessary, it is extremely useful because it makes CSS behavior more consistent across different browsers.
7. Inside the body there's two `<script>` tags. The first one loads an external js file which contains gotoX, the library itself. The second `<script>` is our application!

### Step 1-3: create a js file to contain the code for the application

In the same folder, create an empty file named `app.js`.

### Step 1-4: start your app!

After this is done, open the HTML file in your browser. You should see an empty page . Keep this page open! Every time we complete a step, you can go back to the page, refresh it, and see your changes.
