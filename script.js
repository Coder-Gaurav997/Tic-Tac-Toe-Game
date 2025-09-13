const board = document.getElementById("board");
const statusText = document.getElementById("status");
const playerScoreEl = document.getElementById("playerScore");
const computerScoreEl = document.getElementById("computerScore");

let cells = [];
let currentPlayer = "X";
let gameOver = false;
let playerScore = 0;
let computerScore = 0;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function initGame() {
  board.innerHTML = "";
  cells = [];
  gameOver = false;
  statusText.textContent = "Your Turn";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleMove(index) {
  if (cells[index].textContent || gameOver) return;

  cells[index].textContent = "X";
  if (checkWinner("X")) {
    statusText.textContent = "You Win!";
    playerScore++;
    playerScoreEl.textContent = playerScore;
    gameOver = true;
    return;
  }

  if (isBoardFull()) {
    statusText.textContent = "It's a Draw!";
    gameOver = true;
    return;
  }

  statusText.textContent = "Computer's Turn";
  setTimeout(computerMove, 500);
}

function computerMove() {
  if (gameOver) return;

  let available = cells
    .map((cell, index) => (cell.textContent === "" ? index : null))
    .filter(i => i !== null);

  let randomIndex = available[Math.floor(Math.random() * available.length)];
  cells[randomIndex].textContent = "O";

  if (checkWinner("O")) {
    statusText.textContent = "Computer Wins!";
    computerScore++;
    computerScoreEl.textContent = computerScore;
    gameOver = true;
    return;
  }

  if (isBoardFull()) {
    statusText.textContent = "It's a Draw!";
    gameOver = true;
    return;
  }

  statusText.textContent = "Your Turn";
}

function checkWinner(player) {
  return winningCombos.some(combo =>
    combo.every(index => cells[index].textContent === player)
  );
}

function isBoardFull() {
  return cells.every(cell => cell.textContent !== "");
}

function resetGame() {
  initGame();
}

initGame();
