import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReviewForm from '../ReviewForm';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Book mock
const bookMock = {
  work_id: '123',
  title: 'Test Book',
  author: 'Author',
  description: 'A great book',
  img_M: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
  img_S: '',
  img_L: '',
  reading_Time: 5,
};

// Mock useLocation globally (must be outside describe block)
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ state: bookMock }),
}));

describe('ReviewForm', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => {
          if (key === 'username') return 'testuser';
          if (key === 'access_token') return 'mocked_token';
          return null;
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    );

    expect(screen.getByText(/My Review for/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating:/)).toBeInTheDocument();
    expect(screen.getByText(/Liked:/)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('submits a review successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole('radio')[2]); // 3-star
    screen.getByRole("checkbox")
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Loved it!' },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "/reviews",
        {
          work_id: "123",
          star_rating: 3,
          review_text: "Loved it!",
          liked: false, // match actual behavior
        },
        expect.anything()
      )
      );
      
    expect(await screen.findByText('Review submitted!')).toBeInTheDocument();
  });

  it('shows error when submission fails', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Failed'));

    render(
      <MemoryRouter>
        <ReviewForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Did not work' },
    });
    fireEvent.click(screen.getByText('Submit'));

    expect(await screen.findByText('Failed to submit review')).toBeInTheDocument();
  });
});
