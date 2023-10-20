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
var state = (function () {
    // State stores the record of our moves
    var moves = [];
    return { moves: moves };
})();
var squares = document.querySelectorAll('[data-id="boardSquare"]');
// Factory function for creating players
function createPlayer(symbol) {
    return { symbol: symbol };
}
var player1 = createPlayer("x");
var player2 = createPlayer("o");
// Function for making playermove
var makeMove = function (e, player) {
    var square = e.target;
    var stringID = square.getAttribute("square-id");
    var squareID = Number(stringID);
    // Check if state already has move, if so, don't update state
    var result = state.moves.filter(function (move) {
        if (move.squareID === squareID) {
            return move;
        }
    });
    if (result.length === 0) {
        // If result.length > 0, that means there's already a move on that square so don't add another move into state for that square
        state.moves.push({ squareID: squareID, player: player });
    }
    console.log(state.moves);
};
squares.forEach(function (square) {
    square.addEventListener("click", function (e) {
        var currentPlayer = getCurrentPlayer();
        makeMove(e, currentPlayer);
        updateDisplay();
    });
});
var getCurrentPlayer = function () {
    /* (state.moves.length % 2 === 1) ? return 1 : return 2 */
    if (state.moves.length % 2 === 1) {
        // If length of moves is odd, then it's player 2's turn
        return player2;
    }
    else {
        return player1;
    }
};
var updateDisplay = function () {
    state.moves.forEach(function (move) {
        var squareID = move.squareID;
        var player = move.player;
        var square = document.querySelector("[square-id=\"".concat(squareID, "\"]"));
        /* console.log(square); */
        if (!square.hasChildNodes()) {
            // If square does not have a player's symbol inside then
            square.innerHTML = "<p class=\"moveIcon\">".concat(player.symbol, "</p>");
        }
    });
};
