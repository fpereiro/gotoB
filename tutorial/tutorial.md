# Tutorial: so you want to write a frontend?

If you are here, you may want to develop your first webapp, or perhaps you already are a webapp developer and want to get better at it. In this tutorial we will offer you as much *understanding* as we possibly can. In our experience, the most daunting part about achieving mastery with webapps is understanding how it all fits together, and why things are done in a certain way.

This tutorial replaces a more conventional tutorial format that merely shows how to develop webapps with [gotoв](https://github.com/fpereiro/gotob). Instead of this, we first offer **a conceptual introduction** to webapps (*web applications*, in case you're not familiar with the abbreviation). After the main conceptual pieces are in place, we then show the main problems that appear when one implements the frontend of a webapp; gotoв appears on the scene as a possible solution to these problems.

The purpose of this tutorial is to give you as much conceptual and practical understanding as possible, so that you can become a better web developer.

This tutorial requires only basic knowledge of HTML, JavaScript and programming. If you are just beginning and you want to understand the basic concepts of a webapp, you may find it useful. If you are a more experienced developer that is interested in reconsidering the concepts of the frontend from the ground up, you might be interested in it too.

## Part 1: a conceptual introduction to webapps

In the first part of the tutorial, we present a *conceptual* introduction to webapps. Before even seeing a line of code, it can be extremely helpful to understand the basic concepts that explain the why, how and what of webapps. We will cover concepts such as *the virtual world*, *devices*, *application*, *user interface*, *logic*, *server*, *user*, *frontend*, *backend*, *HTML*, *JavaScript* and *framework*. By the end of this part, you should have a high-level understanding of how they all fit together.

After all of this makes sense, it will be *far easier* to understand the details of how to implement a frontend. New knowledge can only be created as connections to knowledge you already have; our hope is that by giving you a short, yet rich web of concepts to understand webapps, the implementation details will become easier to understand, connect and remember.

### Chapter 1: an introduction to the digital world

Let's start at the beginning. Why do we even care about webapps? How are they meaningful to our lives?

We currently live in the [digital age](https://en.wikipedia.org/wiki/Information_Age). As such, our lives happen in two worlds: the *physical world* and the *digital world*. The physical world needs little explanation: it consists of all that was there before the digital age. The digital world, however, is what is new for us as a species. Despite being the newcomer, the digital world is now everywhere - in fact, unless you printed this tutorial on paper, you're right now immersed in the digital world!

The digital world came of age in the 1970s, with the development of [microcomputers](https://en.wikipedia.org/wiki/Microcomputer) and the [internet](https://en.wikipedia.org/wiki/Internet). It became massive in the early 1990s, with the development of the [web](https://en.wikipedia.org/wiki/World_Wide_Web), and experienced its tipping point with the development of [smartphones](https://en.wikipedia.org/wiki/Smartphone) in the late 2000s. Cheap, powerful and interconnected computers made the digital age happen.

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
│ │  │  │    <────┼──┼─┼──╌ Internet ╌─┼──┼──┼────>    │ │ │ │
│ │  │  └─────────┘  │ │    (network)  │  │  └─────────┘ │ │ │
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
- Allows the user to **interact** with the app: start, pause and stop the stopwatch. In that way, the user can change the information of the app (that is, to change the state of the app).

The *logic* determines the UI and what is possible to do with it:
- When the stopwatch is stopped, the logic only allows you to start the stopwatch.
- When the stopwatch is going, the logic only allows you to either pause it or reset it.

The logic also determines the time displayed in the clock:
- When you click on the button for stopping the stopwatch, the logic resets the clock.
- When the stopwatch is going, the logic constantly updates the clock.
- When the stopwatch is paused, the logic keeps the clock unchanged.

The *state* is what tells you *where the app is at*. For example, in the stopwatch app, the state is made of the following:
- Current time: *00:00:00* or more.
- Current mode of the clock: *stopped*, *paused* or *playing*.

The state of the app determines both how the UI looks and what operations the logic will perform. We would not go too far if we consider that an application is considered to be a *mathematical function of its state* (if you are wary of mathematics, please don't skip this section, we'll make it as clear as we can!).

Think of a mathematical function as a little box which, when receiving an input, immediately produces an output. You don't necessarily care what is inside the box. What is most important is that, when you give a certain input X to the function, it produces a result Y. A function can be then understood as a process that transforms an input X into a result Y.

```
function (x) -> y
```

Notice that the input to the function is shown above between parentheses (`(` and `)`). The result obtained from passing `x` as input to the function goes after the arrow `->`.

Let's take the example of the square-by-two function:

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

In the examples above, we consider `stopwatch` to be a function. The input we pass to the function is the *state*. What's then the result? The UI!

```
app (state) -> UI
```

The *state* determines how the app looks at any given moment. If the app changes, it is because the state was changed.

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

In the next chapter we will cover three more fundamental concepts: *data*, *servers* and *user accounts*.

### Chapter 4: data, servers and user accounts

In this chapter we will review three concepts that will put you "on the other side" of this tutorial. If you understand these three pieces of the puzzle, it's a fair bet to say you'll be able to grasp the rest of the concepts in this tutorial quite easily.

The concepts are three: *data*, *servers* and *user accounts*. From the perspective of applications, each of them creates the need for the following one. For example, without data, servers are not really necessary. Without servers, user accounts are mostly useless.

But indeed, data is the lifeblood of the digital world. As a result, data, servers and user accounts are fundamental concepts to be understood. So here we go!

To follow along, we will change our example from the stopwatch app to a simple todo list app:

```
  ┌──╌ Todo list app ╌────────────────┐
  │                                   │
  │         ┌─────────┐               │
  │         │ |       │<-- input box  │
  │         └─────────┘               │
  │      ┌───────────────┐            │
  │      │  CREATE TODO  │            │
  │      └───────────────┘            │
  │                                   │
  │      LIST OF TODOS:               │
  │                                   │
  │                                   │
  │                                   │
  └───────────────────────────────────┘
```

The todo list app has:
1. An input box, where you can write a todo item.
2. A button for saving the todo item in the list.
3. The actual list of todos.

If we add a couple of todos, the app will look like this:

```
  ┌──╌ Todo list app ╌────────────────┐
  │                                   │
  │         ┌─────────┐               │
  │         │ |       │               │
  │         └─────────┘               │
  │      ┌───────────────┐            │
  │      │  CREATE TODO  │            │
  │      └───────────────┘            │
  │                                   │
  │      LIST OF TODOS:               │
  │                        ┌────────┐ │
  │      - Write tutorial  │ DELETE │ │
  │                        └────────┘ │
  │                                   │
  │                        ┌────────┐ │
  │      - Bake birthday   │ DELETE │ │
  │        cake            └────────┘ │
  │                                   │
  │                                   │
  └───────────────────────────────────┘
```

When you finish a todo, you can simply delete it, so that your list will only contain things that you haven't done yet. The app is quite rudimentary, but it is enough to illustrate all the elements we need to understand in this chapter.

Let's start with **data**. Data is information that is meant to *persist*. In the stopwatch example, you probably would not be surprised if the time on the clock was resetted if you either close the app or restart your phone. With the todo list, however, you probably expect the app to *remember* your list of todos - otherwise, why bother writing them down?

The data is, then, information that the app must remember indefinitely. Data is the *permanent part* of the *state*. As we defined it on the last chapter, the *state* is what tells you *where the app is at*. The data, then is that information that determines where the app is at *and* persists over time.

```
┌──╌ State ╌──────────────┐
│                         │
│ - Non-persistent info   │
│                         │
│  ┌──╌ Data ╌─────────┐  │
│  │                   │  │
│  │ - Persistent info │  │
│  │                   │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

Some parts of the state are not permanent and therefore are not data. Let's see an example:

```
  ┌──╌ Todo list app ╌────────────────┐
  │                                   │
  │         ┌─────────┐               │
  │         │ buy a t │               │
  │         └─────────┘               │
  │      ┌───────────────┐            │
  │      │  CREATE TODO  │            │
  │      └───────────────┘            │
  │                                   │
  │      LIST OF TODOS:               │
  │                        ┌────────┐ │
  │      - Write tutorial  │ DELETE │ │
  │                        └────────┘ │
  │                                   │
  │                        ┌────────┐ │
  │      - Bake birthday   │ DELETE │ │
  │        cake            └────────┘ │
  │                                   │
  │                                   │
  └───────────────────────────────────┘
```

Notice that we entered `buy a t` in the input box of the app. If, however, we close the app (or restart our phone/computer) before hitting the `CREATE TODO` button, that half-formed todo item will disappear when we open the app again. Before we closed the app, `buy a t` was part of the state, but not part of the data.

```
┌──╌ Todo list app ╌──────────────┐
│                                 │
│  ┌──╌ State  ╌───────────────┐  │
│  │                           │  │
│  │  - Half-entered todo      │  │
│  │                           │  │
│  │  ┌─╌ Data ╌─────┐         │  │
│  │  │              │         │  │
│  │  │ - Todo list  │         │  │
│  │  │              │         │  │
│  │  └──────────────┘         │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

Now, where is the data stored? Since the app needs to "remember" the data, it must write the data somewhere, so that then it can read it back up when necessary.

The most natural place to store data is *inside the device itself*. All phones, tablets and computers have [storage media](https://en.wikipedia.org/wiki/Computer_data_storage) from which apps can read and write data.

Storing the data in your device, however, has two problems:

- If you lose or damage the device, your data is lost. To remediate this, you would have to do periodic backups of your data.
- Your data is tied to one device. To remediate this, you would have to carry around an updated copy of your data in a portable storage device.

Granted, for a simple todo list, you might not care if you lose the data - you might be much more aggravated by the fact that you lost your phone! And you might not be interested in using the todo list app from other devices like your computer.

But for many other applications, you do care about not losing your data, and you care about accessing your data from different devices.

Servers are the solution to this problem. But what is a server?

A server is a device (more specifically, a computer), that is constantly on and connected to the internet. In other words, it is a a computer that is always on and always connected. Unless it is undergoing temporary maintenance, and assuming it didn't malfunction, a server will always be ready to operate.

An application can store its data on a server. Going back to our todo list example, whenever you add or remove an item from the list, the app can send the entire todo list to the server instructing it to keep a copy of the list.

When the app is restarted, the app can ask the server for a copy of the list.

```
App storing data on the server (saving data):

┌──╌ App ╌─────────┐                   ┌──╌ Server ╌─────────────┐
│             ─────┼──╌ todo list ╌────┼─────>                   │
└──────────────────┘                   └─────────────────────────┘

App retrieving data from the server (loading data):

┌──╌ App ╌─────────┐                   ┌──╌ Server ╌─────────────┐
│            <─────┼──╌ todo list ╌────┼─────                    │
└──────────────────┘                   └─────────────────────────┘
```

Going back to the todo list app, imagine that we now have a server that is able to store the todo lists for each of the app users. Now, the data is no longer tied to the device:

- If you lose your device, there's a copy of your todo list still on the server.

```
┌──╌ New device╌───┐                   ┌──╌ Server ╌─────────────┐
│            <─────┼──╌ todo list ╌────┼─────                    │
└──────────────────┘                   └─────────────────────────┘
```

- If you use the app from more than one device, each device can have the last version of the list by synchronizing the list with the server.

```
For example, you first update the list from your phone.

┌──╌ Phone ╌───────┐                   ┌──╌ Server ╌─────────────┐
│             ─────┼──╌ todo list ╌────┼─────>                   │
└──────────────────┘                   └─────────────────────────┘

Then, you open the list in your computer.

┌──╌ Computer ╌────┐                   ┌──╌ Server ╌─────────────┐
│            <─────┼──╌ todo list ╌────┼─────                    │
└──────────────────┘                   └─────────────────────────┘
```

Developing and maintaining a server is not easy, but it massively increases the value of an application for users, even only for the fact that they persist data and allow the app to be used from different devices. (Servers actually enable the generation and processing of data that is not directly created by the user, which can also add huge value to an application - we go into that into a small aside section at the end of this chapter).

A server is meant to serve multiple users of an app, not just one. Maintaining a server for each user is neither economically feasible not technically necessary. A single server (or a single group of servers) can serve thousands or even millions of users!

```
  ┌──╌ Phone 1 ╌─┐                  ┌──╌ Phone 2 ╌─┐
  │              │                  │              │
  │  ┌─╌ App ╌─┐ │                  │  ┌─╌ App ╌─┐ │
  │  │  <──────│─┼──────╮  ╭────────┼──┼───>     │ │
  │  └─────────┘ │      │  │        │  └─────────┘ │
  └──────────────┘      ╎  ╎        └──────────────┘
                     ┌─────────┐
                     │   App   │
                     │  Server │
                     └─────────┘
  ┌╌ Computer 1╌─┐      ╎  ╎        ┌─╌ Computer 2╌┐
  │              │      │  │        │              │
  │  ┌─╌ App ╌─┐ │      │  │        │  ┌─╌ App ╌─┐ │
  │  │  <──────│─┼──────╯  ╰────────┼──┼───>     │ │
  │  └─────────┘ │                  │  └─────────┘ │
  └──────────────┘                  └──────────────┘

```

Going back to the example of the todo list app, earlier we said that "*we now have a server that is able to store the todo lists for each of the app users*". If the server is to store and retrieve todo lists for each user, *the server needs to have a concept of what a user is*. In other words, when your phone asks the server for the latest version of the todo list, the server must know that it is *your* list and not anyone else's. This brings us to the third and last concept of the chapter: user accounts.

An user account is a way in which a server can identify an user. The most basic version of a user account is the combination of an *username* (which identifies the user) and a *password* (which is a secret combination of digits and characters, ideally only known by the user). More sophisticated user accounts involve an email address and possibly other ways of proving identity (see, for example, [multi-factor authentication](https://en.wikipedia.org/wiki/Multi-factor_authentication)).

Conceptually, it all boils down to the same thing: a username (or user identifier, such as an email address), plus a secret piece of data. When a device sends both to the server, the server will be able to identify the user that's using the device.

```
┌╌ Mono's Phone ╌──┐    username = mono        ┌──╌ Server ╌─────────────┐
│             ─────┼──╌ password = 1234   ╌────┼─────>                   │
└──────────────────┘                           └─────────────────────────┘

┌╌ Mono's Phone ╌──┐    success!               ┌──╌ Server ╌─────────────┐
│            <─────┼──╌ now I know you    ╌────┼─────                    │
└──────────────────┘    are the user "mono"    └─────────────────────────┘

Side note: please don't use 1234 as your password. It is really, really easy to guess.
```

If someone who is not the user `mono` would try to gain access to the server by guessing the password, if they get the password wrong, the server will not recognize this person as `mono`; instead, the server will reply with an error.

```
┌╌ Shady's Phone ╌─┐    username = mono        ┌──╌ Server ╌─────────────┐
│             ─────┼──╌ password = 4321   ╌────┼─────>                   │
└──────────────────┘                           └─────────────────────────┘

┌╌ Shady's Phone ╌─┐    failure!               ┌──╌ Server ╌─────────────┐
│            <─────┼──╌ wrong password    ╌────┼─────                    │
└──────────────────┘    you are not "mono"     └─────────────────────────┘
```

Once a server knows that a certain device is sending requests on behalf of user X, it will allow that device to read and write the data associated with user X. This works not unlike a locker box: each user has its data on a certain section of the server. The server, if properly programmed, will only give access to a certain box to the owner of the box.

```
┌╌ Mono's Phone ╌──┐    username = mono        ┌──╌ Server ╌─────────────┐
│             ─────┼──╌ password = 1234   ╌────┼─────>                   │
└──────────────────┘                           └─────────────────────────┘

┌╌ Mono's Phone ╌──┐    success!               ┌──╌ Server ╌─────────────┐
│            <─────┼──╌ here is the data  ╌────┼─────                    │
└──────────────────┘    belonging to "mono"    └─────────────────────────┘
```

An application server then performs at least two functions:
- Store a list of usernames and associated secrets, to be able to identify if a certain device belongs to a user.
- Manage data for each user: send it to the device associated with a user when it is requested and update it when the user device sends new data.

```
  ┌──╌ Server ╌────────────────┐
  │                            │
  │     ┌╌ User accounts ╌┐    │
  │     │                 │    │
  │     │ - mono / 1234   │    │
  │     │ - tom  / foo    │    │
  │     │                 │    │
  │     └─────────────────┘    │
  │                            │
  │     ┌╌ User data     ╌┐    │
  │     │                 │    │
  │     │ - mono: ...     │    │
  │     │ - tom:  ...     │    │
  │     │                 │    │
  │     └─────────────────┘    │
  │                            │
  └────────────────────────────┘
```

**Very, very important side note**: *NEVER* store passwords directly on the server. Instead, store a [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) of the password. Most people reuse their passwords, so if you store their password (instead of a hash) and someone hacks into your server, that someone can also gain access to other accounts owned by your users.

Well, we've come a long way: we went from a simple app (the stopwatch) which stored no data and required no server or user accounts. Then we reviewed an app with data (the first version of the todo list) that didn't require a server or user accounts. Finally, we saw how adding a server and user accounts can greatly enhance the todo list app (and most apps).

From now on, we will consider only apps that require data, servers and user accounts.

We're now ready to dive into web applications! But before we jump into chapter 5, here's an (optional) aside, which explains other ways in which servers can make an app more useful.

### Aside: servers for data not directly generated by the user

If servers only existed to manage the data produced by an user interacting with an app, that would be enough to justify the existence of servers. But it turns out that servers enable the possibility of creating and managing many other types of data that, while not generated by the user herself/himself, can still be consumed by the user.

These types of data fall into two categories:
- Public (or semi-public) data. Examples: stock market data, weather data, digital media (books/music).
- Data generated by other users: Example: one-to-one messages, public comments/posts.

Servers thus enable two things: 1) access to public digital data; and 2) digital communication between users.

In the case of public information, the data can either be stored on the application server itself; or it can be stored in a different server, which is in communication with the application server.

```
If the stock data is stored directly on the app server:

┌╌ Phone ╌──────┐                      ┌──╌ Server ╌────────┐
│               │                      │                    │
│  ┌─╌ App ╌─┐  │     What is          │  ┌─╌ Stock data╌─┐ │
│  │    ─────│──┼───╌ the price  ╌─────┼──┼───>           │ │
│  └─────────┘  │     of General       │  └───────────────┘ │
│       ^       │     Motors' stock?   │           |        │
│       |       │                      │           |        │
└───────┼───────┘                      └───────────┼────────┘
        |                                          |
        ╰─────────────╌ 49.36 USD ╌────────────────╯


If the stock data is stored on a public data server


┌╌ Phone ╌──────┐                     ┌─╌ Server ╌┐                    ┌──╌ Data Server ╌───┐
│               │                     │           │                    │                    │
│  ┌─╌ App ╌─┐  │     What is         │           │    What is         │  ┌─╌ Stock data╌─┐ │
│  │    ─────│──┼───╌ the price  ╌────┼────>   ───│──╌ the price   ╌───┼──┼───>           │ │
│  └─────────┘  │     of General      │           │    of General      │  └───────────────┘ │
│       ^       │     Motors' stock?  │   ╭────╮  │    Motors' stock?  │           |        │
│       |       │                     │   |    |  │                    │           |        │
└───────┼───────┘                     └───┼────┼──┘                    └───────────┼────────┘
        |                                 |    |                                   |
        ╰─────────────╌ 49.36 USD ╌───────╯    ╰─────────╌ 49.36 USD ╌─────────────╯
```

Notice that the `49.36 USD` piece of information wasn't generated by the user, but it still can be very useful to the user.

User communication, if it happens within a single app, it can be managed by the server itself.

```
┌╌ Phone of user A ╌──┐                  ┌──╌ Server ╌────────────┐
│                     │                  │                        │
│  ┌─╌ App ╌──────┐   │     Send a       │  ┌─╌ Data of user B ╌┐ │
│  │    ──────────│───┼───╌ message ╌────┼──│──────>            │ │
│  └──────────────┘   │     to user B    │  └───────────────────┘ │
│                     │                  │                        │
│                     │                  │                        │
└─────────────────────┘                  └────────────────────────┘


┌╌ Phone of user B ╌──┐                  ┌──╌ Server ╌────────────┐
│                     │                  │                        │
│  ┌─╌ App ╌──────┐   │     Here are     │  ┌─╌ Data of user B ╌┐ │
│  │    <─────────│───┼───╌ your new ╌───┼──│──────             │ │
│  └──────────────┘   │     messages     │  └───────────────────┘ │
│                     │                  │                        │
│                     │                  │                        │
└─────────────────────┘                  └────────────────────────┘
```

For most applications, a large portion of the data associated with an user will either be public data or data originating from other users. These two sources of data are combined with the user's own data (including their preferences on how their data should be displayed) to make the totality of a user's data in the context of an application.

### Aside: servers and control

In addition to providing an "always-on" repository of data, servers have another critical quality: control. Unless your server gets compromised, you control the logic executed there. This is a simple way to prevent (for example) that a user would read data that doesn't belong to them. It also allows to enforce consistency of the data, meaning that all the data in your server follows a certain structure.

### Chapter 5: introduction to web applications

So far, we have been learning about applications in general. In this chapter, we'll start to go into the specifics of *web* applications.

Before web applications, only *native* applications existed. A native application, as we saw in chapter 2, is a program that runs on top of the combination of a device plus its operative system.

```
┌──╌ Device + OS  ╌───────────┐
│                             │
│  ┌─╌ Native application ╌─┐ │
│  │                        │ │
│  └────────────────────────┘ │
│                             │
└─────────────────────────────┘
```

Most of the applications in your computer and your phone are native applications. They are written to be specifically tailored to your device and operative system.

With the advent of the [World Wide Web](https://en.wikipedia.org/wiki/World_Wide_Web) in the early 1990s, a new and interesting native application made its appearance: **[the web browser](https://en.wikipedia.org/wiki/Web_browser)**. Both the World Wide Web (web, for short) and the web browser (browser, for short) were originally meant to display pages with static content (such as text and images). Sometime later (circa 1995), browsers expanded their reach: not only were they useful for displaying static content, but also for conducting online retail. While the browser became massively popular back then, its uses were still limited. Around this time, the two most popular browsers were [Netscape Navigator](https://en.wikipedia.org/wiki/Netscape_Navigator) and [Internet Explorer](https://en.wikipedia.org/wiki/Internet_Explorer).

In the early 2000s, gradually and unexpectedly, the browser became an **application platform**. This means that the browser started to be able to run applications inside itself! These applications working inside a browser are called *web applications* (webapps, for short).

```
┌──╌ User device + OS ╌────┐
│                          │
│  ┌──╌ Browser ╌───────┐  │
│  │                    │  │
│  │  ┌─╌ Webapp  ╌──┐  │  │
│  │  │              │  │  │
│  │  └──────────────┘  │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘
```

At first sight, this looks more complicated than the previous diagram. Before, we only had two things: the combination of device+OS, and the native app itself. But now, we have three things: device+OS, browser and webapp. Why complicate things with webapps if native apps work just fine? Wouldn't this make webapps harder to build, since they have to keep track of more things (user device + OS + browser)?

Actually, no: because a browser offers a relatively consistent set of tools with which to implement apps, the apps don't really care on which user device+OS they are running. So, for webapp developers, the graph looks like this:

```
┌──╌ Browser ╌─────┐
│                  │
│  ┌─╌ Webapp ╌──┐ │
│  │             │ │
│  └─────────────┘ │
│                  │
└──────────────────┘
```

This looks like the first graph, only that we have replaced the user device + OS bundle for the browser. However, browsers are quite alike. With some (very annoying) exceptions, what works in a browser will work in another. While this was not very true in the mid-1990s, it is very much true in the early 2020s. So the graph above starts to look like this:

```
┌──╌ Any browser ╌─┐
│                  │
│  ┌─╌ Webapp ╌──┐ │
│  │             │ │
│  └─────────────┘ │
│                  │
└──────────────────┘
```

And because practically all devices now come with at least one browser installed, the graph looks like this:

```
┌─╌ Any device + any OS ╌──┐
│                          │
│  ┌──╌ Any browser ╌───┐  │
│  │                    │  │
│  │  ┌─╌ Webapp  ╌──┐  │  │
│  │  │              │  │  │
│  │  └──────────────┘  │  │
│  │                    │  │
│  └────────────────────┘  │
│                          │
└──────────────────────────┘
```

Webapps are the first applications that can run on any device and OS, with the same code, as long as this device + OS has a (decent) browser installed.

This allows webapps to run almost anywhere, and with the app code not having to be tailored to a specific combination of device and OS. In a word, webapps are **portable** across devices & OSes.

```
┌──╌ Android phone  ╌──────┐      ┌──╌ Apple phone  ╌────────┐
│                          │      │                          │
│  ┌──╌ Any browser ╌───┐  │      │  ┌──╌ Any browser ╌───┐  │
│  │                    │  │      │  │                    │  │
│  │  ┌─╌ Webapp  ╌──┐  │  │      │  │  ┌─╌ Webapp  ╌──┐  │  │
│  │  │              │  │  │      │  │  │              │  │  │
│  │  └──────────────┘  │  │      │  │  └──────────────┘  │  │
│  │                    │  │      │  │                    │  │
│  └────────────────────┘  │      │  └────────────────────┘  │
│                          │      │                          │
└──────────────────────────┘      └──────────────────────────┘



┌──╌ Computer + Windows ╌──┐      ┌──╌ Apple tablet ╌────────┐
│                          │      │                          │
│  ┌──╌ Any browser ╌───┐  │      │  ┌──╌ Any browser ╌───┐  │
│  │                    │  │      │  │                    │  │
│  │  ┌─╌ Webapp  ╌──┐  │  │      │  │  ┌─╌ Webapp  ╌──┐  │  │
│  │  │              │  │  │      │  │  │              │  │  │
│  │  └──────────────┘  │  │      │  │  └──────────────┘  │  │
│  │                    │  │      │  │                    │  │
│  └────────────────────┘  │      │  └────────────────────┘  │
│                          │      │                          │
└──────────────────────────┘      └──────────────────────────┘
```

Webapps have a second, perhaps greater advantage over native apps: you don't need to install them. All native apps come either pre-installed with the OS, or are installed by the user. For an app creator, this means that if your app is not pre-installed with the device+OS, your users must find it and install it on every device on which they want to use it.

With webapps, all a prospective user has to do is to go to click on a link, and the app will automatically load in their browser. **No installation needed!**

```
 ┌──╌ Any browser ╌─┐                   ┌──╌ Any browser ╌─┐
 │                  │                   │                  │
 │                  │     click on      │  ┌─╌ Webapp ╌──┐ │
 │           ───────┼───╌ link to ╌───> │  │             │ │
 │                  │     coolapp.com   │  └─────────────┘ │
 │                  │                   │                  │
 └──────────────────┘                   └──────────────────┘
```


The third advantage of webapps is **the power of the browser as an application platform**. The browser is an extremely powerful native app that can do many things. To name a few:

- Transfer data from/to a server.
- Play and record audio and video media.
- Read and write files to an user's device.
- Draw complex animations.

Webapps leverage the browser's capabilities to implement complex functionality with relative ease, compared to native apps. While the browser is usually never the best platform for any given use case (except perhaps for showing static content), it *combines* multiple capabilities that are well implemented.

The fourth and last advantage of webapps concerns governance. The web is **decentralized and based on open protocols**. In practice, this means that no single company or government controls the web and browsers. This is in sharp contrast with most devices and OS, which are controlled by specific companies. Because the web is decentralized, its survival and evolution is unconstrained and is not wholly dependent on the organization that controls it. This bestows great power to both users and makers of webapps.

To sum up: webapps are applications that run inside a browser. They have four advantages over native apps:

1. Portability.
2. No install required.
3. A powerful application platform (the browser)
4. Decentralization and open protocols.

In the next chapter we'll start to understand how webapps work.

### Chapter 6: how do webapps work?

A webapp is not one program, but rather the combination of two programs:

- The **frontend**, a program that runs on a **browser**, which in turn runs in a **user device**.
- The **backend**, a program that runs on a **runtime**, which in turn runs in a **server**.

```
┌──╌ User device ╌─────────┐               ┌──╌ Server ╌──────────────┐
│                          │               │                          │
│  ┌──╌ Browser ╌───────┐  │               │  ┌──╌ Runtime ╌───────┐  │
│  │                    │  │               │  │                    │  │
│  │  ┌─╌ Frontend ╌─┐  │  │               │  │  ┌─╌ Backend ╌─┐   │  │
│  │  │       <──────┼──┼──┼────╌ web ╌────┼──┼──┼──────>      │   │  │
│  │  └──────────────┘  │  │               │  │  └─────────────┘   │  │
│  └────────────────────┘  │               │  └────────────────────┘  │
└──────────────────────────┘               └──────────────────────────┘
```

A web development team needs to write both programs to develop a complete webapp. This is true not just of webapps, but of any app which uses servers.

Both programs that make the webapp, the frontend and the backend, communicate through the web.

The main functions of the frontend are:
- Provide a user interface.
- Show information to the user.
- Collect data provided by the user and send it to the backend.

The main functions of the backend are:
- Provide information to the frontend.
- Validate, collect and store data.

The *frontend* doesn't directly run on the *user device*. Rather, as we saw on the last chapter, it runs on a web browser, which is a program that runs on the user device.

Likewise, the *backend* doesn't directly run on a *server*. Rather, it runs on a *[runtime](https://en.wikipedia.org/wiki/Runtime_system)*. The runtime is a program that itself runs on the server. Examples of runtimes for backends are [node.js](https://en.wikipedia.org/wiki/Node.js) and [PHP](https://en.wikipedia.org/wiki/PHP).

It is a little mind-bending, but it really works that way: both the browser and the runtime are programs that run programs.

As we mentioned in the last chapter, the web works through *standards*. Standards are a way of doing things that follow certain rules. If you follow the rules of web standards, you can create a web app that can be part of the broader web, without requiring permission from any organization.

Standards are pretty much like a language. To understand others and be understood, you need to speak a common language. No one is forcing you to speak any specific language, but to speak to someone, you need to do so in a language they understand. Web standards are the language of the web. By using them, your app can be part of the conversation.

The web is actually a collection of standards. The four most important ones are:

- [Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) - also known as HTTP.
- [Hypertext Markup Language](https://en.wikipedia.org/wiki/HTML) - also known as HTML.
- [Cascading Style Sheets](https://en.wikipedia.org/wiki/CSS) - also known as CSS.
- [Javascript](https://en.wikipedia.org/wiki/JavaScript) - also known as JS.

All of these standards, plus many others, make up the web.

The web runs on top of the internet. And guess what? The internet itself is also powered by standards, such as [DNS](https://en.wikipedia.org/wiki/Domain_Name_System), [TCP/IP](https://en.wikipedia.org/wiki/Internet_protocol_suite), [WiFi](https://en.wikipedia.org/wiki/Wi-Fi) and [Ethernet](https://en.wikipedia.org/wiki/Ethernet).

This is a good moment to explain the relationship between the internet and the web, from the perspective of webapps. The best way to understand it is through an analogy:

- The internet is the *highway system*.
- The web is the *vehicles* that run on the highway.
- The frontend and the backend are *locations* that can be connected through vehicles running in the highway.

Without a highway system (internet), the web cannot work. But once the highway is in place, the vehicles (web) can carry information from one location to the other.

#### How is the frontend loaded?

Getting the backend to run is simple: you copy the backend program to a server and run the backend using the runtime. The backend is a program that will run constantly and forever, until you stop it. Once you set it running, it will be listening to incoming requests.

It is esential that your server should receive the requests directed to a given web domain. For example, if your app's domain is `myapp.com`, your server should be configured so that it receives all the requests sent to `myapp.com`. We won't go into details here, because this tutorial is focused on the frontend and this topic squarely belongs to the backend. The gist of it is that, from the perspective of the web, `myapp.com` should *point* to your server.

The frontend works differently. When the user opens a new tab to go to a webapp, the frontend is not there yet. It must be *loaded* onto the browser first. How does this happen? The diagram above explains the main steps:


```
Step 1:

┌──╌ Browser ╌─────────┐                     ┌──╌ Backend ╌─────────────┐
│                 ─────┼──╌ request URL ╌────┼─────>                    │
└──────────────────────┘    (myapp.com)      └──────────────────────────┘

Step 2:

┌──╌ Browser ╌─────────┐                     ┌──╌ Backend ╌─────────────┐
│                <─────┼──╌ main HTML file ╌─┼─────                     │
└──────────────────────┘                     └──────────────────────────┘

Step 3:

┌──╌ Browser ╌─────────┐                     ┌──╌ Backend ╌─────────────┐
│                 ─────┼──╌ request CSS ╌────┼─────>                    │
└──────────────────────┘     & JS files      └──────────────────────────┘

Step 4:

┌──╌ Browser ╌─────────┐                     ┌──╌ Backend ╌─────────────┐
│                <─────┼──╌ CSS & JS files ╌─┼─────                     │
└──────────────────────┘                     └──────────────────────────┘

Step 5:

┌──╌ Browser ╌─────────┐
│  Frontend is loaded! │
└──────────────────────┘
```

- Step 1:
   - The user opens a tab in their browser and navigates to an URL where the webapp is available. This URL can be written manually, or it can be followed through a link. The browser doesn't care.
   - The browser finds the backend that corresponds to that URL and requests an HTML file. This file is the *main file* of the webapp.
- Step 2:
   - The backend receives the request for the main HTML file. It finds the file and sends it back to the browser.
   - The browser receives the main HTML file.
- Step 3:
   - Almost always there will be links to CSS & JS files within the main HTML file. For example, a `<link>` tag can request a certain CSS file; and a `<script>` tag can request a certain JS file. The browser will compile a list of these necessary files that are referenced by the main HTML file. It will then request each of these files to the backend.
   - The backend receives requests for CSS and JS files.
- Step 4:
   - The server replies to all the requests by the browser for additional CSS & JS files.
   - The browser receives all these files and now has everything it needs to launch the frontend program.
- Step 5: the frontend program is loaded!

A frontend is a collection of HTML, CSS & JS files. Once all of these files are loaded onto the browser, the frontend is ready to run.

The frontend always starts the conversation by making a *request* to the backend. The backend replies to the frontend's request with a *response*. (There are exceptions to this, but in general it holds true). The communication between frontend and backend is a sequence of requests and responses.

#### Why frontends use HTML, CSS and JS?

Why web apps use three types of files instead of one? Each type of file has its specific uses:

- [HTML](https://en.wikipedia.org/wiki/HTML) files are *markup*, which is what is shown on the page.
- [CSS](https://en.wikipedia.org/wiki/CSS) files are *stylesheets*, which determine how the HTML looks.
- [JS](https://en.wikipedia.org/wiki/JavaScript) files are *code*, which can modify the HTML & CSS and communicate with the backend.

Modern webapps - including those built with gotoв - are reliant on JS. But they still use HTML & CSS. Even the most modern frontend frameworks still rely on HTML and CSS to create web apps.

The HTML and CSS represent the actual content of the page. HTML is what is shown on the page, while the CSS changes the way that the HTML looks. JS is usually there to produce some changes on the HTML and CSS, but it is not strictly necessary and it is actually possible (although nowadays rare) to write webapps without JS.

HTML, CSS and JS files are text files, really. They have to conform to certain rules (very strict ones in the case of JS), but they are humanly readable and can be opened on any text editor.

When you load a webpage, an HTML file (which is text that conforms to certain rules, nothing else) may contain further CSS or JS inside of it. These CSS or JS files are also text, also conforming to certain rules.

The browser, when receiving HTML, CSS and JS, starts putting things on the screen - and that's what you see when the page is fully loaded.

#### Is it a webpage or is it a webapp?

In the beginning of the web, we only had webpages. Webpages are easy to understand: each webpage is merely some HTML, CSS & JS that gets loaded on the browser. Every time the user opens the page, that HTML, CSS & JS gets loaded and the page is displayed. And, unless the owner of the webpage decides to change it, the webpage will be the same from here until the end of time.

Because webpages are always the same (unless updated), we consider them to be **static**.

An example of this is the homepage of a newspaper. Sure, it might be updated very often, but between updates, the page is the same for everyone. The newspaper is a set of documents, and each [Uniform Resource Locator (URL)](https://en.wikipedia.org/wiki/URL) gives you one document. The information flows in one way, from the webpage to the user.

Webapps are a different game, because they depend on **the state of the application**. If you remember what we covered in chapter 3, an app is made of an UI, state and logic. Webapps have all three, while webpages only have a UI. And in a webapp, information flows both ways, from the webapp to the user but also from the user to the webapp.

In a webapp, the UI will be expressed with HTML and CSS, while the logic and the state management of the app will be expressed with JS.

Now that we have a general feel for how webapps work, we will explain two concepts that are fundamental to the frontend: templates & state management.

### Chapter 7: templates & state management

As we saw earlier, a fundamental part of any webapp is the UI (user interface). The UI is made of multiple components that have both *fixed* and *changing* parts. Any webapp must be able to elegantly express the UI in a way that defines both the fixed and changing parts. This is done through **templates**.

Being able to express how the UI should look at any moment is, however, not enough. Once the state changes, we also need to be able to update the UI so that it reflects the changes to the state. In other words, the UI needs to be updated when the state changes. This is where **state management** comes in.

We'll start by understanding templates. Let's go back to our stopwatch example.

```
┌──╌ Stopwatch app ╌─────────────────────────────┐
│                                                │
│                   Stopwatch                    │
│                                                │
│                    00:00:00                    │
│                                                │
│                  ┌─────────┐                   │
│                  │  START  │                   │
│                  └─────────┘                   │
│                                                │
└────────────────────────────────────────────────┘
```

Note we have added a simple "Stopwatch" title at the top of the app, but otherwise the app is unchanged from that of chapter 3.

Let's first determine which elements are fixed and which are changeable:

Fixed elements:
- Title (`Stopwatch`)

Changeable elements:
- Clock (displays elapsed time)
- Buttons:
   - Show `START` button if clock is stopped.
   - Show `PAUSE` and `STOP` buttons if clock is running.
   - Show `START` and `STOP` buttons if clock is paused.

Templates allow us to express this combination of fixed and changeable elements:


```
┌──╌ Stopwatch app template ╌────────────────────┐
│                                                │
│                   Stopwatch                    │
│                                                │
│                 {ELAPSED_TIME}                 │
│                                                │
│             {IF CLOCK IS STOPPED}              │
│                  ┌─────────┐                   │
│                  │  START  │                   │
│                  └─────────┘                   │
│                                                │
│             {IF CLOCK IS RUNNING}              │
│          ┌─────────┐      ┌────────┐           │
│          │  PAUSE  │      │  STOP  │           │
│          └─────────┘      └────────┘           │
│                                                │
│             {IF CLOCK IS PAUSED}               │
│          ┌─────────┐      ┌────────┐           │
│          │  START  │      │  STOP  │           │
│          └─────────┘      └────────┘           │
│                                                │
└────────────────────────────────────────────────┘
```

Note that in the template above, we have placed a few terms between curly braces (`{` and `}`). The curly braces are there to distinguish things that shouldn't go there as-is, but rather should be changed according to circumstance. And what exactly is that circumstance? Well, it's the state of the application!

In the stopwatch app, the state is comprised by two pieces of information:
- Elapsed time.
- State of the clock: stopped, running or paused.

When a template is *rendered*, the app combines it with the state to create the current UI. *Rendering* is the name given to the process that *combines a template and the current state to generate the UI*.

```
 Template + state = UI
\_____________________/
       Rendering
```

The elements that are fixed (those not between curly braces) are placed as is. Other elements, however, are modified. Let's see how:

- `{ELAPSED_TIME}` is a **variable**. When rendering the template, the app substitutes `{ELAPSED_TIME}` with the actual elapsed time stored by the state, for example: `00:00:00`.
- The buttons are determined by a **conditional**. Depending on whether a part of the state fulfills a condition, certain buttons are shown. If the state of the clock were to be `paused`, for example, the UI would show the buttons for `START` and `STOP`, but not the buttons for `PAUSE` and `STOP`.

*Variable substitution* and *conditional* are two of the main patterns of templates. To give an example of the third one, **iteration**, let's revisit our todo list app.

```
  ┌──╌ Todo list app template ╌───────┐
  │                                   │
  │      ┌──────────────┐             │
  │      │  {NEW TODO}  │             │
  │      └──────────────┘             │
  │      ┌───────────────┐            │
  │      │  CREATE TODO  │            │
  │      └───────────────┘            │
  │                                   │
  │      LIST OF TODOS:               │
  │                                   │
  │      {FOR EACH TODO}              │
  │                        ┌────────┐ │
  │      - {TODO}          │ DELETE │ │
  │                        └────────┘ │
  │                                   │
  └───────────────────────────────────┘
```

Let's go through each of the parts of the template:

- `{NEW TODO}` contains the value of the new todo.
- `CREATE TODO` is a button that is always shown.
- `LIST OF TODOS:` is a title that is always shown.
- For each todo, we show the todo text (`{TODO}`) and the `DELETE` button that corresponds to it.

The last elements in the list above are the ones in the scope of the **iteration** pattern. Iteration means to go through a list of elements and do something with them. In this case, the list being iterated is the list of todos and each element is a todo. For each todo, we need to print it and place a `DELETE` button next to it.

These three patterns, variable substitution, conditional and iteration are the meat and potatoes of templating. Through them, you can express rich and complex UIs. These patterns can be combined: for example, an iteration can contain in itself variable substitution (like in the example above, where `{TODO}` is replaced with the text of the actual todo), or a conditional can contain an iteration.

In common programming parlance, conditionals are associated with the word `if`, whereas iteration is associated with the terms `loop`, `for` and `while` - the last two are types of loops. The words *loop* and *iteration* can be used interchangeably.

There's a fourth templating pattern that we've left for last: a template can use **function calls** for specific tasks. Function calls use a certain function that has been defined elsewhere and is able to generate part of the template. For example, if you have already defined a function for creating buttons (called `button_maker`), you could use it in the todo list app template like this:

```
  ┌──╌ Todo list app template ╌────────────┐
  │                                        │
  │      ┌──────────────┐                  │
  │      │  {NEW TODO}  │                  │
  │      └──────────────┘                  │
  │                                        │
  │    {button_maker ('CREATE TODO')}      │
  │                                        │
  │                                        │
  │      LIST OF TODOS:                    │
  │                                        │
  │      {FOR EACH TODO}                   │
  │                                        │
  │      - {TODO} {button_maker ('DELETE')}│
  │                                        │
  │                                        │
  └────────────────────────────────────────┘
```

The two main advantages of function calls are:

1. Reuse code and avoid repetition of common elements.
2. Leverage the power of a programming language, which is more powerful than what templates have to offer (variable substitution, conditionals and iteration); in other words, function calls get you out of the limits of templating and let you program with more powerful abstractions offered by a programming language.

There are many templating engines, which are programs that take your templates and turn them into HTML. The specific way in which you write the templates will depend on the template engine you choose to use. Some template engines create the HTML on the server (this is called *server-side rendering*), whereas other template engines create the HTML directly on the browser (this is called *client-side rendering*). In either case, the general patterns of templates will be the same; and, no matter who renders them, the templates themselves belong to the frontend of the webapp.

One last point to mention before we move on to state management: while in the examples above it is clear what the buttons do, from an implementation perspective, it is necessary to make the buttons perform the appropriate actions when being clicked. This means that the templates need to place the correct *event handlers* inside the buttons, so that when a button is clicked, the right operation is performed. While there are many ways to do this, a common way to do this is through function calls. For example:

```
┌──╌ Stopwatch app template ╌──────────────────────────────┐
│                                                          │
│                   Stopwatch                              │
│                                                          │
│                 {ELAPSED_TIME}                           │
│                                                          │
│             {IF CLOCK IS STOPPED}                        │
│            ┌────────────────────────┐                    │
│            │        START           │                    │
│            │ {onclick: start_clock} │                    │
│            └────────────────────────┘                    │
│                                                          │
│             {IF CLOCK IS RUNNING}                        │
│  ┌────────────────────────┐   ┌───────────────────────┐  │
│  │          PAUSE         │   │         STOP          │  │
│  │ {onclick: pause_clock} │   │ {onclick: stop_clock} │  │
│  └────────────────────────┘   └───────────────────────┘  │
│                                                          │
│             {IF CLOCK IS PAUSED}                         │
│  ┌────────────────────────┐   ┌───────────────────────┐  │
│  │          START         │   │         STOP          │  │
│  │ {onclick: start_clock} │   │ {onclick: stop_clock} │  │
│  └────────────────────────┘   └───────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

In the example above, `onclick` is the event registered when the user clicks on the button. The event handler is the function associated with each `onclick`, for example: `start_clock`, `pause_clock` and `stop_clock`. These will all be JS functions.

An alternative way to do this is to simply add a link for each action you want to perform. In this way, each action will trigger a page refresh, and the server will be completely in charge of updating the application.

```
┌──╌ Stopwatch app template, with links  ╌─────────────────┐
│                                                          │
│                   Stopwatch                              │
│                                                          │
│                 {ELAPSED_TIME}                           │
│                                                          │
│             {IF CLOCK IS STOPPED}                        │
│            ┌───────────────────────────┐                 │
│            │        START              │                 │
│            │ {onclick: app.com/start}  │                 │
│            └───────────────────────────┘                 │
│                                                          │
│             {IF CLOCK IS RUNNING}                        │
│  ┌─────────────────────────┐   ┌────────────────────────┐│
│  │          PAUSE          │   │         STOP           ││
│  │ {onclick: app.com/pause}│   │ {onclick: app.com/stop}││
│  └─────────────────────────┘   └────────────────────────┘│
│                                                          │
│             {IF CLOCK IS PAUSED}                         │
│  ┌─────────────────────────┐   ┌────────────────────────┐│
│  │          START          │   │         STOP           ││
│  │ {onclick: app.com/start}│   │ {onclick: app.com/stop}││
│  └─────────────────────────┘   └────────────────────────┘│
│                                                          │
└──────────────────────────────────────────────────────────┘
```

This is how the first webapps were implemented. To this day, some webapps have some actions that are implemented like this. When the user clicks on a button, the page is refreshed and the server returns a new HTML with the updated UI.

Enough about templates. Let's go onto state management!

If **templates** allow you to implement the *static* aspect of an UI (how the app looks at a given point in time), **state management** allows you to implement the *dynamic* aspect of an UI (how to change the UI to reflect a change in the state). State management, from the perspective of the UI, is the part of the app that has the responsibility of updating the UI when the state changes.

Talking about *state management* might sound overcomplicated. After all, one could simply update the entire UI whenever the state changes!

```
initial UI -> user interaction #1 -> state change #1 -> UI reflecting state #1
```

And you'd be right. If you update the entire UI whenever there's a change in the state, you will not need state management. But this is usually not desirable, for two reasons:

1. Performance: updating the entire UI can take a long time in many apps with lots of components.
2. User experience: with constant page renderings, some features become hard or even impossible to use, such as inputs or the scrollbar, because each interaction freezes the app.

For a simple application like the stopwatch, you can get away with updating the entire UI every single time the state changes. With a todo list app, probably not; with more complex and real apps, it will be impossible. That's where state management comes in, helping determine which parts of the page should be updated.

Going back to the example of the stopwatch, let's recall what are the two elements of the state:

- Elapsed time.
- State of the clock: stopped, running or paused.

The possible changes to the state of the stopwatch are:
- Change in the elapsed time.
- Change in the state of the clock.

The elapsed time only affects the part of the stopwatch that shows the elapsed time, but not the buttons! Conversely, a change of the state of the clock changes which buttons are displayed, but not the elapsed time. If we add state management to our template, it could look like this:

```
┌╌ Stopwatch app template with state management ╌┐
│                                                │
│                   Stopwatch                    │
│                                                │
│    ┌──╌ Update when elapsed time changes ╌─┐   │
│    │                                       │   │
│    │           {ELAPSED_TIME}              │   │
│    │                                       │   │
│    └───────────────────────────────────────┘   │
│                                                │
│    ┌──╌ Update when state of clock changes ╌─┐ │
│    │                                         │ │
│    │         {IF CLOCK IS STOPPED}           │ │
│    │              ┌─────────┐                │ │
│    │              │  START  │                │ │
│    │              └─────────┘                │ │
│    │                                         │ │
│    │         {IF CLOCK IS RUNNING}           │ │
│    │      ┌─────────┐      ┌────────┐        │ │
│    │      │  PAUSE  │      │  STOP  │        │ │
│    │      └─────────┘      └────────┘        │ │
│    │                                         │ │
│    │         {IF CLOCK IS PAUSED}            │ │
│    │      ┌─────────┐      ┌────────┐        │ │
│    │      │  START  │      │  STOP  │        │ │
│    │      └─────────┘      └────────┘        │ │
│    └─────────────────────────────────────────┘ │
│                                                │
└────────────────────────────────────────────────┘
```

The ability to define parts of the UI as dependent on one or more parts of the state is critical to the building of UIs. By explicitly stating that a certain part of the app depends on a certain part of the state, two things are achieved:

1. Clarity about when things are updated.
2. Possibility of using an uniform approach for updating parts of the UI.

The first advantage allows for a greater understanding of the app by those who maintain it. The second advantage, *uniform approach*, means that an utility function, or perhaps a larger tool (like a library or framework) can be tasked with updating parts of the app when the state changes. This can make our code simpler and shorter.

The alternative to an uniform approach is to define specific functions to update certain parts of the app, for example:
- `update_clock`: updates the elapsed time.
- `update_buttons`: updates the buttons.

Whenever the elapsed time changes, `update_clock` is called. Whenever the state of the clock is changed, `update_buttons` is called. This approach requires us to do two things instead:

1. Define a function for each part of the app that needs to change.
2. Call that function whenever the relevant part of the state changes.

Defining specific functions for specific parts of the app, and calling the right one when the state changes, can quickly become unmaintainable, for two reasons:

1. Each component or sub-component of the app usually depends on one or more parts of the state. This means that if there is a change in one of the parts of the state on which the component depends, the component must be updated.
2. A user interaction can change multiple parts of the state.

Because of these two facts, you end up having to determine a list of components or sub-components that are modified by each user interaction, and create a custom function to update those components. If you have M components and sub-components that each rely on average on N parts of the state, you have M\*N dependencies that you need to track. If a user interaction modifies P parts of the state, then you need to go through the M\*N dependencies for each of these parts of the state, and make sure to update those components. With each extra dependency, you have to modify several parts of the code. In practice, the complexity and the length of the app increases *quadratically* rather than *linearly* as you add features.

It is surprising to see how quickly this can happen in apps with relatively simple UIs. We'll see more about this *quadratic drift* in the second part of this tutorial.

We're now almost done with the first part of this tutorial! The last chapter awaits. In it, we will explore the role of JavaScript in webapps.

### Chapter 8: JS and web frameworks

JavaScript, most commonly known as JS, is a programming language. JS is available on almost every browser and is nowadays used by practically all webapps.

In this chapter, we will understand how JS emerged, how it is useful in webapps, and how it is commonly used.

The first browsers had no JS. They simply loaded HTML pages that were fully static. In these static HTML pages, the only interaction a user could do was to click on a link, which would then take them to another page.

JS was developed in the mid-1990s as a [scripting language](https://en.wikipedia.org/wiki/Scripting_language) to add dynamic aspects to web pages. Initially developed for Netscape, JS soon found its way to Internet Explorer. Thus, JS became available in the two most popular browsers of that time. Eventually, JS became a web standard and is today available on almost every browser.

Early on, a typical feature enabled by JS was validation of inputs in forms. If a page required you to enter an email (for example), and you entered an address that has no `@` sign, JS could add a nice message next to the field so that you could correct it before submitting the data.

```
┌╌ Form validation with JS ╌─────────────────┐
│                                            │
│                                            │
│       Enter your email                     │
│       to receive our newsletter!           │
│                                            │
│       ┌───────────────────┐                │
│       │  my_email.com     │                │
│       └───────────────────┘                │
│                                            │
│        Error: please enter                 │
│        =====  a valid email address        │
│                                            │
│            ┌──────────┐                    │
│            │  SUBMIT  │                    │
│            └──────────┘                    │
└────────────────────────────────────────────┘
```

JS became widely used in webpages for other purposes as well, such as animations and more complex user interactions. JS' breakthrough, however, happened only in the mid-2000s, with [Ajax](https://en.wikipedia.org/wiki/Ajax_(programming)).

As we said above, the chief interaction a user could have with a static web page was to click on a link, which would take them to another page. Submitting a form was just a special case of the same phenomenon. In short, every interaction the user had with the page triggered a *page refresh*, taking the user to another page. As useful as the web was back then, the constant page refreshes had three drawbacks:

1. **Performance**: it took some time to retrieve the full page from the server (the internet was also much slower back then), and then some more time to re-render the page in the browser.
2. **Abrupt transitions**: page transitions blanked the browser, especially if the connection was slow. Users had to wait for a while and hope that the webapp would come back after the page refresh.
3. **Generic error page if the connection was lost**: if the connection was lost during a page refresh (which happened much more often back then), the browser would show a generic error page (such as "Connection Error - The Page You Requested Is Unavailable"). If the page refresh was triggered by submitting a form, this data would be lost. In short, the webapp was completely gone if the connection had an issue.

For all of these reasons, early webapps were rudimentary. But then Ajax came along, enabling modern webapps powered by JS. Boiled down to its essence, **Ajax** is *the use of JS to retrieve new data from the server and update the UI **without requiring a page refresh**.*

```
Without Ajax, successful submission:

┌╌ Form page ╌───────────────────────────────┐
│                                            │
│                                            │
│       Enter your email                     │
│       to receive our newsletter!           │
│                                            │
│       ┌───────────────────┐                │
│       │  mono@email.com   │                │
│       └───────────────────┘                │
│                                            │
│                                            │
│            ┌──────────┐                    │
│            │  SUBMIT  │                    │
│            └──────────┘                    │
└────────────────────────────────────────────┘
                   |
                   |
                   v
┌╌ Blank page ╌──────────────────────────────┐
│                                            │
│                                            │
│                                            │
│                                            │
│                                            │
│                                            │
│                                            │
│                                            │
│                                            │
│                                            │
└────────────────────────────────────────────┘
                   |
                   |
                   v
┌╌ Confirmation page ╌───────────────────────┐
│                                            │
│                                            │
│       Thank you!                           │
│                                            │
│       You'll be receiving our newsletter   │
│       very shortly.                        │
│                                            │
│                                            │
│                                            │
│                                            │
│                                            │
└────────────────────────────────────────────┘


With Ajax, successful submission:

┌╌ Form page ╌───────────────────────────────┐
│                                            │
│                                            │
│       Enter your email                     │
│       to receive our newsletter!           │
│                                            │
│       ┌───────────────────┐                │
│       │  mono@email.com   │                │
│       └───────────────────┘                │
│                                            │
│                                            │
│            ┌──────────┐                    │
│            │  SUBMIT  │                    │
│            └──────────┘                    │
└────────────────────────────────────────────┘
                   |
                   |
                   v
┌╌ Confirmation page ╌───────────────────────┐
│                                            │
│                                            │
│       Thank you!                           │
│                                            │
│       You'll be receiving our newsletter   │
│       very shortly.                        │
│                                            │
│                                            │
│                                            │
│                                            │
│                                            │
└────────────────────────────────────────────┘


Without Ajax, in case of an error:

┌╌ Error page ╌──────────────────────────────┐
│                                            │
│                                            │
│                                            │
│             CONNECTION LOST                │
│        The page you requested is           │
│                unavailable                 │
│                                            │
│                                            │
│                                            │
│                                            │
└────────────────────────────────────────────┘

Without Ajax, in case of an error:

┌╌ Error page within the app  ╌──────────────┐
│                                            │
│                                            │
│       Enter your email                     │
│       to receive our newsletter!           │
│                                            │
│       ┌───────────────────┐                │
│       │  mono@email.com   │                │
│       └───────────────────┘                │
│                                            │
│        Error: an issue occurred.           │
│        =====  Could you try again?         │
│                                            │
│            ┌──────────┐                    │
│            │  SUBMIT  │                    │
│            └──────────┘                    │
└────────────────────────────────────────────┘

```

The three advantages of Ajax are precisely the lack of the problems generated by page refreshes:

1. **Better performance**: if a page is already loaded, it is faster to retrieve new data and update it on the page than to retrieve the entire page (with all the associated HTML, CSS and JS) from the server.

2. **Seamlessness of transitions**: page changes can be much smoother visually if only parts of the page change.

3. **Offline ability**: if the network connection (or the server) is down, instead of losing all state, the page can hold its state, warn the user, and attempt to communicate with the server until the connection is restored. Also as important, the page can be saving state to the server constantly without the user having to submit data and waiting for a reload.

While webapps were possible before Ajax, Ajax allowed webapps to start competing with native apps in terms of the user experience they offered, at least in certain domains. This tendency has kept on going over the past fifteen years, although much more in the desktop than in mobile devices (in mobile devices, native applications still hold considerable advantages over webapps).

Ajax works thanks to a feature of JS that allows the browser to interchange data with the server without triggering a page request. Ajax, then, is fully dependent on JS.

Let's explore how this would work in our todo list app, when entering a new todo.

```
  ┌──╌ Todo list app ╌────────────────┐
  │                                   │
  │         ┌──────────────┐          │
  │         │ Explain Ajax │          │
  │         └──────────────┘          │
  │      ┌───────────────┐            │
  │      │  CREATE TODO  │            │
  │      └───────────────┘            │
  │                                   │
  │      LIST OF TODOS:               │
  │                        ┌────────┐ │
  │      - Write tutorial  │ DELETE │ │
  │                        └────────┘ │
  │                                   │
  │                        ┌────────┐ │
  │      - Bake birthday   │ DELETE │ │
  │        cake            └────────┘ │
  │                                   │
  │                                   │
  └───────────────────────────────────┘
```

In the example above, there are already two todos present, and we're about to enter a third one, `Explain Ajax`. At this point, we need to send the new todo from the client to the server. Without Ajax, this would happen through submitting data and a subsequent page refresh. But with Ajax, it can be done like this:

```
  ┌──╌ Todo list app ╌────────────────┐
  │                                   │
  │         ┌──────────────┐          │
  │         │ Explain Ajax │          │
  │         └──────────────┘          │
  │      ┌───────────────┐            │
  │      │  CREATE TODO  │            │
  │      └───────────────┘            │
  │                                   │
  │      LIST OF TODOS:               │
  │                        ┌────────┐ │
  │      - Write tutorial  │ DELETE │ │
  │                        └────────┘ │
  │                                   │
  │                        ┌────────┐ │
  │      - Bake birthday   │ DELETE │ │
  │        cake            └────────┘ │
  │                                   │
  │                                   │
  └───────────────────────────────────┘
                  |
                  |
                  v
          A JS function in the
          client sends the new
          todo item to the server
                  |
                  |
                  |
                  v
          The server acknowledges
          the receipt of the
          new todo item
                  |
                  |
                  |
                  v
          JS updates the UI
                  |
                  |
                  |
                  v

  ┌──╌ Todo list app ╌────────────────┐
  │                                   │
  │         ┌──────────────┐          │
  │         │ |            │          │
  │         └──────────────┘          │
  │      ┌───────────────┐            │
  │      │  CREATE TODO  │            │
  │      └───────────────┘            │
  │                                   │
  │      LIST OF TODOS:               │
  │                        ┌────────┐ │
  │      - Write tutorial  │ DELETE │ │
  │                        └────────┘ │
  │                                   │
  │                        ┌────────┐ │
  │      - Bake birthday   │ DELETE │ │
  │        cake            └────────┘ │
  │                                   │
  │                        ┌────────┐ │
  │      - Explain Ajax    │ DELETE │ │
  │                        └────────┘ │
  │                                   │
  └───────────────────────────────────┘
```

Along with its new power, Ajax also received more responsibility. Here's the things that JS must do to implement an interaction without a page refresh:

1. Send a request to the server.
2. Receive a response from the server and process it (for example: everything went well, or was there an error?).
3. Update the HTML to reflect the change in the state.

Before Ajax, none of these tasks were necessary. The browser submitted the data as an HTML form and refreshed the page; it was then the server's responsibility to determine whether everything went OK or not, and to create the new HTML page from scratch.

The extra complexity of the client, however, was worth the quantum leap in user experience. And so Ajax became widespread. In its wake, a group of JS frameworks made its appearance. These frameworks, fully written in JS, provided functions to simplify communication with the server and update the UI by updating the HTML on the page. These frameworks also provided cross-browser compatibility, at a time where there were still very large incompatibilities among major browsers.

Interestingly enough, to include one of these JS frameworks is as easy as adding a JS script before the script with the client code.

```
<script src="jquery.js"></script>
<script src="frontend.js"></script>
```

In the example above, [jQuery](https://en.wikipedia.org/wiki/jQuery), one of the first JS frameworks and still one of the most popular ones, is loaded. After that, the frontend code of the app is loaded in the file `frontend.js`.

Nowadays, there are more powerful (and complex) ways of loading JS libraries. However, they still boil down to JS files being loaded by the browser.

JS, Ajax and the first generation of JS frameworks grew hand in hand in the second half of the 2000s. Some webapps already started to boast complex and high-quality UIs. For many teams, however, the complexity of the client became problematic. Most of the problems were related to two basic concerns:

1. **Generating HTML to update the page**: as we said above, after an Ajax interaction, the page usually needs to be updated. This requires us to generate HTML that reflects the updated page. HTML is text, so it is possible to create HTML by putting together strings. But this is time consuming and error-prone, because it doesn't use templates or other abstractions that can better express how the HTML should be produced.
2. **Updating certain parts of the page at the right time**: after an Ajax interaction, some parts of the page have to be updated. To decide which parts should be updated, and based on which information, is also something that becomes complex if implemented on a case-by-case basis.

The two basic concerns might sound quite familiar to you. Indeed, we have covered them in chapter 7! They are **templating** and **state management**. To deal with them, web frameworks emerged in the late 2000s and early 2010s. These frameworks offered their own solution to these two concerns. Some of these frameworks were **server-side**, which means that all the templating and some of the state management happened in the server. In practice, this means that the updated parts of the page are generated in the server and then put in place by JS. These frameworks are powered by other programming languages, such as PHP, Ruby or Python.

Other frameworks, in contrast, were **client-side**. This means that these frameworks are 1) written in JS; and 2) perform their operations in the browser, not the server. Client-side frameworks appeared to solve these two main concerns strictly in the client. The first framework of this kind was [Angular](https://en.wikipedia.org/wiki/AngularJS), developed by Google and first released in 2010. It was followed by [React](https://en.wikipedia.org/wiki/React_(JavaScript_Library)), developed by Facebook and first released in 2013. Both frameworks are widely used and others have followed in their steps.

Server-side and client-side web frameworks continue to exist and evolve to the present day. Yet, no matter how it is implemented, almost all contemporary webapps are powered by Ajax and JS.

This chapter concludes our conceptual introduction to web applications. If you've made it this far, congratulations!

In the second part of the tutorial, we switch to a hands-on approach and start building a few simple webapps. Through those examples, we'll come to understand better a few fundamental problems of frontend development that seem to emerge in almost all webapps, as well as how gotoB solves them.

## Part 2: deriving gotoB

Originally, this part of the tutorial was going to be about how to develop a frontend with gotoв. But eventually we decided instead to do something different: start developing small apps with no tools at all, and **understand firsthand the raw problems we face when implementing a frontend**. We then slowly introduce gotoв to solve some of these problems for us. In this way, we first aim to understand fully the problems we encounter, rather than covering them up with a solution. We also hope this approach will make both the tutorial and gotoв itself far easier to understand and remember.

### Chapter 1: setting up the basics

Let's start by setting up the basics of an app. You only need the following:

- A computer.
- A text editor.
- A web browser.

#### Step 1-1: create a folder to contain the files of your application

You can call it `app` - put this folder somewhere where you can easily find it later.

#### Step 1-2: create a base HTML file ([HTML](1-2.app.html))

As we saw in chapter 6 of part 1, all webapps start with a single HTML file that is loaded by the browser. We will now write this base HTML file.

With your text editor, create a new file named `app.html` within the work folder you created on Step 1-1. In it, place the following content:

```html
<!DOCTYPE HTML>
<html>
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <link rel="stylesheet" href="https://unpkg.com/tachyons@4.12.0/css/tachyons.min.css"/>
   </head>
   <body>
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
6. Inside the head there's a `<link>` tag which an loads an external CSS file called [Tachyons.io](https://tachyons.io). While this is not strictly necessary, it is extremely useful because it 1) makes CSS behavior more consistent across different browsers (leveraging [Normalize.css](https://necolas.github.io/normalize.css/)) and 2) gives us CSS classes with which we can build a decent-looking UI without writing our own CSS.
7. Inside the body there's a `<script>` tag. This tag loads our application, which is a JS file.

This HTML will load two files in total:
- A CSS stylesheet (Tachyons.css), hosted by [unpkg](https://unpkg.com).
- A js file containing the code of the application. Unlike the CSS file above, this file is stored in your disk and loaded from disk by the browser.

Remember: all of these files are just text files, interpreted in a certain way by the browser.

#### Step 1-3: create a js file to contain the code for the application ([HTML](1-3.app.html) [JS](1-3.app.js))

In the same folder, create an empty file named `app.js`. All our application logic will go here.

#### Step 1-4: start your app!

After this is done, open the HTML file in your browser. You can do this by right clicking the HTML file on the file manager and opening it with your browser. You should see an empty page. Keep this page open! Every time we complete a step, you can go back to the page, refresh it, and see your changes.

#### Step 1-5: Hello World ([HTML](1-5.app.html) - [JS](1-5.app.js))

If you want to add a simple greeting, the simplest way to do it is by modifying the HTML file. Open `app.html` and change the `<body>` tag to the following:

```html
   <body>
      <h1>Hello world!</h1>
      <script src="app.js"></script>
   </body>
```

After refreshing the page, you should see the message `Hello world!`.

Note we still haven't done anything with our JS file. In the next chapter, we will start using JS to modify the interface, when we create our next application: the counter.

### Chapter 2: the counter

The counter app is perhaps the simplest application that can be conceived (our Hello World example in the previous chapter cannot really be considered an application, since it lacks both state and logic). The counter is composed of two elements:

1. A counter that shows a number.
2. A button that, when pressed, increases the counter by one.

Simple as it is, there are interesting things to be learned and noticed when we implement this app.

#### Step 2-1: placing the elements in HTML ([HTML](2-1.app.html) - [JS](2-1.app.js))

Let's start with the HTML structure. We want three elements:

1. A title that says "Counter". We can put it in a `<h1>` tag.
2. A text that shows the current value of the counter. We can put it in a `<p>` tag.
3. A button that increases the counter. For this, we will use a `<button>`.

Here's how the HTML will look:

```html
<h1>Counter</h1>
<p>Counter is 0</p>
<button>Increase counter</button>
```

We will now open `app.html` and add those three tags to the `<body>`, before the `<script>` tag. In case you were wondering, we will always place all the `<script>` tags at the bottom of the `<body>`.

If you refresh the page, you'll see that all three elements will be already there. However, you may quickly notice that the "Increase counter" button doesn't do anything when we click on it. We indeed to implement the logic that increases the value in the counter. For this, we will use JS.

#### Step 2-2: increasing the counter, design ([HTML](2-2.app.html) - [JS](2-2.app.js))

Increasing the counter is a three step process:

- Figure out what the current value of the counter.
- Add one to that value.
- Update the HTML to show the updated value of the counter.

Since HTML is not a programming language, it doesn't give us the ability to write logic of any sort. For this reason, all of these steps will take place in JS.

We will define a function `increaseCounter` that will contain this logic. For now, it will be an empty function:

```javascript
var increaseCounter = function () {
}
```

We also need to call this function when the `<button>` is clicked. We will modify the `<button>` in the HTML file to the following:

```html
<button onclick="increaseCounter ()">Increase counter</button>
```

Note that the only change we did was to add an `onclick` handler. The `onclick` handler contains the logic that will be executed when the button is clicked. In this case, it merely invokes the function `increaseCounter`, which we just defined as an empty function.

#### Step 2-3: increasing the counter, extraction ([HTML](2-3.app.html) - [JS](2-3.app.js))

JS needs first to *extract* the current value of the counter from HTML. JS can find the value inside the `<p>` element. For example, at the beginning, the `<p>` will have as text `Counter is 0`. We're only interested in the last part of this text, the `0`.

First, let's retrieve the contents of `<p>` and place it in a variable. To find the `<p>` element, we use the function `document.getElementsByTagName`. This function will bring *all* the `<p>` elements; but since we only have one `<p>` in our app, we can easily find it.

Add the following lines to `app.js`, inside `increaseCounter`:

```javascript
var p = document.getElementsByTagName ('p');
p = p [0];
```

In the first line, we will put a list of all the `<p>` elements into a variable named `p`. In the second line, we will set `p` to the *first* element of that list only - this can only be the only `<p>` contained in the document.

Now, we will extract the contents of `<p>` with the `innerHTML` function. Add the following line to `app.js`:

```javascript
var counterText = p.innerHTML;
```

Now, `counterText` will be a string that says `'Counter is 0'`. You can check this by printing `counterText` to the developer console, by adding the line `console.log (counterText);`. When you open the [developer console](https://developer.chrome.com/docs/devtools/open/) of your browser, you'll see the text being printed.

**Side note**: printing the values of variables to the console is an essential tool when developing programs, since it gives you feedback and the ability to know if you're onto the right track.

We now need to extract the `0` from the string. There are many ways to do this, but we'll choose the following one: split the text into words using the `split` function, then getting the third word.

```javascript
var words = counterText.split (' ');
var counterValue = words [2];
```

If you add these two lines to `app.js`, the `counterValue` variable will contain just a `'0'`. The first line splits the text into three words (`'Counter'`, `'is'` and `'0'`); the second one simply takes the third one into a new variable `counterValue`. Notice that since in JS the first element of a list has an index of `0`, the third one has an index of `2` - otherwise, we would have written `words [3]` instead of `words [2]`.

#### Step 2-4: increasing the counter, sum ([HTML](2-4.app.html) - [JS](2-4.app.js))

Before we add one to `counterValue`, we need to transform it into a number. Right now, while it looks a lot like a number, it is still a string. For transforming it into a number, we use the `parseInt` function.

```javascript
counterValue = parseInt (counterValue);
```

We can now add one to it.

```javascript
counterValue = counterValue + 1;
```

#### Step 2-5: increasing the counter, updating the HTML ([HTML](2-5.app.html) - [JS](2-5.app.js))

Now that we have the updated value of the counter in `counterValue`, we need to update the value in the `<p>` element. We can do this by updating the `innerHTML` property of `<p>`.

```javascript
p.innerHTML = 'Counter is ' + counterValue;
```

And voilà! We have now a fully functioning counter application. Give it a try by clicking the button and seeing how the value goes up.

#### Step 2-6: simplifying our logic by putting state in JS ([HTML](2-6.app.html) - [JS](2-6.app.js))

You might have noticed that extracting the current value from the counter was the thing that required the most of the effort of the implementation. Out of the eight lines in our function, six were related to this!

A simpler and cleaner implementation can rely on storing the value for the counter in JS as well as in HTML. To do this, you can define a `counterValue` variable outside the `increaseCounter` function.

```javascript
var counterValue = 0;

var increaseCounter = function () {
   var p = document.getElementsByTagName ('p');
   p = p [0];
   counterValue = counterValue + 1;
   p.innerHTML = 'Counter is ' + counterValue;
}
```

Note that we first set `counterValue` to 0. `increaseCounter` then only needs to add one to `counterValue`, and then update the HTML. We still need to find the `<p>` element in order to update its value. Still, `increaseCounter` now is 50% shorter than our original version.

As a general rule, it is wise to move the state of the application from HTML to JS. Because we will use JS to update the page, it is only natural to let it store and manage the state of the application. From now on, we will do exactly this.

#### Step 2-7: taking stock

Simple as it is, the counter app exposed us to several fundamental concepts of the frontend:

- We initialized a view in HTML: in this case, it was composed of a title, a paragraph and a button.
- We bound an HTML element (the button) to a function (`increaseCounter`) through an *event handler*.
- We defined a function that extracted information from the HTML, processed it, and modified the HTML.
- We simplified that function by storing data on JS itself, rather than on HTML.

We'll now move on to a more complex app, a todo list!

### Chapter 3: the todo list

In this chapter we will explore how to build a simple todo list app. This app will bring two new challenges:

1. Create HTML using JS.
2. Storing and retrieving data in the browser's [local storage](https://en.wikipedia.org/wiki/Web_storage#Local_and_session_storage), so that the todos persist after refreshing the page.

#### Step 3-1: placing the elements in HTML ([HTML](3-1.app.html) - [JS](3-1.app.js))

As with the counter, let's start by placing the HTML structure. We want three elements:

1. A title that says "Todo list". We can put it in a `<h1>` tag.
2. The todo items themselves. We can put each of them in a `<p>` tag. We will also want a `<button>` next to each of them, to mark them as complete and remove them from the list.

Here's how the HTML will look:

```html
<h1>Todo list</h1>
<p>Write tutorial</p><button>Mark as complete</button>
<p>Play civ2</p><button>Mark as complete</button>
```

You may note however that there's something different in this app. Namely, that the todo items are dynamic and will change. Not only we don't know what the todo text will be, we don't even know *how many* todos can be present at one time. For this reason, we cannot put the todos directly in `app.html`. The only part we can put is the title. The items themselves must be placed there by our JS code.

We will set up a `<div>` to contain the todos that will be created by JS. To make it easier to locate, we will set an `id` attribute on the `<div>`. For now, this `<div>` will be empty. Here's then the elements we'll add to the HTML `<body>`:

```html
<h1>Todo list</h1>
<div id="todos"></div>
```

#### Step 3-2: creating a todo list ([HTML](3-2.app.html) - [JS](3-2.app.js))

Taking a page from the last chapter, we will directly place our list of todos in JS itself. We can conceive of each todo as a single string, containing the description of the todo itself. To store a list of todos, we can simply use an array with strings. For example:

```javascript
var todoList = ['Write tutorial', 'Play civ2'];
```

Eventually we will want to load and save this list so that it persists when the page is refreshed. But for now, we will just keep it there in JS, until we figure out how to place these items on the HTML itself.

#### Step 3-3: putting the todos in the page with JS ([HTML](3-3.app.html) - [JS](3-3.app.js))

Because the list of todos will change, we need to add the todo items to the page using JS. We cannot do this in HTML because HTML doesn't have logic, and hence cannot implement the notion of "creating one element per todo in the list" - that is, it cannot create a loop that iterates through a list of elements.

To place the todos in the page, we first need to decide what the HTML for a given todo element should be. Earlier on step 3-1, we decided to show each todo as a combination of a `<p>` and a `<button>`. We can place this logic into a function that will return the HTML for a given todo.

```javascript
var makeTodo = function (task) {
   return '<p>' + task + '</p><button>Mark as complete</button>';
}
```

`makeTodo` returns a string containing HTML. Note how this function takes a single argument, `task`, which is the description of the todo. We use this argument (which should be a string) and put it inside the `<p>` element. The `<button>`, for now, does nothing.

We can go through each of the elements of the list to make an HTML string for all the todos. Let's see how.

```javascript
var allTodos = '';

todoList.map (function (task) {
   allTodos = allTodos + makeTodo (task);
});
```

We start by first creating an empty string, `allTodos`, which will contain the HTML string with all the todos. We then use the `map` function to go through each of the elements in `todoList`. For each of them, we get their corresponding HTML by calling `makeTodo`; we then add the result of calling `makeTodo` to the end of the `allTodos` string.

By now, `allTodos` will be a string with the following HTML: `'<p>Write tutorial</p><button>Mark as complete</button><p>Play civ2</p><button>Mark as complete</button>'`. Not very pretty, but if we put it in the `<div>` we created to hold the todos, we can see what it looks like!

```javascript
document.getElementById ('todos').innerHTML = allTodos;
```

To find the `<div>` where we want to put the todos, we used the `getElementById` function. Then, we set the `innerHTML` property of it to `allTodos`. As a result, we now see the two todos on the screen, with their corresponding buttons.

#### Step 3-4: improving HTML generation ([HTML](3-4.app.html) - [JS](3-4.app.js))

Let's suppose now that we had a different set of todos:

```javascript
var todoList = ['Write tutorial', 'Play civ2', 'Improve <button> look in todo app'];
```

If you open the page, you'll see that the HTML for the third todo looks odd. The reason is that the `<button>` text inside the third task was actually interpreted as HTML!

```html
<p>Improve <button> look in todo app</p><button>Mark as complete</button>
```

To actually display `<button>` as text, rather than an HTML element, the opening and closing angle brackets (`<` and `>`) must be *escaped* - that is, replaced by other characters that, when put in the page, will be shown as angle brackets.

To escape special characters (such as angle brackets) properly, we need to create a function to do that. However, here we will use one of gotoв's dependencies, lith, to create the HTML for us. Besides escaping special characters, lith does two more things for us:

- Closes only those HTML tags that need closing. So far, all the tags we've seen require a closing tag (for example, `<button>` is closed with `</button>`). However, some tags that are often used, such as `<img>` or `<input>`, should not be closed.
- It prevents string concatenation from getting too hairy. lith allows us to express HTML using arrays (which are lists of elements). This allows for both cleaner and less error-prone code.

To add lith, we need first to require gotoв. To do this, we can simply add the following line to the HTML:

```html
<script src="../gotoB.min.js"></script>
```

Note that we're requesting the file `gotoB.min.js` which is one folder above the tutorial's folder. If your gotoв file is somewhere else, the `src` attribute should point there instead.

The `<body>` of the HTML will now look like this:

```html
<body>
   <h1>Todo list</h1>
   <div id="todos"></div>
   <script src="../gotoB.min.js"></script>
   <script src="app.js"></script>
</body>
```

If everything goes well, the global variable `lith` will now contain the entire lith library. We can now modify `makeTodo` as follows:

```javascript
var makeTodo = function (task) {
   return lith.g ([
      ['p', task],
      ['button', 'Mark as complete']
   ]);
}
```

We use the function `lith.g` to *g*enerate the HTML string for us. Note we pass to it an array with two elements: `['p', task]`, and `['button', 'Mark as complete']`. As you might have guessed, each of these stands for an HTML tag. The first element of each is the tag itself (`'p'` and `'button'`), the second one is its contents.

#### Step 3-5: adding todo items ([HTML](3-5.app.html) - [JS](3-5.app.js))

We're now in a position to add items to the todo list! When adding a todo, we need to be sure to update both `todoList` *and* the HTML inside the `<div>`.

We'll start with a simple (and somewhat ugly) way of requesting the user for a todo: with a native `prompt`. We'll put the logic in a function called `addTodo`.

```javascript
var addTodo = function () {
   var todo = prompt ('What do you want to do?');
   todoList.push (todo);

   var allTodos = '';

   todoList.map (function (task) {
      allTodos = allTodos + makeTodo (task);
   });

   document.getElementById ('todos').innerHTML = allTodos;
}
```

The first two lines of the function are new. The first one asks the user to submit a todo. The second one puts the todo on the `todoList`. The rest of the lines, however, repeat the logic we wrote previously to create an HTML string with all the todos and then place it inside the `<div>`.

We could do better by grouping the logic for placing the HTML for the todos inside another function, `placeTodos`. Here's how the entire `app.js` would look like:

```javascript
var todoList = ['Write tutorial', 'Play civ2', 'Improve <button> look in todo app'];

var makeTodo = function (task) {
   return lith.g ([
      ['p', task],
      ['button', 'Mark as complete']
   ]);
}

var placeTodos = function () {
   var allTodos = '';

   todoList.map (function (task) {
      allTodos = allTodos + makeTodo (task);
   });

   document.getElementById ('todos').innerHTML = allTodos;
}

var addTodo = function () {
   var todo = prompt ('What do you want to do?');
   todoList.push (todo);
   placeTodos ();
}

placeTodos ();
```

Note how the last line of `app.js` is a call to `placeTodos`. This ensures that the todos will be shown when the page is loaded. Note also how `placeTodos` is called at the end of `addTodo`, to update the todos shown in the page.

We now only need to add a button to add a todo on the HTML page:

```html
      <button onclick="addTodo ()">Add todo</button>
```

This button, when clicked, will execute the `addTodo` function, which in turn will ask the user for the text of a new todo.

We can now successfully add todo items! Let's implement now the logic for removing them.

#### Step 3-6: deleting todo items ([HTML](3-6.app.html) - [JS](3-6.app.js))

As you may have guessed, we'll define now a `removeTodo` function to remove a todo from the list.

```javascript
var removeTodo = function (task) {
   todoList.splice (todoList.indexOf (task), 1);
   placeTodos ();
}
```

The way the function works is by finding the index of the first occurrence of a given todo inside `todoList`, using the `indexOf` function. Then, it removes it from `todoList`, passing the index to `splice`.

We now need to modify `makeTodo` so that when a button belonging to a todo is clicked, that todo is deleted. The way to do this is by putting `removeTodo` in the `onclick` handler of each `<button>`.

```javascript
var makeTodo = function (task) {
   var onclickHandler = 'removeTodo (' + JSON.stringify (task) + ')';

   return lith.g ([
      ['p', task],
      ['button', {onclick: onclickHandler}, 'Mark as complete']
   ]);
}
```

There's a lot going on here!
- First we create an `onclickHandler` variable, containing the string `'removeTodo ('`.
- As we did with `addTodo` earlier, we are creating the onclick handler to remove the todo. However, notice that instead of calling `removeTodo` without any arguments (`'removeTodo ()'`), we do need to pass the task itself, so that `removeTodo` will know *which* todo to remove!
- Rather than concatenating `task` directly, we first use `JSON.stringify` on it. This is a function that makes sure that any double quotes within `task` will be escaped. For example, if `task` were to be `'Remove all " characters from code'`, `JSON.stringify` will convert it to `'"Remove all \\" characters from code"'`. This is necessary, since otherwise our button functionality will be broken for this particular todo.
- We close the `onclickHandler` by closing the parenthesis.

Let's now jump to the `<button>`. Note that in between `'button'` and `'Mark as complete'`, we've added the following object: `{onclick: onclickHandler}`. When lith receives an object in between the tag and the contents, it considers it to be a list of attributes. In this case, the `onclick` attribute of the `<button>` element will have `onclickHandler` as its value. This will make the button actually work. Give it a try!

By now we have a fully functional todo app, where we can add and remove todos to our heart's content. The only problem left is that if we close or refresh the page, we will lose all the todos! In the next section, we'll implement functions for saving and loading todos onto the browser's local storage.

#### Step 3-7: loading and saving todos ([HTML](3-7.app.html) - [JS](3-7.app.js))

For loading and saving, we will create two functions, `loadTodos` and `saveTodos`.

```javascript
var todoList = [];

var loadTodos = function () {
   var loadedTodos = localStorage.getItem ('todos');
   if (loadedTodos) todoList = JSON.parse (loadedTodos);
}
```

We start by setting `todoList` to an empty array, instead of pre-filling it with some arbitrary todos. Then, we define `loadTodos`, which gets a key `'todos'` from the browser's local storage and places it onto `loadedTodos`. If the key already exists, we parse it with `JSON.parse` and place the resulting list of todos into `todoList`.

Finally, we invoke `placeTodos` to put the todos in the page.

Now, why do we use `JSON.parse` to get the list of todos? The reason is that local storage only allows to store *strings*, so if we store an array of todos, we need to convert it to a string first. Conversely, when loading the list, we need to convert the string back into an array of strings. This will become more clear when we see `saveTodos`:

```javascript
var saveTodos = function () {
   localStorage.setItem ('todos', JSON.stringify (todoList));
}
```

This function takes `todoList`, invokes `JSON.stringify` on it to make it into a string, and then sets the result onto the `todos` key. For these functions to work properly, we need to do

1. Invoke `saveTodos` at the bottom of `addTodo` and `removeTodo`. This ensures that every modification will be stored in local storage.
2. Invoke `loadTodos` just before `placeTodos`.

Here's how the entire `app.js` looks like:

```javascript
var todoList = [];

var makeTodo = function (task) {
   var onclickHandler = 'removeTodo (' + JSON.stringify (task) + ')';

   return lith.g ([
      ['p', task],
      ['button', {onclick: onclickHandler}, 'Mark as complete']
   ]);
}

var placeTodos = function () {
   var allTodos = '';

   todoList.map (function (task) {
      allTodos = allTodos + makeTodo (task);
   });

   document.getElementById ('todos').innerHTML = allTodos;
}

var addTodo = function () {
   var todo = prompt ('What do you want to do?');
   todoList.push (todo);
   placeTodos ();
   saveTodos ();
}

var removeTodo = function (task) {
   todoList.splice (todoList.indexOf (task), 1);
   placeTodos ();
   saveTodos ();
}

var loadTodos = function () {
   var loadedTodos = localStorage.getItem ('todos');
   if (loadedTodos) todoList = JSON.parse (loadedTodos);
}

var saveTodos = function () {
   localStorage.setItem ('todos', JSON.stringify (todoList));
}

loadTodos ();
placeTodos ();
```

So there it is! In six functions, we have enabled an entire todo list app that will retain its information upon refreshing. While this is still yet too simple to be a real app, it's starting to get quite close to being one.

We can group our functions by the type of work they do:

- **Generate HTML**: `makeTodo`.
- **Update the HTML in the page**: `placeTodos`.
- **Update the state**: `addTodo`, `removeTodo`.
- **Load/save the state**: `loadTodos`, `saveTodos`.

You might have noticed that a lot of the functions now need to call each other. For example `addTodo` and `removeTodo` both invoke `placeTodos` and `saveTodos`. For now, this is manageable, but in a more complex app this will become harder to implement and to understand. The essential problem is that of making sure that any changes are reflected both in the HTML and in the state. We'll see more of this problem in the chapters that follow.

#### Step 3-8: taking stock

The todo list app exposed us to two more fundamental concepts of the frontend:

- The need to generate our app's HTML using JS, since the HTML depends on the state.
- Loading and saving the state to persistent storage.

In this chapter, one of gotoB's dependencies (lith) made its appearance. This tool allows us to generate HTML using js, while avoiding three issues: string concatenation getting hairy, closing the right tags, and escaping special characters.

It's time to celebrate the completion of our todo app and move to our next app, the shopping cart!

### Chapter 4: the shopping cart

In this chapter we will explore how to build a shopping cart. This app will bring the following challenges:

1. Retrieving information asynchronously.
2. Switching between two views: main view & product detail.
3. Handling multiple user inputs.

#### Step 4-1: placing the elements in HTML ([HTML](4-1.app.html) - [JS](4-1.app.js))

In this app we will need two views:

1. One for listing all the products and showing the cart itself.
2. Another view for showing the details of a particular product.

There's two ways to structure the HTML to implement a couple of views:

1. We can create one `<div>` per view and hide the `<div>` that corresponds to the non-active view. When the view changes, we hide the visible `<div>` and show the hidden one.
2. We can just have a single `<div>` and only put the active view inside it. When the view changes, we eliminate its contents and replace them with that of the new view.

We'll take the second approach, simply because it makes for a simpler HTML structure (one `<div>` instead of two).

The HTML body will contain the following element:

```
<div id="main"></div>
```

Notice we put an `id` of `main` to the `<div>` so that we can easily find it and change its contents when needed.

#### Step 4-2: the (fake) server ([HTML](4-2.app.html) - [JS](4-2.app.js))

In the interest of getting as close to reality as possible, we will write a (fake) server that will return a list of products. In addition to providing product information, this server will also store our shopping cart. In reality, the list of products will be hardcoded in a JS file, and the shopping cart will be stored in the browser's local storage.

However artificial, this server allows us to interact with functions that both load and save data through an asynchronous process, which is exactly how it happens in real life webapps.

The fake server will expose three routes: `GET /products`, `POST /cart` and `GET /cart`, one for retrieving products, the other two for saving and loading the cart.

The fake server will be reached through a `server` function that takes a `method` (either `GET` or `POST`), a `path` (either `/products` or `/cart`), an optional `body` and a `callback`. The callback is a function that will be executed when we get a response from the server. Let's see a couple of examples:

```javascript
// To get products
fakeServer ('GET', '/products', function (error, products) {
   if (error) return alert ('There was an error communicating with the server!');

   // If there's no error, `products` is the list of products. You can do something with it here.
});

// To save an (empty) cart
var cart = {};
fakeServer ('POST', '/cart', cart, function (error) {
   if (error) return alert ('There was an error saving your cart!');

   // If there's no error, the cart is saved successfully in the server.
});

// To load the cart
fakeServer ('GET', '/cart', function (error, cart) {
   if (error) return alert ('There was an error loading your cart!');

   // If there's no error, `cart` will contain the latest version of the cart.
});
```

In all three examples above, the logic for what to do after the server responds is contained in the `callback` function. You might have noticed that the function always takes an `error` as its first argument: this is essential, because errors when communicating with a server are fairly common and must be accounted for. Callbacks are executed *asynchronously* - this means that you must wait for them to be executed. Callbacks are a fact of life in real-life JS. Some abstractions, like [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), help simplify them somewhat, but not completely. What you cannot do (unfortunately) is something like this:

```javascript
var products = fakeServer ('GET', '/products');
// Do something with `products` here.
```

That would be much simpler, but not possible with plain JS. It is possible to do it with `async/await`, but in the interest of keeping things different, let's do it the traditional way and use callbacks instead. For the purposes of our shopping cart, programming with callbacks can be quite manageable. We'll explore how as we build our shopping cart.

For now, we'll define three functions:

```javascript
var loadProducts = function (cb) {
   fakeServer ('GET', '/products', cb);
}

var saveCart = function (cart, cb) {
   fakeServer ('POST', '/cart', cart, cb);
}

var loadCart = function (cb) {
   fakeServer ('GET', '/cart', cb);
}
```

As you can see, all three functions invoke the `server` function - this is to be expected, since each function involves our fake server. More interestingly, all the functions take a callback as their last argument (in the code, we have named this argument as `cb`, which is short for *callback*). This means that the logic that will be executed *after* the server responds will have to be contained in the callback.

This has been a challenging part of the tutorial, so please don't be discouraged if you struggled to follow the explanation. If something is unclear, you can always [let me know](https://github.com/fpereiro/gotoB/issues) and I'll improve the explanation.

**Note**: the source code for the fake server will be at the top of the JS file for each section, if you are curious and want to take a look at it.

#### Step 4-3: showing the products ([HTML](4-3.app.html) - [JS](4-3.app.js))

We will now use the product list brought by `loadProducts` and show the products on the page. For this, we will create a `showProducts` function.

```javascript
var showProducts = function () {
   loadProducts (function (error, products) {
      if (error) return alert (error);

      var style = ['div.product', {'margin-top': 5}, [
         ['p, img', {
            float: 'left',
            'margin-left': 20,
            'line-height': 3
         }],
         ['p', {width: 40}],
         ['img', {width: 30}],
      ]];

      var html = [
         ['style', style],
         ['h3', 'List of products'],
         products.map (function (product) {
            return ['div', {class: 'product'}, [
               ['p', product.name],
               ['img', {src: product.image}],
               ['p', '$' + product.price],
               ['br'], ['br'],
            ]];
         })
      ];

      document.getElementById ('main').innerHTML = lith.g (html);
   });
}

showProducts ();
```

Well, this is quite the bunch of things, so let's break it down.

- `style` contains some [litcs](https://github.com/fpereiro/lith#litcs), which are object literals that will be converted to CSS. This CSS will make things look nicer in the page. It is perfectly possible to add CSS directly instead of using litcs.
- `html` contains a lith with a `<style>` tag (where we use the `style` variable we just created above), a `<h3>` heading, and then one `<div>` per product. Each product `<div>` contains the name of the product, an image, and the price.
- We convert `html` into HTML using `lith.g` and then put all of that inside the `<div id="main">`.

#### Step 4-4: adding items to the cart ([HTML](4-4.app.html) - [JS](4-4.app.js))

So far, our shopping cart only shows a list of products, but we're unable to add them to the cart. We will now tackle this now.

This requires us to write a function that adds an item to the cart. We will define it now:

```javascript
var addProductToCart = function (id, quantity) {
   loadCart (function (error, cart) {
      if (error) return alert (error);
      var productAlreadyInCart = dale.stop (cart, true, function (product) {
         if (product.id === id) {
            product.quantity += quantity;
            return true;
         }
      });
      if (! productAlreadyInCart) cart.push ({id: id, quantity: quantity});

      showProducts ();
      saveCart (cart);
   });
}
```


### TODO

TODO: two way data binding?
- manage state & redraw page. think of view as another function that is updated when its inputs change.
- Modifying the same data in two places (either on UI or coming from the server): need to update views.
- Parts of the view that rely on a computed value also have to be updated.
- Update functions need to know what depends on the data and update those views, or even call handlers.
- Quadratic drift.
- Against blank slate:
   - Loss of state of dropdowns/scroll on general redraw.
   - Inefficient long list updating.
- Loose functions and loose variables.

CRUD: different pages, add, edit

### conclusions


chapter 2
- The view is HTML on the page: We initialized a view in HTML: in this case, it was composed of a title, a paragraph and a button.
- Event handlers: We bound an HTML element (the button) to a function (`increaseCounter`) through an *event handler*.
- Functions as workhorses: We defined a function that extracted information from the HTML, processed it, and modified the HTML.
- State in JS, make the HTML reflect it: We simplified that function by storing data on JS itself, rather than on HTML.
chapter 3
- Dynamic generation of HTML based on the state.
- Loading and saving the state to somewhere else than just JS (localStorage or a server).
- lith for html generation: String concatenation. But three problems: concatenation of strings is hairy, escaping, and which tags to close.
chapter 4
- async
- switch between two views: just an instance of updating HTML with JS
- user inputs: use the state to hold them
- a function that is called when the state is updated: not just HTML generation, but also calculate a value
chapter 5
- loose variables: put it all in one place
- components with multiple inputs, one user interaction modifying several state parts: enter gotoB views
- why rfuns? reuse for multiple (update, ie) and have it in the event log

two static things: HTML and state. One dynamic thing: logic.

### Summary: constants, principles and solutions

We will now summarize all the concepts we've seen in the entire tutorial, illustrating them with the app examples we saw in the last few chapters. This summary is your parting gift: if it does what you should, you should walk away from this tutorial with a mental map of webapps that will allow you to learn and expand your skills.

The concepts can be grouped in three:

- **Constants**: things that are *part of the terrain*, so to speak. These are basic elements of web development and, in one way or other, you must work with them.
- **Principles**: these are [organizational principles](https://prog21.dadgum.com/177.html) that are embraced by most client-side frameworks, and to which gotoX fully subscribes.
- **Solutions**: these are approaches that are used by gotoX to solve some specific problems. A few are original to gotoX, but most are not.

Constants are as general as they can be: they are actually universal, if our universe is webapps. The principles are very general, though not universal, since there's ways of building webapps without using them. The solutions are quite specific to gotoX, but they are quite general too, in that they solve many common problems that arise when implementing webapps.

**The Constants**

- Constant 1: **what you see What you see is HTML on the page. If you want to update the page, you need to update that HTML.
   - Example 1: ??
- Constant 2: the state is persisted somewhere in the client. It can be on the HTML itself or it can be on JS. Even if it's brought from a server, it must be stored or reflected somewhere on the client.
- Constant 3: if you update the state, you must update the html too. And conversely (two-way data binding).
- Constant 4: Changes in state come from: 1) event handlers bound to HTML elements that are executed on an user interaction; 2) time-based logic (setTimeout, setInterval).
- Constant 5: HTML *must* be generated from the state, cannot be premade and shown/hidden. The state must be read, then updated, by the logic, every time that it changes.
- Constant 6: to survive a page refresh, state must be persisted either on a server or on localstorage.
- Constant 7: there's two static elements: HTML and state. Only the logic can change the state and the HTML.

Organizational principles that are common to most frontend frameworks and which gotoB adopts:
- Principle 1: generate almost all HTML with client-side JS based on the state (rather than on the server)
- Principle 2: keep all the state in JS
- Principle 3: make changes first to the state, then to the HTML. Instead of bidirectional change, propagate changes one way. For example: when an input is changed, that generates a change in the state, and then the view gets redrawn. However, the existing value in the HTML is equal to the new value, so no change is shown.
- Principle 4: group logic into functions. Types of logic: update HTML, update state, communicate with server or localstorage, other computation (for example, summing a total), DOM side-effects. Functions can do one or more of these five, but at least one of these.

gotoB specific solutions:
1. Use object literals to represent HTML.
2. put all the state in one object
3. make the state addressable through paths
4. Views are functions that take parts of the state as inputs and return object literals to generate HTML.
5. Express state changes as events.
   - example: if price changes, this affects both the products list and the cart.
6. Views are internally event responders! views are event responders to one or more parts of the state. This solves quadratic drift.
7. Event responders can fire one or more events. And so do any timers that would effect changes in the app.

How does it look like? vfuns and rfuns.
- vfuns are functions that return invocations to B.view, with one or more dependencies (part of the state on which they depend). And they return lith, actually a single HTML element that can have more inside. Pure functions: they don't call events. The flow goes one way, from state to HTML (see principle 3). vfuns are, under the hood, rfuns.
- rfuns are event responders. They are called by events. They can in turn call other events, or execute other logic.

Responders are mostly useful for views. But they can also be useful for computed state, for example on a spreadsheet. A lot of rfuns in gotoB are just rfuns as an organizational principle, but it is not necessary to do this. You can still use normal functions for other logic.

TODO: The principle of holding the data in one place is the static version of doing one way data flow (or rather, actions) that you have in frontend libraries; the idea is that if there can be multiple triggers for an action, direct them all on the same way. this is the general principle!
