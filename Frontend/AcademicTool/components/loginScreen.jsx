import React, { useState, useEffect } from 'react';
import './Loginsignup.css';
import axios from 'axios';
import user_icon from './Assets/person.png';
import { useNavigate } from 'react-router-dom';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] =useState('');
  const [userPassword, setUserPassword] =useState('');
  const [loading,setLoading]= useState(true);
  const navigateTo = useNavigate();

 

  const handleSubmit = (e) => {

    const pageData = {
      // Construct your payload data here based on your requirements
      email: formData.email,
      password: formData.password
    };
  };

  // get request for get the user Id
  const fetchData = async () => {
    setLoading(true);
    try {
      const {data:response} = await axios.get(`http://localhost:5038/api/user/getnotes?userEmail=${userEmail}&userPassword=${userPassword}`).then(function (response) {
      console.log(response);});
      setData(response);
      console.log(data,"11"); 
      
       // Use response.data to log the data
      if(response.data !== 0 && response.data> 0)
      {
        navigateTo("/AcademicMainScreen");
       
      } else{
       // alert('email and password are invalid!');
      }

     
    } catch (error) {
      console.error('Erro fetching data:', error);
    }
  };


  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFormSubmit = () => {
     {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      console.log('Login data:', loginData);
    } 
  };

  return (
    <div className='container'>
      <div className='header'>
        <h1>Login</h1>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        <div className='input'>
          <img src={email_icon} alt='' />
          <input
            type='email'
            placeholder='Email Id'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input
            type='password'
            placeholder='Password'
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
        </div>
      </div>
        <div className='forgot-password'>
          Lost Password? <span>Click Here!</span>
        </div>
      <div className='submit-container'>
        <button 
        className="my-button"
        onClick={() =>{setUserEmail(formData.email); 
          setUserPassword(formData.password);
          console.log(userEmail,userPassword);
          fetchData(); 
          handleFormSubmit(); 
          }}>
        login
        </button>
        <button
        className="my-button"
          onClick={() => {navigateTo("/");
          }}
        > signup
          </button>
    
        </div>
      </div>
    
  );
};

export default LoginScreen;
