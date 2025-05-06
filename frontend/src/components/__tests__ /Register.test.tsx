import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../Register';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Register Component', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('renders Register form and submits successfully', async () => {
    mockedAxios.post
      .mockResolvedValueOnce({ data: { access_token: 'fake_token' } }) // /auth/register
      .mockResolvedValueOnce({ data: { access_token: 'fake_token' } }) // /auth/login
      .mockResolvedValue({ data: {} }); // both /shelf calls

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        username: 'testuser',
        first_name: 'Test',
        last_name: 'User',
        goal: 0,
      },
    }); // /user

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: 'Test' },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: 'User' },
    });
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() =>
      expect(sessionStorage.getItem('access_token')).toBe('fake_token')
    );

    expect(sessionStorage.getItem('User')).toContain('testuser');
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
