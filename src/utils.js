export const isBoardFull = (board) => {
    return board.every(row => row.every(cell => cell !== null));
}

const isRowWin = (board, player) => {
    for (let row = 0; row < board.length; row++) {
        if (board[row].every(cell => cell === player)) {
            return board[row].map((_, col) => [row, col]);
        }
    }
    return null;
}

const isColumnWin = (board, player) => {
    for (let col = 0; col < board.length; col++) {
        if (board.every(row => row[col] === player)) {
            return board.map((_, row) => [row, col]);
        }
    }
    return null;
}

const isForwardDiagonalWin = (board, player) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][i] !== player) {
            return null;
        }
    }
    return board.map((_, i) => [i, i]);
}

const isBackwardDiagonalWin = (board, player) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][board.length - 1 - i] !== player) {
            return null;
        }
    }
    return board.map((_, i) => [i, board.length - 1 - i]);
}

const isDiagonalWin = (board, player) => {
    return isForwardDiagonalWin(board, player) || isBackwardDiagonalWin(board, player);
}

const getWinningPositions = (board, player) => {
    return isRowWin(board, player) || isColumnWin(board, player) || isDiagonalWin(board, player);
}

export const getWinner = (board) => {
    const xWin = getWinningPositions(board, 'X');
    if (xWin) return { winner: 'X', positions: xWin };
    
    const oWin = getWinningPositions(board, 'O');
    if (oWin) return { winner: 'O', positions: oWin };
    
    return null;
}
