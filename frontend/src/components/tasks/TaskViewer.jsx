import React from 'react'

function TaskViewer({setTaskViewer}) {
  return (
    <div
    className='z-10 fixed top-0 left-0 w-full h-full  backdrop-blur-[2px] flex justify-center items-center'
    >
        <div className='w-11/12 h-5/6 dark:bg-darkBg/95 bg-lightBg/95 rounded-3xl p-3 flex flex-col'>
        <div className='flex justify-between flex-none'>
            <h1
            className='font-semibold text-2xl ml-4'
            >Task Viewer</h1>
            <button
            className='px-2 bg-red-600 text-darkText rounded-full hover:bg-red-700'
            onClick={() => setTaskViewer(false)}
            >⛌</button>
        </div>
        <div className='flex-1 w-full flex p-3 sm:flex-row flex-col'>
            <div
            className='h-full sm:w-7/12 w-full'
            >
                Task
            </div>
            <div
            className='h-full sm:w-5/12 w-full dark:bg-darkHeader bg-lightHeader sm:rounded-r-2xl sm:rounded-bl-none rounded-b-2xl flex flex-col '
            >
                submission
            </div>
        </div>
        </div>
    </div>
  )
}

export default TaskViewer