import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginScreen from "../loginScreen";
import axios from 'axios';
import userEvent from '@testing-library/user-event';

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

  

  

});
