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
    // State stores the record of our moves and if a player has won or not
    var moves = [];
    var player1Win = false;
    var player2Win = false;
    var tie = false;
    return { moves: moves, player1Win: player1Win, player2Win: player2Win, tie: tie };
})();
var squares = document.querySelectorAll('[data-id="boardSquare"]');
var resetBtn = document.querySelector('[data-id="resetBtn"]');
var gameStatus = document.querySelector('[data-id="gameStatus"]');
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
    /* console.log(state.moves); */
};
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
    if (state.player1Win) {
        gameStatus.textContent = "Player 1 Wins!";
    }
    else if (state.player2Win) {
        gameStatus.textContent = "Player 2 Wins!";
    }
    else if (state.tie) {
        gameStatus.textContent = "Game is a tie!";
    }
};
/* 8 ways to win
if a player has [0,1,2]
if a player has [3,4,5]
if a player has [6,7,8]
if a player has [0,3,6]
if a player has [1,4,7]
if a player has [2,5,8]
if a player has [0,4,8]
if a player has [2,4,6] */
var checkGameStatus = function () {
    var win = [
        // All the win conditions
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    /* console.log(state.moves); */
    var player1Moves = [];
    var player2Moves = [];
    state.moves.forEach(function (move) {
        if (move.player.symbol === "x") {
            // Tracks player moves
            player1Moves.push(move.squareID);
        }
        else {
            player2Moves.push(move.squareID);
        }
    });
    if (player1Moves.length > 2) {
        // Changes state of player1Win
        win.forEach(function (array) {
            var count = 0;
            player1Moves.forEach(function (move) {
                if (array.includes(move)) {
                    count++;
                }
                if (count === 3) {
                    state.player1Win = true;
                }
            });
        });
    }
    if (player2Moves.length > 2) {
        // Changes state of player2Win
        win.forEach(function (array) {
            var count = 0;
            player2Moves.forEach(function (move) {
                if (array.includes(move)) {
                    count++;
                }
                if (count === 3) {
                    state.player2Win = true;
                }
            });
        });
    }
    if (state.moves.length === 9 && !state.player1Win && !state.player2Win) {
        state.tie = true;
    }
};
var reset = function () {
    gameStatus.textContent = "";
    state.moves = [];
    state.player1Win = false;
    state.player2Win = false;
    state.tie = false;
    squares.forEach(function (square) {
        square.innerHTML = "";
    });
};
// Adding event listeners to my board squares
squares.forEach(function (square) {
    square.addEventListener("click", function (e) {
        var currentPlayer = getCurrentPlayer();
        makeMove(e, currentPlayer);
        checkGameStatus();
        updateDisplay();
    });
});
resetBtn.addEventListener("click", function () {
    reset();
});
