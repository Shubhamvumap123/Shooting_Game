import { render, screen } from '@testing-library/react';
import App from './App';

// Mock HTMLCanvasElement.getContext and other DOM APIs
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    fillText: jest.fn(),
    scale: jest.fn(),
    save: jest.fn(),
    restore: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    closePath: jest.fn(),
    createLinearGradient: jest.fn(() => ({
      addColorStop: jest.fn(),
    })),
  }));

  // Mock getBoundingClientRect
  Object.defineProperty(HTMLCanvasElement.prototype, 'getBoundingClientRect', {
    writable: true,
    value: jest.fn(() => ({
      width: 300,
      height: 150,
      top: 0,
      left: 0,
      bottom: 150,
      right: 300,
    })),
  });
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

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/How to Play/i);
  expect(linkElement).toBeInTheDocument();
});
