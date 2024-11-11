import React from 'react'

import useWeb from '../../context/WebContext'

function FileViewer({url}) {
  
  const {baseApiUrl} = useWeb()
  const fullUrl = `${baseApiUrl}${url}`
  return (
    <div className='w-full h-full'>
      <iframe 
      className='w-full h-full'
      src={fullUrl} frameBorder="0"></iframe>
    </div>
  )
}

export default FileViewer