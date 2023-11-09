
import React, { useState, useEffect } from 'react';
import studentIcon from '../components/Assets/student-icon.png';
import axios from 'axios';
import createProjectIcon from '../components/Assets/create-project-icon.png';
import addTasksIcon from '../components/Assets/add-tasks-icon.png';
import './AcademicMainScreen.css';

const AcademicMainScreen = () => {
  const [totalReactPackages, setTotalReactPackages] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5038/api/user/getnotes?userEmail=${localStorage.getItem("email")}&userPassword=${localStorage.getItem("password")}`);
      setTotalReactPackages(response.data);
      console.log(totalReactPackages)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   
  return (
    <div className="academic-main-screen">
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
          <div className="icon-label" onClick={() =>{fetchData() }}>Add Tasks to a Project</div>
        </div>
        <button onClick={fetchData}>Fetch Data</button>
      </div>
    </div>
  );
};

export default AcademicMainScreen;
