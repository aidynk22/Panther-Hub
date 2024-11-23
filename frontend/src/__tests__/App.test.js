import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Panther Hub!/i);
  expect(linkElement).toBeInTheDocument();
});

test('navigates to login page', () => {
  render(<App />);
  const loginButton = screen.getByText(/Login/i);
  loginButton.click();
  expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
});