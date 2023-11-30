import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, GroupAdd, Description, Assignment } from '@mui/icons-material';
import { toast } from "react-toastify";
import createProject from "../Assets/create-project.avif";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const PageContainer = styled('div')({
  minHeight: '100vh',
  // background: 'linear-gradient(to right, #6DD5FA50, #FF758C50)',
  display: 'flex',
  background:`url(${createProject})`,
  flexDirection: 'column',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  backgroundSize: 'cover',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
});

const TopBar = styled('div')({
  position: 'absolute',
  top: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '20px',
});

const BackButton = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'black',
  fontSize: '2.2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  '&:hover': {
    color: '#FF758C',
  },
});

const FormContainer = styled('div')({
  // background: 'white',
  padding: '40px',
  width:"550px",
  borderRadius: '20px',
  background:"#ffffff90",

  // boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
  maxWidth: '800px',
  animation: `${fadeIn} 1s ease-out`,
});

const FormTitle = styled('h3')({
  color: '#2c3e50',
  textAlign: 'center',
  marginBottom: '30px',
  fontSize: '1.5rem',
  // animation: `${pulseAnimation} 2s infinite`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const StyledInput = styled('input')({
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid #ced4da',
  outline: 'none',
  width: '100%', // Increased width
  '&::placeholder': {
    color: '#adb5bd',
  },
  '&:focus': {
    boxShadow: '0 0 0 2px #3498db',
  },
});

const StyledButton = styled('button')({
  padding: '15px 20px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  backgroundColor: '#3498db',
  color: '#ffffff',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
});

const StyledSelect = styled('select')({
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid #ced4da',
  outline: 'none',
  '&:focus': {
    boxShadow: '0 0 0 2px #3498db',
  },
});

const MemberSelectionContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const InlineButton = styled(StyledButton)({
  marginLeft: '10px',
  flexGrow: 0,
});

const CreateProjectForm = () => {

  const history = useNavigate();

  const handleGoBack = () => {
    history(-1);
  };

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

      let membersPayload = memberIds.map(id => membersList.find(member => member.id === id));

      const currentUser={
        name:JSON.parse(localStorage.getItem("user_creds"))?.name,
        row_id: JSON.parse(localStorage.getItem("user_creds"))?._id,
        id:23
      }
      // console.log("test",membersPayload)
      membersPayload.push(currentUser);

      // membersPayload={...membersPayload,}

      // console.log("mem",membersPayload)

      const response = await axios.post('http://localhost:5038/api/user/createProjects', {
        ...formData,
        members:membersPayload
        // members: memberIds.map(id => membersList.find(member => member.id === id)),
        // id: JSON.parse(localStorage.getItem("user_creds"))?._id
      });
      toast.success("Project Created");
      history('/projects/viewProjects');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get('http://localhost:5038/api/allUsers');
        const filteredMembers = response.data.filter((member) => member.name && member._id);
        const modifiedMembers = filteredMembers.map((member, index) => ({
          name: member.name,
          id: index,
          row_id: member._id,
        }));
        setMembersList(modifiedMembers);
        // console.log("membersList", membersList);
      } catch (error) {
        // console.error('Failed to fetch members:', error);
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
    // console.log(`Selected value at index ${index}: ${value}`);
    setMemberIds((currentMemberIds) =>
      currentMemberIds.map((id, idx) => (idx === index ? value : id))
    );
  };

  const handleAddMember = () => {
    setMemberIds((currentMemberIds) => [...currentMemberIds, null]);
  };

  return (
    <PageContainer>

      <TopBar>
        <BackButton onClick={handleGoBack}>
          <ArrowBack /> Back
        </BackButton>
      </TopBar>

      <FormContainer>
        <FormTitle>
          <Assignment style={{ marginRight: '10px' }} />
          Create New Project
        </FormTitle>
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
    </PageContainer>
  );
};

export default CreateProjectForm;
