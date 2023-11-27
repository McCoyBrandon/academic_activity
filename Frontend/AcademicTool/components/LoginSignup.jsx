import React, { useState, useEffect } from 'react';
import './Loginsignup.css';
import axios from 'axios';
import user_icon from './Assets/person.png';
import { Link, useNavigate } from 'react-router-dom';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import interview from "../src/assets/academic_activity.jpeg"

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

    axios.post('http://localhost:5038/api/user/addUsers', pageData)
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
    <div >
      <div className="p-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-3/6 p-5 md:p-20">
            <div className="bg-white rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-4xl font-semibold mb-4">Sign Up</h2>
                <p className="text-base text-gray-600 mb-7">
                  Join now to streamline your academic and research endeavors. Unlock a world of organized task management, comprehensive portfolio building, and efficient project tracking!
                </p>
              </div>

              <div className="space-y-4">
                <div className="mb-2">
                  <label htmlFor="universityId" className="text-sm font-medium text-gray-600">
                    University ID
                  </label>
                  <input
                    className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    id="universityId"
                    name="universityId"

                    type='text'
                    placeholder='Name'
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <input
                    className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    id="password"
                    name="password"


                    type='email'
                    placeholder='Email Id'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <input
                    className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                    id="password"
                    name="password"


                    type='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  // onClick={() => {
                  //   setUserEmail(formData.email);
                  //   setUserPassword(formData.password);
                  //   console.log(userEmail, userPassword);
                  //   fetchData();
                  //   handleFormSubmit();
                  // }}

                  // className="my-button"
                  onClick={() => {
                    handleFormSubmit(); handleSubmit();
                  }}>


                  signup
                </button>
              </div>

              <div className="student-login-section bg-gradient-to-r from-blue-100 to-teal-100 p-5 rounded-lg shadow-md mt-5">
                <div className="flex items-center justify-center">
                  <h2 className="text-lg font-semibold text-gray-700 mr-4">Welcome, Students!</h2>
                  <Link to={"/loginScreen"} className="text-white font-bold py-1 px-3 rounded-full transition duration-300 transform hover:scale-110 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 shadow-lg hover:shadow-xl">
                    Login Here!
                  </Link>
                </div>
              </div>

            </div>
          </div>
          <div className="hidden md:inline w-3/6">
            <img
              src={interview}
              className="w-full p-5 md:p-20"
              alt="Login"
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginSignup;
