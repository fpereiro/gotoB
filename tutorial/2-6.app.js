var counterValue = 0;

var increaseCounter = function () {
   var p = document.getElementsByTagName ('p');
   p = p [0];
   counterValue = counterValue + 1;
   p.innerHTML = 'Counter is ' + counterValue;
}
