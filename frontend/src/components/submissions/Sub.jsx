import React from 'react'

import useUser from '../../context/UserContext'
import useWeb from '../../context/WebContext'

function Sub({ sub }) {

    const { isoToLocal } = useUser()
    const {baseApiUrl} = useWeb()

    return (
        <li
            className='py-2 dark:hover:bg-slate-700 hover:bg-blue-50 border-b dark:border-slate-600'
        >
            <div className='grid grid-cols-4'>

                <h3
                className='col-span-2 px-2'
                >{sub?.student}</h3>


                <button
                    className='dark:bg-darkButton bg-[#59ABE3] px-2 rounded-3xl dark:text-[#DFF2EB] text-white hover:ring dark:hover:ring-slate-500 hover:ring-slate-300 mx-auto my-auto'
                    onClick={() => window.open(`${baseApiUrl}${sub?.submission_file}`, '_blank')}
                >Submission</button>
                <h3
                className='text-end px-2'
                >{isoToLocal(sub?.completed_date)}</h3>

            </div>
        </li>
    )
}

export default Sub