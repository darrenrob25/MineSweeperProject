//Game State
let tilesClicked = 0; // total number of tiles clicked.
let flagEnabled = false; //used to see if we have clicked the flag button.
let gameOver = false; //Used to decide whether game is over yet.

//Game Perameters
let gameboard = [];
let rows = 8;
let columns = 8;
let minesCount = 8; //Total number of mines in game.
let minesLocation = []; //grid co-ordinates of mines.

// Toggle flag button state and style
function placeFlag() {
    flagEnabled = !flagEnabled; // Toggle flag state

    let flagButton = document.getElementById("flag-button");
    flagButton.style.backgroundColor = (flagEnabled
    ? "rgb(173, 172, 172)"
    : "lightgray");
}

//Will initially start the game when we load the webpage.
window.onload = function() {
    initialiseGame();
};

//Populating the gameboard with cells
function populateGameboard() {
    for (let x = 0; x < rows; x++) {
        let row = [];
        for (let y = 0; y < columns; y++) {
            //Setting Div id's to grid co-ordinates.
            let tile = document.createElement("div");
            tile.id = x.toString() + "-" + y.toString();
            document.getElementById("gameboard").append(tile);
            row.push(tile);
            tile.addEventListener("click", clickTile);
        }
        gameboard.push(row);
    }
}

//Function to start game.
function initialiseGame() {
    // Passing in the amount of mines to the HTML.
    document.getElementById("mines-count").innerHTML = minesCount;
    document.getElementById("flag-button").addEventListener("click", placeFlag);
    document.getElementById("instructions")
    .addEventListener("click", showInstructions);
    document.getElementById("new-game").addEventListener("click", function() {
        window.location.reload();
    });
    createMines();

    //Populating the gameboard with cells
   populateGameboard();
}

//Function to click tile.
function clickTile() {
    if (gameOver) {
        return;
    }

    let tile = this;
    if (flagEnabled) {
        toggleFlagOnTile(tile);
        return;
    }

    let coordinates = getCoordinatesFromTileId(tile.id);
    let x = coordinates[0];
    let y = coordinates[1];

    if (isMineTile(tile)) {
        handleMineClicked();
        return;
    }

    revealTileContent(x, y);
}
// Creates co-ordinates.
function getCoordinatesFromTileId(tileId) {
    let coordinates = tileId.split("-");
    let x = parseInt(coordinates[0]);
    let y = parseInt(coordinates[1]);
    return [x, y];
}

// Adds and removes flag from tile.
function toggleFlagOnTile(tile) {
    if (tile.innerHTML === "") {
        tile.innerHTML = "🚩";
    } else if (tile.innerHTML === "🚩") {
        tile.innerHTML = "";
    }
}

function isMineTile(tile) {
    return minesLocation.includes(tile.id);
}

function handleMineClicked() {
    document.getElementById("mines-count").innerText = "You Lose!";
    gameOver = true;
    revealMinesOnGameOver();
}

function revealTileContent(x, y) {
    checkMines(x, y);
}

//Function to create mines.
function createMines() {
let remainingMines = minesCount;
while (remainingMines > 0) {
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * columns);
    let id = x.toString() + "-" + y.toString();
    // Loop utilised to stop mines being generated on the same square.
    if (!minesLocation.includes(id)) {
        minesLocation.push(id);
        remainingMines -= 1;
    }
}
}

function revealMinesOnGameOver() {
    // Display mines on the game board when game is over.
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            let currentTile = gameboard[x][y];
            if (minesLocation.includes(currentTile.id)) {
                currentTile.innerHTML = "💣";
                currentTile.style.backgroundColor = "red";
            }
        }
    }
}

//Function to check for mine
function checkMines(x, y) {
    // Check if the coordinates are out of bounds or if the tile has already been clicked
    if (isOutOfBounds(x, y) || gameboard[x][y].classList.contains("tile-clicked")) {
        return;
    }

    // Mark the current tile as clicked
    gameboard[x][y].classList.add("tile-clicked");
    tilesClicked += 1;

    // Count neighboring mines
    let minesLocated = countNeighboringMines(x, y);

    if (minesLocated > 0) {
        // Display the number of neighboring mines on the tile
        displayNumberOnTile(x, y, minesLocated);
    } else {
        // Recursively check neighboring tiles if no mines are found
        checkAdjacentTiles(x, y);
    }

    // Check if all non-mine tiles have been clicked to determine a win
    if (tilesClicked === rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "You Win!";
        gameOver = true;
    }
}

function isOutOfBounds(x, y) {
    return x < 0 || x >= rows || y < 0 || y >= columns;
}

function countNeighboringMines(x, y) {
    let minesLocated = 0;

    // Define neighboring positions
    const positions = [
        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
        [x, y - 1],                 [x, y + 1],
        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
    ];

    // Count neighboring mines
    for (const [nx, ny] of positions) {
        if (!isOutOfBounds(nx, ny) && isMine(nx, ny)) {
            minesLocated++;
        }
    }

    return minesLocated;
}
// Showing the number of adjacent mines on tile.
function displayNumberOnTile(x, y, number) {
    let tile = gameboard[x][y];
    tile.innerText = number;
    tile.classList.add("c" + number);
}

function checkAdjacentTiles(x, y) {
    // Define neighboring positions
    const positions = [
        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
        [x, y - 1],                 [x, y + 1],
        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
    ];

    //Check neighboring tiles using recursive
    for (const [nx, ny] of positions) {
        if (!isOutOfBounds(nx, ny)) {
            checkMines(nx, ny);
        }
    }
}

function isMine(x, y) {
    // Check if the given coordinates (x, y) are out of bounds
    if (x < 0 || x >= rows || y < 0 || y >= columns) {
        return false; // Out of bounds, not a mine
    }

    // Construct the mine ID in the format "x-y"
    const id = `${x}-${y}`;

    // Check if the mineLocation array includes the constructed ID
    return minesLocation.includes(id);
}

//Function to display instructions.
function showInstructions() {
    let gameboard = document.getElementById("gameboard");
    if (gameboard) {
        // Set CSS styles for gameboard container
        gameboard.style.display = "flex";
        gameboard.style.flexDirection = "column";
        gameboard.style.justifyContent = "center";
        gameboard.style.alignItems = "center";
        gameboard.style.textAlign = "center";

        //adding text to gameboard container
        let htmlContent = `
            <h3 style="margin-bottom: 10px;">How to Play</h3>
            <p>Start by clicking on a square in the grid. Each square
            will either reveal a number (indicating how many mines are
            adjacent) or a mine (which means you lose).</p>
            <p>You can mark suspected mines with flags using the flag
            button. Win the game by revealing all non-mine squares.</p>
            <br>
            <h5 id="closeButton">Close</p>
        `;

        gameboard.innerHTML = htmlContent;

        // Add event listener to the "Close" button
        let closeButton = document.getElementById("closeButton");
        if (closeButton) {
            closeButton.addEventListener("click", function() {
                // Reload the page to hide instructions
                location.reload();
            });
        }
    } else {
        console.error("Element with ID 'gameboard' not found.");
    }
}