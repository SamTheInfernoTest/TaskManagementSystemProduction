import React from 'react'

import useWeb from '../context/WebContext'

function Welcome() {

  const { theme } = useWeb();
  const {lightBg, darkBg} = useWeb();

  return (
    <div className='min-h-screen'>
      <header className='dark:bg-[#1B1A55] bg-[#7AB2D3] w-full right-0 h-[5.5rem] flex justify-between'>
        <div className='my-auto sm:ml-10 ml-6'>
          <img src={theme === "dark" ? "/whitetms.svg" : "/blacktms.svg"} alt="TMS Logo"
            className='h-20'
          />
        </div>
        <div className='my-auto sm:mr-10 mr-6 flex justify-between sm:gap-16 gap-5'>
          <button className='font-bold'>Log In</button>
          <button className='bg-[#4A628A] px-4 py-2 rounded-full dark:text-[#DFF2EB] text-white'>Register Now</button>
        </div>
      </header>
      <div className={`dark:bg-[${darkBg}] bg-[${lightBg}] p-5`}>
        
      </div>
    </div>
  )
}

export default Welcome