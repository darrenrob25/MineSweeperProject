let gameboard = [];
let rows = 8;
let columns = 8;

let minesCount = 5; //Total number of mines in game.
let minesLocation = []; //grid co-ordinates of mines.

let tilesClicked = 0; // total number of tiles clicked.
let flagEnabled = false; //This is used to dictate whether we have clicked the flag button and whether its activated.

let gameOver = false; //Used to decide whether game is over yet.



//Event for the flag button.
function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    }
    else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "rgb(173, 172, 172)";
    }
}

//Will initially start the game when we load the webpage.
window.onload = function() { 
    startGame();
}

//Function to start game.
function startGame() {
    // Passing in the amount of mines to the HTML.
    document.getElementById("mines-count").innerHTML = minesCount;
    document.getElementById("flag-button").addEventListener("click", setFlag);
    document.getElementById("instructions").addEventListener("click", showInstructions);
    document.getElementById("new-game").addEventListener("click", function() {
        window.location.reload();
    });
    createMines();

    //Populating the gameboard with cells
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
    console.log(gameboard);
}

//Function to click tile.
function clickTile() {
    let tile = this;
    if (flagEnabled) {
        if (tile.innerHTML == "") {
            tile.innerHTML = "🚩";
        }
        else if (tile.innerHTML == "🚩") {
            tile.innerHTML = "";
        }
        //to stop mine being triggered when adding a flag.
        return;
    }
    if (minesLocation.includes(tile.id)) {
        alert("You hit a mine!");
        gameOver = true;
        showMines();
        return;
    }
    let coordinates = tile.id.split("-"); //will return the co-ordinates as an array.
    let x = parseInt(coordinates[0]);
    let y = parseInt(coordinates[1]);
    checkMine(x, y);
}

//Function to create mines.
function createMines() {
    minesLocation.push("0-0")
    minesLocation.push("0-1")
    minesLocation.push("2-7")
    minesLocation.push("3-3")
    minesLocation.push("5-2")
}

// Function to show mines when game over.
function showMines() {
    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            let tile = gameboard[x][y];
            if (minesLocation.includes(tile.id)) {
                tile.innerHTML = "💣";
                tile.style.backgroundColor="red";
            }
        }
    }
}

//Function to check for mine
function checkMine(x, y) {
    //checking if coordinates are out of the gameboard.
    if (x < 0 || x >= rows || y < 0 || y >= columns) {
        return;
    }
    if (gameboard[x][y].classList.contains("tile-clicked")) {
        return;
    }

    gameboard[x][y].classList.add("tile-clicked");


    let minesLocated = 0;
    //locate mines
    minesLocated += checkTile(x-1, y-1);
    minesLocated += checkTile(x-1, y);
    minesLocated += checkTile(x-1, y+1);

    minesLocated += checkTile(x+1, y-1);
    minesLocated += checkTile(x+1, y);
    minesLocated += checkTile(x+1, y+1);

    minesLocated += checkTile(x, y-1);
    minesLocated += checkTile(x, y+1);

    if (minesLocated > 0) {
        gameboard[x][y].innerText = minesLocated; // Adding number to cell
        gameboard[x][y].classList.add("c" + minesLocated.toString()); // Changing number colour.
    }
    else {
        checkMine (x-1, y-1); // Upper left
        checkMine (x-1, y); // Upper
        checkMine (x-1, y+1); //Upper Right 
        checkMine (x+1, y-1); // bottom Left
        checkMine (x+1, y); // bottom
        checkMine (x+1, y+1); //bottom right
        checkMine (x, y-1); //left
        checkMine (x, y+1); //right
    }
    if (tilesClicked == rows * columns - minesCount) {
        document.getElementsByTagName(h2).innerText = "You Win!";
        gameOver = true;
    }
}

function checkTile(x, y) {
    //checking if coordinates are out of the gameboard.
    if (x < 0 || x >= rows || y < 0 || y >= columns) {
        return 0;
    }
    if (minesLocation.includes(x.toString() + "-" + y.toString())) {
        return 1;
    }
    return 0;
}

//Function to use the flag button.

//function to reset game when button clicked.

//Function to display instructions.
function showInstructions() {
    let gameboard = document.getElementById("gameboard");
    if (gameboard) {
        let htmlContent = `
            <h3>How to Play</h3>
            <p>Start by clicking on a square in the grid. Each square will either reveal a number (indicating how many mines are adjacent) or a mine (which means you lose).</p>
            <p>You can mark suspected mines with flags using the flag button. Win the game by revealing all non-mine squares.</p>
            <br>
                <h5 id="closeButton">Close</h5>
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