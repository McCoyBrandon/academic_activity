import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../ViewProject/ViewProject.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";

const ViewTask = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({});

  useEffect(() => {
    const storedProjectDetails = localStorage.getItem('projectDetails');
    if (storedProjectDetails) {
      setProjectDetails(JSON.parse(storedProjectDetails));
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5038/api/user/viewAllTasks?projectID=${projectDetails?._id}`);
        const fetchedProjects = response.data && response.data ? response.data : [];
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    if (projectDetails?._id) {
      fetchProjects();
    }
  }, [projectDetails]);

  const ProjectRedirect = (project) => {
    // Implement redirection logic
  };

  const handleEditTask = (taskId) => {
    // Implement edit task logic
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5038/api/user/userDeleteTask?taskID=${taskId}`);
      toast.success("Task Deleted");
      const response = await axios.get(`http://localhost:5038/api/user/viewAllTasks?projectID=${projectDetails?._id}`);
      const fetchedProjects = response.data && response.data ? response.data : [];
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Send a PUT request to update the task status
      await axios.put(`http://localhost:5038/api/user/updateTasks?taskID=${taskId}`, {
        status: newStatus, // Set the new status
      });
      toast.success("Status Updated");
  
      // After updating the status, refresh the task list
      const response = await axios.get(`http://localhost:5038/api/user/viewAllTasks?projectID=${projectDetails?._id}`);
      const fetchedProjects = response.data && response.data ? response.data : [];
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  

  const getStatusColor = (status) => {
    switch (status) {
      case 'In-Progress':
        return 'orange';
      case 'Closed':
        return 'green';
      default:
        return 'blue'; // Default color
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", color: 'black', padding: "20px" }}>
        <div>
          {projectDetails.projectName && (
            <div className='font-bold'>
              <h2>Project Name : {projectDetails.projectName}</h2>
              <p>Description : {projectDetails.description}</p>
            </div>
          )}
        </div>
        <div className='font-bold text-2xl'>Tasks List</div>
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
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project?.id} className="project-card">
              <div className='flex font-bold'>
              <h3>{project?.projectName || 'No Title'} -> </h3>
              <div className="pl-2 font-bold" style={{ color: getStatusColor(project?.status) }}>
                  {project?.status}
              </div>
              </div>
              
              <p>{project.description || 'No Description'}</p>
              <p>{'Project Members'}</p>
              {project.members && project.members?.length > 0 && (
                <ul>
                  {project.members.map((task, index) => (
                    <li key={index}>{task?.name || 'Unnamed Task'}</li>
                  ))}
                </ul>
              )}
              <div className="flex justify-between pt-3">
                {/* <EditIcon
                  onClick={() => handleEditTask(project.id)}
                  style={{ cursor: 'pointer' }}
                /> */}
                <DeleteIcon
                  onClick={() => handleDeleteTask(project?._id)}
                  style={{ cursor: 'pointer' }}
                />
                {project.status !== 'Closed' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStatusChange(project?._id, 'Closed')}
                  >
                    Mark as Closed
                  </Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No Tasks found.</p>
        )}
      </div>
    </>
  );
};

export default ViewTask;
