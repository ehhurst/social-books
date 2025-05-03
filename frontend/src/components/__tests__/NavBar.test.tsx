import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../NavBar';

describe('NavBar', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
  });

  it('renders all navigation links with correct text', () => {
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Books/i)).toBeInTheDocument();
    expect(screen.getByText(/Book Clubs/i)).toBeInTheDocument();
    expect(screen.getByText(/Competitions/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it('has correct link destinations', () => {
    expect(screen.getByText(/Home/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/Books/i).closest('a')).toHaveAttribute('href', '/books');
    expect(screen.getByText(/Book Clubs/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/Competitions/i).closest('a')).toHaveAttribute('href', '/competitions');
    expect(screen.getByText(/Contact/i).closest('a')).toHaveAttribute('href', '/');
  });
});
