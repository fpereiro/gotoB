// We add local variables to reference the global variables created by gotoB and its dependencies.
// This makes the code shorter and it makes clearer which global variables we're using.
var dale = window.dale, teishi = window.teishi, lith = window.lith, c = window.c, B = window.B;

var type = teishi.type, clog = teishi.clog;

// Not necessary, but useful: create B.store.Data and B.store.State, and bind them to window.Data & window.State to access them quickly
//   from the developer's console
window.Data  = B.store.Data  = {};
window.State = B.store.State = {};

// The rest of the app goes here!
