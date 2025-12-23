import { render, screen } from '@testing-library/react';
import App from './App';

// Mock HTMLCanvasElement.getContext
HTMLCanvasElement.prototype.getContext = jest.fn();

test('renders How to Play guide', () => {
  render(<App />);
  const linkElement = screen.getByText(/How to Play/i);
  expect(linkElement).toBeInTheDocument();
});
