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
        board[randomRowIndex][randomColumnIndex] = 'B';
    }
    

    
    return board;   
}