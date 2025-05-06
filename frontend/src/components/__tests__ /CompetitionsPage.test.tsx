import { render, screen } from '@testing-library/react';
import CompetitionsPage from '../CompetitionsPage';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  sessionStorage.setItem('access_token', 'mockToken');
});

test('renders competitions page with create button', () => {
  render(
    <MemoryRouter>
      <CompetitionsPage />
    </MemoryRouter>
  );

  // Use getAllByText and assert at least one match
  expect(screen.getAllByText(/Competitions/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('button', { name: /Create Competition/i })).toBeInTheDocument();
});
