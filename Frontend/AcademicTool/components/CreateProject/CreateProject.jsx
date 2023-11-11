import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

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

const StyledSelect = styled('select')({
  padding: '10px',
  borderRadius: '5px',
  border: 'none',
  outline: 'none',
  background: '#FFFFFF',
  color: '#000000',
  marginBottom: '10px',
});

const MemberSelectionContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '10px',
});

const InlineButton = styled(StyledButton)({
  marginLeft: '10px',
  flexGrow: 0,
});

// let membersList = [
//   { id: 1, name: 'Vineetha' },
//   { id: 2, name: 'Harish' },
//   { id: 3, name: 'Brandon' },
// ];

const CreateProjectForm = () => {

  const history = useNavigate();


  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    members: [],
  });

  const [membersList, setMembersList] = useState([]);


  const [memberIds, setMemberIds] = useState(['']);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5038/api/user/createProjects', {
        ...formData,
        members: memberIds.map(id => membersList.find(member => member.id === id)),
        userId: localStorage.getItem("user_id")
      });

      history('/projects/viewProjects');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  useEffect(() => {
    // Fetch members from the API
    async function fetchMembers() {
      try {
        const response = await axios.get('http://localhost:5038/api/allUsers');
        // Map the data to select only 'name' and 'id' properties
        const filteredMembers = response.data.filter((member) => member.name && member._id);
  
        const modifiedMembers = filteredMembers.map((member,index) => ({
          name: member.name,
          id: index,
          row_id:member._id,
        }));
        setMembersList(modifiedMembers);
  
        // Log the contents of membersList
        console.log("membersList", membersList);
      } catch (error) {
        console.error('Failed to fetch members:', error);
      }
    }
  
    fetchMembers();
  }, []);
  

  useEffect(() => {
    console.log("membersList", membersList)

  }, [membersList])




  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleMemberChange = (index) => (event) => {
    const value = Number(event.target.value);
    console.log(`Selected value at index ${index}: ${value}`);
    setMemberIds((currentMemberIds) =>
      currentMemberIds.map((id, idx) => (idx === index ? value : id))
    );
  };
  

  const handleAddMember = () => {
    setMemberIds((currentMemberIds) => [...currentMemberIds, null]);
  };

  return (
    <FormContainer>
      <FormTitle>Create New Project</FormTitle>
      <StyledForm onSubmit={handleSubmit}>

        <StyledInput
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          placeholder="Project Name"
        />

        <StyledInput
          type="text"
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
        />

        {memberIds.map((memberId, index) => (
          <MemberSelectionContainer key={index}>
            <StyledSelect
              value={memberId || ''}
              onChange={handleMemberChange(index)}
            >
              <option value="">Select Member</option>
              {membersList.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </StyledSelect>

            {index === memberIds.length - 1 && (
              <InlineButton type="button" onClick={handleAddMember}>
                Add Member
              </InlineButton>
            )}
          </MemberSelectionContainer>
        ))}

        <StyledButton type="submit">Create Project</StyledButton>
      </StyledForm>
    </FormContainer>
  );
};

export default CreateProjectForm;
