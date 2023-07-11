// Function to check if a player has won
function checkWin(player) {
    const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination of combinations) {
        const [a, b, c] = combination;
        if (
            cells[a].classList.contains(player) &&
            cells[b].classList.contains(player) &&
            cells[c].classList.contains(player)
        ) {
            return true;
        }
    }

    return false;
}

// Function to check if it's a draw
function checkDraw() {
    for (let cell of cells) {
        if (!cell.classList.contains("x") && !cell.classList.contains("o")) {
            return false;
        }
    }
    return true;
}

// Function to handle cell clicks
function handleCellClick() {
    if (this.classList.contains("disabled")) {
        return;
    }

    if (currentPlayer === "x") {
        this.classList.add("x", "disabled");
        this.textContent = "X";
        currentPlayer = "o";
    } else {
        this.classList.add("o", "disabled");
        this.textContent = "O";
        currentPlayer = "x";
    }

    if (checkWin("x")) {
        gameOver("x");
    } else if (checkWin("o")) {
        gameOver("o");
    } else if (checkDraw()) {
        gameOver("draw");
    } else {
        status.textContent = `Its ${currentPlayer.toUpperCase()} turn`;
    }
}


// Function to handle game over
function gameOver(result) {
    for (let cell of cells) {
        cell.classList.add("disabled");
    }

    if (result === "draw") {
        gameOverText.textContent = "Draw!";
    } else {
        gameOverText.textContent = `Player ${result.toUpperCase()} wins!`;
    }

    // Show game over section and hide status section
    gameOverSection.style.display = "block";
    statusSection.style.display = "none";
}


// Function to handle restart button click
function handleRestartClick() {
    for (let cell of cells) {
        cell.classList.remove("x", "o", "disabled");
        cell.textContent = "";
    }
    currentPlayer = "x";
    status.textContent = `Its X turn`;
    gameOverText.textContent = "";
}

// Get game cells and elements
const cells = document.querySelectorAll(".grid-cell");
const status = document.querySelector(".status .current-player");
const gameOverText = document.querySelector(".game-over .game-over-text");
const restartButton = document.querySelector(".game-over .restart");

// Initialize current player
let currentPlayer = "x";

// Add event listeners
for (let cell of cells) {
    cell.addEventListener("click", handleCellClick);
}

restartButton.addEventListener("click", handleRestartClick);
