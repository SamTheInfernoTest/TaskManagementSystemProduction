import React from 'react'

import useWeb from '../context/WebContext'


function Welcome() {

  const {theme} = useWeb();

  return (
    <div className='h-screen'>
      <header className={`dark:bg-darkHeader bg-lightHeader w-full right-0 h-[5.5rem] flex justify-between`}>
        <div className='my-auto sm:ml-10 ml-6'>
          <img src={theme === "dark" ? "/whitetms.svg" : "/blacktms.svg"} alt="TMS Logo"
            className='h-20'
          />
        </div>
        <div className='my-auto sm:mr-10 mr-6 flex justify-between sm:gap-16 gap-5 text-lg'>
          <button className='font-bold'>Log In</button>
          <button className='dark:bg-darkButton bg-lightButton px-4 py-2 rounded-full dark:text-[#DFF2EB] text-white hover:ring dark:hover:ring-slate-400 hover:ring-slate-300'>Register Now</button>
        </div>
      </header>
      <div className={`dark:bg-darkBg bg-lightBg p-5 h-full`}>
        
      </div>
    </div>
  )
}

export default Welcome