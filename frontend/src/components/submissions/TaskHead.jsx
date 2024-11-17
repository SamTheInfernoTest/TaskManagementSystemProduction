import { useState, useRef } from 'react'
import useUser from '../../context/UserContext'

function TaskHead({ task }) {
    const { isoToLocal } = useUser()
    const [drop, setDrop] = useState(false)
    const contentRef = useRef(null);
    return (
        <li id={`task-${task?.id}`}
        className=' mb-2 font-semibold text-lg '
        >
            <div className='flex justify-between bg-lightPanel dark:bg-darkPanel rounded-lg dark:hover:brightness-125 hover:brightness-105' >
                <div className='p-2'>
                    <h2>{`${task?.subject}: ${task?.title}`}</h2>
                    <h2 className='text-sm'>{task?.assignees_id}</h2>
                </div>
                <div className='flex'>
                    <h2 className='p-2'>{isoToLocal(task?.due_date)}</h2>
                    <div className='bg-lightMenu dark:bg-darkMenu rounded-r-lg '>
                        <button className='h-full p-2'
                        onClick={() =>  setDrop(!drop)}
                        >
                            {drop ? '▽' : '▷'}
                        </button>
                    </div>
                </div>
            </div>
            <ul
                ref={contentRef}
                style={{
                    maxHeight: drop ? `${contentRef.current?.scrollHeight}px` : '0px',
                }}
                className="transition-all duration-500 overflow-hidden ease-out"
            >
                
            </ul>
        </li>
    )
}

export default TaskHead