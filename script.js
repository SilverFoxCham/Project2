const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const scoreXEl = document.getElementById("score-x");
const scoreOEl = document.getElementById("score-o");
const scoreDrawEl = document.getElementById("score-draw");
const newRoundBtn = document.getElementById("new-round");
const resetScoresBtn = document.getElementById("reset-scores");

const state = {
  cells: Array(9).fill(""),
  current: "X",
  locked: false,
  scores: { X: 0, O: 0, draw: 0 },
};

/**
 * Creates the Tic Tac Toe board UI by generating 9 cell buttons
 * and attaching them to the board container. Each cell is clickable
 * and mapped to its index, with appropriate ARIA attributes for accessibility.
 */
function createBoard() {
  // Clear any existing board content
  boardEl.innerHTML = "";

  // Create each cell
  for (let index = 0; index < state.cells.length; index++) {
    const cell = document.createElement("button");
    cell.className = "cell";
    cell.type = "button";
    cell.dataset.index = String(index);

    // Accessibility: identify grid cell, provide cell number
    cell.setAttribute("role", "gridcell");
    cell.setAttribute("aria-label", `Cell ${index + 1}`);

    // On cell click, attempt to play this cell
    cell.addEventListener("click", () => play(index));

    // Add cell to the board
    boardEl.appendChild(cell);
  }
}

function play(index) {
  if (state.locked || state.cells[index]) return;

  state.cells[index] = state.current;
  renderBoard();

  const winner = findWinner();
  if (winner) {
    state.locked = true;
    state.scores[winner.player] += 1;
    highlight(winner.line);
    setStatus(`Player ${winner.player} wins`, true);
    renderScores();
    return;
  }

  if (state.cells.every(Boolean)) {
    state.locked = true;
    state.scores.draw += 1;
    setStatus("It's a draw", false);
    renderScores();
    return;
  }

  state.current = state.current === "X" ? "O" : "X";
  setStatus(`Player ${state.current}'s turn`, false);
}

function findWinner() {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const mark = state.cells[a];
    if (mark && mark === state.cells[b] && mark === state.cells[c]) {
      return { player: mark, line };
    }
  }
  return null;
}

const MARK_SHAPES = {
  X: `<svg class="glyph" viewBox="0 0 64 64" aria-hidden="true"><path d="M18 18 L46 46 M46 18 L18 46" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/></svg>`,
  O: `<svg class="glyph" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="16" fill="none" stroke="currentColor" stroke-width="8"/></svg>`,
};

function renderBoard() {
  [...boardEl.children].forEach((cell, index) => {
    const mark = state.cells[index];
    cell.innerHTML = mark ? MARK_SHAPES[mark] : "";
    cell.classList.toggle("x", mark === "X");
    cell.classList.toggle("o", mark === "O");
    cell.classList.remove("win");
    cell.disabled = Boolean(mark) || state.locked;
    const placed = mark === "X" ? "cross" : mark === "O" ? "circle" : "";
    cell.setAttribute(
      "aria-label",
      placed ? `Cell ${index + 1}, ${placed}` : `Cell ${index + 1}`
    );
  });
}

function highlight(line) {
  line.forEach((index) => {
    boardEl.children[index].classList.add("win");
  });
}

function setStatus(message, isWin) {
  statusEl.textContent = message;
  statusEl.classList.toggle("win", isWin);
}

function renderScores() {
  scoreXEl.textContent = String(state.scores.X);
  scoreOEl.textContent = String(state.scores.O);
  scoreDrawEl.textContent = String(state.scores.draw);
}

function newRound() {
  state.cells = Array(9).fill("");
  state.current = "X";
  state.locked = false;
  setStatus("Player X starts", false);
  renderBoard();
}

function resetScores() {
  state.scores = { X: 0, O: 0, draw: 0 };
  renderScores();
  newRound();
}

newRoundBtn.addEventListener("click", newRound);
resetScoresBtn.addEventListener("click", resetScores);

createBoard();
renderBoard();
renderScores();
