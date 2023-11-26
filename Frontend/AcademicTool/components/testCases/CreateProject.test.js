import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateProjectForm from '../CreateProject/CreateProject';
import axios from 'axios';

jest.mock('axios');

describe('CreateProjectForm', () => {
  test('renders the form with all fields', () => {
    const { getByPlaceholderText, getByText } = render(<CreateProjectForm />);

    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Course Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Start Time')).toBeInTheDocument();
    expect(getByPlaceholderText('End Time')).toBeInTheDocument();
    expect(getByText('Create Project')).toBeInTheDocument();
  });

  test('allows input to be entered', () => {
    const { getByPlaceholderText } = render(<CreateProjectForm />);
    const titleInput = getByPlaceholderText('Title');

    fireEvent.change(titleInput, { target: { value: 'New Project' } });
    expect(titleInput.value).toBe('New Project');
  });

  test('submits the form with entered data', async () => {
    axios.post.mockResolvedValue({ data: 'Project Created' });

    const { getByPlaceholderText, getByText } = render(<CreateProjectForm />);
    fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'New Project' } });
    fireEvent.change(getByPlaceholderText('Course Name'), { target: { value: 'React Basics' } });
    fireEvent.change(getByPlaceholderText('Start Time'), { target: { value: '2023-01-01T10:00' } });
    fireEvent.change(getByPlaceholderText('End Time'), { target: { value: '2023-01-01T12:00' } });
    
    fireEvent.click(getByText('Create Project'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/projects', {
        title: 'New Project',
        courseName: 'React Basics',
        startTime: '2023-01-01T10:00',
        endTime: '2023-01-01T12:00'
      });
    });
  });

});
