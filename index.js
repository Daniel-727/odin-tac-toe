// IIFE for creating gameboard, we only need 1 gameboard so we don't need to invoke it multiple times.
(function createGameboard() {
    var displayBoard = document.querySelector('[data-id="board"]');
    var stateBoard = ["x", "o", "o", "x", "o", "x", "x", "o", "x"];
    stateBoard.forEach(function (move) {
        var displayMove = document.createElement("div"); // Creating div for each move
        displayMove.innerHTML = "".concat(move);
        displayBoard.appendChild(displayMove);
    });
    return { stateBoard: stateBoard };
})();
// Factory function for creating players
function createPlayer() {
    return;
}
