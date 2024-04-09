import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import '../styles/Profile.css';
import profileIcon from '../assets/profile.png';
import AddProperty from '../components/AddProperty';
import PropertyStatus from '../components/PropertyStatus';
import Offers from '../components/Offers';
import NewAds from '../components/NewAds';
import Reservations from '../components/Reservations';
import CreateAccount from '../components/CreateAccount';
import CreateArticles from '../components/CreateArticles';
import CurrentArticles from '../components/CurrentArticles';
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [currentItem, setCurrentItem] = useState('profile')
    const [cusers, setCUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [userType, setuserType] = useState("") // student, warden, admin, landlord

    const navigate = useNavigate();

    const handleItem = (e) => {
        setCurrentItem(e.target.value)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        cusers && cusers.users && chooseCurrentUser()
    }, [cusers])

    const fetchUser = async () => {
        if(sessionStorage.email){
            const response = await fetch("http://127.0.0.1:5000/users")
            const data = await response.json()
            setCUsers(data)
        } else {
            alert("no session available")
        }
    }

    const chooseCurrentUser = () => {
        for(let i = 0; i < cusers.users.length;i++) {
            if(cusers.users[i].email == sessionStorage.email){
                setCurrentUser(cusers.users[i])
                setuserType(cusers.users[i].userType)
                sessionStorage.setItem("id", cusers.users[i].id)
                sessionStorage.setItem("name", cusers.users[i].name)
            }
        }
    }

    const handleLogout = () => {
        sessionStorage.removeItem("email")
        navigate('/');
    }

    console.log(userType, currentUser)

  return (
    <div>
        <Nav />
        <div className='profile'>
            <div className='profile-navigation'>
                <button value="profile" onClick={handleItem}>Proifle</button>
                {userType == "student" ? 
                    <button value="reservations" onClick={handleItem}>Reservations</button>
                    : userType == "warden" ? 
                    <button value="newAdvertiesments" onClick={handleItem}>New Advertiesments</button>
                    : userType == "admin" ?
                        <div>
                            <button value="createAccount" onClick={handleItem}>Create Accounts</button>
                            <button value="createArticles" onClick={handleItem}>Create Articles</button>
                            <button value="currentArticles" onClick={handleItem}>Current Articles</button>
                        </div>
                    : userType == "landlord" ?
                        <div>
                            <button value="newProperty" onClick={handleItem}>Add new Property</button>
                            <button value="propertyStatus" onClick={handleItem}>Property status</button>
                            <button value="requests" onClick={handleItem}>Requests/Offers</button>
                        </div>
                    : <></>
                }
                
                
            </div>

            <div className='profile-detail-section'>
                {currentItem == "profile" ? 
                    <ProfileDetails
                        name={currentUser.username}
                        email={currentUser.email}
                        type={currentUser.userType}
                        logout={handleLogout}
                    />
                    : currentItem == "newProperty" ?
                    <AddProperty />
                    : currentItem == "propertyStatus" ?
                    <PropertyStatus />
                    : currentItem == "requests" ? 
                    <Offers />
                    : currentItem == "newAdvertiesments" ?
                    <NewAds />
                    : currentItem == "reservations" ?
                    <Reservations />
                    : currentItem == "createAccount" ? 
                    <CreateAccount />
                    : currentItem == "createArticles" ?
                    <CreateArticles />
                    : currentItem == "currentArticles" ?
                    <CurrentArticles />
                    : <></>
                }
            </div>
        </div>
    </div>
  )
}

export default Profile

const ProfileDetails = ({name, email, type, logout}) => {
    return (
        <div className='profile-details'>
            <img src={profileIcon} alt="profileIcon" />
            <div className='profile-details-2'>
                <p><span>Name: </span> <br /> {name}</p>
                <p><span>Email: </span> <br /> {email}</p>
                <p><span>User Type: </span> <br /> {type}</p>
                
                <button onClick={logout}>LOGOUT</button>
            </div>
        </div>
    )
}