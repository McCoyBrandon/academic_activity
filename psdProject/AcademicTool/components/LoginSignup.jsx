import React, { useState } from 'react';
import './Loginsignup.css';
import user_icon from './Assets/person.png';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFormSubmit = () => {
    if (action === 'Login') {
      // Handle login validation and construct JSON object
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      console.log('Login data:', loginData);
    } else {
      // Handle signup validation and construct JSON object
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
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === 'Login' ? null : (
          <div className='input'>
            <img src={user_icon} alt='' />
            <input
              type='text'
              placeholder='Name'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
        )}
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
      {action === 'Sign Up' ? null : (
        <div className='forgot-password'>
          Lost Password? <span>Click Here!</span>
        </div>
      )}
      <div className='submit-container'>
        <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={handleFormSubmit}>
          {action}
        </div>
        <div
          className={action === 'Sign Up' ? 'submit gray' : 'submit'}
          onClick={() => {
            setAction(action === 'Login' ? 'Sign Up' : 'Login');
          }}
        >
          {action === 'Login' ? 'Sign Up' : 'Login'}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
