import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import LoginSignup from "../LoginSignup";

// test('renders the Signup header', () => {
//   render( <BrowserRouter><LoginSignup /></BrowserRouter>);
//   const headerElement = screen.getByText('Signup');
//   expect(headerElement).toBeInTheDocument();
// });

test('updates name input value correctly', () => {
  render(<BrowserRouter><LoginSignup /></BrowserRouter>);
  const nameInput = screen.getByPlaceholderText('Name');
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  expect(nameInput.value).toBe('John Doe');
});

test('updates email input value correctly', () => {
  render(<BrowserRouter><LoginSignup /></BrowserRouter>);
  const emailInput = screen.getByPlaceholderText('Email Id');
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  expect(emailInput.value).toBe('john@example.com');
});

test('updates password input value correctly', () => {
  render(<BrowserRouter><LoginSignup /></BrowserRouter>);
  const passwordInput = screen.getByPlaceholderText('Password');
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  expect(passwordInput.value).toBe('password123');
});

// test('calls handleFormSubmit and handleSubmit when signup button is clicked', () => {
//   const mockHandleFormSubmit = jest.fn();
//   const mockHandleSubmit = jest.fn();

//   render(<BrowserRouter><LoginSignup handleFormSubmit={mockHandleFormSubmit} handleSubmit={mockHandleSubmit} /></BrowserRouter>);

//   const signupButton = screen.getByTitle('sign Up');
//   fireEvent.click(signupButton);

//   expect(mockHandleFormSubmit).toHaveBeenCalled();
//   expect(mockHandleSubmit).toHaveBeenCalled();
// });

test('navigates to loginScreen when the login button is clicked', () => {
  const navigateTo = jest.fn();
  render(<BrowserRouter><LoginSignup navigateTo={navigateTo} /></BrowserRouter>);

  const loginButton = screen.getByTitle('login');
  fireEvent.click(loginButton);

  expect(navigateTo).toHaveBeenCalledWith('/loginScreen');
});
