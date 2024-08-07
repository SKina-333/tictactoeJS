function gameBoard () {
    const rows=3;
    const cols=3;
    const board=[];

    for (let i=0; i<rows; i++) {
        board[i] = [];
        for (let j=0; j<cols; j++) {
            board[i].push(Cell());
        }
    }

    //get the board
    const getBoard = () => board;


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

    return {makeMove, printBoard, isMoveValid};
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
    };

    const playRound = (row,col) => {
        
        if (board.isMoveValid(row, col)) {

            console.log(
                `Placing ${getCurrentPlayer().name}'s mark into row ${row} , column ${col}.`
            );


            board.makeMove(row, col, getCurrentPlayer().mark);
            if (checkWinCondition()){
                console.log(`${getCurrentPlayer().name} wins!`);
                resetGame();
            }else if(checkDrawCondition()){
                console.log('It\'s a draw!');
                resetGame();
            }else {
                switchPlayerTurn();
                printNewRound(); 
            }
            
        }else {
            console.log('Invalid Move');
        }

    };

    function checkWinCondition() {
        for (let row = 0; row < 3; row++) {
            if(board[row][0].getValue() === getCurrentPlayer().mark && board[row][1].getValue() === getCurrentPlayer().mark && board[row][2].getValue() === getCurrentPlayer().mark) {
                return true;
            }
        }

        for (let col = 0; col < 3; col++) {
            if(board[0][col].getValue() === getCurrentPlayer().mark && board[1][col].getValue() === getCurrentPlayer().mark && board[2][col].getValue() === getCurrentPlayer().mark) {
                return true;
            }
        }

        if (board[0][0].getValue() === getCurrentPlayer().mark && board[1][1].getValue() === getCurrentPlayer().mark && board[2][2].getValue() === getCurrentPlayer().mark) {
            return true;
        }

        if (board[0][2].getValue() === getCurrentPlayer().mark && board[1][1].getValue() === getCurrentPlayer().mark && board[2][0].getValue() === getCurrentPlayer().mark) {
            return true;
        }

        return false;
    }

    function checkDrawCondition(){
        for(let row = 0; row < 3; row++){
            for(let col = 0; col < 3; col++){
                if (board[row][col].getValue()=== ''){
                    return false
                }
            }
        }
        return true
    }

    function resetGame(){
        board = [];
        for (let i=0; i<rows; i++) {
            board[i] = [];
            for (let j=0; j<cols; j++) {
                board[i].push(Cell());
            }
        }
        currentPlayer = players[0];
    }

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

const game = gameController();