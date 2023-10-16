import React from 'react'
import { Link } from 'react-router-dom';

export default function Home() {

  //const currentUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='home overflow-hidden'>
      <div className='row'>


        <div className='col-md-2 align-self-start  mt-3'>
          <h5 className='text-center'>My Cars</h5>
          <ul className="list-group list-group-flush text-left p-2">
            <li className="list-group-item"><Link to={"/home"} className='text-decoration-none text-dark'>Home</Link></li>
            <li className="list-group-item"><Link to={"/changePassword"} className='text-decoration-none text-dark'>Change Password</Link></li>
          </ul>
        </div>



        <div className='col-md-10 bg-light '>
          <h2 className='mt-3 ms-3 display-3'>My Cars</h2>

          <div className='row'>
            <div className='col-md-3 bg-light d-flex justify-content-between align-items-center'>
              <ul className="list-group ">
                <li className="list-group-item d-flex justify-content-between align-items-center ms-2 me-2">
                  Count
                  <span style={{ color: 'black' }} className="badge badge-primary badge-pill">{14}</span>
                </li>
              </ul>
            </div>
            <div className='col-md-8'>
              <input type="text" placeholder="Search..." className='border-0' />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-3'>
              <button type="button" class="btn btn-outline-primary d-flex justify-content-between align-items-center">+ Add New Car</button>

            </div>
          </div>


        </div>
      </div>
    </div>
  )
}