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
    const player2 = playerFactory("Player 2", "O", false, false);
    
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

        const container = document.querySelector(".container");
        container.style.display = "flex";
    }

    return {
        player1,
        player2
    }

})()

const Gameboard = (function() {
    
    let board = ["", "", "", "", "", "", "", "", ""];  //array to hold the X and O's
    
    const squares = document.querySelectorAll(".square");

    squares.forEach(square => {
        square.addEventListener("click", updateBoard);
    })

    function renderBoard() {
        for(let i=0; i<9; i++) {
            squares[i].textContent = board[i];
        }
    }

    function updateBoard() {
        const index = Number(this.getAttribute("data-index"));
        if (SelectionScreen.player1.turn) {
            board[index] = SelectionScreen.player1.mark;
        }
        if (SelectionScreen.player2.turn) {
            board[index] = SelectionScreen.player2.mark;
        }
        renderBoard();
        changeOpacity(this);
        changeTurns()
    }

    // toggles the turn of each player
    function changeTurns() {
        SelectionScreen.player1.turn = !SelectionScreen.player1.turn;
        SelectionScreen.player2.turn = !SelectionScreen.player2.turn;
    }

    function changeOpacity(element) {
        element.style.color = "rgba(232, 90, 79, 1)"  // increasing the alpha value from 0 to 1 to make it appear slowly
    }


    return {
        renderBoard,
    }
})();

const Controller = (function() {

})()

Gameboard.renderBoard();