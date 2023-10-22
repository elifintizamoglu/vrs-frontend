import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,  faPenToSquare  } from '@fortawesome/free-solid-svg-icons';

export default function LeftNavbar() {
    return (

        <div className='col-md-2 align-self-start  mt-3'>
            <h2 className='text-center'>My Cars</h2>
            <ul className="list-group list-group-flush text-left p-2">
                <li className="list-group-item list-group-item-action"><Link to={"/home"} className='text-decoration-none text-dark'><FontAwesomeIcon icon={faHouse} className='text-black'/> Home</Link></li>
                <li className="list-group-item list-group-item-action"><Link to={"/changePassword"} className='text-decoration-none text-dark'><FontAwesomeIcon icon={faPenToSquare} /> Change Password</Link></li>
            </ul>
        </div>


    )
}
