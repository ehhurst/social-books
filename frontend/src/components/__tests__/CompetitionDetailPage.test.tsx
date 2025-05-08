import { render, screen } from '@testing-library/react';
import CompetitionDetailPage from '../CompetitionDetailPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockLocationState = {
  contest_name: 'Test Contest',
  organizer: 'john_doe',
  end_date: '2025-06-01',
  book_count: 5
};

beforeEach(() => {
  sessionStorage.setItem('User', JSON.stringify({ username: 'john_doe' }));
  sessionStorage.setItem('access_token', 'mockToken');
});

test('renders competition detail page with heading', () => {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/competitions/Test Contest', state: mockLocationState }]}>
      <Routes>
        <Route path="/competitions/:name" element={<CompetitionDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/Test Contest/i)).toBeInTheDocument();
  expect(screen.getByText(/Organized by/i)).toBeInTheDocument();
});
