// src/components/__tests__/BookListPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import BookListPage from '../BookListPage';
import * as fetchHook from '../../hooks/fetch';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../hooks/fetch');

const mockedBooks = [
  {
    title: 'Book One',
    author: 'Author One',
    work_id: 'book-1',
    img_S: '',
    img_M: '',
    img_L: '',
    description: 'First book description',
    reading_Time: 5,
  },
  {
    title: 'Book Two',
    author: 'Author Two',
    work_id: 'book-2',
    img_S: '',
    img_M: '',
    img_L: '',
    description: 'Second book description',
    reading_Time: 4,
  },
];

describe('BookListPage', () => {
  it('displays loading state', () => {
    (fetchHook.getBooks as jest.Mock).mockReturnValue({ data: [], loading: true, error: null });

    render(
      <BrowserRouter>
        <BookListPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading books.../i)).toBeInTheDocument();
  });

  it('displays error state', () => {
    (fetchHook.getBooks as jest.Mock).mockReturnValue({ data: [], loading: false, error: 'Failed to load books' });

    render(
      <BrowserRouter>
        <BookListPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Failed to load books/i)).toBeInTheDocument();
  });

  it('displays book cards when data is present', async () => {
    (fetchHook.getBooks as jest.Mock).mockReturnValue({ data: mockedBooks, loading: false, error: null });

    render(
      <BrowserRouter>
        <BookListPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Book One')).toBeInTheDocument();
      expect(screen.getByText('Book Two')).toBeInTheDocument();
    });
  });

  it('shows no books found when data is empty', () => {
    (fetchHook.getBooks as jest.Mock).mockReturnValue({ data: [], loading: false, error: null });

    render(
      <BrowserRouter>
        <BookListPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/No books found/i)).toBeInTheDocument();
  });
});
