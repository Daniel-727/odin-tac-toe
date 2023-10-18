// IIFE for creating gameboard, we only need 1 gameboard so we don't need to invoke it multiple times.
(function createGameboard() {
  const displayBoard = document.querySelector('[data-id="board"]');
  const stateBoard = ["x", "o", "o", "x", "o", "x", "x", "o", "x"];

  stateBoard.forEach((move) => {
    const displayMove = document.createElement("div"); // Creating div for each move
    displayMove.innerHTML = `${move}`;
    displayBoard.appendChild(displayMove);
  });
  return { stateBoard };
})();

// Factory function for creating players
function createPlayer() {
  return;
}
