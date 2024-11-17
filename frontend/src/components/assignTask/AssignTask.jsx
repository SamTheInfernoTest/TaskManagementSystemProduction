import React from 'react'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import RichTextEditor from './RichTextEditor'
import useUser from '../../context/UserContext'
import useWeb from '../../context/WebContext'

function AssignTask() {

  const { standards, uid, axiosSecure } = useUser()
  const [standardsOptions, setStandardsOptions] = useState([])
  const [chosenStandard, setChosenStandard] = useState([])
  const { theme } = useWeb()


  useEffect(() => {
    setStandardsOptions(standards.map(standard => ({ value: standard, label: standard })))
  }, [standards])



  ////

  const [file, setFile] = useState(null);
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (isValidFile(droppedFile)) {
      setFile(droppedFile);
    }
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (isValidFile(selectedFile)) {
      setFile(selectedFile);
    }
  };
  const isValidFile = (file) => {
    const allowedTypes = [
      'text/plain',
      'application/msword',                       // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/vnd.ms-powerpoint',            // .ppt
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
      'application/zip',                          // .zip
      'application/pdf'                           // .pdf
    ];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        toast.info('Only .txt, .ppt, .pptx, .doc, .docx, .zip, or .pdf files are allowed.', { containerId: "assignTask", toastId: 'invalidFileType' });
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error('File size should not exceed 10 MB.', { containerId: "assignTask", toastId: 'fileSizeError' });

        return false;
      }

      return true;
    }
    return false;
  };



  ////

  const [subject, setSubject] = useState('')
  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')
  const [image, setImage] = useState('')
  const [editorContent, setEditorContent] = useState(null);
  function assignTask() {


    if (subject && title && editorContent && chosenStandard.length > 0 && datetime) {

      chosenStandard.map(standard => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('image', image)
        formData.append('uid', uid)
        formData.append('assignee', standard.value)
        formData.append('subject', subject)
        formData.append('title', title)
        formData.append('description', editorContent)
        formData.append('dueDate', datetime)

        axiosSecure.post('task/assignTask/', formData).then((res) => {
          if (res.status === 200) {
            toast.success('Task assigned successfully', { containerId: "assignTask" })
          }
        }).catch((err) => {
          console.error(err);
          toast.error(err.response.data.message, { containerId: "assignTask" })
        })

      })

      setFile(null)
      setImage(null)
      setSubject('')
      setTitle('')
      setDatetime('')
      setChosenStandard([])
      setEditorContent(null)
      sessionStorage.removeItem('editorContent');
    }
    else {
      toast.info('Subject, Title, Content, Due Date and at least one Standard are Required', { containerId: "assignTask" })

    }
  }

  return (
    <div>
      <ToastContainer containerId="assignTask" position='bottom-left' theme={theme} />
      <div>
        <h1 className='text-3xl font-bold'>Assign Task Now</h1>
        <div className='flex justify-between xl:px-24 px-14 mt-6 w-full sm:flex-row flex-col'>
          <div className='flex flex-col gap-7 sm:w-5/6 w-full'>
            <input type="text"
              className='w-full text-xl p-1 rounded-md dark:bg-[#1e293b] dark:text-darkText '
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder='Subject'
              maxLength='25'
            />
            <input type="text"
              className='w-full text-xl p-1 rounded-md dark:bg-[#1e293b] dark:text-darkText'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Tile of Task'
              maxLength='80'
            />
          </div>
          <div className='w-full  flex flex-col place-items-end'>
            <label htmlFor=""
              className='font-semibold p-2 text-lg'
            >Due Date</label>
            {/* <label htmlFor='selectDate'
              className='font-semibold p-2 text-lg dark:bg-[#1e293b] bg-white  sm:max-w-48 rounded-lg dark:text-darkText text-lightText'
            >Choose Date & Time</label> */}
            <input type='datetime-local'
              id = 'selectDate'
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className='dark:bg-[#1e293b] bg-white  sm:max-w-48 p-1 rounded-lg '
            />
          </div>
        </div>
        <div>
          <RichTextEditor editorContent={editorContent} setEditorContent={setEditorContent} />
        </div>
        <div className='mt-7 w-full flex lg:flex-row flex-col lg:gap-4 gap-7 justify-center items-center'>
          <div className="w-full max-w-md ">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed dark:border-gray-400 border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center"
            >
              <p className="text-gray-600 dark:text-darkText text-center p-2">Drag and drop a file here, or click to upload</p>
              <input
                type="file"
                onChange={handleFileInputChange}
                className="hidden"
                accept=".txt,.ppt,.pptx,.doc,.docx,.zip,.pdf"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="dark:bg-darkButton bg-lightButton px-4 py-2 rounded-full dark:text-[#DFF2EB] text-white hover:ring dark:hover:ring-slate-400 hover:ring-slate-300">
                {file ? 'Replace File' : 'Upload File'}
              </label>
              {file && (
                <div className="mt-4 text-sm dark:text-darkText text-gray-700">
                  Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
            </div>
          </div>
          <div className='h-full lg:w-1/3'>
            {image ?
              <div className={`lg:h-32 h-40 w-full bg-center bg-contain bg-no-repeat self-end relative rounded-lg flex justify-center`}>
                <img src={URL.createObjectURL(image)} className='h-full' />
                <button
                  className='absolute right-0 bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full  text-white flex gap-1'
                  onClick={() => setImage('')}
                >
                  <img src="/delete.svg" alt="delete" className='w-4 h-4 my-auto' />
                  <h1 className='my-auto'>Delete</h1>
                </button>
              </div>
              :
              <div className='flex justify-center'>
                <input type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  id='image-upload'
                  className='hidden'
                  accept='image/*'
                />
                <label htmlFor="image-upload"
                  className='dark:bg-darkButton bg-lightButton px-4 py-2 rounded-full dark:text-[#DFF2EB] text-white hover:ring dark:hover:ring-slate-400 hover:ring-slate-300 my-auto text-center'
                >Upload Image for Task Background</label>
              </div>}
          </div>
        </div>
        <div className='flex justify-around mt-9 px-14 xl:px-24 gap-3 sm:flex-row flex-col'>
          <div className='w-full sm:w-1/2 min-h-14'>

          <Select options={standardsOptions}
            
            isMulti
            isClearable
            value={chosenStandard}
            onChange={setChosenStandard}
            placeholder="Select Standards"
            menuPlacement="top"
            styles={{
              input: (provided) => ({
                ...provided,
                color: theme === 'dark' ? 'white' : 'black', // Change color of selected value text
              }),
              container: (provided) => ({
                ...provided, 
                width: '100%',
                height: '100%'
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: theme == 'dark' ? '#1e293b' : 'white',
                height: '100%', // Adjust height here
                minHeight: '50px',
              }), placeholder: (provided) => ({
                ...provided,
                color: theme == 'dark' ? '#DFF2EB' : 'black', // Adjust placeholder text color here
              }), menu: (provided) => ({
                ...provided,
                backgroundColor: theme == 'dark' ? '#1e293b' : 'white', // Adjust dropdown menu background color here
              }), option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? 'red' : state.isFocused ? theme == 'dark' ? '#023E8A' : 'lightblue' : theme == 'dark' ? '#1e293b' : 'white',
                color: theme == 'dark' ? 'white' : 'black',
              }), multiValue: (provided) => ({
                ...provided,
                backgroundColor: theme == 'dark' ? '#083D77' : '#90E0F3',
              }),
              multiValueLabel: (provided) => ({
                ...provided, color: theme == 'dark' ? '#DFF2EB' : 'black',
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: theme == 'dark' ? 'white' : 'black',
                ':hover': {
                  backgroundColor: theme == 'dark' ? 'darkblue' : '#48CAE4',
                  color: 'dark' ? 'white' : 'black',
                },
              }),
              dropdownIndicator: (provided) => ({
                ...provided, color: theme == 'dark' ? '#DFF2EB' : 'gray', // Adjust dropdown arrow color here 
                ':hover': {
                  color: theme == 'dark' ? 'white' : 'black', // Adjust dropdown arrow color on hover here 
                },
              }),
              clearIndicator: (provided) => ({
                ...provided, color: theme == 'dark' ? '#DFF2EB' : 'gray', // Adjust clear (cross) icon color here 
                ':hover': {
                  color: theme == 'dark' ? 'white' : 'black', // Adjust clear (cross) icon color on hover here 
                },
              }),
            }}
          />
          </div>
          <button
            className='dark:bg-darkButton bg-lightButton px-4 py-2 rounded-3xl dark:text-[#DFF2EB] text-white hover:ring dark:hover:ring-slate-400 hover:ring-slate-300 font-bold text-xl'
            onClick={assignTask}
          >Done</button>
        </div>
      </div>
    </div>
  )
}

export default AssignTask