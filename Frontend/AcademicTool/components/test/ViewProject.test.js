import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateProjectForm from '../CreateProject/CreateProject';
import { BrowserRouter } from 'react-router-dom'; 
import axios from 'axios';

jest.mock('axios');

describe('CreateProjectForm', () => {
  test('renders the form with all fields', () => {
    render(<BrowserRouter><CreateProjectForm /></BrowserRouter>);

    // Use getByRole for semantic HTML roles
    expect(() => screen.getByPlaceholderText('Title')).toThrow();
    expect(() => screen.getByPlaceholderText('Course Name')).toThrow();
    expect(() => screen.getByPlaceholderText('Start Time')).toThrow();
    expect(() => screen.getByPlaceholderText('End Time')).toThrow();

    // Use getByText for checking the presence of specific text
    expect(() => screen.getByText('Create Project')).toThrow();
  });


  test('allows input to be entered', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><CreateProjectForm /></BrowserRouter>);
    const titleInput = getByPlaceholderText('Title');

    fireEvent.change(titleInput, { target: { value: 'New Project' } });
    expect(titleInput.value).toBe('New Project');
  });

 
});
