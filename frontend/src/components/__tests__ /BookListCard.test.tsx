import { render, screen } from '@testing-library/react';
import BookListCard from '../BookListCard';
import { BookItem } from '../../types';
import { MemoryRouter } from 'react-router-dom';

const mockBook: BookItem = {
  work_id: 'OL12345W',
  title: 'Brave New World',
  author: 'Aldous Huxley',
  description: 'A futuristic dystopia where technology dominates society.',
  img_S: 'https://via.placeholder.com/50',
  img_M: 'https://via.placeholder.com/150',
  img_L: 'https://via.placeholder.com/300',
  reading_Time: 5,
};

describe('BookListCard', () => {
  it('renders title, author, description, and cover image', () => {
    render(
      <MemoryRouter>
        <BookListCard {...mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    expect(screen.getByText(/by/i)).toBeInTheDocument();
    expect(screen.getByText(mockBook.author)).toBeInTheDocument();
    expect(screen.getByText(/See more/)).toBeInTheDocument();

    const image = screen.getByAltText(/Book cover image/i);
    expect(image).toHaveAttribute('src', mockBook.img_M);
  });

  it('renders a shortened description preview', () => {
    render(
      <MemoryRouter>
        <BookListCard {...mockBook} />
      </MemoryRouter>
    );

    expect(screen.getByText(/See more/)).toBeInTheDocument();
    expect(screen.getByText(/futuristic dystopia/i)).toBeInTheDocument();
  });

  it('renders links to detail page using work_id', () => {
    render(
      <MemoryRouter>
        <BookListCard {...mockBook} />
      </MemoryRouter>
    );

    const titleLink = screen.getByRole('link', { name: mockBook.title });
    expect(titleLink).toHaveAttribute('href', `/books/${mockBook.work_id}`);
  });
});
