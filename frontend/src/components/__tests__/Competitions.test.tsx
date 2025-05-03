import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Competitions from '../Competitions';
import { BrowserRouter } from 'react-router-dom';

describe('Competitions Page', () => {
  test('renders competition info', () => {
    render(
      <BrowserRouter>
        <Competitions />
      </BrowserRouter>
    );

    expect(screen.getByText(/Spring Reading Challenge/i)).toBeInTheDocument();
    expect(screen.getByText(/Read as many books as you can this spring/i)).toBeInTheDocument();
    expect(screen.getByText(/Organized by the Book Club/i)).toBeInTheDocument();
    expect(screen.getByText(/Ends: May 30, 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/Participants: 32/i)).toBeInTheDocument();
  });

  test('renders books and Mark as Completed buttons', () => {
    render(
      <BrowserRouter>
        <Competitions />
      </BrowserRouter>
    );

    expect(screen.getByText(/Books/i)).toBeInTheDocument();
    expect(screen.getByText(/1984/i)).toBeInTheDocument();
    expect(screen.getByText(/George Orwell/i)).toBeInTheDocument();
    expect(screen.getByText(/Brave New World/i)).toBeInTheDocument();
    expect(screen.getByText(/Aldous Huxley/i)).toBeInTheDocument();

    // Should have two "Mark as Completed" buttons
    const completeButtons = screen.getAllByText(/Mark as Completed/i);
    expect(completeButtons.length).toBe(2);
  });

  test('renders leaderboard with user highlight', () => {
    render(
      <BrowserRouter>
        <Competitions />
      </BrowserRouter>
    );

    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
    expect(screen.getByText(/reader1/i)).toBeInTheDocument();
    expect(screen.getByText(/reader2/i)).toBeInTheDocument();
    expect(screen.getAllByText(/you/i)[0]).toBeInTheDocument();

    const highlightedUser = screen.getByText(/you/i).closest('.user-card');
    expect(highlightedUser).toHaveClass('highlight');
  });

  test('Back button calls window.history.back', () => {
    const backSpy = jest.spyOn(window.history, 'back').mockImplementation(() => {});
    render(
      <BrowserRouter>
        <Competitions />
      </BrowserRouter>
    );

    const backButton = screen.getByRole('button', { name: /Back/i });
    fireEvent.click(backButton);
    expect(backSpy).toHaveBeenCalled();
    backSpy.mockRestore();
  });
});
