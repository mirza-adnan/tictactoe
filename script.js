const SelectionScreen = (function() {
    
    const playerFactory = function(player, mark, isAi, turn, won) {
        return {
            player,
            mark,
            isAi,
            turn,
            won
        }
    }

    // creating the players
    const player1 = playerFactory("Player 1", "X", false, true, false);
    const player2 = playerFactory("Player 2", "O", false, false, false);

    // closing the selection screen after choosing opponent
    const human = document.querySelector(".human");
    const computer = document.querySelector(".computer");

    human.addEventListener("click", closeSelectionScreen);
    computer.addEventListener("click", function() {
        player2.player = "Computer";
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

    function addListeners() {
        squares.forEach(square => {
            square.addEventListener("click", main);
        })
    }
    
    function removeListener(element) {
        element.removeEventListener("click", main);
    }

    function renderBoard() {
        for(let i=0; i<9; i++) {
            squares[i].textContent = board[i];
        }
    }

    function updateBoardArray(element) {
        const index = Number(element.getAttribute("data-index"));
        if (SelectionScreen.player1.turn) {
            board[index] = SelectionScreen.player1.mark;
        }
        if (SelectionScreen.player2.turn) {
            board[index] = SelectionScreen.player2.mark;
        }
    }

    function main() {
        updateBoardArray(this)
        renderBoard();
        changeOpacity(this);
        changeTurns();
        checkWinner();
        declareResult();
        aiGameplay();
        removeListener(this);
    }

    // toggles the turn of each player
    function changeTurns() {
        SelectionScreen.player1.turn = !SelectionScreen.player1.turn;
        SelectionScreen.player2.turn = !SelectionScreen.player2.turn;
    }

    function changeOpacity(element) {
        element.style.color = "rgba(232, 90, 79, 1)"  // increasing the alpha value from 0 to 1 to make it appear slowly
    }

    function checkWinner() {
        const winCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        
        for (let i=0; i < winCombinations.length; i++) {
            if (board[winCombinations[i][0]] === "X" && board[winCombinations[i][1]] === "X" && board[winCombinations[i][2]] === "X") {
                SelectionScreen.player1.won = true;
            } else if (board[winCombinations[i][0]] === "O" && board[winCombinations[i][1]] === "O" && board[winCombinations[i][2]] === "O") {
                SelectionScreen.player2.won = true;
            }
        }
    }

    function checkTie() {
        if (!SelectionScreen.player1.won || !SelectionScreen.player2.won) {
            const isTie = board.every(square => {
                if (square) return true;
            })
            return isTie;
        }
    }

    function declareResult() {
                if (SelectionScreen.player1.won) {
                    setTimeout(function() {
                        alert(`${SelectionScreen.player1.player} is the Winner`);
                    }, 400)
                } else if (SelectionScreen.player2.won) {
                    setTimeout(function() {
                        alert(`${SelectionScreen.player2.player} is the Winner`);
                    }, 400)
                } else if (checkTie()) {
                    setTimeout(function() {
                        alert("It's a tie")
                    }, 400)
                }
    }
    
    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
    }

    function aiGameplay() {
        if (SelectionScreen.player2.isAi && SelectionScreen.player2.turn) {
            const emptySquares = Array.from(squares).filter(square => {
                if (!square.textContent) return true;
            })
            const randomIndex = Math.floor(Math.random() * emptySquares.length);
            setTimeout(function() {
                emptySquares[randomIndex].click();
            }, 300);

        }
    }

    return {
        renderBoard,
        addListeners,
    }
})();

const Controller = (function() {
})()

Gameboard.renderBoard();
Gameboard.addListeners();
