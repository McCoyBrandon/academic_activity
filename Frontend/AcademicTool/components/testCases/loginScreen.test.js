import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
// import LoginScreen from "../loginScreen";
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import LoginScreen from '../LoginScreen';

jest.mock('axios');
const mockedNavigate = jest.fn();

// Mocking useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('LoginScreen Component Tests', () => {
  beforeEach(() => {
    render(<BrowserRouter><LoginScreen /></BrowserRouter>);
  });

  test('renders the Login header', () => {
    const headerElement = screen.getByText("/");
    expect(headerElement).toBeInTheDocument();
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

  test('navigates to signup when signup button is clicked', async () => {
    const signupButton = screen.getByText('/');
    userEvent.click(signupButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  test('handles form submission correctly', async () => {
    axios.get.mockResolvedValue({ data: { email: 'vineetha@example.com', password: 'password123' } });

    fireEvent.change(screen.getByPlaceholderText('Email Id'), { target: { value: 'vineetha@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('vineetha@example.com'));
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('password123'));
    });
  });

});
