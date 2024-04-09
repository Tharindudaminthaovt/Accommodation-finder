import React, { useState } from 'react';
import '../styles/Login.css';
import Back from '../assets/back.png';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [confirmPassword, setConfirmpassword] = useState("")

  const navigator = useNavigate();

  const backToHome = () => {
      navigator('/')
  }

  const createUser = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword) {
        alert("passwords does not match!")
        return
    }

    const data = {
        username: name,
        email: email,
        password: password,
        userType: "landlord"
    }

    const url = "http://127.0.0.1:5000/create_user"

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
        alert("successfully created user!")

        sessionStorage.setItem("email", email);
        navigator("/");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmpassword("")
    }
  }

  return (
    <div className='login-sign'>

        <div className='login-container'>
            <div className='login-container-back' onClick={backToHome}>
                <img src={Back} alt="back button" />
            </div>

            <h1>Sign in</h1>

            <p>Name</p>
            <input type="text" placeholder='Enter your name' name='name' value={name} onChange={(e) => setName(e.target.value)}/>

            <p>Email</p>
            <input type="text" placeholder='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>

            <p>Password</p>
            <input type="password" placeholder='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

            <p>Confirm password</p>
            <input type="password" placeholder='type you password again' value={confirmPassword} name='confirmPassword' onChange={(e) => setConfirmpassword(e.target.value)}/>

            <div className='show-password'>
                <input type="checkbox" name='showpassword'/>
                <label htmlFor="showpassword">Show password</label>
            </div>

            <button onClick={createUser}>Sign In</button>
        </div>
    </div>
  )
}

export default SignIn