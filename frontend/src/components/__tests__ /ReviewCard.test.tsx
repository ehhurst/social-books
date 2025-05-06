import { render, screen, act } from '@testing-library/react';
import ReviewCard from '../ReviewCard';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const fakeReview = {
  review_id: 1,
  work_id: 'abc123',
  username: 'testuser',
  star_rating: 4,
  review_text: 'A very enjoyable book!',
  liked: false
};

const mockUser = {
  username: 'testuser',
  first_name: 'Test',
  last_name: 'User',
  goal: 5
};

const mockBookData = {
  work_id: 'abc123',
  img_M: 'https://example.com/book.jpg'
};

describe('ReviewCard Component', () => {
  beforeEach(() => {
    sessionStorage.setItem('User', JSON.stringify(mockUser));
    sessionStorage.setItem('access_token', 'fake_token');
    mockedAxios.get.mockResolvedValue({ data: mockBookData });
  });

  it('renders username and review text', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ReviewCard {...fakeReview} />
        </BrowserRouter>
      );
    });

    expect(await screen.findByText('testuser')).toBeInTheDocument();
    expect(await screen.findByText('A very enjoyable book!')).toBeInTheDocument();
  });

  it("shows delete/edit icons for user's own review", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <ReviewCard {...fakeReview} />
        </BrowserRouter>
      );
    });

    expect(await screen.findByTestId('delete-icon')).toBeInTheDocument();
    expect(await screen.findByTestId('edit-icon')).toBeInTheDocument();
  });

  it("hides delete/edit icons for other users' reviews", async () => {
    const otherReview = { ...fakeReview, username: 'someone_else' };

    await act(async () => {
      render(
        <BrowserRouter>
          <ReviewCard {...otherReview} />
        </BrowserRouter>
      );
    });

    expect(screen.queryByTestId('delete-icon')).not.toBeInTheDocument();
    expect(screen.queryByTestId('edit-icon')).not.toBeInTheDocument();
  });
});
