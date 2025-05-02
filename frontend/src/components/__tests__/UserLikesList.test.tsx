import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserLikesList from '../UserLikesList';

describe('UserLikesList', () => {
    it('renders User Likes List', () => {
        render(
            <BrowserRouter>
              <UserLikesList 
                likedBookIds={["book1", "book2"]}
              />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Loading.../i)).toBeInTheDocument();
    });
});