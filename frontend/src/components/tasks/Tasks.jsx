import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import TaskPanel from './TaskPanel'
import useWeb from '../../context/WebContext'
import TaskViewer from './TaskViewer';
import useUser from '../../context/UserContext'

function Tasks() {

  const { theme } = useWeb();

  const { axiosSecure, standards, timeLimit, uid } = useUser();

  const [tasks, setTasks] = useState([]);

  const [taskInfo, setTaskInfo] = useState({});

  const [timeLimitTasks, setTimeLimitTasks] = useState([]);

  const [otherTasks, setOtherTasks] = useState([]);

  const [submittedTask, setSubmittedTask] = useState({});

  const [taskViewer, setTaskViewer] = useState(false);
  useEffect(() => {

    // Create an array to store all promises for the axios requests
    const taskRequests = standards.map(std =>
      axiosSecure.get(`task/byStudent/${std}`).then(res => res.data)

    );

    // Once all requests are completed, set the tasks state with all results
    Promise.all(taskRequests)
      .then(allTasks => {
        // Flatten the array of arrays and set it as the tasks
        setTasks(allTasks.flat());
      })
      .catch(err => {
        console.log(err);
      });


      

  }, [taskViewer])

  useEffect(() => {
    const taskSubmissionRequests = standards.map(std =>
      axiosSecure.get(`task/studentGetSubmissions/${std}/${uid}/`).then(res => res.data)

    );

    // Once all requests are completed, set the tasks state with all results
    Promise.all(taskSubmissionRequests)
      .then(allTasks => {
        // Flatten the array of arrays and set it as the tasks
        const allSubmittedTasks = allTasks.flat();
        

        setSubmittedTask(allSubmittedTasks.reduce((acc, { task_id, ...rest }) => {
          acc[task_id] = rest;
          return acc;
        }, {}));
      })
      .catch(err => {
        console.log(err);
      });
  }, [taskViewer])

  const [tasksDone, setTasksDone] = useState([]);

  useEffect(() => {
    setTimeLimitTasks(
      tasks.filter(task => new Date(task.due_date) - new Date() < timeLimit  && !submittedTask[task.id])
    )

    setOtherTasks(
      tasks.filter(task => new Date(task.due_date) - new Date() > timeLimit && !submittedTask[task.id])
    )

    setTasksDone(
      tasks.filter(task => submittedTask[task.id])
    )
  }, [tasks])

  const timeLimitRef = useRef(null);
  const newTaskRef = useRef(null);
  const tasksDoneRef = useRef(null);

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
  function handleScrollTasksDone(e) {
    if (tasksDoneRef.current) {
      tasksDoneRef.current.scrollLeft -= e.movementX
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
  function handleMouseUpTasksDone(e) {
    window.removeEventListener('mousemove', handleScrollTasksDone);
    window.removeEventListener('mouseup', handleMouseUpTasksDone);
  }


  return (
    <div>
      <ToastContainer containerId='task' position='top-right' theme={theme}/>

      {taskViewer ? <TaskViewer info={taskInfo} setTaskViewer={setTaskViewer} submittedTask = {submittedTask} /> : null}


      {timeLimitTasks.length > 0 &&
        (<div className='sm:p-4'>
          <div className='flex justify-between'>
            <h1
              className='text-3xl font-bold py-4'
            >Time Limit</h1>
          <div className='my-auto'>
              <button
                onClick={() => { timeLimitRef.current.scrollBy({ left: -timeLimitRef.current.offsetWidth * 0.7, behavior: 'smooth' }); }}
                className='p-2'
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill={theme === 'dark' ? '#DFF2EB' : '#000000'} d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" /></svg></button>
              <button
                onClick={() => { timeLimitRef.current.scrollBy({ left: timeLimitRef.current.offsetWidth * 0.7, behavior: 'smooth' }); }}
                className='p-2'
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill={theme === 'dark' ? '#DFF2EB' : '#000000'} d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg></button>
            </div>
          </div>
        <div className='grid grid-flow-col grid-rows-1  overflow-x-auto no-scrollbar  overflow-y-hidden' ref={timeLimitRef}
            onMouseDown={e => {
              e.preventDefault();
              window.addEventListener('mousemove', handleScrollTimeLimit);
              window.addEventListener('mouseup', handleMouseUpTimeLimit)
            }

            }


          >
            {timeLimitTasks.map((task) => { 
                       
              return <div className='mr-5' key={task.id}><TaskPanel info = {task} setTaskViewer={setTaskViewer} setTaskInfo={setTaskInfo} /></div>
            })}
            {/* <div className='mr-5'><TaskPanel /></div> */}

            <div className='rotate-90 h-[4rem] text-center my-auto text-2xl font-semibold'>END</div>
          </div>
        </div>)
      }



      <div className='sm:p-4'>
        <div className='flex justify-between'>
          <h1
            className='text-3xl font-bold py-4'
          >New Task</h1>
          <div className='my-auto'>
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
        <div className='grid grid-flow-col grid-rows-1  overflow-x-auto no-scrollbar overflow-y-hidden' ref={newTaskRef}
          onMouseDown={e => {
            e.preventDefault();
            window.addEventListener('mousemove', handleScrollNewTask);
            window.addEventListener('mouseup', handleMouseUpNewTask)
          }

          }


        >
          {
          otherTasks.length > 0 ? 
          (
            <>
              {otherTasks.map((task) => {
                return <div className='mr-5' key={task.id}><TaskPanel info={task} setTaskViewer={setTaskViewer} setTaskInfo={setTaskInfo} /></div>
              })}
              <div className='rotate-90 h-[4rem] text-center my-auto text-2xl font-semibold'>END</div>
            </>
          )
          
          : <div className='font-semibold text-2xl text-center my-auto'>No New Task</div>
          }
                    
        </div>
      </div>



      {tasksDone.length > 0 &&
        (<div className='sm:p-4'>
          <div className='flex justify-between'>
            <h1
              className='text-3xl font-bold py-4'
            >Completed Tasks</h1>
            <div className='my-auto'>
              <button
              onClick={() => { tasksDoneRef.current.scrollBy({ left: -tasksDoneRef.current.offsetWidth * 0.7, behavior: 'smooth' }); }}
                className='p-2'
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill={theme === 'dark' ? '#DFF2EB' : '#000000'} d="M15.293 3.293 6.586 12l8.707 8.707 1.414-1.414L9.414 12l7.293-7.293-1.414-1.414z" /></svg></button>
              <button
              onClick={() => { tasksDoneRef.current.scrollBy({ left: tasksDoneRef.current.offsetWidth * 0.7, behavior: 'smooth' }); }}
                className='p-2'
              ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path fill={theme === 'dark' ? '#DFF2EB' : '#000000'} d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" /></svg></button>
            </div>
          </div>
        <div className='grid grid-flow-col grid-rows-1  overflow-x-auto no-scrollbar  overflow-y-hidden' ref={tasksDoneRef}
            onMouseDown={e => {
              e.preventDefault();
              window.addEventListener('mousemove', handleScrollTasksDone);
              window.addEventListener('mouseup', handleMouseUpTasksDone)
            }

            }


          >
          {tasksDone.map((task) => {

              return <div className='mr-5' key={task.id}><TaskPanel info={task} setTaskViewer={setTaskViewer} setTaskInfo={setTaskInfo} /></div>
            })}
            {/* <div className='mr-5'><TaskPanel /></div> */}

            <div className='rotate-90 h-[4rem] text-center my-auto text-2xl font-semibold'>END</div>
          </div>
        </div>)
      }
    </div>
  )
}

export default Tasks