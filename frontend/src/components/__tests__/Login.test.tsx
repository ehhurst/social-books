import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

describe('Login', () => {
    it('renders Login', () => {
        render(
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          );
    });

    expect(screen.getByLabelText(/Username/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Password/i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Sign in/i}).toBeInTheDocument());
    expect(screen.getByLabelText(/Don't have an account?/i).toBeInTheDocument());
    expect(screen.getByRole('Link', { name: /Sign up/i}).toBeInTheDocument());

    
});