import React, { useState, useEffect } from 'react';
import './Loginsignup.css';
import axios from 'axios';
import user_icon from './Assets/person.png';
import { useNavigate } from 'react-router-dom';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigateTo = useNavigate();
  const handleSubmit = (e) => {

    const pageData = {
      // Construct your payload data here based on your requirements
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    axios.post('http://localhost:5038/api/user/addnotes', pageData)
      .then(res => {
        console.log('Response data:', res.data);
        navigateTo("/loginScreen");
      })
      .catch(err => console.log('Error:', err));
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // console the signin data
  const handleFormSubmit = () => {
    {
      const signupData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      console.log('Signup data:', signupData);
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <h1> Signup</h1>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        
          <div className='input'>
            <img src={user_icon} alt='' />
            <input
              type='text'
              placeholder='Name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
      
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
      <div className='submit-container'>
        <button title='sign Up'
         className="my-button"
          onClick={() => {
            handleFormSubmit(); handleSubmit();}}>
          signup
        </button>

        <button  title='login'
        className="my-button"
        onClick={() =>{navigateTo("/loginScreen");}}> Login
       </button>
    
        </div>
      </div>
    
  );
};

export default LoginSignup;
