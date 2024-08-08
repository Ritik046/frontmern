import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../component/Editor';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

const CreatePost = () => {
    const [title,setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    const createNewPost = async (ev)=>{
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch('https://backmern-1.onrender.com/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
        if(response.status === 200){
            setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to={'/'}/>
    }

  return (
    <form onSubmit={createNewPost}>
        <input type="title" placeholder='Title' value={title} onChange={ev => setTitle(ev.target.value)} />
        <input type="summary" placeholder='Summary' value={summary} onChange={ev => setSummary(ev.target.value)} />
        <input type="file" onChange={ev => setFiles(ev.target.files)}/>
        <ReactQuill value={content} onChange={setContent} modules={modules}/>
        {/* <Editor value={content} onChange={setContent}/> */}
        <button style={{marginTop: '5px'}}>Create Post</button>
    </form>
  )
}

export default CreatePost