import { render, screen } from '@testing-library/react';
import App from './App';

// Mock canvas getContext
const mockContext = {
  clearRect: jest.fn(),
  drawImage: jest.fn(),
  fillStyle: '',
  fillRect: jest.fn(),
  strokeRect: jest.fn(),
  fillText: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  scale: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  createLinearGradient: jest.fn(() => ({
    addColorStop: jest.fn(),
  })),
  shadowBlur: 0,
  shadowColor: '',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
};

// Mock getBoundingClientRect
beforeAll(() => {
  // Override HTMLCanvasElement.prototype.getContext
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: jest.fn(() => mockContext),
    writable: true,
  });

  // Override HTMLCanvasElement.prototype.getBoundingClientRect
  Object.defineProperty(HTMLCanvasElement.prototype, 'getBoundingClientRect', {
    value: jest.fn(() => ({
      width: 300,
      height: 150,
      top: 0,
      left: 0,
      bottom: 150,
      right: 300,
    })),
    writable: true,
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
