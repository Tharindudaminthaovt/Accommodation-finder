import React from 'react';
import "../styles/DetailsItem.css";

const DetailItem = ({heading, price, distance, description, handleOpen}) => {
  return (
    <div className='detailsItem' onClick={handleOpen}>
        <div className='detailsItem-details'>
          <h2>{heading}</h2>
          <p className='detailsItem-price'>LKR. {price}</p>
          <p>Distance from university: {distance}KM</p>
          <p>{description}</p>
        </div>

        <img src="https://media.istockphoto.com/id/479767332/photo/idyllic-home-with-covered-porch.webp?b=1&s=170667a&w=0&k=20&c=8WsZVz6uBs31BhBJ0xzTFgbBixVyG0biRGftge7nfe4=" alt="property image" />
    </div>
  )
}

export default DetailItem