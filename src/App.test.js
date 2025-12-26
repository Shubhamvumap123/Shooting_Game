import { render, screen } from '@testing-library/react';
import App from './App';

// Mock HTMLCanvasElement.getContext
beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    clearRect: jest.fn(),
    drawImage: jest.fn(),
    fillRect: jest.fn(),
    strokeRect: jest.fn(),
    fillText: jest.fn(),
    // Add other methods used in your app
  }));
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/How to Play/i);
  expect(linkElement).toBeInTheDocument();
});
