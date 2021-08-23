# Tutorial: so you want to write a frontend?

If you are here, you probably want to develop a webapp, or you already are a webapp developer and want to get better at it. In this tutorial we will offer you as much *understanding* as possible. In our experience, the most daunting part about achieving mastery with webapps is understanding how it all fits together, and why certain things are done in a certain way.

This tutorial replaces a more conventional format where we would just show how to develop webapps with gotoв. Instead of doing this, we first offer **a conceptual introduction** to webapps (*web applications*, in case you're not familiar with the abbreviation). After the main conceptual pieces are in place, we then cover **the basics of developing** the frontend of a webapp; gotoв appears on the scene only as the solution to certain problems that occur over and over.

The purpose of this tutorial is to give you as much conceptual and practical understanding as possible, so that you can become a better web developer.

This tutorial requires only basic knowledge of HTML, javascript and programming. If you are just beginning and you want to understand the basic concepts of a webapp, you may find it useful. If you are a more experienced developer that is interested in reconsidering the concepts of the frontend from the ground up, you might be interested in it too.

## Part 1: a conceptual introduction to webapps

This entire part is also contained in a [set of videos](TODO ADD LINK) with the same content. If you prefer to learn with videos, you can check them out now!

In the first part of the tutorial, we present a *conceptual* introduction to webapps. Before even seeing a line of code, it can be extremely helpful to understand the basic concepts that explain the why, how and what of webapps. We will cover concepts such as *the virtual world*, *devices*, *application*, *user interface*, *logic*, *server*, *user*, *frontend*, *backend*, *HTML*, *JavaScript* and *framework*. By the end of this part, you should have a high-level understanding of how they all fit together.

After all of this makes sense, it will be *far easier* to understand the details of how to implement a frontend. New knowledge can only be created as connections to knowledge you already have; our hope is that by giving you a short, yet rich web of concepts to understand webapps, the implementation details will become easier to understand, connect and remember.

### Chapter 1: an introduction to the digital world

Let's start at the beginning. Why do we even care about webapps? How are they meaningful to our lives?

We currently live in the [digital age](https://en.wikipedia.org/wiki/Information_Age). As such, our lives happen in two worlds: the *physical world* and the *digital world*. The physical world needs little explanation: it consists of all that was there before the digital age. The digital world, however, is what is new for us as a species. Despite being the newcomer, the digital world is now everywhere - in fact, unless you printed this tutorial on paper, you're right now immersed in the digital world!

The digital world came of age in the 1970s, with the development of [microcomputers](https://en.wikipedia.org/wiki/Microcomputer) and the [internet](https://en.wikipedia.org/wiki/Internet). It became massive in the early 1990s, with the development of the [web](https://en.wikipedia.org/wiki/World_Wide_Web), and received a final boost with the development of [smartphones](https://en.wikipedia.org/wiki/Smartphone) in the late 2000s. Cheap, powerful and interconnected computers made the digital age happen.

As of the early 2020s, the digital world has become central to our lives. Through the digital world, most of humanity performs now a great deal of four essential activities:

- **Storage of information**: the digital world is where most of our externally stored information now lives. (Externally stored means information stored outside of our own brains). Our external memories are by now overwhelmingly digital.
- **Economic production**: work of all kinds happens now either exclusively through the digital world or is at least partially controlled or informed by it.
- **Creation**: art and science are increasingly created and distributed through the digital world.
- **Social interaction**: human interactions at all levels (person to person, small groups, large groups, national and international communities) are increasingly shaped by interactions happening in the digital world.

In short, the digital world touches almost every aspect of our existence, both individual and social. Gaining understanding of it empowers you to:

- Judge better: by understanding the digital world, you can make informed decisions (personal and political) concerning it.
- Shape it directly: it is possible for anyone to build apps that can make a contribution to the digital world. By building an app, you might positively impact the lives of others.

In the next chapter, we will understand what the virtual world is made of.

### Chapter 2: an overview of the digital world

We exist in a physical world. The digital world exists within the physical world, but we cannot access it directly. To access the digital world, we *use digital devices*.

```
┌──╌ Physical world ╌───────────────────────────────────────────┐
│                                                               │
│  ┌──╌ Human ╌───┐                   ┌──╌ Digital world ╌───┐  │
│  │              │                   │                      │  │
│  │       <──────│────╌ Digital ╌────┼───────────>          │  │
│  │              │      devices      │                      │  │
│  └──────────────┘                   └──────────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

The digital world consists of three elements:

- **Digital devices**, such as computers, tablets and phones.
- **Applications**, which are programs that run on digital devices.
- **A network** that interconnects all digital devices.

```
┌──╌ Digital world ╌─────────────────────────────────────────────────────────────────────────┐
│                                                                                            │
│  ┌──╌ Device (hardware) ╌──────────┐                  ┌──╌ Device (hardware) ╌──────────┐  │
│  │                                 │                  │                                 │  │
│  │  ┌─╌ Application (software) ╌─┐ │                  │  ┌─╌ Application (software) ╌─┐ │  │
│  │  │       <────────────────────│─┼──╌ Internet ╌────┼──┼─────────>                  │ │  │
│  │  └────────────────────────────┘ │    (network)     │  └────────────────────────────┘ │  │
│  └─────────────────────────────────┘                  └─────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

What each element stands for? Digital devices are **hardware** and represent the immediate bridge between the physical and the digital world. Applications are **software** and through it the devices can do unlimited things. Finally, the network enables **connectivity** between devices (and applications) existing in different parts of the physical world.

While the devices and the network are essential to the digital world, as users our attention is focused on the applications. Right now, you're looking at words on a screen (unless you printed this tutorial on paper, you crazy person); it is almost certain that you are paying much more attention to the text and what surrounds it than to your actual screen or keyboard, or to the fact that you're connected to the internet. Applications are our true windows to the digital world. They act as our digital eyes, hands and ears.

Applications don't run directly on the device. Rather, they run on a piece of software called the *operative system* (OS, for short), which in turns runs on the device. While the OS is software, from the perspective of an application developer, it could be considered as hardware: the OS is taken "as is" and cannot be easily (or at all) modified. So, for practical purposes, the device and its OS are a bundle on which applications run.

```
┌──╌ Digital world ╌─────────────────────────────────────────┐
│                                                            │
│ ┌──╌ Device ╌────────┐               ┌──╌ Device ╌───────┐ │
│ │                    │               │                   │ │
│ │  ┌──╌ OS ╌───────┐ │               │  ┌──╌ OS ╌──────┐ │ │
│ │  │               │ │               │  │              │ │ │
│ │  │  ┌─╌ App ╌─┐  │ │               │  │  ┌─╌ App ╌─┐ │ │ │
│ │  │  │  <──────┼──┼─┼────╌ web ╌────┼──┼──┼────>    │ │ │ │
│ │  │  └─────────┘  │ │   (internet)  │  │  └─────────┘ │ │ │
│ │  └───────────────┘ │               │  └──────────────┘ │ │
│ └────────────────────┘               └───────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

But for practical purposes, just think of it as:

```
┌──╌ Digital world ╌─────────────────────────────────────────────────────────────────────────┐
│                                                                                            │
│  ┌──╌ Device + OS  ╌───────────────┐                  ┌──╌ Device + OS  ╌───────────────┐  │
│  │                                 │                  │                                 │  │
│  │  ┌─╌ Application (software) ╌─┐ │                  │  ┌─╌ Application (software) ╌─┐ │  │
│  │  │       <────────────────────│─┼──╌ Internet ╌────┼──┼─────────>                  │ │  │
│  │  └────────────────────────────┘ │    (network)     │  └────────────────────────────┘ │  │
│  └─────────────────────────────────┘                  └─────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

Before we close this chapter, we need to cover the relationship between the application and the network. The network connects an application running on a certain device with another (or the same) application running on *another* device. Connectivity is what joins distinct devices into a connected whole - rather than having small digital islands (each device), by connecting them we create an entire digital world.

Devices not only communicate one-on-one, but can also communicate with multiple devices at the same time.

```
┌──╌ Digital world ╌───────────────────────────────────┐
│                                                      │
│  ┌──╌ Phone 1 ╌─┐                  ┌──╌ Phone 2 ╌─┐  │
│  │              │                  │              │  │
│  │  ┌─╌ App ╌─┐ │                  │  ┌─╌ App ╌─┐ │  │
│  │  │  <──────│─┼──────╮  ╭────────┼──┼───>     │ │  │
│  │  └─────────┘ │      │  │        │  └─────────┘ │  │
│  └──────────────┘      ╎  ╎        └──────────────┘  │
│                                                      │
│                      Internet                        │
│                      (network)                       │
│                                                      │
│  ┌─╌ Computer ╌─┐      ╎  ╎        ┌──╌ Server  ╌─┐  │
│  │              │      │  │        │              │  │
│  │  ┌─╌ App ╌─┐ │      │  │        │  ┌─╌ App ╌─┐ │  │
│  │  │  <──────│─┼──────╯  ╰────────┼──┼───>     │ │  │
│  │  └─────────┘ │                  │  └─────────┘ │  │
│  └──────────────┘                  └──────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

This completes our introduction to the digital world. We will now shift our focus to applications.

### Chapter 3: introduction to applications

As we saw in the previous chapter, applications are central to us because they act as the true windows to the digital world. But what *is* an application?

It's perhaps best to start with a concrete example on which to illustrate the concepts of this chapter. For this purpose, let's pick a typical stopwatch app, like the one that comes built-in in your phone.

```
┌──╌ Stopwatch app ╌─────────────────────────────┐
│                                                │
│                                                │
│                    00:00:00                    │
│                                                │
│                  ┌─────────┐                   │
│                  │  START  │                   │
│                  └─────────┘                   │
│                                                │
└────────────────────────────────────────────────┘
```

An application is a program made of three parts:

- **User interface (UI)**: this is what the user *sees*. In the stopwatch app, the UI would consist of the clock and the `START` button.
- **Logic**: this is what determines *what* the app can do and *when* it can do it. In the stopwatch app, the logic determines that you can start the clock if it's stopped or paused, but not if it's already going.
- **State**: this is what determines the *current situation* of the app. In the stopwatch app, the state consists of the time currently shown on the clock, as well as whether the stopwatch is stopped, running or paused.

We venture to say that if a program has all three things (UI, logic and state) it is an application. All programs have logic, but not all of them have UI and state.

```
┌──╌ UI ╌──────────┐        ┌──╌ Logic ╌───────┐        ┌──╌ State ╌───────────────────┐
│                  │        │                  │        │                              │
│ - Clock display  │        │ - Available      │        │ - Time shown                 │
│ - Buttons        │        │   operations     │        │ - Status of clock            │
│                  │        │ - Move clock     │        │   (running, paused, stopped) │
│                  │        │   forward        │        │                              │
└──────────────────┘        │                  │        └──────────────────────────────┘
                |           └──────────────────┘           |
                |                    |                     |
                |                    |                     |
                |                    |                     |
                v                    v                     v
            ┌──╌ Stopwatch app ╌─────────────────────────────┐
            │                                                │
            │                                                │
            │                    00:00:00                    │
            │                                                │
            │                  ┌─────────┐                   │
            │                  │  START  │                   │
            │                  └─────────┘                   │
            │                                                │
            └────────────────────────────────────────────────┘
```

The *UI* performs two functions:
- Allows the user to **see** information: how much time has elapsed? Is the stopwatch running or not? What are the available operations?
- Allows the user to **interact** with the app: start, pause and stop the stopwatch.

The *logic* determines the UI and what is possible to do with it:
- When the stopwatch is stopped, the logic only allows you to start the stopwatch.
- When the stopwatch is going, the logic only allows you to either pause it or reset it.

The logic also determines the time displayed in the clock:
- When you click on the button for stopping the stowpatch, the logic resets the clock.
- When the stopwatch is going, the logic constantly updates the clock.
- When the stopwatch is paused, the logic keeps the clock unchanged.

The *state* is what tells you *where the app is at*. For example, in the stopwatch app, the state is made of the following:
- Current time: *00:00:00* or more.
- Current mode of the clock: *stopped*, *paused* or *playing*.

The state of the app determines both how the UI looks and what operations the logic will perform. We would not go too far if we consider that an application is considered to be a *mathematical function of its state* (if you are wary of mathematics, please don't skip this section, we'll make it as clear as we can!). Take the square-by-two function:

```
square-by-two (1) -> 1 (because 1 * 1 is 1)
square-by-two (2) -> 4 (because 2 * 2 is 4)
square-by-two (3) -> 9 (because 3 * 3 is 9)
```

The same happens with the stopwatch:

```
stopwatch (clock is at 00:00:00 and clock is stopped)
                       |
                       |
                       v
  ┌──╌ Stopwatch app ╌─────────────────────────────┐
  │                                                │
  │                                                │
  │                    00:00:00                    │
  │                                                │
  │                  ┌─────────┐                   │
  │                  │  START  │                   │
  │                  └─────────┘                   │
  │                                                │
  └────────────────────────────────────────────────┘



stopwatch (clock is 02:00:00 and clock is stopped)
                       |
                       |
                       v
  ┌──╌ Stopwatch app ╌─────────────────────────────┐
  │                                                │
  │                                                │
  │                    02:00:00                    │
  │                                                │
  │                  ┌─────────┐                   │
  │                  │  START  │                   │
  │                  └─────────┘                   │
  │                                                │
  └────────────────────────────────────────────────┘



stopwatch (clock is at 02:00:00 and clock is running)
                       |
                       |
                       v
  ┌──╌ Stopwatch app ╌─────────────────────────────┐
  │                                                │
  │                                                │
  │                    02:00:00                    │
  │                                                │
  │          ┌─────────┐      ┌────────┐           │
  │          │  PAUSE  │      │  STOP  │           │
  │          └─────────┘      └────────┘           │
  │                                                │
  └────────────────────────────────────────────────┘



stopwatch (clock is at 02:00:00 and clock is paused)
                       |
                       |
                       v
  ┌──╌ Stopwatch app ╌─────────────────────────────┐
  │                                                │
  │                                                │
  │                    02:00:00                    │
  │                                                │
  │          ┌─────────┐      ┌────────┐           │
  │          │  START  │      │  STOP  │           │
  │          └─────────┘      └────────┘           │
  │                                                │
  └────────────────────────────────────────────────┘
```

As you can see, the *state* determines how the app looks at any given moment. If the app changes, it is because the state was changed.

Two things can change the state:

- A user interaction. For example, the user clicking on a button.
- A logic operation. For example, the clock moving one second forward.

As we mentioned before, when the state changes, the UI changes. So the UI changes both in response to user interactions and logic operations. After the UI changes, both the user and the logic may have new operations available. In this way, an app constantly changes. You could call it the *fundamental cycle of an application*:

```
    ┌───────────┐     ┌────────────┐     ┌─────────────┐     ┌───────────┐     ┌────────────┐
    │  Initial  │     │  Initial   │     │  Change to  │     │  New      │     │  New       │
    │  state    │---> │  UI        │---> │  the state  │---> │  state    │---> │  UI        │
    │           │     │            │     │             │     │           │     │            │
    └───────────┘     └────────────┘     └─────────────┘     └───────────┘     └────────────┘
```

We've covered lots of ground in this chapter. The main takeaways are:

- An app is made of 1) UI, 2) logic, 3) state.
- The state determines the UI.
- Both the user and the logic can change the state.

In the next chapter we will cover two more fundamental concepts: *users* and *servers*.

### Chapter 4: users and servers


## Part 2: developing apps with gotoв

Through examples!

Understand not just how to do it in gotoв, but how you would do it without it and see what gotoв does for you.

counter: full HTML version, update reads from HTML; second version: value in js, update from there. third version: gotoB.

todo list: localstorage. responders.

shopping cart: two views.

crud: fake server. navigation based on being logged or not.


This tutorial is conceived as a small book that gently explains the main concepts of the frontend of a web application (henceforth, *webapp*).

This tutorial requires you to have some knowledge of HTML, CSS and JS (Javascript) - but only a little bit!

This will be most useful for those just dipping their feet into developing webapps. However, it can be also useful for more experienced developers seeking to reconsider the parts of a webapp from first principles, using a conceptual perspective.

This is the resource I wanted to find back when I started writing webapps back in 2009; more than ten years later, I'm writing it for those of you who are today starting out.

**Warning: this tutorial is currently being written and several sections are still drafts or altogether missing.**

## Part 1: basic concepts

### Why are webapps important?

Nowadays, our lives happen in two worlds: the physical world and the digital world. Unless you printed this tutorial on paper, you're right now immersed in the digital world.

The digital world has become an inseparable part of our lives. Through it, we interact with each other, work, create and even store our memories.

However, we cannot access the digital world directly, like we do with the physical one. Instead, we do it through devices which are connected to the internet and running applications.

We use applications to access the digital world. They act as our digital eyes, ears and hands. Through them, we talk, collaborate, create memories and go about our daily lives.

You're probably familiar with three types of applications:

- Native mobile applications, both the ones that come preinstalled on a phone or tablet, plus those you can install from either Google's Play Store or Apple's App Store.
- Native desktop applications, such as Microsoft's Office suite.
- Webapps, which run on web browsers on both mobile and desktop devices, without requiring installation. For example: Google Docs.

Native apps, both mobile and desktop, are controlled by the companies that manufacture the devices or the operative systems of those devices (such as Windows).

Web apps, in contrast, by only requiring a device connected to the internet and a web browser, allow developers to reach billions of people with minimal friction, and without requiring any big company's permission.

Web apps are the core of the web as we know it. The web is open and unconstrained and not owned by anyone. By writing a web app you can do what you want, avoid the gatekeepers and provide access to users regardless of where they are, what kind of device they have, or what kind of operating system they run.

If you want to improve people's lives, creating a web app might be a great way to do so. Web apps mean freedom for creators and users.

That’s why web apps are important.

### Web standards

If no one controls the web, how can the web work at all?

The web works through *standards*. Standards are a way of doing things that follow certain rules. If you follow the rules of web standards, you can create a web app that can be part of the broader web, without anyone's permission.

Standards are pretty much like a language. To understand others and be understood, you need to speak their language. No one is forcing you to speak any specific language, but to speak to someone, you need to do so in a language they understand. Web standards are the language of the web.

The web is actually a collection of standards:

- [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) - also known as HTTP.
- [Hypertext Markup Language] - also known as HTML.
- [Cascading Style Sheets](https://en.wikipedia.org/wiki/CSS) - also known as CSS.
- [Javascript](https://en.wikipedia.org/wiki/JavaScript) - also known as JS.

All of these standards make up the web.

The web runs on top of the internet. And guess what? The internet itself is also powered by standards, such as [DNS](https://en.wikipedia.org/wiki/Domain_Name_System), [TCP/IP](https://en.wikipedia.org/wiki/Internet_protocol_suite), [WiFi](https://en.wikipedia.org/wiki/Wi-Fi) and [Ethernet](https://en.wikipedia.org/wiki/Ethernet).

Standards are open to anyone and anyone can propose changes to them. Large tech companies have a strong say on how standards are shaped, but they do not control them, only influence them. Standards change slowly, in order to keep existing things working.

## What are web apps?

Webapps are different from native applications in a few ways:

- **No installation required**: the user accesses the application directly from the browser, which is already installed.
- **One application for all devices**: if properly written, a webapp can be seamlessly used from both mobile and desktop devices.
- **They are a service**: instead of storing most of its information on the users' device like native applications do, webapps retrieve and store information on a server that is accessible through an internet connection.

What are the benefits of webapps?
- **No installation**. By merely requiring a device with internet and a web browser, webapps allow you to reach billions of people with minimal friction.
- **Use the application from any device**. By providing a service that stores information, webapps prevent users from having their data locked into a single device.

### How does a webapp work?

```
┌──╌ User device ╌─────────┐               ┌──╌ Server ╌──────────────┐
│                          │               │                          │
│  ┌──╌ Browser ╌───────┐  │               │  ┌──╌ Runtime ╌───────┐  │
│  │                    │  │               │  │                    │  │
│  │  ┌─╌ Frontend ╌─┐  │  │               │  │  ┌─╌ Backend ╌─┐   │  │
│  │  │       <──────┼──┼──┼────╌ web ╌────┼──┼──┼──────>      │   │  │
│  │  └──────────────┘  │  │   (internet)  │  │  └─────────────┘   │  │
│  └────────────────────┘  │               │  └────────────────────┘  │
└──────────────────────────┘               └──────────────────────────┘
```

A webapp is made of two programs:
- The **frontend**, a program that runs on a **browser**.
- The **backend**, a program that runs on a **runtime**.

A web developer needs to write both programs to develop a complete webapp.

Both programs communicate through the web.

The main functions of the frontend are:
- Show information to the user.
- Provide a user interface.
- Collect data provided by the user and send it to the backend.

The main functions of the backend are:
- Provide information to the frontend.
- Validate and store data.

The *frontend* doesn't directly run on the *user device*. Rather, it runs on a *[browser](https://en.wikipedia.org/wiki/Web_browser)*, which is a program that runs on the user device. Likewise, the *backend* doesn't directly run on a *server*. Rather, it runs on a *[runtime](https://en.wikipedia.org/wiki/Runtime_system)*. The runtime is a program that itself runs on the server. Examples of runtimes for backends are [node.js](https://en.wikipedia.org/wiki/Node.js) and [PHP](https://en.wikipedia.org/wiki/PHP).

It is a little mind-bending, but it really works that way: both the browser and the runtime are programs that run programs.

This is a good moment to clarify a common question: what is a server? The simplest definition: a computer running 24/7/365 that is connected to the internet. The [cloud](https://en.wikipedia.org/wiki/Cloud_computing) is essentially a bunch of servers somewhere, usually on several datacenters, that are always on and always connected to the internet.

You are probably acquainted with user devices: they mainly consist of personal computers, smartphones and tablets. The device where you're reading this is also a user device.

### How is a webapp loaded?

Loading the backend is easy: you put the entire program in the server and use the runtime to run it.it  The backend is a program that will run constantly and forever, until you stop it.

The frontend, however, is different. When the user opens a new tab to go to a webapp, the frontend is not there yet. It must be *loaded* onto the browser first. How does this happen?

```
Step 1:

┌──╌ Browser ╌─────────┐                     ┌──╌ Backend ╌─────────────┐
│                 ─────┼──╌ request URL ╌────┼─────>                    │
└──────────────────────┘                     └──────────────────────────┘

Step 2:

┌──╌ Browser ╌─────────┐                     ┌──╌ Backend ╌─────────────┐
│                <─────┼──╌ main HTML file ╌─┼─────                     │
└──────────────────────┘                     └──────────────────────────┘

Step 3:

┌──╌ Browser ╌─────────┐                     ┌──╌ Backend ╌─────────────┐
│                 ─────┼──╌ request CSS ╌────┼─────>                    │
└──────────────────────┘     & js files      └──────────────────────────┘

Step 4:

┌──╌ Browser ╌─────────┐                     ┌──╌ Backend ╌─────────────┐
│                <─────┼──╌ CSS & js files ╌─┼─────                     │
└──────────────────────┘                     └──────────────────────────┘

Step 5:

┌──╌ Browser ╌─────────┐
│  Frontend is loaded! │
└──────────────────────┘
```

It is important to understand how this happens; the diagram above explains the main steps:

- Step 1:
   - The user opens a tab in their browser and navigates to an URL where the webapp is available. This URL can be written manually, or it can be followed through a link. The browser doesn't care.
   - The browser finds the backend that corresponds to that URL and requests an HTML file. This file is the *main file* of the webapp.
- Step 2:
   - The backend receives the request for the main HTML file. It finds the file and sends it back to the browser.
   - The browser receives the main HTML file.
- Step 3:
   - Almost always there will be links to CSS & js files within the main HTML file. For example, a `<link>` tag can request a certain CSS file; and a `<script>` tag can request a certain js file. The browser will compile a list of these necessary files that are referenced by the main HTML file. It will then request each of these files to the backend.
   - The backend receives requests for CSS and js files.
- Step 4:
   - The server replies to all the requests by the browser for additional CSS & js files.
   - The browser receives all these files and now has everything it needs to launch the frontend program.
- Step 5: the frontend program is loaded!

A frontend is a group of HTML, CSS & js files. Once all of these files are loaded onto the browser, the frontend is ready to run.

This tutorial only covers the frontend aspect of webapp development. We will however learn how to make requests to the backend so that when you get around to write your server, your frontend will be ready for it!

### How do the frontend and the backend communicate?

The frontend and backend communicate through the [web](https://en.wikipedia.org/wiki/World_Wide_Web). The web is a way to exchange information that runs on top of the [internet](https://en.wikipedia.org/wiki/Internet). How are the web and the internet related? Think of it in this way:

- The internet is the *highway system*.
- The web is the *vehicles* that run on the highway.
- The user device and the server are *locations* that can be connected through vehicles running in the highway.

The frontend always starts the conversation by making a *request* to the backend. The backend replies to the frontend's request with a *response*. (There are exceptions to this, but in general it holds true). The communication between frontend and backend is a sequence of requests and responses.

### Why frontends use HTML, CSS and js?

Why web apps use three types of files instead of one? Each type of file has its specific uses:

- [HTML](https://en.wikipedia.org/wiki/HTML) files are *markup*, which is what is shown on the page.
- [CSS](https://en.wikipedia.org/wiki/CSS) files are *stylesheets*, which determine how the HTML looks.
- [js](https://en.wikipedia.org/wiki/JavaScript) files are *code*, which can modify the HTML & CSS and communicate with the backend.

Modern webapps - including those built with gotoв - are reliant on js. But they still use HTML & CSS. Even the most modern frontend frameworks still need to rely on HTML and CSS to create web apps.

The HTML and CSS represent the actual content of the page. HTML is what is shown on the page, while the CSS changes the way that the HTML looks. js is usually there to produce some changes on the HTML and CSS, but it is not strictly necessary and it is actually possible to write webapps without js.

HTML, CSS and js are text files, really. They have to conform to certain rules (very strict ones in the case of js), but they are humanly readable and can be opened on any text editor.

When you load a webpage, an HTML file (which is text that conforms to certain rules, nothing else) may contain further CSS or js inside of it. These CSS or js files are also text, also conforming to certain rules.

The browser, when receiving HTML, CSS and js, starts putting things on the screen - and that's what you see when the page is fully loaded.



our example: step counter.

views: cart and product pages

pages are just webpages? Not really! The state

The state: static

The state: dynamic, the loop

















### Is it a webpage or is it a webapp?

In the beginning of the web, we only had webpages. Webpages are easy to understand: each webpage is merely some HTML, CSS & js that gets loaded on the browser. Every time the user opens the page, that HTML, CSS & js gets loaded and the page is displayed. And, unless the owner of the webpage decides to change it, the webpage will be the same from here until the end of time.

Because webpages are always the same (unless updated), we consider them to be **static**.

An example of this is the homepage of a newspaper. Sure, it might be updated very often, but between updates, the page is the same for everyone. The newspaper is a set of documents, and each [Uniform Resource Locator (URL)](https://en.wikipedia.org/wiki/URL) gives you one document. The information flows in one way, from the webpage to the user.

Webapps are a different game, because the HTML, CSS & js depend on **the state of the application**.

An example of a webapp is the inbox of your web email, such as Gmail or Outlook.com. It is still HTML, CSS & js, but it will depend on what emails you have in your inbox! Your inbox may have a single URL, but the information of your inbox will likely change because of user interaction. The information flows both ways, from the webapp to the user and from the user to the webapp.

```
┌──╌ Webpage (static) ╌─────────┐
│                               │
│  ┌───────┐       ┌────────┐   │
│  │  URL  │ ────> │  HTML  │   │
│  └───────┘       └────────┘   │
│                               │
└───────────────────────────────┘

┌──╌ Webapp (dynamic) ╌─────────┐
│                               │
│  ┌───────┐                    │
│  │  URL  │ ─╮                 │
│  └───────┘  │    ┌────────┐   │
│             ├──> │  HTML  │   │
│  ┌───────┐  │    └────────┘   │
│  │ state │ ─╯                 │
│  └───────┘                    │
│                               │
└───────────────────────────────┘
```

In the case of an email application, the state would be comprised of the following things:
- The name of the user.
- The current view (Inbox, Sent, Drafts, Account, etc.).
- The emails currently displayed.
- Other user preferences, such as your preferred language.

(This is not an exhaustive list; there might be a lot more under the hood!)

The state is *shared information* between the webapp and the user. In some webapps, only the user can change their own state. In others (like an email application), users can affect each others' mutual state. For example, if someone sends you an email, that affects the state of your inbox.

The takeaway from this section (which is probably the hardest in the entire tutorial!) is that a webapp is about *state*, the shared information between the user and the app. If you understand this, all the following concepts will fall into place.

### What is the purpose of the state?

Why and how a state is central to a webapp? Before we explain, let's look at the following flow for an email webapp.

1. A new user arrives to the app.
2. Because the user has no account, the user sees a sign up page.
3. The user fills the sign up form and sends the data.
4. The account is created successfully!
5. The user now sees her inbox. No emails yet!
6. The user clicks on the "Compose" button to start an email.
7. A textbox appears where the user can write her email.
8. When the user clicks on "Send", the email is sent.
9. The textbox with the composed email disappears.
10. When the user goes to the "Sent" screen, the sent email appears there.
11. Someone else sends the user an email.
12. The user can now see the new email sent to her on the inbox.

Let's now explore the changes in the state on the relevant steps.
- On step 1: there's no state for the user yet! The app is a blank slate. At this point, everybody without an account will see the same thing: the sign up page.
- On step 2: an empty form is created to hold the user sign up info. As the user starts filling the form, her data goes into the state of the webapp. This is where the state begins for the user. Notice that the state of any other user, at this stage, would already be different, since the personal info of each user is unique.
- On step 3: the form is filled and sent. The state gets sent from the client (browser) to the server.
- On step 4: there's now account information for the user in the state.
- On step 6: a draft is created.
- On step 8: a new email is created to another user and stored in the "Sent" folder of the current user.
- On step 10: the user sets "Sent" as the current view of the webapp.
- On step 11: a new email is added to the user's inbox.

The state matters for two things:
- It determines the interface.
- It determines possible actions for the user.

### What is an interface?

The interface is the way in which a user interacts with the webapp. Through it, the user receives and gives information. In the same way that we cannot interact with the virtual world directly and we need webapps to do so, we need interfaces to interact with our webapps. Interfaces are the true windows to our digital world.

The interface is the part of the frontend that the user can see.

The interface has two main purposes: 1) see their state; 2) allow them to change the state.

The interface is not static. It depends on the state!

The flow of change always goes in one direction (the karmic wheel of the app):

```
initial state -> initial interface -> user picks an interaction -> state is updated -> interface is updated -> user picks another interaction

create account  -> initial state -> draw initial version of the HTML -> this allows certain interactions -> user picks an interaction -> state changes -> HTML is updated -> user picks another interaction -> state changes -> ...
```

To summarize the pattern further: `state -> interface -> user interacts with the interface -> new state -> new interface`. This is the core cycle of any application with an interface.

At any point in time, there's one state. All possible interactions of the user are determined by the state. Each interaction can create a change in the state. The state is the sum of all past interactions.

The app holds state for *each user*.

The state is stored both locally on the frontend and also on the backend. Most of the state is permanent, but some parts of it (usually stored in the frontend) may be lost if the user refreshes the page.





TODO

- Parallelism between clicking on a link on website and user interaction on a webapp!



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








TODO
- why js? apps without js.
- templates
   - replacement, conditional, iteration
   - in the backend vs in the frontend
- events
   - two sources of events: user interactions and responders
   - responders don't call responders; they only call events!


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
