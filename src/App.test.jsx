import {render, screen} from '@testing-library/react';
import App from "./App.jsx";

test('Renders Tic Tac Toe heading', () => {
    render(<App/>);
    const headingElement = screen.getByRole('heading');
    expect(headingElement).toHaveTextContent('Vite + React');
})
