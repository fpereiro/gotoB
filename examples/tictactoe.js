var tictactoe = function () {
   return B.view ([['board'], ['next'], ['winner']], function (board, next, winner) {
      return ['div', [
         ['h3', winner ? 'Winner: ' + winner : 'Next player: ' + next],
         dale.go (Array (3), function (v, k) {
            return ['div', {class: 'board-row'}, dale.go (Array (3), function (v2, k2) {
               var index = k * 3 + k2;
               return ['button', {class: 'board-row', onclick: B.ev ('click', 'square', index)}, board [index] || '-'];
            })];
         })
      ]];
   });
}

var calculateWinner = function () {
   var board = B.get ('board');
   var winner = dale.stopNot ([[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]], undefined, function (row) {
      if (! board [row [0]]) return;
      if (board [row [0]] === board [row [1]] && board [row [1]] === board [row [2]]) return board [row [0]];
   });
   return winner;
}

B.call ('set', 'next', 'X');
B.call ('set', 'board', Array (9));

B.respond ('click', 'square', function (x, index) {
   if (B.get ('winner')) return;
   B.call (x, 'set', ['board', index], B.get ('next'));
   var winner = calculateWinner ();
   if (winner) return B.call (x, 'set', 'winner', winner);
   B.call (x, 'set', 'next', B.get ('next') === 'X' ? 'O' : 'X');
});

B.mount ('body', tictactoe);
