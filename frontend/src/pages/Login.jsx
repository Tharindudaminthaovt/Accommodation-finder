import React, { useState } from 'react';
import "../styles/Login.css";
import Back from '../assets/back.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigator = useNavigate();

    const backToHome = () => {
        navigator('/')
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        const data = {
            email: email,
            password: password,
        }
    
        const url = "http://127.0.0.1:5000/login"
    
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch(url, options)
    
        if(response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            alert("successfully logged in!")
    
            sessionStorage.setItem("email", email);
            navigator("/");
            setEmail("");
            setPassword("");
        }
    }

  return (
    <div className='login-sign'>
        <div className='login-container'>
            <div className='login-container-back' onClick={backToHome}>
                <img src={Back} alt="back button" />
            </div>

            <h1>Login</h1>

            <p>Email</p>
            <input type="text" placeholder='email' name='email' onChange={(e) => setEmail(e.target.value)}/>

            <p>Password</p>
            <input type="password" placeholder='password' name='password' onChange={(e) => setPassword(e.target.value)}/>

            <div className='show-password'>
                <input type="checkbox" name='showpassword'/>
                <label htmlFor="showpassword">Show password</label>
            </div>

            <button onClick={handleLogin}>LOGIN</button>
        </div>
    </div>
  )
}

export default Login