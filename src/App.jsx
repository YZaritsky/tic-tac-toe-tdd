import './App.css'
import {useState} from "react";
import {getWinner, isBoardFull} from "./utils.js";

const Cell = ({val, onCellClick, isWinning, isDisabled}) => {
    const cellClass = `cell ${val === 'X' ? 'cell-x' : val === 'O' ? 'cell-o' : ''} ${isWinning ? 'winning-cell' : ''} ${isDisabled ? 'disabled' : ''}`;
    return (
        <td className={cellClass} onClick={onCellClick}>{val}</td>
    )
}

const Row = ({cells, onCellClick, index, winningCells, isDisabled}) => {
    const isWinningCell = (row, col) => {
        return winningCells?.some(([r, c]) => r === row && c === col) || false;
    };
    
    return (
        <tr>
            {cells.map((val, cellIndex) =>
                <Cell
                    key={cellIndex}
                    val={val}
                    onCellClick={() => onCellClick(index, cellIndex)}
                    isWinning={isWinningCell(index, cellIndex)}
                    isDisabled={isDisabled}
                />
            )}
        </tr>
    )
}

const initBoard = (n) => {
    const board = [];
    for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < n; j++) {
            row.push(null);
        }
        board.push(row);
    }
    return board;
}

const cloneBoard = (board) => {
    return board.map(row => [...row]);
}

function App() {
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [board, setBoard] = useState(initBoard(3));
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState(null);

    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const resetGame = () => {
        setBoard(initBoard(3));
        setCurrentPlayer('X');
        setIsGameOver(false);
        setWinner(null);
        setWinningCells(null);
    }

    const onCellClick = (row, col) => {
        if (board[row][col] === null && !winner) {
            const newBoard = cloneBoard(board);
            newBoard[row][col] = currentPlayer;
            setBoard(newBoard);
            const winResult = getWinner(newBoard);

            if (winResult) {
                setWinner(winResult.winner);
                setWinningCells(winResult.positions);
                setIsGameOver(true);
            } else if (isBoardFull(newBoard)) {
                setIsGameOver(true);
            } else {
                togglePlayer();
            }
        }
    }

    const message = winner ? `Winner is: ${winner}` : isGameOver ? 'Game Over - Draw!' : `Current player is: ${currentPlayer}`;

    return (
        <body>
        <header>
            <h1>Tic Tac Toe</h1>
            <h2>{message}</h2>
            <table>
                <tbody>
                {board.map((cells, index) => (
                    <Row 
                        key={index} 
                        index={index} 
                        cells={cells} 
                        onCellClick={onCellClick}
                        winningCells={winningCells}
                        isDisabled={isGameOver}
                    />
                ))}
                </tbody>
            </table>
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </header>
        </body>
    )
}

export default App
