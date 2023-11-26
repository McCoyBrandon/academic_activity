import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProjectsPage from "../Projects/ProjectsPage";
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation((path) => path),
}));

describe('ProjectsPage Component Tests', () => {
  const mockedNavigate = jest.fn();
  beforeEach(() => {
    render(<BrowserRouter><ProjectsPage /></BrowserRouter>);
  });

  test('renders all cards', () => {
    const cards = screen.getAllByRole('button');
    expect(cards.length).toBe(2);
  });

  test('checks if the first card has correct title and image', () => {
    const firstCard = screen.getByText(/projects/createProject/i).closest('button');
    expect(firstCard).toHaveTextContent('Create Project');
    expect(firstCard.querySelector('img')).toHaveAttribute('src', expect.stringContaining('viewMyProj.png'));
  });

  test('checks if the second card has correct title and image', () => {
    const secondCard = screen.getByText(/projects/viewProjects/i).closest('button');
    expect(secondCard).toHaveTextContent('Vew Projects');
    expect(secondCard.querySelector('img')).toHaveAttribute('src', expect.stringContaining('createMyProj.webp'));
  });

  test('navigates to the correct path when the first card is clicked', () => {
    const firstCard = screen.getByText(/projects/createProject/i).closest('button');
    userEvent.click(firstCard);
    expect(mockedNavigate).toHaveBeenCalledWith('/projects/createProject');
  });

  test('navigates to the correct path when the second card is clicked', () => {
    const secondCard = screen.getByText(/projects/viewProjects/i).closest('button');
    userEvent.click(secondCard);
    expect(mockedNavigate).toHaveBeenCalledWith('/projects/viewProjects');
  });

});
