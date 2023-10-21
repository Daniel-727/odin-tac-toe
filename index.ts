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

/* //IIFE for creating board state
const board = (function () {
  const board = [];

  return { board };
})(); */

interface Player {
  symbol: string;
}

interface Move {
  squareID: number;
  player: Player;
}

const state = (function () {
  // State stores the record of our moves and if a player has won or not
  const moves: Move[] = [];
  const player1Win = false;
  const player2Win = false;
  return { moves, player1Win, player2Win };
})();

const squares = document.querySelectorAll('[data-id="boardSquare"]');

// Factory function for creating players
function createPlayer(symbol: string) {
  return { symbol };
}

const player1 = createPlayer("x");
const player2 = createPlayer("o");

// Function for making playermove
const makeMove = (e: Event, player: Player) => {
  const square = e.target as HTMLButtonElement;
  const stringID = square.getAttribute("square-id");
  const squareID = Number(stringID);

  // Check if state already has move, if so, don't update state
  let result = state.moves.filter((move) => {
    if (move.squareID === squareID) {
      return move;
    }
  });

  if (result.length === 0) {
    // If result.length > 0, that means there's already a move on that square so don't add another move into state for that square
    state.moves.push({ squareID, player });
  }
  /* console.log(state.moves); */
};

const getCurrentPlayer = () => {
  /* (state.moves.length % 2 === 1) ? return 1 : return 2 */

  if (state.moves.length % 2 === 1) {
    // If length of moves is odd, then it's player 2's turn
    return player2;
  } else {
    return player1;
  }
};

const updateDisplay = () => {
  state.moves.forEach((move) => {
    const squareID = move.squareID;
    const player = move.player;
    const square = document.querySelector(`[square-id="${squareID}"]`);

    /* console.log(square); */
    if (!square.hasChildNodes()) {
      // If square does not have a player's symbol inside then
      square.innerHTML = `<p class="moveIcon">${player.symbol}</p>`;
    }
  });
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

const checkGameStatus = () => {
  const win = [
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
  let player1Moves = [];
  let player2Moves = [];
  state.moves.forEach((move) => {
    if (move.player.symbol === "x") {
      // Tracks player moves
      player1Moves.push(move.squareID);
    } else {
      player2Moves.push(move.squareID);
    }
  });

  if (player1Moves.length > 2) {
    // Changes state of player1Win
    win.forEach((array) => {
      let count = 0;
      player1Moves.forEach((move) => {
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
    win.forEach((array) => {
      let count = 0;
      player2Moves.forEach((move) => {
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
    console.log("game is a tie!");
  } else if (state.player1Win) {
    console.log("player 1 wins!");
  } else if (state.player2Win) {
    console.log("player 2 wins!");
  }
};

// Adding event listeners to my board squares
squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    let currentPlayer = getCurrentPlayer();
    makeMove(e, currentPlayer);
    checkGameStatus();
    updateDisplay();
  });
});
