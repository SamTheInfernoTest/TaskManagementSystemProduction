import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import axios from 'axios';

import useUser from '../../context/UserContext'
import useWeb from '../../context/WebContext';

function TaskViewer({ info, setTaskViewer, submittedTask }) {
    // console.log(submittedTask[info?.id]['submission_file']);
    
    const {baseApiUrl} = useWeb()
    const { isoToLocal, uid, axiosSecure } = useUser();
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submittedTask[info?.id]) {
            setSubmitted(true);
        }
    }, [])

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

    async function downloadFile(e){
        const theFile = info?.task_file
        if (theFile){
            const fullUrl = `${baseApiUrl}${theFile}`;
            const filename = theFile.split('/').pop()
            const response = await axios.get(fullUrl, {
                responseType: 'blob',
            });

            // Create a Blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const blobUrl = URL.createObjectURL(blob);

            // Create an anchor element and set its download attribute
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;

            // Append to the document, trigger click, and remove
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Revoke the object URL to free up memory
            URL.revokeObjectURL(blobUrl);
        }
        
    }

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
                toast.info('Only .txt, .ppt, .pptx, .doc, .docx, .zip, or .pdf files are allowed.', { containerId: "task", toastId: 'invalidFileType' });
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                toast.error('File size should not exceed 10 MB.', { containerId: "task", toastId: 'fileSizeError' });
                return false;
            }
            return true;
        }
        return false;
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('task_id', info?.id);
            formData.append('student_uid', uid);
            axiosSecure.post('/task/submitTask/', formData).then((res) => {
                if (res.status === 200) {
                    toast.success('Task submission & File upload successful', { containerId: "task" });
                    setTaskViewer(false);
                }
            })
        } else {
            toast.error('Please select a file.', { containerId: "task", toastId: 'noFileSelected' });
        }
    }

    return (
        <div
            className='z-10 fixed top-0 left-0 w-screen h-screen  backdrop-blur-[2px]  overflow-y-auto content-center'
        >

            <div className='justify-self-center w-11/12 xl:w-9/12 lg:w-10/12 sm:h-5/6  dark:bg-darkBg/95 bg-lightBg/95 rounded-3xl p-3 flex flex-col '>
                <div className='flex justify-between flex-none min-h-8'>
                    <h1
                        className='font-semibold text-2xl ml-4 wrap-text w-11/12'
                    >{info?.title}</h1>
                    <button
                        className='px-2 bg-red-600 text-darkText rounded-full hover:bg-red-700 h-9 w-9'
                        onClick={() => setTaskViewer(false)}
                    >⛌</button>
                </div>
                <div className='flex-1 w-full flex p-3 sm:flex-row flex-col sm:h-[calc(100%-2rem)] '>
                    <div
                        className='sm:h-full sm:w-7/12 w-full p-3 relative sm:overflow-y-auto'
                    >
                        <div className='sm:h-2/6 h-full'>
                            <img src={info?.task_image ? `${baseApiUrl}${info?.task_image}` : 'https://picsum.photos/600/200'} alt={info?.title}
                                className="object-cover h-full w-full rounded-lg"
                            />
                        </div>
                        <div className=''>
                            <div className='flex justify-between p-1'>
                                <h2 className='font-semibold text-lg'>{`Subject ${info?.subject}`}</h2>
                                <div> </div>
                                <h2 className=' text-md'>{`Assigned by ${info?.assignor}`}</h2>
                            </div>
                            <div className='h-full mt-1 '>
                                
                                <ReactQuill value={info?.description} modules={{ toolbar: false }} readOnly/>

                            </div>
                        </div>
                    </div>
                    <div
                        className='sm:h-full sm:w-5/12 w-full dark:bg-darkHeader bg-lightHeader sm:rounded-r-2xl sm:rounded-bl-none rounded-b-2xl'
                    >
                        <div className='p-4 w-full h-full flex flex-col justify-between'>
                            <div className='font-semibold gap-2 flex flex-col'>
                                <h3 className='flex justify-between'>Assigned on: <span>{`${isoToLocal(info?.created_date)}`}</span></h3>
                                <h3 className='flex justify-between'>Deadline: <span>{`${isoToLocal(info?.due_date)}`}</span></h3>
                                
                                {submitted && <h3 className='flex justify-between bg-green-600 p-1 rounded-xl'>Submitted on: <span>{`${isoToLocal(submittedTask[info?.id]['submitted_date'])}`}</span></h3>}
                            </div>


                            <div className='w-full sm:h-full flex flex-col relative '>
                                {submitted ?
                                    // <div className='w-full lg:h-5/6 md:h-5/6 h-96 mt-4'>
                                        
                                    // </div>
                                    null
                                    :
                                    <div className='w-full h-full flex flex-col justify-between mt-20'>
                                        <div className="w-full max-w-md mx-auto ">
                                            <div
                                                onDrop={handleDrop}
                                                onDragOver={(e) => e.preventDefault()}
                                                className="border-2 border-dashed dark:border-gray-400 border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center"
                                            >
                                                <p className="text-gray-600 dark:text-darkText text-center">Drag and drop a file here, or click to upload</p>
                                                <input
                                                    type="file"
                                                    onChange={handleFileInputChange}
                                                    className="hidden"
                                                    accept=".txt,.ppt,.pptx,.doc,.docx,.zip,.pdf"
                                                    id="file-upload"
                                                />
                                                <label htmlFor="file-upload" className="mt-4 px-2 py-1 bg-blue-500 text-white rounded-xl cursor-pointer">
                                                    {file ? 'Replace File' : 'Upload File'}
                                                </label>
                                                {file && (
                                                    <div className="mt-4 text-sm dark:text-darkText text-gray-700 break-words w-full">
                                                        Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex justify-center mt-10'>
                                            {info?.task_file && <button
                                            className='justify-self-center font-semibold hover:font-bold text-xl px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 mx-auto'
                                            onClick={(e) =>downloadFile(e)}
                                            ><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" className='inline-block'>

                                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                                    <g id="SVGRepo_iconCarrier"> <path d="M5.25589 16C3.8899 15.0291 3 13.4422 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.0582 20.206 15.4339 19 16.2417M12 21V11M12 21L9 18M12 21L15 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

                                                </svg> File by Mentor</button>}

                                        </div>
                                        <div className='flex justify-center  w-full sm:mb-0 mb-10 sm:mt-0'>

                                        <button
                                            className='font-semibold hover:font-bold text-xl px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 mx-auto'
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskViewer