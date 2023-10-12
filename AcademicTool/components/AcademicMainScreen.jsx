import React from 'react';
import studentIcon from '../components/Assets/student-icon.png';
import createProjectIcon from '../components/Assets/create-project-icon.png';
import addTasksIcon from '../components/Assets/add-tasks-icon.png';
import './AcademicMainScreen.css';

const AcademicMainScreen= () => {
  return (
    <div className="container">
      <h1 className="heading">Academic Activity</h1>
      <div className="icons">
        <div className="icon">
          <img src={studentIcon} alt="Student Profile" />
          <div className="icon-label">Student Profile</div>
        </div>
        <div className="icon">
          <img src={createProjectIcon} alt="Create a Project" />
          <div className="icon-label">Create a Project</div>
        </div>
        <div className="icon">
          <img src={addTasksIcon} alt="Add Tasks to a Project" />
          <div className="icon-label">Add Tasks to a Project</div>
        </div>
      </div>
    </div>
  );
};

export default AcademicMainScreen;
