import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../styles/Profile.css';
import close from '../assets/close.png'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const NewAds = () => {
    const [popup, setPopup] = useState(false);
    const [properties, setProperties] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [editItem, setEditItem] = useState({});


    const openModal = (id) => {
        for(let i = 0; i < properties.length; i++) {
            if(id == properties[i].id && properties[i].approved == false) {
                setSelectedItem(properties[i])               
            }
        }
        setPopup(selectedItem.length != 0 ? true: false)
    }

    console.log(selectedItem)

    const handlePopup = () => {
        setPopup(false)
    }

    useEffect(() => {
        fetchProperties()
      }, [])
    
      const fetchProperties = async() => {
        const response = await fetch("http://127.0.0.1:5000/pending_properties")
        const data = await response.json()
        setProperties(data.properties)
      }

      const acceptProperty = async (id) =>  {

        for(let i = 0; i < properties.length; i++){
            if(id == properties[i].id){
                setEditItem(properties[i])
            }
        }

        const data = {
            owner: editItem.owner,
            name: editItem.name,
            latitude: editItem.latitude,
            longitude: editItem.longitude,
            price: editItem.price,
            about: editItem.about,
            approved: true,
        }

        const url = `/update_property/${id}`

        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        } 

        const response = await fetch(`http://127.0.0.1:5000/update_property/${id}`, options)

        if(response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            alert("successfully upated!")
        }
      }

      const rejectProperty = async (id) => {

      }

      const { isLoaded ,loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyDIxaIBy24rPs31wnIJnO-0ElbnmgdvbO8"
      });
    
      const mapRef = useRef();
      const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      })
      if (loadError) return "error";
      if (!isLoaded) return "Maps";
      console.log(properties)

  return (
    <div className='newAds'>
        <h1>New advertisements</h1>

        <div className='newAds-items'>
            {properties.map(item => {
                return <NewAd 
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    about={item.about}
                    id={item.id}
                    handleOpen={() => openModal(item.id)}
                    handleAccept={() => acceptProperty(item.id)}
                    handleReject={() => rejectProperty(item.id)}
                />
            })}
        </div>

        {popup ? 
            <div className='newAds-popup'>
                <img src={close} alt="" className='close-btn-newAds' onClick={handlePopup}/>

                <h2>{selectedItem.name}</h2>

                <div className='newAds-popup-images'>
                    <img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    <img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    <img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                    <img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                </div>

                <GoogleMap 
                    center={{lat: selectedItem.latitude, lng: selectedItem.longitude}}
                    zoom={15}
                    onLoad={onMapLoad}
                    mapContainerStyle={{
                        height: "200px",
                        width: "auto",
                        marginTop: "20px"
                    }}
                    >
                        {selectedItem ? <Marker position={{lat: selectedItem.latitude, lng: selectedItem.longitude}} /> : <></>}
                        
                    </GoogleMap>



                <p><span>Price:</span> {selectedItem.price}</p>
                <p><span>Owner ID:</span> {selectedItem.owner}</p>
                <p><span>About:</span> <br />{selectedItem.about}</p>
                
            </div>
            :
            <></>
        }

    </div>
  )
}

export default NewAds

const NewAd = ({name, price, about, id, handleOpen, handleAccept, handleReject}) => {
    return (

        <div className='propertyItem'>
            <div>
                <h3>{name}</h3>
                <p>Price: <span>{price}</span></p>
                <p>ID: <span>{id}</span></p>
                <p>Owner: <span>example@gmail.com</span></p>
            </div>

            <div>
                <p>About:</p>
                <p>{about}</p>
            </div>
        
            <div>
                <button className='propertyItem-delete' onClick={handleReject}>Reject</button>
                <button onClick={handleAccept}>Accept</button>
                <button  onClick={handleOpen}>More Info</button>
            </div>

        </div>

    )
}