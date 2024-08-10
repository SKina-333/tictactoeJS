var messageBox = document.querySelector('.message');
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.play');
    if (startButton) {
        startButton.addEventListener('click', () => {
            messageBox.textContent = 'GAME STARTED!! (X\'s turn)';
            gameController();
            startButton.style.display = 'none';
        });
    } else {
        console.log('Start button not found.');
    }
});

function gameBoard () {
    const rows=3;
    const cols=3;
    let board=[];

    for (let i=0; i<rows; i++) {
        board[i] = [];
        for (let j=0; j<cols; j++) {
            board[i].push(Cell());
        }
    }

    //get the board
    const getBoard = () => board;

    const setBoard = (newBoard) => {
        board = newBoard;
    }


    //Checks if move is a valid move
    const isMoveValid = (row,col) => {
        return board[row][col].getValue() === '';
    };

    const makeMove = (row,col,currentPlayer) => {
        return board[row][col].addMove(currentPlayer);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {makeMove, printBoard, isMoveValid, getBoard ,setBoard};
}

function gameController (playerOne = "Player One", playerTwo = "Player Two"){
    //container players, responsible for switching turns, 
    //play turn, check win conditions

    const board = gameBoard()

    const players = [
        {
            name:playerOne,
            mark: "X"
        },
        {
            name:playerTwo,
            mark: "O"
        }
    ]

    let currentPlayer = players[0];
    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const getCurrentPlayer = () => currentPlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getCurrentPlayer().name}'s turn.`);
        messageBox.textContent = `${getCurrentPlayer().name}'s turn.`;
    };

    const playRound = (row,col) => {
        
        if (board.isMoveValid(row, col)) {

            console.log(
                `Placing ${getCurrentPlayer().name}'s mark into row ${row} , column ${col}.`
            );
            messageBox.textContent = `Placing ${getCurrentPlayer().name}'s mark into row ${row} , column ${col}.`


            board.makeMove(row, col, getCurrentPlayer().mark);
            if (checkWinCondition()){
                console.log(`${getCurrentPlayer().name} wins!`);
                messageBox.textContent = `${getCurrentPlayer().name} wins!`
                resetGame();
            }else if(checkDrawCondition()){
                console.log('It\'s a draw!');
                messageBox.textContent = 'It\'s a draw!'
                resetGame();
            }else {
                updateBoardUI();
                switchPlayerTurn();
                printNewRound(); 
            }
            
        }else {
            console.log('Invalid Move');
            messageBox.textContent = 'Invalid Move';
        }

    };

    function checkWinCondition() {
        for (let row = 0; row < 3; row++) {
            if(board.getBoard()[row][0].getValue() === getCurrentPlayer().mark && board.getBoard()[row][1].getValue() === getCurrentPlayer().mark && board.getBoard()[row][2].getValue() === getCurrentPlayer().mark) {
                return true;
            }
        }

        for (let col = 0; col < 3; col++) {
            if(board.getBoard()[0][col].getValue() === getCurrentPlayer().mark && board.getBoard()[1][col].getValue() === getCurrentPlayer().mark && board.getBoard()[2][col].getValue() === getCurrentPlayer().mark) {
                return true;
            }
        }

        if (board.getBoard()[0][0].getValue() === getCurrentPlayer().mark && board.getBoard()[1][1].getValue() === getCurrentPlayer().mark && board.getBoard()[2][2].getValue() === getCurrentPlayer().mark) {
            return true;
        }

        if (board.getBoard()[0][2].getValue() === getCurrentPlayer().mark && board.getBoard()[1][1].getValue() === getCurrentPlayer().mark && board.getBoard()[2][0].getValue() === getCurrentPlayer().mark) {
            return true;
        }

        return false;
    }

    function checkDrawCondition(){
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                if (board.getBoard()[row][col].getValue()=== ''){
                    return false
                }
            }
        }
        return true
    }

    function resetGame(){
        
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                board.getBoard()[i][j].addMove('');
            }
        }
        
        currentPlayer = players[0];
        updateBoardUI();
    }

    const updateBoardUI = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellValue = board.getBoard()[row][col].getValue();
                document.getElementById(`cell-${row}-${col}`).textContent = cellValue;
            }
        }
    };

    

    const userClickListeners = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellElement = document.getElementById(`cell-${row}-${col}`);
                cellElement.addEventListener('click', () => {
                    playRound(row, col);
                });
            }
        }

        const restartButton = document.getElementById('restart');
        restartButton.addEventListener('click', () => {
            resetGame();
            messageBox.textContent = 'GAME RESET (X\'s turn)';
        });
    };


    userClickListeners();

    return {playRound, getCurrentPlayer, checkWinCondition, checkDrawCondition, resetGame};
}

function Cell() {
    let value = '';

    const addMove = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addMove, getValue};
}

