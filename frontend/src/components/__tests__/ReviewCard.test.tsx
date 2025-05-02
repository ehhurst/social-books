import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReviewCard from '../ReviewCard';

describe('ReviewCard', () => {
    it('renders Review Card', () => {
        render(
            <BrowserRouter>
              <ReviewCard 
                review_id="review_id"
                work_id="work_id"
                username="username"
                star_rating={3}
                review_text="review_text"
                liked={true}
              />
            </BrowserRouter>
          );
    });

});