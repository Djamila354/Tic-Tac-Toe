const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const resetScoreButton = document.getElementById("resetScore");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");
const drawSound = document.getElementById("drawSound");
const winnerMessage = document.getElementById("winnerMessage");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
let cells = [];
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

function createBoard() {
    board.innerHTML = "";
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    winnerMessage.style.display = "none";
    cells = [];
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleMove(event) {
    let index = event.target.dataset.index;
    if (boardState[index] === "") {
        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        clickSound.play();
        if (checkWinner()) {
          winSound.play();
          winnerMessage.textContent = `${currentPlayer} Wins !`;
          winnerMessage.style.display = "block";
          scores[currentPlayer] = (scores[currentPlayer] || 0) + 1;
          updateScoreboard();
          return;
      }
      if (!boardState.includes("")) {
        drawSound.play();
        winnerMessage.textContent = " a Draw !";
        winnerMessage.style.display = "block";
        return;
    }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function resetScore() {
  scores = { X: 0, O: 0 };
  updateScoreboard();
}

resetButton.addEventListener("click", createBoard);
resetScoreButton.addEventListener("click", () => {
  resetScore();
  createBoard();
});
createBoard();
