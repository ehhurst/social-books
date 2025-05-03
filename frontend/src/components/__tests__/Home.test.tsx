import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';
import * as fetchModule from '../../hooks/fetch';

jest.mock('../../hooks/fetch');

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear(); // ensure no token is set
  });

  it('renders the welcome heading and description', () => {
    (fetchModule.getBook as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome to ShelfLife/i)).toBeInTheDocument();
    expect(screen.getByText(/Connect through your reading journey/i)).toBeInTheDocument();
  });

  it('shows loading state for example review', () => {
    (fetchModule.getBook as jest.Mock).mockReturnValue({
      data: undefined,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading review data/i)).toBeInTheDocument();
  });

  it('shows error message when fetch fails', () => {
    (fetchModule.getBook as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: "Some error",
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Error loading review/i)).toBeInTheDocument();
  });

  it('shows CTA buttons when user is not logged in', () => {
    (fetchModule.getBook as jest.Mock).mockReturnValue({
      data: undefined,
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText(/Ready to get started/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
