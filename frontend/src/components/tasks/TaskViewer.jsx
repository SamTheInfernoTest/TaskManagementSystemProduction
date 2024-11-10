import React, { useState } from 'react'

import useUser from '../../context/UserContext'
function TaskViewer({ info, setTaskViewer }) {

    const { isoToLocal, uid, axiosSecure } = useUser();

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
                alert('Only .txt, .ppt, .pptx, .doc, .docx, .zip, or .pdf files are allowed.');
                return false;
            }
            if (file.size > MAX_FILE_SIZE) {
                alert('File size should not exceed 10 MB.');
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
                    alert('File uploaded successfully');
                    setTaskViewer(false);
                }
            })  
        }
    }

    return (
        <div
            className='z-10 fixed top-0 left-0 w-full h-full  backdrop-blur-[2px] flex justify-center items-center overflow-y-auto'
        >
            <div className='w-11/12 lg:w-10/12 h-5/6 dark:bg-darkBg/95 bg-lightBg/95 rounded-3xl p-3 flex flex-col'>
                <div className='flex justify-between flex-none h-8'>
                    <h1
                        className='font-semibold text-2xl ml-4'
                    >{info?.title}</h1>
                    <button
                        className='px-2 bg-red-600 text-darkText rounded-full hover:bg-red-700'
                        onClick={() => setTaskViewer(false)}
                    >⛌</button>
                </div>
                <div className='flex-1 w-full flex p-3 sm:flex-row flex-col h-[calc(100%-2rem)] '>
                    <div
                        className='h-full sm:w-7/12 w-full p-3 relative '
                    >
                        <div className='h-2/6 '>
                            <img src="https://picsum.photos/seed/picsum/400/200" alt={info?.title}
                                className="object-cover h-full w-full"
                            />
                        </div>
                        <div className='h-3/6'>
                            <div className='flex justify-between p-1'>
                                <h2 className='font-semibold text-lg'>{`Subject ${info?.subject}`}</h2>
                                <div> </div>
                                <h2 className=' text-md'>{`Assigned by ${info?.assignor}`}</h2>
                            </div>
                            <div className='h-full mt-6 overflow-y-auto'>
                                {info?.description}
                                hil. Temporibus commodi mollitia facilis in debitis accusamus omnis dolores dolorem excepturi qui. Eius delectus error minus libero tempore quam pariatur harum consequuntur nemo nostrum magni voluptatem laboriosam doloribus alias nulla mollitia consequatur dolorum, impedit rem, facilis commodi adipisci architecto voluptatibus. Enim, nemo?
                            </div>
                        </div>
                    </div>
                    <div
                        className='h-full sm:w-5/12 w-full dark:bg-darkHeader bg-lightHeader sm:rounded-r-2xl sm:rounded-bl-none rounded-b-2xl flex flex-col relative'
                    >
                       <div className='p-4 '>
                            <div className='font-semibold gap-7 flex flex-col'>
                                <h3>{`Assigned at: ${isoToLocal(info?.created_date)}`}</h3>
                                <h3>{`Deadline: ${isoToLocal(info?.due_date)}`}</h3>
                            </div>

                            <div className="w-full max-w-md mx-auto mt-20">
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
                                        <div className="mt-4 text-sm dark:text-darkText text-gray-700">
                                            Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex justify-center sm:absolute bottom-8 w-full mt-10 sm:mt-0'>
                                <button
                                    className='font-semibold hover:font-bold text-xl px-2 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 mx-auto'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskViewer