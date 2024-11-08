import React from 'react'
import axios from 'axios'

import useUser from '../../context/UserContext'

function Home() {

  const {axiosSecure} = useUser()
  return (
    <div className='w-full h-full'>
        <button
        onClick={() => axiosSecure.get('/institute/standards/').then((res) => console.log(res.data))}
        >
          click me for axios
        </button>
    </div>
  )
}

export default Home