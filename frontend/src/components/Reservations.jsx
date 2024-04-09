import React from 'react';
import "../styles/Profile.css";

const Reservations = () => {
  return (
    <div className='reservations'>
        <h1>Your reservations</h1>

        <div className='reservations-container'>
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
          <ReservationCard />
        </div>
    </div>
  )
}

export default Reservations

const ReservationCard = () => {
  return(
    <div className='reservation-card'>
      <h3>Property Name</h3>

      <p><span>Property ID: </span>34</p>
      <p><span>Owner email: </span>example@gmail.com</p>
      <p><span>Offer Price: </span> LKR. 23000</p>
      <p><span>Date: </span>01/12/2023</p>
      <p><span>Status: </span> Pending</p>
      <button>Delete Reservation</button>
    </div>
  )
}