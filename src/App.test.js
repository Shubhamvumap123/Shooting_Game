import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Start Game button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Start Game/i);
  expect(linkElement).toBeInTheDocument();
});
