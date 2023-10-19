// IIFE for creating gameboard, we only need 1 gameboard so we don't need to invoke it multiple times.
/* (function createGameboard() {
  const displayBoard = document.querySelector('[data-id="board"]');
  const stateBoard = ["x", "o", "o", "x", "o", "x", "x", "o", "x"];

  stateBoard.forEach((move) => {
    const displayMove = document.createElement("div"); // Creating div for each move
    displayMove.innerHTML = `${move}`;
    displayBoard.appendChild(displayMove);
  });
  return { stateBoard };
})(); */
var squares = document.querySelectorAll('[data-id="boardSquare"]');
//IIFE for creating board state
var board = (function () {
    var board = [];
    return { board: board };
})();
// Factory function for creating players
function createPlayer(symbol) {
    return { symbol: symbol };
}
var andrew = createPlayer("x");
// Function for making playermove
var makeMove = function (e) {
    console.log(e.target);
    board.board;
};
squares.forEach(function (square) {
    square.addEventListener("click", function (e) {
        makeMove(e);
    });
});
