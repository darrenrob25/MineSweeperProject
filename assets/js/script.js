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
    if (flagEnabled) = false;
    
}

//Will initially start the game when we load the webpage.
window.onload = function() { 
    startGame();
}

//Function to start game.
function startGame() {
    // Passing in the amount of mines to the HTML.
    document.getElementById("mines-count").innerHTML = minesCount;

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
    }
}

//Function to check if theres a mine.

//Function to use the flag button.

//function to reset game when button clicked.