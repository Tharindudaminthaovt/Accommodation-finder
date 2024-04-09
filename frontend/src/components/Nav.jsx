import React, { useState, useEffect } from 'react'
import '../styles/Nav.css'
import {Link} from 'react-router-dom'

const Nav = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (sessionStorage.email) {
      const atIndex = sessionStorage.email.indexOf("@");
      if (atIndex > -1) {
        setUsername(sessionStorage.email.substring(0, atIndex));
      } else {
        setUsername(""); // Handle invalid emails without "@"
      }
    }
  }, []);

  return (
    <div className='navbar'>
        <div className='nav-left'>
            <a><Link to='/'>Home</Link></a>
            <a><Link to='/articles'>Articles</Link></a>
        </div> 

        <div className='nav-right'>
          {username ? <Link to='/profile'><span className='nav-name'>Hi, {username}</span></Link> :
            <div className='nav-right'>
              <Link to='/signin'><button className='nav-signin'>Sign In</button></Link>
              <Link to='/login'><button className='nav-login'>Login</button></Link>
            </div>
            
          }
            
        </div>
    </div>
  )
}

export default Nav