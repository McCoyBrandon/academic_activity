// src/routes.js
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import LoginSignup from '../components/LoginSignup';
import AcademicMainScreen from '../components/AcademicMainScreen';
import LoginScreen from '../components/loginScreen';


const Routers = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={ <LoginSignup/> } />
      <Route path="/loginScreen" exact element={ <LoginScreen/> } />
      <Route path="/AcademicMainScreen" exact element={ <AcademicMainScreen/> } />
      </Routes>
    </Router>
  );
};

export default Routers;
