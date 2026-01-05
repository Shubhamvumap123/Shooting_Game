import { render, screen, fireEvent } from '@testing-library/react';
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
    rotate: jest.fn(),
    translate: jest.fn(),
    shadowColor: '',
    shadowBlur: 0,
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

test('shows Pause overlay when Escape is pressed during game', () => {
  render(<App />);

  // 1. Start the game by clicking "ENGAGE"
  const startButton = screen.getByText(/ENGAGE/i);
  fireEvent.click(startButton);

  // 2. Press Escape
  fireEvent.keyDown(document, { code: 'Escape' });

  // 3. Check for "PAUSED" text
  const pauseText = screen.getByText(/PAUSED/i);
  expect(pauseText).toBeInTheDocument();

  // 4. Press Escape again to resume
  fireEvent.keyDown(document, { code: 'Escape' });
  expect(pauseText).not.toBeInTheDocument();
});
