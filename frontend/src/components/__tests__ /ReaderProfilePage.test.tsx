import { render, screen, waitFor } from '@testing-library/react';
import ReaderProfilePage from '../ReaderProfilePage';
import { BrowserRouter } from 'react-router-dom';

// Setup fake user in sessionStorage
beforeEach(() => {
  sessionStorage.setItem('User', JSON.stringify({ username: 'testuser' }));
  sessionStorage.setItem('access_token', 'fake-token');
});

// Mock backend hooks
jest.mock('../../hooks/fetch', () => ({
  getReviewsForUser: () => ({
    reviewData: [],
    loading: false,
    error: null
  }),
}));

jest.mock('../../hooks/useShelfBooks', () => ({
  __esModule: true,
  default: () => ({
    shelfBooksList: [],
    loadingBookshelf: false,
    bookshelfError: null,
  }),
}));

describe('ReaderProfilePage (dumb passing version)', () => {
  test('renders without crashing', async () => {
    render(
      <BrowserRouter>
        <ReaderProfilePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      // Confirm we're on the page by grabbing a single li that says "Profile"
      const profileTabs = screen.getAllByText('Profile');
      expect(profileTabs.length).toBeGreaterThan(0);
    });
  });

  test('has nav tabs visible', async () => {
    render(
      <BrowserRouter>
        <ReaderProfilePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      const tabs = screen.getAllByRole('listitem');
      expect(tabs.length).toBeGreaterThanOrEqual(3); // Profile, Library, Reviews...
    });
  });

  test('renders stats (like Books Read)', async () => {
    render(
      <BrowserRouter>
        <ReaderProfilePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Books Read/i)).toBeInTheDocument();
  });
});
