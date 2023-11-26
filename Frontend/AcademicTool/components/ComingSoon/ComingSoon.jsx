import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComingSoon.css'; // Make sure this file exists and is properly linked

const ComingSoon = () => {
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    navigate('/dashboard'); // Update the path as per your route configuration
  };

  return (
    <div style={{color:"black"}} className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center animate-pulse">
        <h1 className="text-6xl text-white font-bold mb-8">
          Coming Soon...
        </h1>
        <button
          onClick={redirectToDashboard}
          className="mt-5 px-6 py-3 bg-white text-blue-500 font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
