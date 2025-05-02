import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserNetwork from '../UserNetwork';
import { User } from "../../types";

describe('UserNetwork', () => {
    it('renders User Network', () => {
        const user_1: User = {
          "username":"connorb24",
          "first_name":"Connor",
          "last_name":"Burch",
          "goal":5
        }
        const user_2: User = {
          "username":"bens21",
          "first_name":"Ben",
          "last_name":"Sullivan",
          "goal":6
        }

        render(
            <BrowserRouter>
              <UserNetwork 
              initialState="initialState"
              followers={[user_1, user_2]}
              following={[user_1, user_2]}
              />
            </BrowserRouter>
          );
    

    expect(screen.getByLabelText(/Followers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Following/i)).toBeInTheDocument();
    });
});