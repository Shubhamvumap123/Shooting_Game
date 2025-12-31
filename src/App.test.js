import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  // Mock getContext
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    writable: true,
    value: jest.fn(() => ({
      save: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      fill: jest.fn(),
      arc: jest.fn(),
      scale: jest.fn(),
      strokeRect: jest.fn(),
      fillText: jest.fn(),
      clearRect: jest.fn(),
      drawImage: jest.fn(),
      createLinearGradient: jest.fn(() => ({
        addColorStop: jest.fn(),
      })),
      fillStyle: '',
      shadowBlur: 0,
      shadowColor: '',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    })),
  });

  // Mock getBoundingClientRect
  Object.defineProperty(HTMLCanvasElement.prototype, 'getBoundingClientRect', {
    writable: true,
    value: jest.fn(() => ({
      width: 300,
      height: 150,
      top: 0,
      left: 0,
      right: 300,
      bottom: 150,
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
