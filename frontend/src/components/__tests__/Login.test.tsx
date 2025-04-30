import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByTypeText(/text/i).toBeInTheDocument());
    expect(screen.getByNameText(/username/i).toBeInTheDocument());
    expect(screen.getByIdText(/username/i).toBeInTheDocument());
    expect(screen.getByLabelText(/Password/i).toBeInTheDocument());
    expect(screen.getByLabelText(/password/i).toBeInTheDocument());
    expect(screen.getByNameText(/password/i).toBeInTheDocument());
    expect(screen.getByIdText(/password/i).toBeInTheDocument());
    expect(screen.getByRole('button', { name: /Sign in/i}).toBeInTheDocument());
    expect(screen.getByLabelText(/Don't have an account?/i).toBeInTheDocument());
    expect(screen.getByRole('Link', { name: /Sign up/i}).toBeInTheDocument());

    it('updates username entry', () => {
        render(
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        )
        const input = screen.getByNameText(/username/i);
        fireEvent.change(input, { target: { value: 'connorb24' } });
        expect(input.toHaveValue('connorb24'));
    })

    it('updates password entry', () => {
        render(
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        )
        const input = screen.getByNameText(/password/i);
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input.toHaveValue('test'));
    })
    });
    
});