const gameBoard = document.querySelector(".x-o-board");

const gameController = (function () {
    const BOARD_SIZE = 3;
    const firstPlayerType = "X";
    const secondPlayerTYpe = "O";

    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    function restartGame() {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                board[row][col] = "";
            }
        }
    }

    function checkState() {
        for (let i = 0; i < BOARD_SIZE; i++) {}
        for (let i = 2; i >= 0; i--) {}

        //checking row,col
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {}
        }
    }

    return { restartGame, checkState };
})();
