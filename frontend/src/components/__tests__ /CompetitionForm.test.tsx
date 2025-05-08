import { render, screen } from '@testing-library/react';
import CompetitionForm from '../CompetitionForm';
import { MemoryRouter } from 'react-router-dom';
import { ListStore } from '../../Contexts/CompetitionBookListContext';

beforeEach(() => {
  sessionStorage.setItem('User', JSON.stringify({ username: 'john_doe' }));
  sessionStorage.setItem('access_token', 'mockToken');
});

test('renders competition form and title field', () => {
  render(
    <ListStore.Provider value={{ compList: [], dispatch: jest.fn() }}>
      <MemoryRouter>
        <CompetitionForm />
      </MemoryRouter>
    </ListStore.Provider>
  );

  expect(screen.getByText(/Create Competition/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Competition Name/i)).toBeInTheDocument();
});
