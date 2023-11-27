import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import CreateProjectForm from '../CreateProject/CreateProject';
import axios from 'axios';

jest.mock('axios');

describe('CreateProjectForm', () => {
  test('renders the form with all fields', () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <CreateProjectForm />
      </BrowserRouter>
    );
  
    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Course Name')).toBeTruthy();
    expect(getByPlaceholderText('Start Time')).toBeTruthy();
    expect(getByPlaceholderText('End Time')).toBeTruthy();
    expect(getByText('Create Project')).toBeTruthy();
  });
  test('allows input to be entered', () => {
    const { getByPlaceholderText } = render(<BrowserRouter><CreateProjectForm /></BrowserRouter>);
    const titleInput = getByPlaceholderText('Title');

    fireEvent.change(titleInput, { target: { value: 'New Project' } });
    expect(titleInput.value).toBe('New Project');
  });

 

});
