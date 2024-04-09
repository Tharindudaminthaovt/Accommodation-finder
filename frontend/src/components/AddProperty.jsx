import React, { useState, useRef, useCallback, useEffect } from 'react';
import '../styles/Profile.css';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const AddProperty = () => {
    const [wordcount, setWordcount] = useState(2000);
    const [images, setImages] = useState([]);
    const [heading, setHeading] = useState("");
    const [price, setPrice] = useState();
    const [about, setAbout] = useState("");
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [owner, setOwner] = useState(1);

    const handleFileChange = (event) => {
        setImages([...images, ...event.target.files]);
      };

    const uploadImages = async () => {
        for (const file of images) {
            const formData = new FormData();
            formData.append("img", file);
      
            try {
              const response = await fetch('http://127.0.0.1:5000/upload_images', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
              });
      
              if (!response.ok) {
                console.error('Failed to upload image:', file.name);
              }
            } catch (error) {
              console.error('Error uploading image:', error);
            }
          }
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        
        const data = {
            owner: owner,
            name: heading,
            latitude: latitude, 
            longitude: longitude,
            price: price,
            about: about,
            approved: false,
            pending: true,
        }

        const url = "http://127.0.0.1:5000/create_property"

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        //uploadImages()
        if (response.status !== 201 && response.status !== 200) {
            const message = await response.json()
            alert(message.message)
        } else {
            alert("Successfully uploaded property")
            setHeading("")
            setPrice(undefined)
            setAbout("")
            setLatitude(undefined)
            setLongitude(undefined)
        }
    }


  return (
    <div className='add-property'>
        <h1>Post And Advertisement about your property</h1>

        <form>
            <p className='addp-titles'>Heading</p>
            <input type="text" name='name' placeholder='Type a heading for your property' value={heading} onChange={(e) => {setHeading(e.target.value)}}/>

            <p className='addp-titles'>Price:</p>
            <input type="number" name='price' value={price} onChange={(e) => {setPrice(e.target.value)}}/> <span>LKR</span>

            <p className='addp-titles'>About you propery:</p>
            <p className='addp-titles-instruction'>Add a full description about your property(words left: {wordcount})</p>
            <textarea name="about" id="" cols="90" rows="10" value={about} onChange={(e) => {setAbout(e.target.value)}}></textarea>

            <p className='addp-titles'>Add Images</p>
            <input type="file" accept='image/*' name='img' multiple onChange={handleFileChange}/>
            <div className='selected-images-addp'>
                <img src="https://media.istockphoto.com/id/479767332/photo/idyllic-home-with-covered-porch.webp?b=1&s=170667a&w=0&k=20&c=8WsZVz6uBs31BhBJ0xzTFgbBixVyG0biRGftge7nfe4=" alt="" />
                <img src="https://media.istockphoto.com/id/479767332/photo/idyllic-home-with-covered-porch.webp?b=1&s=170667a&w=0&k=20&c=8WsZVz6uBs31BhBJ0xzTFgbBixVyG0biRGftge7nfe4=" alt="" />
                
            </div>
            <button className='remove-images'>Remove images</button>

            <div>
                <p className='addp-titles'>Location</p>
                <p className='addp-titles-instruction'>You can get the latitude and longitude by right clicking on the google maps(if you are using desktop version) or on mobile tap and hold the location. (First value is latitude and second value is longitude)</p>
                <div className='addp-locations'>
                    <div>
                        <p>Latitude</p>
                        <input type="number" name='lat' value={latitude} onChange={(e) => {setLatitude(e.target.value)}}/>
                    </div>
                    
                    <div>
                        <p>Longitude</p>
                        <input type="number" name='lng' value={longitude} onChange={(e) => {setLongitude(e.target.value)}}/>
                    </div>
                </div>
            </div>


            <div className='add-property-btn-item'>
                <button type='submit' className='add-property-btn' onClick={handleCreate}>Post Advertisement</button>
            </div>
            
        </form>
        
    </div>
  )
}

export default AddProperty