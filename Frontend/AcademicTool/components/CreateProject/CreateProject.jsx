import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const FormContainer = styled('div')({
  background: 'linear-gradient(45deg, #6DD5FA, #FF758C)',
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
  margin: 'auto',
  marginTop: '50px',
});

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const FormTitle = styled('h2')({
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: '30px',
    animation: `${pulseAnimation} 2s infinite`,
  });

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const StyledInput = styled('input')({
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    background: '#FFFFFF', 
    color: '#000000',
    '&::placeholder': { 
      color: '#000000',
      opacity: 1
    },
    '&:focus': {
      boxShadow: '0 0 0 2px #FF758C',
    },
  });
const StyledButton = styled('button')({
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#fff',
  color: '#6DD5FA',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#FF758C',
  },
});

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({ title: '', courseName: '', startTime: '', endTime: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/projects', formData);
      // Handle response
    } catch (error) {
      // Handle error
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <FormContainer>
      <FormTitle>Create New Project</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <StyledInput
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          placeholder="Course Name"
        />
        <StyledInput
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          placeholder='Start Time'
        />
        <StyledInput
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          placeholder='End Time'
        />
        <StyledButton type="submit">Create Project</StyledButton>
      </StyledForm>
    </FormContainer>
  );
};

export default CreateProjectForm;
