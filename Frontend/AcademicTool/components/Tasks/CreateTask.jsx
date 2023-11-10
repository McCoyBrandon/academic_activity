import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

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

const membersList = [
    { id: 1, name: 'Vineetha' },
    { id: 2, name: 'Harish' },
    { id: 3, name: 'Brandon' },
];

const CreateTask = () => {

    const [projectDetails, setProjectDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const storedProjectDetails = localStorage.getItem('projectDetails');
        if (storedProjectDetails) {
            setProjectDetails(JSON.parse(storedProjectDetails));
        }
    }, []);


    const [formData, setFormData] = useState({
        taskName: '',
        description: '',
        members: [],
        startDate: '',
        endDate: '',
    });


    const [memberIds, setMemberIds] = useState(['']);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5038/api/user/createTask', {
                ...formData,
                members: memberIds.map(id => membersList.find(member => member.id === id)),
                startDate: formData.startDate,
                endDate: formData.endDate,
                id: projectDetails?._id
            });

            history('/projects/viewProjects/tasks/view');
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

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", color: 'black', padding: "10px" }}>
                <div>
                    {projectDetails.projectName && ( // Conditional rendering to display this section only if project name exists
                        <div>
                            <h2>Project Name: {projectDetails.projectName}</h2>
                            <p>Description: {projectDetails.description}</p>
                        </div>
                    )}
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/projects/viewProjects')} // Replace '/dashboard' with the actual path to your dashboard
                    >
                        Go to Projects
                    </Button>
                </div>
            </div>

            {/* <div style={{color:'black',padding:"10px"}}>
                {projectDetails.projectName && ( 
                    <div>
                        <h2 >Project Name : {projectDetails.projectName}</h2>
                        <p>Description : {projectDetails.description}</p>
                    </div>
                )}
            </div> */}
            <FormContainer>
                <FormTitle>Create New Task</FormTitle>
                <StyledForm onSubmit={handleSubmit}>

                    <StyledInput
                        type="text"
                        name="taskName"
                        value={formData.taskName}
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

                    <StyledButton type="submit">Create Task</StyledButton>
                </StyledForm>
            </FormContainer>
        </>
    );
};

export default CreateTask;
