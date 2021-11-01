var increaseCounter = function () {
   var p = document.getElementsByTagName ('p');
   p = p [0];
   var counterText = p.innerHTML;
   var words = counterText.split (' ');
   var counterValue = words [2];

   counterValue = parseInt (counterValue);
   counterValue = counterValue + 1;

   p.innerHTML = 'Counter is ' + counterValue;
}
