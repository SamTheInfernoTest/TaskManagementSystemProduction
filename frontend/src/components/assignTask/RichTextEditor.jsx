import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

import useWeb from '../../context/WebContext';

const RichTextEditor = ({ editorContent, setEditorContent }) => {
    const {theme} = useWeb();

    useEffect(() => {
        const storedContent = sessionStorage.getItem('editorContent');
        if (storedContent) {
            setEditorContent(storedContent);
        }
    }, []);

    function changeContent(content) {
        setEditorContent(content);
        sessionStorage.setItem('editorContent', content);
    }

    // Toolbar configuration
    const toolbarOptions = [
        [{'header':1}, {'header':2}, { 'header': [ 3, 4, 5, 6, false] }], 
        [{ 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        ['blockquote', 'code-block'],
        ['link','image'],
        ['clean'] // Removes formatting
    ];

    // Quill editor modules
    const modules = {
        toolbar: toolbarOptions,
    };

    // Quill editor formats
    const formats = [
        'header', 'font', 'list', 'bullet',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background', 'align', 'blockquote', 'code-block',
        'link','image'
    ];

    

    return (
        <div className={`editor-container p-4 bg-white dark:bg-slate-800 shadow-lg rounded-lg max-w-3xl mx-auto mt-8`}>
            

            <ReactQuill
                value={editorContent}
                onChange={changeContent}
                modules={modules}
                formats={formats}
                // theme={theme === "dark" ? 'dark-theme' : 'snow' }
                className={`dark:text-darkText text-lightText ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
                placeholder="Write or Paste your content here..."
            />

            {/* <div className="output mt-6">
                <h3 className="text-md font-semibold mb-2">Editor Output (HTML):</h3>
                <div className="border p-2 rounded-md bg-gray-100 dark:bg-gray-700">
                    <pre className="whitespace-pre-wrap text-sm">{editorContent}</pre>
                </div>
            </div> */}
            
        </div>
    );
};

export default RichTextEditor;
