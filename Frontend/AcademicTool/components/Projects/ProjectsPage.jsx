import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import projectView from '../../components/Assets/createMyProj.webp';
import projectCreate from '../../components/Assets/viewMyProj.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import the Button component

const DashboardContainer = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    minHeight: '100vh',
    alignItems: 'center',
});

const ProjectsPageDiv = styled('div')({

    padding: '40px 20px',
    animation: 'fadeIn 1s ease-in-out',
    background: 'linear-gradient(45deg, #6DD5FA, #FF758C)',
    minHeight: '100vh',
});

const StyledCard = styled(Card)({
    width: 'calc(33% - 40px)',
    margin: '20px',
    height: 'auto',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.2)',
    },
    borderRadius: 20,
});

const Content = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

const ImageStyle = styled('img')({
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    marginBottom: '10px',
    borderRadius: '20px 20px 0 0',
});

const DashboardButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '20px',
    width: '100%',
});

const ProjectsPage = () => {

    const navigate = useNavigate();
    return (
        <ProjectsPageDiv>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/dashboard')} // Replace '/dashboard' with the actual path to your dashboard
            >
                Go to Dashboard
            </Button>
            <DashboardContainer>
                {[
                    { title: 'Create Project', img: projectCreate, path: '/projects/createProject' },
                    { title: 'View Projects', img: projectView, path: '/projects/viewProjects' },
                    // { title: 'Make a Plan', img: PlanImg, path: '/plan' },

                ].map((item) => (
                    <StyledCard key={item.title}>
                        <CardActionArea onClick={() => navigate(item.path)}>
                            <Content>
                                <div>
                                    <ImageStyle src={item.img} alt={item.title} />
                                    <Typography gutterBottom variant="h5" component="div" style={{ alignItems: "center" }} >
                                        {item.title}
                                    </Typography>
                                </div>
                            </Content>
                        </CardActionArea>
                    </StyledCard>
                ))}
            </DashboardContainer>
        </ProjectsPageDiv>
    );
};

export default ProjectsPage;
