import './App.css'
import {useState} from "react";

const Cell = ({currentPlayer, toggleCurrentPlayer}) => {
    const [val, setVal] = useState(null);

    const onClickHandler = () => {
        if (val === null) {
            setVal(currentPlayer);
            toggleCurrentPlayer();
        }
    }

    return (
        <td onClick={onClickHandler}>{val}</td>
    )
}

const Row = ({currentPlayer, toggleCurrentPlayer}) => {
    return (
        <tr>
            {[1, 2, 3].map(index =>
                <Cell
                    key={index}
                    currentPlayer={currentPlayer}
                    toggleCurrentPlayer={toggleCurrentPlayer}
                />
            )}
        </tr>
    )
}

function App() {
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    return (
        <body>
        <header>
            <h1>Tic Tac Toe</h1>
            <h1 data-testid="current-player">Current Player: {currentPlayer}</h1>
            <table>
                <tbody>
                {[1, 2, 3].map(row => (
                    <Row key={row} currentPlayer={currentPlayer} toggleCurrentPlayer={togglePlayer}/>
                ))}
                </tbody>
            </table>
        </header>
        </body>
    )
}

export default App
