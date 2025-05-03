// __tests__/ReaderProfilePage.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ReaderProfilePage from "../../components/ReaderProfilePage";
import * as fetchHook from '../../hooks/fetch';
import { MemoryRouter } from 'react-router-dom';

// Mock localStorage and navigation
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: '' }),
}));

describe('ReaderProfilePage', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('access_token', 'fake-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders loading state then review list', async () => {
    jest.spyOn(fetchHook, 'getReviewsForUser').mockReturnValue({
      reviewData: [
        {
          review_id: '1',
          work_id: '123',
          username: 'testuser',
          rating: 4,
          reviewText: 'Great book!',
          liked: true,
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ReaderProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Welcome to your profile testuser/i)).toBeInTheDocument();
      expect(screen.getByText(/My Reviews/i)).toBeInTheDocument();
      expect(screen.getByText(/Great book!/i)).toBeInTheDocument();
    });
  });

  it('renders error message if fetch fails', async () => {
    jest.spyOn(fetchHook, 'getReviewsForUser').mockReturnValue({
      reviewData: [],
      loading: false,
      error: 'Failed to fetch',
    });

    render(
      <MemoryRouter>
        <ReaderProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('renders no reviews message when list is empty', async () => {
    jest.spyOn(fetchHook, 'getReviewsForUser').mockReturnValue({
      reviewData: [],
      loading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <ReaderProfilePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No reviews yet/i)).toBeInTheDocument();
    });
  });
});
