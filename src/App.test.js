import { render, screen } from '@testing-library/react';
import App from './App';

test('renders How to Play header', () => {
  render(<App />);
  const headerElement = screen.getByText(/How to Play/i);
  expect(headerElement).toBeInTheDocument();
});
