import React, { useEffect } from 'react'
import { useRef, useState } from 'react';

import TaskPanel from './TaskPanel'
import useWeb from '../../context/WebContext'
import TaskViewer from './TaskViewer';
import useUser from '../../context/UserContext'

function Tasks() {

  const {theme} = useWeb();

  const {axiosSecure, userType} = useUser();

  const [tasks, setTasks] = useState(localStorage.getItem('tasks') || []);

  useEffect(() => {
    axiosSecure.get(``)
  },[])

  const timeLimitRef = useRef(null);
  const newTaskRef = useRef(null);

  const [taskViewer, setTaskViewer] = useState(false);
  function handleScrollTimeLimit(e) {
    if (timeLimitRef.current) {
      timeLimitRef.current.scrollLeft -= e.movementX
    }
  }
  function handleScrollNewTask(e) {
    if (newTaskRef.current) {
      newTaskRef.current.scrollLeft -= e.movementX
    }
  }

  function handleMouseUpTimeLimit(e) {
    window.removeEventListener('mousemove', handleScrollTimeLimit);
    window.removeEventListener('mouseup', handleMouseUpTimeLimit);
  }
  function handleMouseUpNewTask(e) {
    window.removeEventListener('mousemove', handleScrollNewTask);
    window.removeEventListener('mouseup', handleMouseUpNewTask);
  }
  

  return (
    <div>

      {taskViewer ? <TaskViewer setTaskViewer={setTaskViewer}/> : null}


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
            window.addEventListener('mousemove', handleScrollTimeLimit );
            window.addEventListener('mouseup', handleMouseUpTimeLimit)
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



      <div className='sm:p-4'>
        <div className='flex justify-between'>
          <h1
            className='text-3xl font-bold py-4'
          >New Task</h1>
          <div className='my-auto '>
            <button
              onClick={() => { newTaskRef.current.scrollBy({ left: -newTaskRef.current.offsetWidth * 0.7, behavior: 'smooth' }); }}
              className='p-2'
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill={theme === 'dark' ? '#DFF2EB' : '#000000'} d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" /></svg></button>
            <button
              onClick={() => { newTaskRef.current.scrollBy({ left: newTaskRef.current.offsetWidth * 0.7, behavior: 'smooth' }); }}
              className='p-2'
            ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill={theme === 'dark' ? '#DFF2EB' : '#000000'} d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg></button>
          </div>
        </div>
        <div className='grid grid-flow-col grid-rows-1  overflow-x-auto no-scrollbar' ref={newTaskRef}
          onMouseDown={e => {
            e.preventDefault();
            window.addEventListener('mousemove', handleScrollNewTask);
            window.addEventListener('mouseup', handleMouseUpNewTask)
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