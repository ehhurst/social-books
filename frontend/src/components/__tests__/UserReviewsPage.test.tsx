import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserReviewsPage from '../UserReviewsPage';
import { Review } from '../../types';

describe('UserReviewsPage', () => {
    it('renders User Reviews Page', () => {
      const review_1 : Review = {
        "review_id":"review_id1",
        "work_id":"work_id1",
        "username":"username1",
        "star_rating":1,
        "review_text":"review_text1",
        "liked":false
        }
      const review_2 : Review = {
        "review_id":"review_id2",
        "work_id":"work_id2",
        "username":"username2",
        "star_rating":2,
        "review_text":"review_text2",
        "liked":true
      }
      
        render(
            <BrowserRouter>
              <UserReviewsPage 
                reviewData={[review_1, review_2]}
                loading={true}
                error="none"
                />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Loading reviews.../i)).toBeInTheDocument();
    });
});