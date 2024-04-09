import React, { useState } from 'react'

const Offers = () => {
    const [accepted, setAccepted] = useState(false)

  return (
    <div className='offers-main'>
        <h1>Offers</h1>

        <div className='offers'>

            <div className='offer-card'>
                <h3>Property Name</h3>
                <p>ID: <span>34</span></p>

                <p>Student Name: <span>john</span></p>
                <p>Student email: <span>example@gmail.com</span></p>
                <p>Offer Price: <span>24000</span></p>

                {!accepted ? 
                    <div>
                        <button>Accept</button>
                        <button className='btn-decline'>Decline</button>
                    </div>
                    :
                    <></>
                }
                
                {accepted ? <div className='accepted-text'>Accepted</div> : <></>}
                
            </div>
        </div>

    </div>
  )
}

export default Offers