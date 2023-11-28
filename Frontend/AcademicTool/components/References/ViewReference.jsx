import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  "../ViewProject/ViewProject.css";
import { Button } from '@mui/material';

const ViewReferences = () => {
  const [references, setReferences] = useState([]);

  useEffect(() => {
    const projectDetails1 =JSON.parse(localStorage.getItem("projectDetails"))?._id
    const fetchReferences = async () => {
      try {
        // Replace with your actual API endpoint to fetch references
        const response = await axios.get(`http://localhost:5038/api/user/viewReferencesByProject?=${projectDetails1}`);
        const fetchedReferences = response.data ? response.data : [];
        setReferences(fetchedReferences);
      } catch (error) {
        console.error("Error fetching references:", error);
      }
    };

    fetchReferences();
  }, []);

  return (
    <div className="project-container">
      {references.length > 0 ? (
        references.map((reference, index) => (
          <div key={index} className="project-card">
            <h3 className='font-bold'>Title: {reference.title || 'No Title'}</h3>
            <p><span className='font-bold'>Author:</span> {reference.author || 'Unknown'}</p>
            {reference.url && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.open(reference.url, '_blank')}
              >
                Open Link
              </Button>
            )}
          </div>
        ))
      ) : (
        <p>No references found.</p>
      )}
    </div>
  );
};

export default ViewReferences;
