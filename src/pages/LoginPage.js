import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext';

const LoginPage = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  const login = async (ev)=>{
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if(response.ok){
      response.json().then(userInfo =>{
        setUserInfo(userInfo);
        setRedirect(true);
      })
    }else{
      alert('wrong Credentials');
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <form className='login' onSubmit={login}>
      <h1>Login</h1>
      <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} placeholder='username'/>
      <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} placeholder='password'/>
      <button>Login</button>
    </form>
  )
}

export default LoginPage