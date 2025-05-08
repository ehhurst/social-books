import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewForm from '../ReviewForm';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockBook = {
  work_id: 'test-work-id',
  title: 'Test Book',
  img_M: 'https://covers.openlibrary.org/b/id/7222246-L.jpg'
};

beforeEach(() => {
  sessionStorage.setItem('access_token', 'mock_token');
  sessionStorage.setItem('User', JSON.stringify({ username: 'testuser' }));
});

afterEach(() => {
  jest.clearAllMocks();
  sessionStorage.clear();
});

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={[{ pathname: '/review', state: mockBook }]}>
      <Routes>
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('ReviewForm', () => {
  test('renders all form fields', () => {
    renderWithRouter();

    expect(screen.getByRole('img', { name: /book cover image/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getAllByRole('radio', { name: '' })).toHaveLength(5); // star ratings
    expect(screen.getByRole('checkbox')).toBeInTheDocument(); // liked checkbox
  });

  test('submits a review successfully', async () => {
    mockedAxios.post.mockResolvedValue({ data: { message: 'Success' } });

    renderWithRouter();

    fireEvent.click(screen.getAllByRole('radio')[2]); // 3-star
    fireEvent.click(screen.getByRole('checkbox')); // liked = true
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Loved it!' }
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/reviews',
        {
          work_id: 'test-work-id',
          star_rating: 3,
          review_text: 'Loved it!',
          liked: true
        },
        expect.objectContaining({
          headers: expect.objectContaining({ Authorization: 'Bearer mock_token' })
        })
      )
    );
  });

  test('shows error when submission fails', async () => {
    mockedAxios.post.mockRejectedValue(new Error('Server error'));

    renderWithRouter();

    fireEvent.click(screen.getAllByRole('radio')[2]); // 3-star
    fireEvent.click(screen.getByRole('checkbox')); // liked = true
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Did not work' }
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByText(/failed to submit review/i)).toBeInTheDocument()
    );
  });
});
