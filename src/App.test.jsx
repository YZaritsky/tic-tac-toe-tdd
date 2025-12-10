import {render, screen, fireEvent} from '@testing-library/react';
import App from "./App.jsx";

test('Renders Tic Tac Toe heading', () => {
    render(<App/>);
    const headingElement = screen.getByRole('heading');
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

test('Cell should render click counter', async () => {
    render(<App/>);
    const [cell] = screen.getAllByRole('cell');
    expect(cell).toHaveTextContent('0');
    fireEvent.click(cell)
    expect(cell).toHaveTextContent('1');
    fireEvent.click(cell)
    expect(cell).toHaveTextContent('2');
})
