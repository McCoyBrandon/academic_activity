import React, { useState, useEffect } from 'react';
import './Loginsignup.css';
import './loginScreen.css';
import axios from 'axios';
import user_icon from './Assets/person.png';
import { Link, useNavigate } from 'react-router-dom';
import email_icon from './Assets/email.png';
import password_icon from './Assets/password.png';
import interview from "../src/assets/academic_activity.jpeg"
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();



  const handleSubmit = (e) => {

    const pageData = {
      // Construct your payload data here based on your requirements
      email: formData.email,
      password: formData.password
    };
  };


  const fetchData = async () => {
    console.log("formdata", formData)
    setLoading(true);
    try {
      const { data: response } = await axios.get(`http://localhost:5038/api/user/usersCredentials?userEmail=${formData?.email}&userPassword=${formData?.password}`).then(function (response) {
        console.log("test", response);

        setData(response);
        console.log(data, "11");

        // Use response.data to log the data
        if (response.data !== 0 && response.data?.length > 0) {
          localStorage.setItem("email", formData?.email);
          localStorage.setItem("password", formData?.password)
          localStorage.setItem("user_creds",JSON.stringify(response.data[0]))
          toast.success("logged In");
          navigateTo("/dashboard");

        } else {
          // alert('email and password are invalid!');
        }

      });



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

  return (<>
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/6 p-5 md:p-20">
          <div className="bg-white rounded-lg p-6">
            <div className="mb-4">
              <h2 className="text-4xl font-semibold mb-4">Login</h2>
              <p className="text-base text-gray-600 mb-7">
                Sign in to manage your academic journey, track research activities, and build your professional portfolio.
              </p>
            </div>

            <div className="space-y-4">
              <div className="mb-2">
                <label htmlFor="universityId" className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  className="mt-2 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
                  id="universityId"
                  name="universityId"

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
                onClick={() => {
                  setUserEmail(formData.email);
                  setUserPassword(formData.password);
                  console.log(userEmail, userPassword);
                  fetchData();
                  handleFormSubmit();
                }}>
                login
              </button>
            </div>

            <div className="student-login-section bg-gradient-to-r from-blue-100 to-teal-100 p-5 rounded-lg shadow-md mt-5">
              <div className="flex items-center justify-center">
                <h2 className="text-lg font-semibold text-gray-700 mr-4">Welcome!</h2>
                <Link to={"/signUp"} className="text-white font-bold py-1 px-3 rounded-full transition duration-300 transform hover:scale-110 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 shadow-lg hover:shadow-xl">
                  Signup Here!
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
  </>
  );
};

export default LoginScreen;
