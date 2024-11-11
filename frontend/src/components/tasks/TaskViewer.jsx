import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import useUser from '../../context/UserContext'
import FileViewer from './FileViewer';

function TaskViewer({ info, setTaskViewer, submittedTask }) {
    // console.log(submittedTask[info?.id]['submission_file']);
    

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
                                hil. Temporibus commodi mollitia facilis in debitis accusamus omnis dolores dolorem excepturi qui. Eius delectus error minus libero tempore quam pariatur harum consequuntur nemo nostrum magni voluptatem laboriosam doloribus alias nulla mollitia consequatur dolorum, impedit rem, facilis commodi adipisci architecto voluptatibus. Enim, nemo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, similique modi et temporibus autem repudiandae quaerat ipsa doloribus sint veniam, nulla in facere natus officia esse ipsum rerum quibusdam dicta sequi neque placeat facilis quam dolorum. Quaerat quidem animi nihil magni a cum aspernatur vero amet dolore. Et ipsam, facere ratione at incidunt provident est fugiat unde quibusdam rem, architecto odio nisi in, dolor voluptas dolore dolorem nam numquam commodi vitae recusandae cum? Aliquid magni ipsam praesentium reprehenderit, laboriosam velit quasi explicabo, quisquam molestias iure necessitatibus tempora perferendis. Iure voluptas vitae cupiditate amet porro inventore fugiat temporibus dolorem iusto quas.
                            </div>
                        </div>
                    </div>
                    <div
                        className='h-full sm:w-5/12 w-full dark:bg-darkHeader bg-lightHeader sm:rounded-r-2xl sm:rounded-bl-none rounded-b-2xl flex flex-col relative'
                    >
                        <div className='p-4 w-full h-full'>
                            <div className='font-semibold gap-2 flex flex-col'>
                                <h3 className='flex justify-between'>Assigned on: <span>{`${isoToLocal(info?.created_date)}`}</span></h3>
                                <h3 className='flex justify-between'>Deadline: <span>{`${isoToLocal(info?.due_date)}`}</span></h3>
                                
                                {submitted && <h3 className='flex justify-between'>Submitted on: <span>{`${isoToLocal(submittedTask[info?.id]['submitted_date'])}`}</span></h3>}
                            </div>


                            <div className='w-full h-full'>
                                {submitted ?
                                    <div className='w-full h-5/6 mt-4'>
                                        <FileViewer url={submittedTask[info?.id]['submission_file']} />
                                    </div>
                                    :
                                    <div className='w-full h-full'>
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