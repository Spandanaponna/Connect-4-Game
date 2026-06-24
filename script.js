var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = []; 

window.onload = function() {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    document.getElementById("board").innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);
    let r = currColumns[c]; 

    if (r < 0) return;

    board[r][c] = currPlayer; 
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
        document.getElementById("winner").innerText = "Player 2's Turn";
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
        document.getElementById("winner").innerText = "Player 1's Turn";
    }

    r -= 1; 
    currColumns[c] = r; 

    checkWinner();
}

function checkWinner() {
     // Horizontal
     for (let r = 0; r < rows; r++) {
         for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
         }
    }

    // Vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Anti-diagonal
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Diagonal
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winnerText = board[r][c] == playerRed ? "Player 1" : "Player 2";
    
    // 1. Update the sidebar panel status
    let winnerDisplay = document.getElementById("winner");
    winnerDisplay.innerHTML = "🎉 " + winnerText + " Wins!";
    
    // 2. Set up and display our new modal card
    document.getElementById("modal-winner-text").innerText = winnerText + " Wins!";
    document.getElementById("win-modal").classList.remove("hidden");
    
    gameOver = true;
}

function closeWinModal() {
    // Hide the popup modal overlay
    document.getElementById("win-modal").classList.add("hidden");
    // Instantly reset the game grid so they can keep playing
    resetGame();
}

function changeTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
}

function resetGame() {
    gameOver = false;
    currPlayer = playerRed;
    document.getElementById("winner").innerText = "Player 1's Turn";
    setGame();
}