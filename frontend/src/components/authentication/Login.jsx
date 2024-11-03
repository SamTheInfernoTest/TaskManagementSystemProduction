import React from 'react'
import { useState } from 'react'

import useWeb from '../../context/WebContext'

function Login() {
  const { theme } = useWeb();

  const userSelection = localStorage.getItem('userSelection') ;

  return (
    <div className="flex h-screen bg-lightBg dark:bg-darkBg">
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
              }}
              >
                <option>Select...</option>
                <option>Mentor</option>
                <option>Student</option>
              </select>
            </div>

            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium ">Password</label>
              <input type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* Remember Me and Submit Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id='rememberMe' type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label className="ml-2 block text-sm " htmlFor="rememberMe">Remember me</label>
              </div>
              <button type="submit" className="ml-auto dark:bg-darkButton bg-lightButton px-6 py-2 rounded-full dark:text-[#DFF2EB] text-white hover:ring dark:hover:ring-darkHover hover:ring-darkHover font-semibold"
              onClick={(e) => {
                e.preventDefault();
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