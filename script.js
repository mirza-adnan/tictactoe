const SelectionScreen = (function() {
    
    const playerFactory = function(player, mark, isAi, turn) {
        return {
            player,
            mark,
            isAi,
            turn
        }
    }

    // creating the players
    const player1 = playerFactory("Player 1", "X", false, true);
    const player2 = playerFactory("Player 2", "O", false, true);
    
    // closing the selection screen after choosing opponent
    const human = document.querySelector(".human");
    const computer = document.querySelector(".computer");

    human.addEventListener("click", closeSelectionScreen);
    computer.addEventListener("click", function() {
        player2.isAi = true;
        closeSelectionScreen();
    })

    function closeSelectionScreen() {
        const selectionScreen = document.querySelector(".selection-screen");

        selectionScreen.addEventListener("transitionend", function() {
            selectionScreen.style.display = "none";
        })

        selectionScreen.style.opacity = "0";
    }

})()

const Gameboard = (function() {
    
    let board = ["X", "O", "X", "", "", "", "", "", ""];  //array to hold the X and O's
    
    const squares = document.querySelectorAll(".square");
    console.log(squares)

    function renderBoard() {
        for(let i=0; i<9; i++) {
            squares[i].textContent = board[i];
        }
    }
    return {
        renderBoard,
    }

})();

const Controller = (function() {

})()

Gameboard.renderBoard();