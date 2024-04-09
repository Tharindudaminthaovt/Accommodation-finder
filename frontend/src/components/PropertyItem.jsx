import React, { useState } from 'react';
import '../styles/Profile.css';

const PropertyItem = ({name, price, id, about, status, reloadContent}) => {

  const handleDelete = async (id) => {
    try {
      const options = {
          method: "DELETE"
      }
      const response = await fetch(`http://127.0.0.1:5000/delete_property/${id}`, options)
      if (response.status === 200){
        alert("successfully deleted");
        reloadContent()
      } else {
          console.error("Could not delete")
      }
  } catch (error) {
      alert(error)
  }
  }

  return (
    <div className='propertyItem'>
        <div>
          <h3>{name}</h3>
          <p>Price: <span>{price}</span></p>
          <p>ID: <span>{id}</span></p>
        </div>

        <div>
            <p>{about}</p>
        </div>

        <p>Status: <span>{!status? "Pending" : "Approved"}</span></p>
         
        <div>
          <button className='propertyItem-delete' onClick={() => handleDelete(id)}>Delete</button>
          <button>More Info</button>
        </div>

    </div>
  )
}

export default PropertyItem