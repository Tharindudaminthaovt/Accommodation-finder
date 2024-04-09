import React, { useState } from 'react';
import '../styles/Profile.css';

const CreateAccount = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password ,setPassword] = useState("")
    const [confirmPassword, setConfirmpassword] = useState("")
    const [userType, setUserType] = useState("")

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
            userType: userType,
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
            setName("");
            setEmail("");
            setPassword("");
            setConfirmpassword("")
            setUserType("")
        }
      }

  return (
    <div className='create-account'>
        <h1>Account Panel</h1>

        <form action="">
            <div className='create-form-inputs'>
                <div>
                    <p>User Name</p>
                    <input type="text" name='name' placeholder='Type username' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>

                <div>
                    <p>Email</p>
                    <input type="email" name='email' placeholder='Type email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <div>
                    <p>Password</p>
                    <input type="password" name='password' placeholder='Type password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <div>
                    <p>Re enter password</p>
                    <input type="password" name='confirmPassword' placeholder='Type password' value={confirmPassword} onChange={(e) => setConfirmpassword(e.target.value)}/>
                </div>

                <div>
                    <p>User type</p>
                    <select name="userType" id="" value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="">Select</option>
                        <option value="student">Student</option>
                        <option value="warden">warden</option>
                        <option value="admin">Admin</option>

                    </select>
                </div>
            </div>

            <button type='submit' onClick={createUser}>Create user</button>
        </form>
    </div>
  )
}

export default CreateAccount