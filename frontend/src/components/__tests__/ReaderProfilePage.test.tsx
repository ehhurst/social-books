import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReaderProfilePage from '../ReaderProfilePage';

describe('ReaderProfilePage', () => {
  it('renders welcome message and username', () => {
    localStorage.setItem('username', 'testuser');

    render(
      <BrowserRouter>
        <ReaderProfilePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome to your profile!/i)).toBeInTheDocument();
    expect(screen.getByText(/Your username: testuser/i)).toBeInTheDocument();
  });
});
