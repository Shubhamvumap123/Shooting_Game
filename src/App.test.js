import { render, screen } from '@testing-library/react';
import App from './App';

// Mock canvas getContext
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    fillText: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    fill: jest.fn(),
    arc: jest.fn(),
    scale: jest.fn(),
    createLinearGradient: jest.fn(() => ({
      addColorStop: jest.fn(),
    })),
  }));
  // Also mock getBoundingClientRect for the resize logic
  HTMLCanvasElement.prototype.getBoundingClientRect = jest.fn(() => ({
    width: 300,
    height: 150,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }));
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

test('renders navigation keys', () => {
  render(<App />);
  expect(screen.getByText('W')).toBeInTheDocument();
  expect(screen.getByText('↑')).toBeInTheDocument();
});
