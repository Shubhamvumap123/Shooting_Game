import { render, screen } from '@testing-library/react';
import App from './App';

test('renders how to play guide', () => {
  render(<App />);
  const linkElement = screen.getByText(/How to Play/i);
  expect(linkElement).toBeInTheDocument();
});
