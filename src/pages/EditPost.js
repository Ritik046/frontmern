import React, { useEffect, useState } from 'react'
import Editor from '../component/Editor';
import { Navigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

const EditPost = () => {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files,setFiles] = useState('');
    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        fetch('https://backmern-1.onrender.com/'+id)
        .then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            })
        })
    },[]);

    const updatePost = async (ev)=>{
        ev.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0]){
            data.set('file', files?.[0]);
        }
        const response = await fetch('https://backmern-1.onrender.com/post',{
            method: 'PUT',
            body: data,
            credentials: 'include',
        })
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }
    return (
        <form onSubmit={updatePost}>
            <input type="title" placeholder={'Title'} value={title} onChange={ev => setTitle(ev.target.value)} />
            <input type="summary" placeholder='Summary' value={summary} onChange={ev => setSummary(ev.target.value)} />
            <input type="file" onChange={ev => setFiles(ev.target.files)}/>
            <ReactQuill value={content} onChange={setContent} modules={modules}/>
            {/* <Editor value={content} onChange={setContent}/> */}
            <button style={{marginTop: '5px'}}>Update Post</button>
        </form>
    );
}

export default EditPost