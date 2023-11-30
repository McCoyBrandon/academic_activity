import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../ViewProject/ViewProject.css";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ViewReferences = () => {
    const navigate = useNavigate();
    const [references, setReferences] = useState([]);
    const [projectDetails, setProjectDetails] = useState({});


    useEffect(() => {
        const storedProjectDetails = localStorage.getItem('projectDetails');
        if (storedProjectDetails) {
            setProjectDetails(JSON.parse(storedProjectDetails));
        }
    }, []);
    console.log("projectDetails", projectDetails)

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                const response = await axios.get(`http://localhost:5038/api/user/viewReferencesByProject?ProjectID=${projectDetails?._id}`);
                const fetchedReferences = response.data ? response.data : [];
                setReferences(fetchedReferences);
            } catch (error) {
                console.error("Error fetching references:", error);
            }
        };
        if (projectDetails?._id) {
            fetchReferences();
        }
    }, [projectDetails]);

    const openUrl = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'http://' + url;
        }
        window.open(url, '_blank');
    };

    const handleDeleteReference = async (referenceId) => {
        try {
          await axios.delete(`http://localhost:5038/api/user/deleteReferences?referenceID=${referenceId}`);
          // After deleting the reference, refresh the reference list
          toast.success("Reference Deleted");
          const response = await axios.get(`http://localhost:5038/api/user/viewReferencesByProject?ProjectID=${projectDetails?._id}`);
          const fetchedReferences = response.data ? response.data : [];
          setReferences(fetchedReferences);
        } catch (error) {
          console.error("Error deleting reference:", error);
        }
      };

    return (
        <>

            <div style={{ display: "flex", justifyContent: "space-between", color: 'black', padding: "10px" }}>
                <div>
                    {projectDetails.projectName && (
                        <div className='font-bold'>
                            <h2>Project Name : {projectDetails.projectName}</h2>
                            <p>Description : {projectDetails.description}</p>
                        </div>
                    )}
                </div>
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
                {references.length > 0 ? (
                    references.map((reference, index) => (
                        <div key={index} className="project-card">
                            <h3 className='font-bold'>Title: {reference.title || 'No Title'}</h3>
                            <p><span className='font-bold'>Author:</span> {reference.author || 'Unknown'}</p>
                            {reference.url && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => openUrl(reference.url)}
                                >
                                    Open Link
                                </Button>
                            )}
                            <div className='py-2'>
                            <Button
                                variant="contained"
                                color="primary"
                                // className='m-2'
                                onClick={() => handleDeleteReference(reference?._id)}
                            >
                                Delete Reference
                            </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No references found.</p>
                )}
            </div>
        </>
    );
};

export default ViewReferences;
