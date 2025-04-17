import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

describe('Register', () => {
    it('renders Register', () => {
        render(
            <BrowserRouter>
              <Register />
            </BrowserRouter>
          );
    });

    expect(screen.getByLabelText(/First Name/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Last Name/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Username/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Password/i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Register/i}).toBeInTheDocument());
    expect(screen.getByLabelText(/Already have an account?/i).toBeInTheDocument());
    expect(screen.getByRole('Link', { name: /Sign In/i}).toBeInTheDocument());
    
});