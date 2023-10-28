import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewProject.css'; // Make sure to create and link this CSS file

const ViewProject = () => {
  const [projects, setProjects] = useState([
    // Dummy Data for demonstration
    { id: 1, title: 'Project One', description: 'This is the first project.' },
    { id: 2, title: 'Project Two', description: 'This is the second project.' },
    // ... more projects
  ]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-container">
      {projects.map(project => (
        <div key={project.id} className="project-card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewProject;
