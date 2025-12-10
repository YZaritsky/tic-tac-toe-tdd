import {render, screen, fireEvent} from '@testing-library/react';
import App from "./App.jsx";

test('Renders Tic Tac Toe heading', () => {
    render(<App/>);
    const [headingElement] = screen.getAllByRole('heading');
    expect(headingElement).toHaveTextContent('Tic Tac Toe');
})

test('Render tic tac toe table', () => {
    render(<App/>);
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(9);
})

test('Should render current player', () => {
    render(<App/>);
    const playerElement = screen.getByText(/Current Player/i);
    expect(playerElement).toBeInTheDocument();
})

test('Cell click - should render current player', async () => {
    render(<App/>);
    const [cell1, cell2] = screen.getAllByRole('cell');
    expect(cell1).toBeEmptyDOMElement();
    fireEvent.click(cell1)
    expect(cell1).toHaveTextContent('X');
    fireEvent.click(cell1)
    expect(cell1).toHaveTextContent('X');
    fireEvent.click(cell2)
    expect(cell2).toHaveTextContent('O');
})

test('Should show winner', () => {
    render(<App/>);
    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    expect(screen.getByText(/Winner is/i)).toBeInTheDocument();
})

test('Should end with draw', () => {
    render(<App/>);
    const cells = screen.getAllByRole('cell');
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[1]); // O
    fireEvent.click(cells[2]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[3]); // X
    fireEvent.click(cells[5]); // O
    fireEvent.click(cells[7]); // X
    fireEvent.click(cells[6]); // O
    fireEvent.click(cells[8]); // X
    expect(screen.getByText(/Game Over/i)).toBeInTheDocument();
})
