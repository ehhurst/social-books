import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BookDetailCard from '../BookDetailCard';
import { BookItem, CompetitionBookListItem, User } from '../../types';

describe('BookDetailCard', () => {
    it('renders Detail Card', () => {
      const book_details: BookItem = {
        "title":"title",
        "author":"author",
        "work_id":"work_id", 
        "description":"description",
        "img_S":"img_S",
        "img_M":"img_M",
        "img_L":"img_L"
      }
        render(
            <BrowserRouter>
              <BookDetailCard 
                book={book_details}
                avgRating="3"
                />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Average Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estimated Read Time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Mark As Read/i})).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /New Review/i})).toBeInTheDocument(); // + is a special character
  }); 
});