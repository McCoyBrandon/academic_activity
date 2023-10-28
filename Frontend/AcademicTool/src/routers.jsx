// src/routes.js
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


const Routers = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={ <LoginSignup/> } />
      <Route path="/loginScreen" exact element={ <LoginScreen/> } />
      <Route path="/dashboard" exact element={ <Dashboard/> } />
      <Route path="/projects" exact element={ <ProjectsPage/> } />
      <Route path="/projects/createProject" exact element={ <CreateProjectForm/> } />
      <Route path="/projects/viewProjects" exact element={ <ViewProject/> } />

      </Routes>
    </Router>
  );
};

export default Routers;
