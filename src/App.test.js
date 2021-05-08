import { render, screen } from '@testing-library/react';
import App from './App';

test('renders movie app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search for your favorites/);
  expect(linkElement).toBeInTheDocument();
});
