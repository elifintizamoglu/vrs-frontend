import React from 'react'
import LeftNavbar from './LeftNavbar';

export default function EditCar({car}) {

  console.log("*****" + typeof car);
  // console.log("////" + car.carName);

  return (
    <div className='row'>
      <LeftNavbar />
      <div className='col-md-10 bg-light '>
        <h3 className='mt-3 ms-3'><b>Edit Car</b></h3>
      <p>{car}</p>




      </div>
    </div>
  )
}
