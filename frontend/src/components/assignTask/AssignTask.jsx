import React from 'react'
import ReactQuill from 'react-quill'
import RichTextEditor from './RichTextEditor'

function AssignTask() {
  const value = `<h1>hello </h1><blockquote>helo </blockquote><pre class="ql-syntax" spellcheck="false">thid og kidkd
</pre>`
  return (
    <div>
     <RichTextEditor/>
     <div>
        <ReactQuill value={value} modules={{toolbar:false}} />
     </div>
    </div>
  )
}

export default AssignTask