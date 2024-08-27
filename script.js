const gameBoard = document.querySelector(".x-o-board");
const msgBox = document.querySelector(".sq-md-box");
const restartButton = document.querySelector(".restart-btn");
const BOARD_SIZE = 3;

const gameController = (function () {
    const firstPlayerType = "X";
    const secondPlayerType = "O";
    let turnNumber = 0;
    let isFirstPLayer = true;

    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    function printBoard() {
        for (let i = 0; i < BOARD_SIZE; i++) {
            console.log(board[i]);
        }
    }

    function restartGame() {
        isFirstPLayer = true;
        turnNumber = 0;
        msgBox.textContent = "";
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                board[row][col] = "";
                const cell = document.getElementById(`${row}${col}`);
                cell.textContent = "";
            }
        }
    }

    function checkState() {
        for (let i = 0; i < BOARD_SIZE; i++) {
            let x = 0,
                o = 0;
            let x1 = 0,
                o1 = 0;

            for (let j = 0; j < BOARD_SIZE; j++) {
                if (board[i][j] == "X") {
                    x++;
                } else if (board[i][j] == "O") {
                    o++;
                }

                if (board[j][i] == "X") {
                    x1++;
                } else if (board[j][i] == "O") {
                    o1++;
                }
            }
            if (x1 == BOARD_SIZE || x == BOARD_SIZE) {
                return "X";
            } else if (o1 == BOARD_SIZE || o == BOARD_SIZE) {
                return "O";
            }
        }

        let j1 = 0,
            j2 = 2;
        let xDiag1 = 0,
            oDiag1 = 0;
        let xDiag2 = 0,
            oDiag2 = 0;

        for (let i = 0; i < BOARD_SIZE; i++) {
            if (board[j1][i] == "X") {
                xDiag1++;
            } else if (board[j1][i] == "O") {
                oDiag1++;
            }

            if (board[j2][i] == "X") {
                xDiag2++;
            } else if (board[j2][i] == "O") {
                oDiag2++;
            }

            j1++;
            j2--;
        }
        if (xDiag1 == BOARD_SIZE || xDiag2 == BOARD_SIZE) {
            return "X";
        } else if (oDiag1 == BOARD_SIZE || oDiag2 == BOARD_SIZE) {
            return "O";
        }

        return "";
    }

    function makeTurn(xCord, yCord) {
        if (board[xCord][yCord] != "") {
            return "";
        }
        if (isFirstPLayer) {
            board[xCord][yCord] = firstPlayerType;
            isFirstPLayer = false;
            turnNumber++;
            return firstPlayerType;
        } else {
            board[xCord][yCord] = secondPlayerType;
            isFirstPLayer = true;
            turnNumber++;
            return secondPlayerType;
        }
    }

    function countTurn() {
        return turnNumber;
    }

    return {
        restartGame,
        checkState,
        printBoard,
        countTurn,
        makeTurn,
        board,
    };
})();

function loadGameBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cell = document.createElement("div");
            cell.setAttribute(
                "style",
                `color:black;
                 background-color: #164e63;
                 grid-row: ${i + 1} / ${i + 2}; 
                 grid-column: ${j + 1} / ${j + 2}; 
                 text-align:center;
                 padding:0.75rem;
                 font-size:1.5rem;
                 
                `
            );
            cell.classList.add("floating-eff");
            cell.setAttribute("id", `${i}${j}`);
            cell.addEventListener("click", () => {
                if (
                    gameController.board[i][j] !== "" ||
                    gameController.checkState() !== ""
                ) {
                    return;
                } else {
                    cell.textContent = gameController.makeTurn(i, j);
                }
                if (gameController.checkState() !== "") {
                    msgBox.textContent = `${gameController.checkState()}'s player win!`;
                }
            });

            gameBoard.appendChild(cell);
        }
    }
}

restartButton.addEventListener("click", () => {
    gameController.restartGame();
});
loadGameBoard();
