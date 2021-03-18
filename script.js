const SelectionScreen = (function() {
    
    const playerFactory = function(player, mark, isAi) {
        return {
            player,
            mark,
            isAi
        }
    }

    // creating the players
    const player1 = playerFactory("Player 1", "X", false);
    const player2 = playerFactory("Player 2", "O", false);
    
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
    let board = ["", "", "", "", "", "", "", "", ""];
})();

const Controller = (function() {

})()

