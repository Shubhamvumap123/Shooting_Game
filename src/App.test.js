import { render, screen } from '@testing-library/react';
import App from './App';

// Extensive Mock for Canvas API
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
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
  fillRect: jest.fn(),
  fillText: jest.fn(),
  clearRect: jest.fn(),
  drawImage: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  createLinearGradient: jest.fn(() => ({
    addColorStop: jest.fn(),
  })),
  shadowBlur: 0,
  shadowColor: '',
  fillStyle: '',
  globalAlpha: 1,
}));

HTMLCanvasElement.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 300,
  height: 150,
  left: 0,
  top: 0,
  bottom: 150,
  right: 300,
}));

test('renders Mission Brief initially', () => {
  render(<App />);
  const missionHeader = screen.getByText(/Mission Brief/i);
  expect(missionHeader).toBeInTheDocument();
});

test('renders Engage button', () => {
  render(<App />);
  const engageButton = screen.getByRole('button', { name: /ENGAGE/i });
  expect(engageButton).toBeInTheDocument();
});
