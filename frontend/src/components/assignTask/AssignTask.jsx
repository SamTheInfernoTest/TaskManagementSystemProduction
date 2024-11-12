import React from 'react'
import Select from 'react-select'

import RichTextEditor from './RichTextEditor'
import useUser from '../../context/UserContext'

function AssignTask() {

  const {standards} = useUser()
  

  return (
    <div>
      <div>
        <h1 className='text-3xl font-bold'>Assign Now</h1>
        <div>
          <RichTextEditor />
        </div>
      </div>
    </div>
  )
}

export default AssignTask