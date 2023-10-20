import React from 'react'
import { Link } from 'react-router-dom';

export default function LeftNavbar() {
    return (

        <div className='col-md-2 align-self-start  mt-3'>
            <h2 className='text-center'>My Cars</h2>
            <ul className="list-group list-group-flush text-left p-2">
                <li className="list-group-item"><Link to={"/home"} className='text-decoration-none text-dark'>Home</Link></li>
                <li className="list-group-item"><Link to={"/changePassword"} className='text-decoration-none text-dark'>Change Password</Link></li>
            </ul>
        </div>


    )
}
