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
