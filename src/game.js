import { Player } from "./Player";

export class Game {
  constructor(boardSize) {
    this.players = {
      player1: new Player({ name: "Player 1", symbol: "✖" }),
      player2: new Player({ name: "Player 2", symbol: "○" }),
    };
    this.currentPlayer = players.player1;
    this.boardSize = boardSize;
    this.board = Array(this.boardSize * this.boardSize).fill(null);
    this.winner = null;
    this.draw = false;
  }

  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === this.players.player1
        ? this.players.player2
        : this.players.player1;
  }

  updateBoard(index) {
    this.board[index] = this.currentPlayer.symbol;
  }

  checkForWin() {
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
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.winner = this.currentPlayer;
        this.winner.incrementScore();
        return true;
      }
    });

    return false;
  }

  checkForDraw() {
    this.draw = true;
    return this.board.every((square) => square !== null);
  }

  resetGame() {
    this.board = Array(this.boardSize * this.boardSize).fill(null);
    this.currentPlayer = this.players.player1;
    this.winner = null;
    this.draw = false;
  }
}

class GameUI {
  constructor({
    game,
    elementApp,
    elementBoard,
    elementPlayer1,
    elementPlayer2,
    elementEndGame,
    elementActivePlayer,
    elementReset,
  }) {
    this.game = game;
    this.elementApp = elementApp;
    this.elementBoard = elementBoard;
    this.elementPlayer1 = elementPlayer1;
    this.elementPlayer2 = elementPlayer2;
    this.elementEndGame = elementEndGame;
    this.elementActivePlayer = elementActivePlayer;
    this.elementReset = elementReset;
  }

  renderBoard() {
    if (!this.elementBoard) return;

    this.elementBoard.innerHTML = "";
    this.game.board.forEach((square, index) => {
      const squareElement = this.createSquare(index, game.currentPlayer);
      squareElement.textContent = "";
      this.elementBoard.appendChild(squareElement);
    });
  }

  createSquare(index, value) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.setAttribute("id", index);
    square.setAttribute("data-value", "");
    square.addEventListener("click", (e) => this.handleSquareClick(e, value));
    return square;
  }

  handleSquareClick(event, currentPlayer) {
    if (event.target.getAttribute("data-value") !== "") return;

    event.target.setAttribute("data-value", currentPlayer);
    event.target.textContent = currentPlayer;
    boardSquares[event.target.id] = currentPlayer;
    const win = this.game.checkForWin();

    if (win) {
    }
    this.game.switchPlayer();
  }
}
