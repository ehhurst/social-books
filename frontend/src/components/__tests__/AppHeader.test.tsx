// src/components/__tests__/AppHeader.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AppHeader from '../AppHeader';
import { BrowserRouter } from 'react-router-dom';

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('AppHeader', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders logo and nav elements', () => {
    renderWithRouter(<AppHeader />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Books/i)).toBeInTheDocument();
  });

  test('shows Sign In and Register buttons when logged out', () => {
    renderWithRouter(<AppHeader />);
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

  test('shows user info and logout when logged in', () => {
    localStorage.setItem('access_token', 'test_token');
    localStorage.setItem('username', 'TestUser');
    renderWithRouter(<AppHeader />);
    expect(screen.getByText(/Welcome, TestUser/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });
});
