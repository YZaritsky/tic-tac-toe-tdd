import './App.css'
import {useState} from "react";
import {getWinner, isBoardFull} from "./utils.js";

const Cell = ({val, onCellClick}) => {
    return (
        <td onClick={onCellClick}>{val}</td>
    )
}

const Row = ({cells, onCellClick, index}) => {
    return (
        <tr>
            {cells.map((val, cellIndex) =>
                <Cell
                    key={cellIndex}
                    val={val}
                    onCellClick={() => onCellClick(index, cellIndex)}
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
    const [winner, setWinner] = useState(false);

    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const onCellClick = (row, col) => {
        if (board[row][col] === null && !winner) {
            const newBoard = cloneBoard(board);
            newBoard[row][col] = currentPlayer;
            setBoard(newBoard);
            const winnerSign = getWinner(newBoard);

            if (winnerSign) {
                setWinner(winnerSign);
                setIsGameOver(true);
            } else if (isBoardFull(newBoard)) {
                setIsGameOver(true);
            } else {
                togglePlayer();
            }
        }
    }

    const message = winner ? `Winner is: ${winner}` : isGameOver ? 'Game Over' : `Current player is: ${currentPlayer}`;

    return (
        <body>
        <header>
            <h1>Tic Tac Toe</h1>
            <h2>{message}</h2>
            <table>
                <tbody>
                {board.map((cells, index) => (
                    <Row key={index} index={index} cells={cells} onCellClick={onCellClick}/>
                ))}
                </tbody>
            </table>
        </header>
        </body>
    )
}

export default App
