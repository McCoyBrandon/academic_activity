import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack, GroupAdd, Description, Assignment } from '@mui/icons-material';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageContainer = styled('div')({
  minHeight: '100vh',
  background: 'linear-gradient(to right, #6DD5FA50, #FF758C50)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
});

const FormContainer = styled('div')({
  background: 'white',
  padding: '40px',
  borderRadius: '15px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  width: '450px',
  margin: 'auto',
  marginTop: '20px',
  animation: `${fadeIn} 1s ease-out`,
});

const FormTitle = styled('h2')({
  color: '#333',
  textAlign: 'center',
  marginBottom: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
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


const CreateTask = () => {

    const [projectDetails, setProjectDetails] = useState({});
    const navigate = useNavigate();
    const [membersList, setMembersList] = useState([]);


    useEffect(() => {
        const storedProjectDetails = localStorage.getItem('projectDetails')?localStorage.getItem('projectDetails'):{};
        if (storedProjectDetails) {
            setProjectDetails(JSON.parse(storedProjectDetails));
            setMembersList((JSON.parse(storedProjectDetails)?.members))
        }
        console.log("membersList",membersList)
    }, []);


    const [formData, setFormData] = useState({
        projectName: '',
        description: '',
        members: [],
        startDate: '',
        endDate: '',
    });


    const [memberIds, setMemberIds] = useState(['']);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            let membersPayload = memberIds.map(id => membersList.find(member => member.id === id));
            // const currentUser = {
            //     name: JSON.parse(localStorage.getItem("user_creds"))?.name,
            //     row_id: JSON.parse(localStorage.getItem("user_creds"))?._id

            // }
            // membersPayload.push(currentUser);
            const response = await axios.post('http://localhost:5038/api/user/createTasks', {
                ...formData,
                members: membersPayload,
                startDate: formData.startDate,
                endDate: formData.endDate,
                projectID: projectDetails?._id,
                status:"In-Progress"
            });

            navigate('/projects/viewProjects/tasks/view');
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleMemberChange = (index) => (event) => {
        const value = Number(event.target.value);
        setMemberIds((currentMemberIds) =>
            currentMemberIds.map((id, idx) => (idx === index ? value : id))
        );
    };

    const handleAddMember = () => {
        setMemberIds((currentMemberIds) => [...currentMemberIds, null]);
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
                // setMembersList(modifiedMembers);
            } catch (error) {
            }
        }
        fetchMembers();
    }, []);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", color: 'black', padding: "10px" }}>
                <div>
                    {projectDetails.projectName && (
                        <div className='font-bold'>
                            <h2>Project Name : {projectDetails.projectName}</h2>
                            <p>Description : {projectDetails.description}</p>
                        </div>
                    )}
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/projects/viewProjects')}
                    >
                        Go to Projects
                    </Button>
                </div>
            </div>
            < PageContainer>

                <FormContainer>
                    <FormTitle>
                        <Assignment style={{ marginRight: '10px' }} />
                        Create New Task under <span className='font-bold'>{projectDetails.projectName} </span>Project
                    </FormTitle>
                    <StyledForm onSubmit={handleSubmit}>

                        <StyledInput
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            placeholder="Task Name"
                        />

                        <StyledInput
                            type="text"
                            name="description"
                            placeholder="Task Description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                        <StyledInput
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            placeholder="Start Date"
                        />

                        <StyledInput
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            placeholder="End Date"
                        />

                        {memberIds?.map((memberId, index) => (
                            <MemberSelectionContainer key={index}>
                                <StyledSelect
                                    value={memberId || ''}
                                    onChange={handleMemberChange(index)}
                                >
                                    <option value="">Select Member</option>
                                    {membersList?.map((member) => (
                                        <option key={member.id} value={member.id}>
                                            {member.name}
                                        </option>
                                    ))}
                                </StyledSelect>
                                {/* {index === memberIds.length - 1 && (
                                <InlineButton type="button" onClick={handleAddMember}>
                                    Add Member
                                </InlineButton>
                            )} */}
                            </MemberSelectionContainer>
                        ))}

                        <StyledButton type="submit">Create Task</StyledButton>
                    </StyledForm>
                </FormContainer>
            </PageContainer>
        </>
    );
};

export default CreateTask;
