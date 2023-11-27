import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ArrowBack, GroupAdd, Description, Assignment, Link as LinkIcon } from '@mui/icons-material';

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

const CreateReference = () => {
    const [projectDetails, setProjectDetails] = useState({});
    const navigate = useNavigate();
    

    useEffect(() => {
        const storedProjectDetails = localStorage.getItem('projectDetails');
        if (storedProjectDetails) {
            setProjectDetails(JSON.parse(storedProjectDetails));
        }
    }, []);

    const [referenceData, setReferenceData] = useState({
        title: '',
        author: '',
        url: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                ...referenceData,
                issue:"7",
                projectID: projectDetails?._id, // Assuming each reference is associated with a project ID
            };

            // Sample API call (replace with actual endpoint)
            const response = await axios.post('http://localhost:5038/api/user/createReference', payload);
            console.log(response);
            navigate('/projects/viewProjects'); // Navigate to the desired page after submission
        } catch (error) {
            console.error('Failed to create reference:', error);
        }
    };

    const handleChange = (event) => {
        setReferenceData({ ...referenceData, [event.target.name]: event.target.value });
    };

    return (<>
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

        <PageContainer>
            <FormContainer>
                <FormTitle>
                    <LinkIcon style={{ marginRight: '10px' }} />
                    Add Reference to <span className='font-bold'>{projectDetails.projectName}</span>
                </FormTitle>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInput
                        type="text"
                        name="title"
                        value={referenceData.title}
                        onChange={handleChange}
                        placeholder="Reference Title"
                    />
                    <StyledInput
                        type="text"
                        name="author"
                        value={referenceData.author}
                        onChange={handleChange}
                        placeholder="Author"
                    />
                    <StyledInput
                        type="text"
                        name="url"
                        value={referenceData.url}
                        onChange={handleChange}
                        placeholder="URL"
                    />
                    <StyledButton type="submit">Add Reference</StyledButton>
                </StyledForm>
            </FormContainer>
        </PageContainer>
    </>
    );
};

export default CreateReference;
