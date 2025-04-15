
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReviewForm from '../ReviewForm';

describe('ReviewForm', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('access_token', 'Bearer mocktoken');
    localStorage.setItem('currentBookOLID', 'OL1234567M');
  });

  it('renders form fields and submit button', () => {
    render(
      <BrowserRouter>
        <ReviewForm />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Review/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('fills in form fields and clicks submit', () => {
    render(
      <BrowserRouter>
        <ReviewForm />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Rating/i), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText(/Review/i), { target: { value: 'Amazing book!' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    // Expectation will depend on how the form handles submission.
    // For now, we're just checking the form behavior.
  });
});
