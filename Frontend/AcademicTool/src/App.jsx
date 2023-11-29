// src/App.js
import React from 'react';
import Routers from './routers';
import { useEffect, useState } from "react";
import axios from 'axios';
import Loader from "./Loader";

const App = () => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      // Show loader when a request is made
      setIsLoading(true);
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        // Hide loader when a response is received
        setIsLoading(false);
        return response;
      },
      (error) => {
        // Hide loader on error as well
        setIsLoading(false);
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (<>
    {isLoading && (
      <Loader />
    )}
    <Routers />
    
  </>
  );
};

export default App;
