import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import NavBar from '../NavBar';
import CategoryPage from '../CategoryPage';
import CompetitionsPage from '../CompetitionsPage';
import Home from '../Home';

describe('NavBar Navigation', () => {
  afterEach(cleanup);

  function renderWithNav(startPath = '/') {
    return render(
      <MemoryRouter initialEntries={[startPath]}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories/fiction" element={<CategoryPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it('navigates to browse books page', () => {
    renderWithNav('/');
    fireEvent.click(screen.getByText('Browse Books'));
    expect(screen.getByText(/Fiction/i)).toBeInTheDocument();
  });

  it('navigates to home', () => {
    renderWithNav('/categories/fiction');
    fireEvent.click(screen.getByText('Home'));
    expect(screen.getByText(/Welcome to ShelfLife/i)).toBeInTheDocument();
  });

  it('navigates to competitions page', () => {
    renderWithNav('/');
    fireEvent.click(screen.getByText('Competitions'));
    expect(screen.getByText(/Competitions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Competition/i })).toBeInTheDocument();
  });

  it('renders Nav Bar', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Browse Books/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Competitions/i })).toBeInTheDocument();
  });
});
