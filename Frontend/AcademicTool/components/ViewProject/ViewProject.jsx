import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewProject.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5038/api/user/viewProject');
        console.log("response", response)
        const fetchedProjects = response.data && response.data ? response.data : [];
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const ProjectRedicrect = (project) => {
    console.log("project1", project)
    localStorage.setItem('projectDetails', JSON.stringify(project));

    // localStorage.setItem("projectDetails", JSON.parse(project))
    navigate("/projects/viewProjects/tasks")
  };

  return (
    <>
      <div className='main-projects-view'>
        <div className='projects-head'>All Projects</div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/dashboard')} // Replace '/dashboard' with the actual path to your dashboard
        >
          Go to Dashboard
        </Button>
      </div>
      <div className="project-container">

        {projects.length > 0 ? (
          projects.map(project => (
            <div key={project.id} className="project-card" onClick={() => { ProjectRedicrect(project) }}>
              <h3>{project.projectName || 'No Title'}</h3>
              <p>{project.description || 'No Description'}</p>
              <p>{'Project Members'}</p>
              {project.members && project.members.length > 0 && (
                <ul >
                  {project.members.map((task, index) => (
                    <>
                      {task != null && (
                        <li key={index} >{task.name || 'Unnamed Task'}</li>)}
                    </>
                  ))}
                </ul>
              )}
               {/* <p>View Tasks</p> */}
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </>
  );
};

export default ViewProject;
