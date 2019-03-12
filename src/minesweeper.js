class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }
    get playerBoard() {
        return this._playerBoard;
    }

    flipTile() {
        flipTile = (rowIndex, columnIndex) => {
            if(this._playerBoard[rowIndex][columnIndex] !== ' ') {
                console.log('This tile has already been flipped!');
                return;
            } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            }
        }
        this._numberOfTiles--;
    }
}



const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    const board = [];
    for(i = 0; i < numberOfRows; i++) {
        let row = [];
        for (col = 0; col < numberOfColumns; col++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
}

// console.log(generatePlayerBoard(4, 4));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    const board = [];
    for(i = 0; i < numberOfRows; i++) {
        let row = [];
        for (col = 0; col < numberOfColumns; col++) {
            row.push(null);
        }
        board.push(row);
    }
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        if (board[randomRowIndex][randomColumnIndex] !== 'B'){
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
            // check later if already bomb placed
        } 
    }

    return board;   
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [ 
            [-1, -1], 
            [-1, 0], 
            [-1, 1], 
            [0, -1], 
            [0, 1], 
            [1, -1], 
            [1, 0], 
            [1, 1] 
        ];   
    
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;

    var numberOfBombs = 0;

    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];

        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
             neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                        numberOfBombs++;
                }
        }
    });
    return numberOfBombs;
};



const printBoard = board => {
    console.log(board.map(row  => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');
printBoard(playerBoard);