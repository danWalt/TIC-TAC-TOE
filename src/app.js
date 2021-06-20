// player factory
const Player = (symbol) => {
    const getSymbol = () => symbol;

    return {getSymbol}
}

// only one instance of gameboard
const gameBoard = (() => {

    const topLeft = document.getElementById('0')
    const topMid = document.getElementById('1')
    const topRight = document.getElementById('2')
    const midLeft = document.getElementById('3')
    const center = document.getElementById('4')
    const midRight = document.getElementById('5')
    const botLeft = document.getElementById('6')
    const botMid = document.getElementById('7')
    const botRight = document.getElementById('8')
    const gameArray =[[topLeft, topMid, topRight], [midLeft, center, midRight], [botLeft, botMid, botRight]]


    const resetBoard = () => {
        for (let i = 0; i < gameBoard.gameArray.length; i++) {
            for (let j = 0; j < gameBoard.gameArray.length; j++) {
                gameArray[j][i].innerText =''
            }
        }
    }

    return {gameArray,resetBoard}

})();


// only one instance of game. The following includes player creation and gameplay
const game = (() => {
    const playerX = Player('X')
    const playerO = Player('O')
    let gameOver = false

    let currentPlayer = playerX

    gameBoard.gameArray.forEach(row  => {
        row.forEach(cell => {
            cell.addEventListener('click', () => {
                if(cell.innerText === '' && !gameOver){
                    cell.innerText = currentPlayer.getSymbol()
                    if(checkWinner(currentPlayer.getSymbol())){
                        announceWinner()
                    }
                    currentPlayer = changePlayer()
                }
            })
        })    
    });

    function getPlayerO(){
        return playerO
    }

    function getPlayerX(){
        return playerX
    }

    function getCurrentPlayer(){
        return currentPlayer
    }

    function setCurrentPlayer(player) {
        currentPlayer = player
    }

    function changePlayer(){
        if (currentPlayer === playerX) {
            return playerO
        }
        return playerX
    }

    function checkWinner(playerSymbol){
        if(checkRows(playerSymbol) ||
        checkColumns(playerSymbol) || 
        checkLeftDiagonal(playerSymbol) ||
        checkRightDiagonal(playerSymbol)) {
            return true
        }
        return false
    }

    //check if row is a winner
    function checkRows(playerSymbol){
        let counter = 0;
        for (let i = 0; i < gameBoard.gameArray.length; i++) {
            if(counter == 3){
                return true
            }
            counter = 0
            for (let j = 0; j < gameBoard.gameArray.length; j++) {
                if (gameBoard.gameArray[i][j].innerText != playerSymbol) {
                    counter = 0;
                    break;
                }
                counter += 1
            }
        }
        if(counter == 3){
            return true
        }
        return false
    }

    // check if column is a winner
    function checkColumns(playerSymbol){
        let counter = 0;
        for (let i = 0; i < gameBoard.gameArray.length; i++) {
            if(counter == 3){
                return true
            }
            counter = 0
            for (let j = 0; j < gameBoard.gameArray.length; j++) {
                if (gameBoard.gameArray[j][i].innerText != playerSymbol) {
                    counter = 0;
                    break;
                }
                counter += 1
            }
        }
        if(counter == 3){
            return true
        }
        return false
    }


    // check if left diagonal is a winner
    function checkLeftDiagonal(playerSymbol){
        let counter = 0;
        for (let i = 0; i < gameBoard.gameArray.length; i++) {
            if(counter == 3){
                return true
            }
                if (gameBoard.gameArray[i][i].innerText == playerSymbol) {
                    counter += 1
                }
                else {
                    counter = 0
                }
        }
        if(counter == 3){
            return true
        }
        return false
    }



    // TODO: fix right diagonal
    // check if right diagonal is a winner
    function checkRightDiagonal(playerSymbol){
        let counter = 0;
        for (let i = 2; i >= 0; i--) {
            if(counter == 3){
                return true
            }
            if (gameBoard.gameArray[i][i].innerText == playerSymbol) {
                counter += 1
            }
            else {
                counter = 0
            }
        }
        if(counter == 3){
            return true
        }
        return false
    }

    function announceWinner() {
        console.log('gratz')
        gameOver = true
    }


    function resetGame(){
        setCurrentPlayer(getPlayerX())
    }

    function setgameOver(value){
        gameOver = value
    }

return {
    resetGame,
    setgameOver
    }    

})();




document.getElementById('restart').addEventListener('click', () => {
    gameBoard.resetBoard()
    game.resetGame()
    game.setgameOver(false)
})
