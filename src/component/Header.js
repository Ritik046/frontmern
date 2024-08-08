import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(()=> {
    fetch('https://backmern-1.onrender.com/profile',{
      credentials: 'include'
    }).then(response =>{
        response.json().then(userInfo =>{
        setUserInfo(userInfo);
      })
    })
  }, [])

  const logout = ()=>{
    fetch('https://backmern-1.onrender.com/logout',{
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
        <Link to="/" className="logo">Blogify</Link>
        <nav>
          {username && (
            <>
              {/* <span>Hello, {username}</span> */}
              <Link to='/create'>Create New Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
          
        </nav>
      </header>
  )
}

export default Header