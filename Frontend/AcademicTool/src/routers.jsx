import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import LoginSignup from '../components/LoginSignup';
import AcademicMainScreen from '../components/AcademicMainScreen';
import LoginScreen from '../components/loginScreen';
import ViewProject from '../components/ViewProject/ViewProject';
import CreateProjectForm from '../components/CreateProject/CreateProject';
import ProjectsPage from '../components/Projects/ProjectsPage';
import Dashboard from '../components/Dashboard/Dashboard';
import Tasks from '../components/Tasks/Tasks';
import CreateTask from '../components/Tasks/CreateTask';
import ViewTask from '../components/Tasks/ViewTask';
import ComingSoon from '../components/ComingSoon/ComingSoon';


const Routers = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={ <LoginSignup/> } />
      <Route path="/loginScreen" exact element={ <LoginScreen/> } />
      <Route path="/calender" exact element={ <ComingSoon/> } />
      <Route path="/dashboard" exact element={ <Dashboard/> } />
      <Route path="/projects" exact element={ <ProjectsPage/> } />
      <Route path="/projects/createProject" exact element={ <CreateProjectForm/> } />
      <Route path="/projects/viewProjects" exact element={ <ViewProject/> } />
      <Route path="/projects/viewProjects/tasks" exact element={ <Tasks/> } />
      <Route path="/projects/viewProjects/tasks/create" exact element={ <CreateTask/> } />
      <Route path="/projects/viewProjects/tasks/view" exact element={ <ViewTask/> } />


      </Routes>
    </Router>
  );
};

export default Routers;
