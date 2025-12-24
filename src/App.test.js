import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders How to Play guide', () => {
  render(<App />);
  const titleElement = screen.getByText(/How to Play/i);
  expect(titleElement).toBeInTheDocument();

  // Find start game button
  const startButton = screen.getByText(/Start Game/i);
  expect(startButton).toBeInTheDocument();

  // Click start game to close modal
  fireEvent.click(startButton);

  // Verify modal is gone (optional, but good for interaction test)
  expect(screen.queryByText(/How to Play/i)).not.toBeInTheDocument();
});
