// src/routes.js
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import LoginSignup from '../components/LoginSignup';


const Routers = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={ <LoginSignup/> } />
      </Routes>
    </Router>
  );
};

export default Routers;
