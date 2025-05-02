import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchResultsPage from '../SearchResultsPage';

describe('SearchResultsPage', () => {
    it('renders Search Results Page', () => {
        render(
            <BrowserRouter>
              <SearchResultsPage />
            </BrowserRouter>
          );
    

    expect(screen.getByText(/Loading books... /i)).toBeInTheDocument();
    });
});