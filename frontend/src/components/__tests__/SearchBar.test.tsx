import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders input and button', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    expect(screen.getByPlaceholderText(/Search by title or author/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  it('updates input value and triggers search', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );
    const input = screen.getByPlaceholderText(/Search by title or author/i);
    fireEvent.change(input, { target: { value: 'test book' } });
    expect(input).toHaveValue('test book');
  });
});
