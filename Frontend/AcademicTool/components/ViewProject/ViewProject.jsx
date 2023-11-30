import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewProject.css';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";

const ViewProject = () => {
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user_creds"))?._id
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:5038/api/user/viewAllProjects?userID=${userId}`);
        // console.log("response", response)
        const fetchedProjects = response.data && response.data ? response.data : [];
        setProjects(fetchedProjects);
      } catch (error) {
        // console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const ProjectRedicrect = (project) => {
    // console.log("project1", project)
    localStorage.setItem('projectDetails', JSON.stringify(project));
    setSelectedProject(project);
    setOpenDialog(true);
  };


  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAddReferences = () => {
    handleDialogClose();
    navigate("/projects/viewProjects/reference")

  };

  const handleAddTasks = () => {
    handleDialogClose();
    navigate("/projects/viewProjects/tasks")

  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5038/api/user/deleteProject?projectID=${projectId}`);
      // After deleting the project, refresh the project list
      toast.success("Project Deleted");
      const userId = JSON.parse(localStorage.getItem("user_creds"))?._id;
      const response = await axios.get(`http://localhost:5038/api/user/viewAllProjects?userID=${userId}`);
      const fetchedProjects = response.data && response.data ? response.data : [];
      setProjects(fetchedProjects);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
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
              <h3 className='font-bold'>Project Name : {project.projectName || 'No Title'}</h3>
              <p> <span className='font-bold'>Description</span> : {project.description || 'No Description'}</p>
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
              <DeleteIcon
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event propagation to parent
                  handleDeleteProject(project._id);
                }} style={{ cursor: 'pointer' }}
              />
              {/* <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click event propagation to parent
                  handleDeleteProject(project._id);
                }}
              >
                Delete Project
              </Button> */}
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>


      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Project Actions
          <IconButton onClick={handleDialogClose} style={{ position: 'absolute', right: '10px', top: '10px' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <p>Choose an action for the project: <span className='font-bold'>{selectedProject?.projectName}</span></p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleAddReferences} style={{ margin: '10px' }}>
            References
          </Button>
          <Button variant="contained" color="primary" onClick={handleAddTasks} style={{ margin: '10px' }}>
            Tasks
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};

export default ViewProject;
