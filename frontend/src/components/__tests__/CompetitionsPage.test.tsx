import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompetitionsPage from '../CompetitionsPage';

describe('CompetitionsPage', () => {
    it('renders Competitions Page', () => {
        render(
            <BrowserRouter>
              <CompetitionsPage />
            </BrowserRouter>
          );
    

    expect(screen.getByText(/Competitions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Competition/i})).toBeInTheDocument();
    
    });
  });