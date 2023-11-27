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

  
});
