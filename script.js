const SelectionScreen = (function () {
  const playerFactory = function (player, mark, isAi, turn, won) {
    return {
      player,
      mark,
      isAi,
      turn,
      won,
    };
  };

  // creating the players
  const player1 = playerFactory("Player 1", "X", false, true, false);
  const player2 = playerFactory("Player 2", "O", false, false, false);

  // closing the selection screen after choosing opponent
  const human = document.querySelector(".human");
  const computer = document.querySelector(".computer");
  const turnText = document.querySelector(".turn");
  human.addEventListener("click", function () {
    turnText.style.display = "block";
    closeSelectionScreen();
  });
  computer.addEventListener("click", function () {
    turnText.style.display = "none";
    player2.player = "Computer";
    player2.isAi = true;
    closeSelectionScreen();
  });

  function closeSelectionScreen() {
    const selectionScreen = document.querySelector(".selection-screen");

    selectionScreen.style.opacity = "0";

    selectionScreen.addEventListener("transitionend", function setDisplay() {
      selectionScreen.style.display = "none";
      selectionScreen.removeEventListener("transitionend", setDisplay);
    });

    const container = document.querySelector(".container");
    container.style.display = "flex";
  }

  return {
    player1,
    player2,
    turnText,
  };
})();

const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""]; //array to hold the X and O's

  const squares = document.querySelectorAll(".square");

  function addListeners() {
    squares.forEach((square) => {
      square.addEventListener("click", main);
    });
  }

  function removeListener(element) {
    element.removeEventListener("click", main);
  }

  function removeAllListeners() {
    squares.forEach((square) => {
      square.removeEventListener("click", main);
    });
  }

  function renderBoard() {
    for (let i = 0; i < 9; i++) {
      squares[i].textContent = board[i];
    }
  }

  function updateBoardArray(element) {
    const index = Number(element.getAttribute("data-index"));
    if (SelectionScreen.player1.turn) {
      board[index] = SelectionScreen.player1.mark;
      SelectionScreen.turnText.textContent = `It's ${SelectionScreen.player2.player}'s Turn`;
    }
    if (SelectionScreen.player2.turn) {
      board[index] = SelectionScreen.player2.mark;
      SelectionScreen.turnText.textContent = `It's ${SelectionScreen.player1.player}'s Turn`;
    }
  }

  function main() {
    updateBoardArray(this);
    renderBoard();
    changeOpacity(this);
    changeTurns();
    checkWinner();
    showResult();
    aiGameplay();
    removeListener(this);
  }

  // toggles the turn of each player
  function changeTurns() {
    SelectionScreen.player1.turn = !SelectionScreen.player1.turn;
    SelectionScreen.player2.turn = !SelectionScreen.player2.turn;
  }

  function changeOpacity(element) {
    element.style.color = "rgba(232, 90, 79, 1)"; // increasing the alpha value from 0 to 1 to make it appear slowly
  }

  function checkWinner() {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombinations.length; i++) {
      if (
        board[winCombinations[i][0]] === "X" &&
        board[winCombinations[i][1]] === "X" &&
        board[winCombinations[i][2]] === "X"
      ) {
        SelectionScreen.player1.won = true;
      } else if (
        board[winCombinations[i][0]] === "O" &&
        board[winCombinations[i][1]] === "O" &&
        board[winCombinations[i][2]] === "O"
      ) {
        SelectionScreen.player2.won = true;
      }
    }
  }

  function checkTie() {
    if (!SelectionScreen.player1.won || !SelectionScreen.player2.won) {
      const isTie = board.every((square) => {
        if (square) return true;
      });
      return isTie;
    }
  }

  function showResult() {
    if (SelectionScreen.player1.won) {
      showOutcomeScreen(`${SelectionScreen.player1.player} Wins`);
    } else if (SelectionScreen.player2.won) {
      showOutcomeScreen(`${SelectionScreen.player2.player} Wins`);
    } else if (checkTie()) {
      showOutcomeScreen("It's a Tie");
    }
  }

  function showOutcomeScreen(string) {
    const outcomeScreen = document.querySelector(".outcome-bg");
    const outcomeText = outcomeScreen.querySelector("h2");
    outcomeText.textContent = string;
    setTimeout(function () {
      outcomeScreen.style.display = "flex";
    }, 350);
  }

  function closeOutcomeScreen() {
    const outcomeScreen = document.querySelector(".outcome-bg");
    outcomeScreen.style.display = "none";
  }

  function aiGameplay() {
    if (!SelectionScreen.player1.won && !SelectionScreen.player2.won) {
      if (SelectionScreen.player2.isAi && SelectionScreen.player2.turn) {
        const emptySquares = Array.from(squares).filter((square) => {
          if (!square.textContent) return true;
        });
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        setTimeout(function () {
          emptySquares[randomIndex].click();
        }, 300);
      }
    }
  }

  function resetBoard() {
    board = ["", "", "", "", "", "", "", "", ""];
    removeAllListeners();
    addListeners();
    renderBoard();
  }

  function resetPlayers() {
    SelectionScreen.player1.isAi = false;
    SelectionScreen.player1.turn = true;
    SelectionScreen.player1.won = false;

    SelectionScreen.player2.isAi = false;
    SelectionScreen.player2.turn = false;
    SelectionScreen.player2.won = false;
  }

  function switchScreens() {
    const selectionScreen = document.querySelector(".selection-screen");
    selectionScreen.style.opacity = "1";
    selectionScreen.style.display = "flex";

    const container = document.querySelector(".container");
    container.style.display = "none";
  }

  function newGame() {
    closeOutcomeScreen();
    switchScreens();
    resetPlayers();
    resetBoard();
  }

  return {
    renderBoard,
    addListeners,
    resetBoard,
    newGame,
  };
})();

const Resets = (function () {
  const restartButton = document.querySelector(".restart");
  restartButton.addEventListener("click", Gameboard.resetBoard);

  const newGameButton = document.querySelector(".new-game");
  newGameButton.addEventListener("click", Gameboard.newGame);
})();

Gameboard.renderBoard();
Gameboard.addListeners();
