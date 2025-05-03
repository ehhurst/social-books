import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('App Routing', () => {
  it('renders Home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument(); // Adjust if your Home has a specific welcome message
  });

  it('renders Books page at /books', () => {
    render(
      <MemoryRouter initialEntries={['/books']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Search by title or author/i)).toBeInTheDocument();
  });

  it('renders Competitions page at /competitions', () => {
    render(
      <MemoryRouter initialEntries={['/competitions']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Spring Reading Challenge/i)).toBeInTheDocument();
  });

  it('renders Not Found page for invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument(); // Or whatever text is in PageNotFound
  });
});
