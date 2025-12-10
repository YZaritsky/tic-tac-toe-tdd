import './App.css'
import {useState} from "react";

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

    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const onCellClick = (row, col) => {
        if (board[row][col] === null) {
            const newBoard = cloneBoard(board);
            newBoard[row][col] = currentPlayer;
            setBoard(newBoard);
            togglePlayer();
        }
    }

    return (
        <body>
        <header>
            <h1>Tic Tac Toe</h1>
            <h1 data-testid="current-player">Current Player: {currentPlayer}</h1>
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
