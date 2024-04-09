import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../styles/Home.css';
import Nav from '../components/Nav';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import DetailItem from '../components/DetailItem';
import close from '../assets/close.png';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [properties, setProperties] = useState([]);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    fetchProperties()
  }, [])

  useEffect(() => {
    fetchMarkers()
  }, [properties])

  const fetchMarkers = () => {
    return properties.map(item => {
      return <Marker position={{lat: item.latitude, lng:item.longitude}} onClick={() => openModal(item.id)}/>
    })
  }

  const fetchProperties = async() => {
    const response = await fetch("http://127.0.0.1:5000/properties")
    const data = await response.json()
    setProperties(data.properties)
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

  const openModal = (id) => {
    for(let i = 0; i < properties.length; i++) {
      if(properties[i].id == id) {
        setModalData(properties[i])
      }
    }

    if(modalData) {
      setModalOpen(true)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className='home'>
        <Nav />
        <div className='home-container'>
          <div className='home-properties'>
            {properties.map(item => {
                return <DetailItem 
                  key={item.id}
                  heading={item.name}
                  price={item.price}
                  description={item.about.slice(0, 20) + "..."}
                  handleOpen={() => openModal(item.id)}
                />
            })}
            
          </div>

          <div className='home-map'>
            <GoogleMap 
              center={{lat: 6.821584762485683, lng: 80.04148706435048}}
              zoom={14}
              onLoad={onMapLoad}
              mapContainerStyle={{
                height: "100%",
                width: "auto",
              }}
            >
              {fetchMarkers()}
              {/* {properties ? properties.map(item => {
                return <Marker position={{lat: item.latitude, lng:item.longitude}} onClick={() => openModal(item.id)}/>
              }) : <></>} */}
            </GoogleMap>
          </div>
          { modalOpen ? 
              <div className='home-modal'>
                <img src={close} alt="" className='home-modal-close' onClick={closeModal}/>

                <div className='home-modal-images'>
                  <img src="https://media.istockphoto.com/id/479767332/photo/idyllic-home-with-covered-porch.webp?b=1&s=170667a&w=0&k=20&c=8WsZVz6uBs31BhBJ0xzTFgbBixVyG0biRGftge7nfe4=" alt="" />
                  <img src="https://media.istockphoto.com/id/479767332/photo/idyllic-home-with-covered-porch.webp?b=1&s=170667a&w=0&k=20&c=8WsZVz6uBs31BhBJ0xzTFgbBixVyG0biRGftge7nfe4=" alt="" />
                </div>

                <h3>{modalData.name}</h3>

                <p>{modalData.about}</p>

                <p><span className='home-modal-bold'>LKR</span> {modalData.price}</p>

                <p><span className='home-modal-bold'>Distance from NSBM:</span> 1.5KM</p>

                <p><span className='home-modal-bold'>Owner:</span> {modalData.owner}</p>

                <div className='modal-buttons'>
                  <button>More Info</button>
                  <button>Send an offer</button>
                </div>
              </div>
              : <></>
          }
          
        </div>
    </div>
  )
}

export default Home