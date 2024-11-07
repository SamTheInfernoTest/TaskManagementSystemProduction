import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import useWeb from '../../context/WebContext'
import useUser from '../../context/UserContext';

function Login() {
  const { theme, baseApiUrl } = useWeb();

  const { loginTheUser, rememberMe, setRememberMe } = useUser();
  const [type, setType] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const userSelection = localStorage.getItem('userSelection');
  useEffect(() => {
    setType(userSelection);
  }, [userSelection])

  function loginUser() {
    if (user && password && type != '') {

      axios.post(`${baseApiUrl}/${type}/login/`, {
        uid: user,
        password: password
      })
        .then(response => response.data)
        .then(data => {
          toast.success('Login Successful', { containerId: "login", toastId:'loginSuccess' });
          loginTheUser(type, user, data.name, data.profileImage, data.standards, data.refresh, data.access)
        })
        .catch(res => {console.log(res.response.data.message)
          toast.error(res.response.data.message, { containerId: "login", toastId:'loginError' });
        }
        )
    }
    else{
      toast.info('Please enter UID, password and select type of user',{ containerId: "login", toastId:'notFullyFilled' });
    }
  }


  return (
    <div className="flex h-screen bg-lightBg dark:bg-darkBg">

      <ToastContainer 
      containerId="login"
      position='top-right'
      limit={3}
      theme={theme}
      />
      
      {/* Left side for image */}
      <div className="w-1/2 bg-cover bg-center sm:flex items-center justify-center  hidden" >
        {/* Optional: Add any content like a logo or slogan here */}
        <img src={theme === "dark" ? "/whitetms.svg" : "/blacktms.svg"} alt="TMSLogo" />
      </div>
      {/* Right side for form */}
      <div className="sm:w-1/2 w-full flex items-center justify-center p-8 bg-lightHeader dark:bg-darkHeader">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center">Welcome to TMS</h1>

          <form className="space-y-6">
            {/* Dropdown for Mentor/Student */}
            <div>
              <label className="block text-sm font-medium">Login as</label>
              <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lightText"
                defaultValue={userSelection}
                onChange={(e) => {
                  localStorage.setItem('userSelection', e.target.value)
                  setType(e.target.value)
                }}
              >
                <option value=''>Select...</option>
                <option value='mentor'>Mentor</option>
                <option value='student'>Student</option>
              </select>
            </div>

            {/* UID Input */}
            <div>
              <label className="block text-sm font-medium">UID</label>
              <input type="text" className="text-lightText mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value)
                }}
              />
            </div>

            {/* Password Input */}
            <div>
              <div className='flex justify-between'>
              <label className="block text-sm font-medium ">Password</label> <input type="checkbox" 
              onChange={() => setShowPassword(!showPassword)}
              />
              </div>
              <input type={showPassword ? 'text' : 'password'} className="text-lightText mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 cursor-[]"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            {/* Remember Me and Submit Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id='rememberMe' type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(!rememberMe)
                }}
                />
                <label className="ml-2 block text-sm " htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="submit" className="ml-auto dark:bg-darkButton bg-lightButton px-6 py-2 rounded-full dark:text-[#DFF2EB] text-white hover:ring dark:hover:ring-darkHover hover:ring-darkHover font-semibold"
                onClick={(e) => {
                  e.preventDefault();
                  loginUser();
                }}
              >Login</button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-4 ">
              <a href="/register" className="text-blue-600 hover:text-blue-800 dark:text-darkText hover:dark:text-darkText dark:hover:underline">Not registered? Sign up here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login