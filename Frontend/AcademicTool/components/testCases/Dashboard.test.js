import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from "../Dashboard/Dashboard";
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation((path) => path),
}));

describe('Dashboard Component Tests', () => {
  const mockedNavigate = jest.fn();
  beforeEach(() => {
    render(<BrowserRouter><Dashboard /></BrowserRouter>);
  });

  test('renders all cards', () => {
    const cards = screen.getAllByRole('button');
    expect(cards.length).toBe(3); 
  });

  test('checks if the first card has correct title and image', () => {
    const firstCard = screen.getByText(/projects/i).closest('button');
    expect(firstCard).toHaveTextContent('Projects');
    expect(firstCard.querySelector('img')).toHaveAttribute('src', expect.stringContaining('project.jpeg'));
  });

  test('checks if the second card has correct title and image', () => {
    const secondCard = screen.getByText(/courses/i).closest('button');
    expect(secondCard).toHaveTextContent('Courses');
    expect(secondCard.querySelector('img')).toHaveAttribute('src', expect.stringContaining('course.png'));
  });

  test('checks if the third card has correct title and image', () => {
    const thirdCard = screen.getByText(/make a plan/i).closest('button');
    expect(thirdCard).toHaveTextContent('Make a Plan');
    expect(thirdCard.querySelector('img')).toHaveAttribute('src', expect.stringContaining('course1.png'));
  });

  test('navigates to the correct path when a card is clicked', () => {
    const firstCard = screen.getByText(/projects/i).closest('button');
    userEvent.click(firstCard);
    expect(mockedNavigate).toHaveBeenCalledWith('/projects');
  });

});
