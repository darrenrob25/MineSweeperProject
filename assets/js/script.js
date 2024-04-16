var board = [];
var rows = 8;
var columns = 8;

let minesCount = 5; //Total number of mines in game.
var minesLocation = []; //grid co-ordinates of mines.

var tilesClicked = 0; // total number of tiles clicked.
var flagEnabled = false; //This is used to dictate whether we have clicked the flag button and whether its activated.

var gameOver = false; //Used to decide whether game is over yet.

//Will initially start the game when we load the webpage.
window.onload = function() { 
    startGame();
}

//Function to start game.
function startGame() {
    // Passing in the amount of mines to the HTML.
    document.getElementById("mines-count").innerHTML = minesCount;

    //Populating the board with cells
}