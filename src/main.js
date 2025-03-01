import "./style.css";

const app = document.getElementById("app");
const reset = document.getElementById("reset");
const board = document.querySelector(".board");
const playerPoints = document.getElementById("player-1");
const player2Points = document.getElementById("player-2");

const boardSize = 3;
const boardSquares = Array(boardSize * boardSize).fill(null);
const players = ["✖", "○"];
let currentPlayer = players[0];

const createBoard = () => {
  boardSquares.forEach((_, index) => {
    const square = createSquare(index);
    board.appendChild(square);
  });
};

const createSquare = (index) => {
  const square = document.createElement("div");
  square.classList.add("square");
  square.setAttribute("id", index);
  square.setAttribute("data-value", "");
  square.addEventListener("click", (e) => handleSquareClick(e));
  return square;
};

const handleSquareClick = (event) => {
  if (event.target.getAttribute("data-value") !== "") return;

  event.target.setAttribute("data-value", currentPlayer);
  event.target.textContent = currentPlayer;
  boardSquares[event.target.id] = currentPlayer;
  checkForWin();
  switchPlayer();
};

const checkForWin = () => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  winConditions.forEach((condition) => {
    const [a, b, c] = condition;
    if (
      boardSquares[a] &&
      boardSquares[a] === boardSquares[b] &&
      boardSquares[a] === boardSquares[c]
    ) {
      const player = boardSquares[a];
      addPoints(player);
      winDisplay(player);
    }
  });
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
};

const resetGame = () => {
  boardSquares.fill(null);
  board.innerHTML = "";
  createBoard();
  currentPlayer = players[0];
};

const winDisplay = (player) => {
  const display = document.createElement("div");
  display.classList.add("winner");
  display.textContent = `${player} wins!`;
  display.addEventListener("click", () => {
    display.remove();
    resetGame();
  });
  app.appendChild(display);
};

const addPoints = (player) => {
  if (player === players[0]) {
    playerPoints.textContent = parseInt(playerPoints.textContent) + 1;
    console.log(playerPoints);
  } else {
    player2Points.textContent = parseInt(player2Points.textContent) + 1;
    console.log(player2Points);
  }
};

reset.addEventListener("click", resetGame);

createBoard();
