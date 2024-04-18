var gameboard = [];
var rows = 8;
var columns = 8;

let minesCount = 5; //Total number of mines in game.
var minesLocation = []; //grid co-ordinates of mines.

var tilesClicked = 0; // total number of tiles clicked.
var flagEnabled = false; //This is used to dictate whether we have clicked the flag button and whether its activated.

var gameOver = false; //Used to decide whether game is over yet.

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
    minesLocation.push("2-5")
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
    if (x < 0 || x <= rows || y < 0 || c >= columns) {
        return;
    }
    let minesLocated = 0;
    //locate top 3 tiles
    minesLocated += checkTile(x-1, y-1);
}

function checkTile(x, c) {
    if (x < 0 || x <= rows || y < 0 || c >= columns) {
        return;
}

//Function to use the flag button.

//function to reset game when button clicked.