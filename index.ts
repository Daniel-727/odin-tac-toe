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
  // State stores the record of our moves
  const moves: Move[] = [];
  return { moves };
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

  // Getting previous board
  /* let prevState = [...state.moves]; */
  /* const move = {} */
  state.moves.push({ squareID, player });
  console.log(state.moves);
};

squares.forEach((square) => {
  square.addEventListener("click", (e) => {
    let currentPlayer = getCurrentPlayer();
    makeMove(e, currentPlayer);
    updateDisplay();
  });
});

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

    console.log(square);
  });
};
