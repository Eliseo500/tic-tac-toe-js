export class Player {
  constructor({ name, symbol }) {
    this.name = name;
    this.symbol = symbol;
    this.score = 0;
  }

  incrementScore() {
    this.score++;
  }

  resetScore() {
    this.score = 0;
  }
}
