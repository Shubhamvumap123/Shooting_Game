import { render, screen } from '@testing-library/react';
import App from './App';

// Mock canvas getContext
HTMLCanvasElement.prototype.getContext = jest.fn(() => {
  return {
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    fillStyle: '',
    fillRect: jest.fn(),
  };
});

test('renders Start Game button', () => {
  render(<App />);
  const startButton = screen.getByText(/ENGAGE/i);
  expect(startButton).toBeInTheDocument();
});

test('renders Mission Brief guide initially', () => {
  render(<App />);
  const guideTitle = screen.getByText(/Mission Brief/i);
  expect(guideTitle).toBeInTheDocument();
});
