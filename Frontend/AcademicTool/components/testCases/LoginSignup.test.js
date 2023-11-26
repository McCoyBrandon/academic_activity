import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginSignup from "../LoginSignup";
import axios from 'axios';
import userEvent from '@testing-library/user-event';

jest.mock('axios');
const mockedNavigate = jest.fn();

// Mocking useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('LoginSignup Component Tests', () => {
  beforeEach(() => {
    render(<BrowserRouter><LoginSignup /></BrowserRouter>);
  });

  test('renders the Signup header', () => {
    const headerElement = screen.getByText(/signup/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('updates name input value correctly', () => {
    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'vineetha Doe' } });
    expect(nameInput.value).toBe('vineetha Doe');
  });

  test('updates email input value correctly', () => {
    const emailInput = screen.getByPlaceholderText('Email Id');
    fireEvent.change(emailInput, { target: { value: 'vineetha@example.com' } });
    expect(emailInput.value).toBe('vineetha@example.com');
  });

  test('updates password input value correctly', () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('navigates to login screen when login button is clicked', async () => {
    const loginButton = screen.getByTitle('login');
    userEvent.click(loginButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });

  test('handles form submission correctly', async () => {
    axios.post.mockResolvedValue({});

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'vineetha Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email Id'), { target: { value: 'vineetha@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByTitle('sign Up'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:5038/api/user/addUsers', {
        name: 'vineetha Doe',
        email: 'vineetha@example.com',
        password: 'password123'
      });
      expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
  });

});
