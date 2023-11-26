import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ViewProject/ViewProject.css';
import { useNavigate } from 'react-router-dom';

const ViewTask = () => {
  const [projects, setProjects] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5038/api/user/viewTask');
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
    console.log("project",project)
    localStorage.setItem("projectDetails",project)
    navigate("/projects/viewProjects/tasks")
  };

  return (
    <div className="project-container">
      {projects.length > 0 ? (
        projects.map(project => (
          <div key={project.id} className="project-card" onClick={() =>{ProjectRedicrect(project) }}>
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
          </div>
        ))
      ) : (
        <p>No projects found.</p> 
      )}
    </div>
  );
};

export default ViewTask;
