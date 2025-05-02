import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReviewFormEdit from '../ReviewFormEdit';

describe('ReviewFormEdit', () => {
    it('renders Review Form', () => {
        render(
            <BrowserRouter>
              <ReviewFormEdit 
                review_id="review_id"
                work_id="work_id"
                username="username"
                star_rating={3}
                review_text="review_text"
                liked={true} 
                />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/My Review for /i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Rating: /i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Liked: /i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i})).toBeInTheDocument();
    });
});