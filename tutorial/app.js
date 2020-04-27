// *** COUNTER ***

var value = 0;

var counter = '<input readonly="readonly" id="counter" value="' + value + '">';

var button = '<button onclick="increment ()">Count</button>';

document.body.innerHTML += counter + button;

var increment = function () {
   var counter = document.getElementById ('counter');
   value = value + 1;
   counter.value = value;
}

document.body.innerHTML += '<br><br>';

var counter = B.view ('counter', function (value) {
   if (value === undefined) value = 0;
   return [
      ['input', {readonly: 'readonly', value: value}],
      ['button', {onclick: B.ev ('set', 'counter', value + 1)}]
   ];
});

// B.mount ('body', counter);

// *** TEMPERATURE CONVERTER ***

var celsius = 0, fahrenheit = 32;

var temps = '<input id="celsius" onchange="updateTemps (\'c\')" oninput="updateTemps (\'c\')" value="' + celsius + '">Celsius = <input id="fahrenheit" onchange="updateTemps (\'f\')" oninput="updateTemps (\'f\')" value="' + fahrenheit + '">Fahrenheit';

var updateTemps = function (changedField) {
   var





document.body.innerHTML += temps;

/*
var paragraph = '<p id="counter">Counter is 0</p>';

var button = '<button onclick="incrementCounter ()">Increment counter</button>';

var incrementCounter = function () {
   var counter = document.getElementById ('counter');
   var value = counter.innerHTML;
   value = value.replace ('Counter is ', '');
   value = parseInt (value);
   value = value + 1;
   counter.innerHTML = 'Counter is ' + value;
}

document.body.innerHTML = paragraph + button;
*/
