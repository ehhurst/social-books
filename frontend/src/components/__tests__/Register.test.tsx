import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../Register';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Register Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Register form and submits successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { access_token: 'fake_token' } });
    mockedAxios.post.mockResolvedValueOnce({ data: { access_token: 'fake_token' } });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() =>
      expect(localStorage.getItem('access_token')).toBe('fake_token')
    );
    expect(localStorage.getItem('username')).toBe('testuser');
  });

  test('shows error if fields are empty', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    expect(screen.getByText(/both username and password are required/i)).toBeInTheDocument();
  });

  test('displays API error message', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { error: 'Username taken' } },
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() =>
      expect(screen.getByText(/username taken/i)).toBeInTheDocument()
    );
  });
});
