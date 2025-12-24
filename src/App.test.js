import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game instructions', () => {
  render(<App />);
  const instructionElement = screen.getByText(/How to Play/i);
  expect(instructionElement).toBeInTheDocument();
});
