const gameBoard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];
    const squares = document.querySelectorAll(".square");
    const player1 = playerFactory("Player 1", "X", "human");
    function fillBoard() {
        for (let i=0; i<9; i++) {
            squares[i].textContent = board[i];
        }
    }

    function updateBoard() {
        squares.forEach(square => {
            square.addEventListener("click", function() {
                const index = Number(square.getAttribute("data-index"));
                board[index] = player1.mark;
                square.style.color = "rgba(232, 90, 79, 1)";
                fillBoard()
            })
        })
    }

    return {
        fillBoard,
        updateBoard,
        board,
    }
})()

const displayController = (function() {
    let againstHuman;
    gameBoard.fillBoard()
    gameBoard.updateBoard()
})()

function playerFactory(player, mark, type) {
    return {
        player,
        mark,
        type,
    }
}