import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ViewProject/ViewProject.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const ViewTask = () => {
  const [projects, setProjects] = useState([]);
  const [projectDetails, setProjectDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      const storedProjectDetails = localStorage.getItem('projectDetails');
      if (storedProjectDetails) {
          setProjectDetails(JSON.parse(storedProjectDetails));
      }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5038/api/user/viewAllTasks');
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
    console.log("project", project)
    localStorage.setItem("projectDetails", project)
    navigate("/projects/viewProjects/tasks")
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", color: 'black', padding: "10px" }}>
        <div>
          {projectDetails.projectName && (
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
            onClick={() => navigate('/projects/viewProjects')} 
          >
            Go to Projects
          </Button>
        </div>
      </div>
      <div className="project-container">
        {/* <p>test</p> */}
        {projects.length > 0 ? (
          projects.map(project => (
            <div key={project.id} className="project-card"
            //  onClick={() => { ProjectRedicrect(project) }}
             >
              <h3>{project.taskName || 'No Title'}</h3>
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
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </>
  );
};

export default ViewTask;
