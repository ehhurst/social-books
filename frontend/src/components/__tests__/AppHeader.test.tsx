import { render, screen, waitFor } from '@testing-library/react';
import AppHeader from '../AppHeader';
import { MemoryRouter } from 'react-router-dom';

const renderWithRouter = (ui: JSX.Element) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('AppHeader', () => {
  beforeEach(() => {
    sessionStorage.setItem('User', JSON.stringify({ first_name: 'Test' }));
    sessionStorage.setItem('access_token', 'fake-token');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  test('renders logo and nav elements', () => {
    renderWithRouter(<AppHeader />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

  test('shows Sign In and Register buttons when logged out', () => {
    sessionStorage.clear();
    renderWithRouter(<AppHeader />);
    expect(screen.getAllByText(/Sign In/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Register/i).length).toBeGreaterThan(0);
  });
  
  test('shows user info and logout when logged in', async () => {
    sessionStorage.setItem('User', JSON.stringify({ first_name: 'Test' }));
    renderWithRouter(<AppHeader />);
    await waitFor(() => {
      expect(screen.getAllByText(/Welcome, Test/i).length).toBeGreaterThan(0);
    });
    expect(screen.getAllByText(/Logout/i).length).toBeGreaterThan(0);
  });
  });
