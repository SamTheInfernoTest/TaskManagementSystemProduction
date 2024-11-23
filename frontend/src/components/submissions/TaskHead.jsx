import { useState, useRef, useEffect } from 'react'
import useUser from '../../context/UserContext'
import Sub from "./Sub";

function TaskHead({ task }) {
    const { isoToLocal, axiosSecure } = useUser()
    const [drop, setDrop] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const [listHeight, setListHeight] = useState(0)
    const contentRef = useRef(null);

    useEffect(() => {
        if (drop) {
            axiosSecure.get(`task/mentorGetSubmissions/${task?.id}`).then(res => {setSubmissions(res.data);
            });            
        }
    }, [drop])

    useEffect(() => {
        if (drop) {
            setListHeight(contentRef.current?.scrollHeight)
        }
        else {
            setListHeight(0)
        }
    }, [submissions, drop])

    return (
        <li id={`task-${task?.id}`}
            className=' mb-2 font-semibold text-lg '
            onClick={() => setDrop(!drop)}
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
                        title='To Refresh Submissions open it again'
                        >
                            {drop ? '▽' : '▷'}
                        </button>
                    </div>
                </div>
            </div>
            <ul
                ref={contentRef}
                style={{
                    maxHeight:`${listHeight}px`
                }}
                className={`transition-all duration-200 overflow-hidden ease-out dark:bg-[#1e293b] bg-white rounded-b-lg `}
            >
                {
                submissions.length > 0 
                ?
                submissions.map(sub => <Sub key={sub?.id} sub={sub} />)
                :
                <h3
                className='p-1'
                >No Submissions</h3>
                }
            </ul>
        </li>
    )
}

export default TaskHead