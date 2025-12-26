import { render, screen } from '@testing-library/react';
import App from './App';

// Mock HTMLCanvasElement.getContext
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    fillStyle: '',
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    fillText: jest.fn(),
  }));
});

test('renders Start Game button', () => {
  render(<App />);
  const startButton = screen.getByText(/Start Game/i);
  expect(startButton).toBeInTheDocument();
});

test('renders How to Play guide initially', () => {
  render(<App />);
  const guideTitle = screen.getByText(/How to Play/i);
  expect(guideTitle).toBeInTheDocument();
});

test('renders How to Play text', () => {
  render(<App />);
  const linkElement = screen.getByText(/How to Play/i);
  expect(linkElement).toBeInTheDocument();
});
