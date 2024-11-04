import React from 'react'
import { useRef } from 'react';

import TaskPanel from './TaskPanel'
import useWeb from '../../context/WebContext'

function Tasks() {

  const {theme} = useWeb();

  const timeLimitRef = useRef(null);
  function handleScroll(e) {
    if (timeLimitRef.current) {
      timeLimitRef.current.scrollLeft -= e.movementX
    }
  }

  function handleMouseUp(e) {
    window.removeEventListener('mousemove', handleScroll);
    window.removeEventListener('mouseup', handleMouseUp);
  }
  

  return (
    <div>
      <div className='sm:p-4'>
        <div className='flex justify-between'>
        <h1
        className='text-3xl font-bold py-4'
        >Time Limit</h1>
        <div className='my-auto '>
          <button 
              onClick={() => { timeLimitRef.current.scrollBy({ left: -timeLimitRef.current.offsetWidth*0.7, behavior: 'smooth' }); }}
          className='p-2'
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill={theme === 'dark' ? '#DFF2EB' : '#000000'} d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" /></svg></button>
          <button 
              onClick={() => { timeLimitRef.current.scrollBy({ left: timeLimitRef.current.offsetWidth*0.7, behavior: 'smooth' }); }}
          className='p-2'
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill={theme === 'dark' ? '#DFF2EB' : '#000000'} d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg></button>
        </div>
        </div>
        <div className='grid grid-flow-col grid-rows-1  overflow-x-auto no-scrollbar' ref={timeLimitRef}
          onMouseDown={e => {
            e.preventDefault();
            window.addEventListener('mousemove', handleScroll );
            window.addEventListener('mouseup', handleMouseUp)
            console.log(timeLimitRef.current.offsetWidth)
            }
          
          }

        
        >
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='mr-5'><TaskPanel /></div>
          <div className='rotate-90 h-[4rem] text-center my-auto text-2xl font-semibold'>END</div>
        </div>
      </div>
    </div>
  )
}

export default Tasks