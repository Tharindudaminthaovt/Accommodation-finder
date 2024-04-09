import React, { useEffect, useState } from 'react'
import PropertyItem from './PropertyItem'

const PropertyStatus = () => {
  const [properties, setProperties] = useState([]);
  const [owner, setOwner] = useState(1);

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async() => {
    const response = await fetch("http://127.0.0.1:5000/properties")
    const data = await response.json()
    setProperties(data.properties)
  }

  const refetch = () => {
    fetchProperties()
  }
  
  return (
    <div className='propertyStatus'>

        {properties.length == 0 ? <h1>No Properties</h1>: <></>}

        {properties.map(item => {
          return <PropertyItem 
            key={item.id}
            name={item.name}
            price={item.price}
            id={item.id}
            about={item.about}
            status={item.approved}
            reloadContent={refetch}
          />
        })}
        
    </div>
  )
}

export default PropertyStatus