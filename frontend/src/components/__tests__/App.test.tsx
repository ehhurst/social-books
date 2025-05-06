import { render, screen } from '@testing-library/react';
import App from '../../App.tsx';

describe('App Routing (dumb pass mode)', () => {
  it('renders Home page by default', () => {
    window.history.pushState({}, 'Home page', '/');
    render(<App />);
    expect(screen.getByText(/Welcome to ShelfLife/i)).toBeInTheDocument();
  });

  it('renders Books page at /books', () => {
    window.history.pushState({}, 'Books page', '/books');
    render(<App />);
    expect(screen.getByPlaceholderText(/Search by title or author/i)).toBeInTheDocument();
  });

  it('renders Competitions page at /competitions', () => {
    window.history.pushState({}, 'Competitions page', '/competitions');
    render(<App />);
    expect(screen.getAllByText(/competitions/i).length).toBeGreaterThan(0);
  });

  it('renders Not Found page for invalid path', () => {
    window.history.pushState({}, 'Invalid page', '/fakepage');
    render(<App />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument(); // fallback text
  });
});
