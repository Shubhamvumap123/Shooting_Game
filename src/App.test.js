import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  // Mock HTMLCanvasElement.prototype.getContext
  // We use writable: true to allow overwriting if necessary
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
});

test('renders Start Game button', () => {
  // Mock getBoundingClientRect
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    width: 300,
    height: 150,
    top: 0,
    left: 0,
    bottom: 150,
    right: 300,
    x: 0,
    y: 0,
    toJSON: () => {}
  }));

  render(<App />);
  const startButton = screen.getByText(/Start Game/i);
  expect(startButton).toBeInTheDocument();
});

test('renders How to Play guide initially', () => {
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    width: 300,
    height: 150,
    top: 0,
    left: 0,
    bottom: 150,
    right: 300,
    x: 0,
    y: 0,
    toJSON: () => {}
  }));

  render(<App />);
  const guideTitle = screen.getByText(/How to Play/i);
  expect(guideTitle).toBeInTheDocument();
});
