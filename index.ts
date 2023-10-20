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

    /* console.log(square); */
    if (!square.hasChildNodes()) {
      // If square does not have a player's symbol inside then
      square.innerHTML = `<p class="moveIcon">${player.symbol}</p>`;
    }
  });
};
