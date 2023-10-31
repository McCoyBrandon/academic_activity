import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewProject.css'; // Ensure appropriate styling is done in this CSS file

const ViewProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:5038/api/user/viewAllProjects');
        // Assuming the API returns an object with a 'projects' array
        // Null check for response.data and response.data.projects
        console.log("response",response)
        const fetchedProjects = response.data && response.data ? response.data : [];
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Optionally, handle error (e.g., show an error message)
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-container">
      {projects.length > 0 ? (
        projects.map(project => (
          <div key={project.id} className="project-card">
            <h3>{project.title || 'No Title'}</h3>
            <p>{project.description || 'No Description'}</p>
            {/* Check for tasks and render if available */}
            {project.tasks && project.tasks.length > 0 && (
              <ul>
                {project.tasks.map((task, index) => (
                  <li key={index}>{task.taskName || 'Unnamed Task'}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>No projects found.</p> // Message displayed when there are no projects
      )}
    </div>
  );
};

export default ViewProject;
