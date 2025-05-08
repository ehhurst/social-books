import { render, screen } from '@testing-library/react';
import CompStatus from '../CompStatus';
import { MemoryRouter } from 'react-router-dom';
import { ListStore } from '../../Contexts/CompetitionBookListContext';

test('renders competition status panel', () => {
  render(
    <ListStore.Provider value={{ compList: [{}, {}, {}], dispatch: jest.fn() }}>
      <MemoryRouter>
        <CompStatus />
      </MemoryRouter>
    </ListStore.Provider>
  );

  expect(screen.getByText(/# Books Added/i)).toBeInTheDocument();
  expect(screen.getByText(/Edit List/i)).toBeInTheDocument();
  expect(screen.getByText(/I'm Finished Adding Books/i)).toBeInTheDocument();
});
