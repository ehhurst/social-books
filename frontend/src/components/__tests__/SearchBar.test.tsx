import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('SearchBar Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  test('renders input and button correctly', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText('Search by title or author')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('navigates to correct URL on submit with input', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Search by title or author');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Orwell' } });
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith('/books?search=Orwell&limit=9');
  });

  test('does not navigate on empty input', () => {
    render(
      <BrowserRouter>
        <SearchBar />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
