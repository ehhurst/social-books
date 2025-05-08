import { render, screen } from '@testing-library/react';
import Home from '../Home';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Home Component', () => {
  it('renders the welcome heading and description', () => {
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByRole('heading', { name: /Welcome to ShelfLife/i })).toBeInTheDocument();
    expect(screen.getByText(/Connect through your reading journey/i)).toBeInTheDocument();
  });

  it('shows CTA buttons when user is not logged in', () => {
    sessionStorage.clear();
    render(<Home />, { wrapper: MemoryRouter });
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
  });
});
