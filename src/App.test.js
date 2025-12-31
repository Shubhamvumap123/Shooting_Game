import { render, screen } from '@testing-library/react';
import App from './App';

// Mock canvas getContext
beforeAll(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
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
    })),
    writable: true,
  });

  Object.defineProperty(HTMLCanvasElement.prototype, 'getBoundingClientRect', {
      value: jest.fn(() => ({
          width: 300,
          height: 150,
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
