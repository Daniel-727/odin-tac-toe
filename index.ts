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

const squares = document.querySelectorAll('[data-id="boardSquare"]');

//IIFE for creating board state
const board = (function () {
  const board = [];

  return { board };
})();

// Factory function for creating players
function createPlayer(symbol: string) {
  return { symbol };
}

let andrew = createPlayer("x");

// Function for making playermove
const makeMove = (e) => {
  console.log(e.target);
  board.board;
};

squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    makeMove(e);
  });
});
