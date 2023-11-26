import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ViewProject from '../ViewProject/ViewProject';

jest.mock('axios');

describe('ViewProject', () => {
  test('renders project cards from API', async () => {
    const mockProjects = [
      { id: 1, title: 'Project One', description: 'This is the first project.' },
      { id: 2, title: 'Project Two', description: 'This is the second project.' },
    ];

    axios.get.mockResolvedValue({ data: mockProjects });

    const { getByText } = render(<ViewProject />);

    await waitFor(() => {
      mockProjects.forEach(project => {
        expect(getByText(project.title)).toBeInTheDocument();
        expect(getByText(project.description)).toBeInTheDocument();
      });
    });
  });

  test('handles API error', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    // Render component and assert on error handling behavior
    // e.g., displaying an error message to the user
  });

});
