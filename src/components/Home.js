import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import LeftNavbar from './LeftNavbar';

export default function Home() {

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [errorMessage, setErrorMessage] = useState('');

  const getCars = async (e) => {
    await axios.get("http://localhost:8080/car/getByUserId/" + currentUser.userId)
      .then((response) => {
        localStorage.setItem("cars", JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log("User does not have any cars yet! " + error);
        setErrorMessage("You don't have any cars yet!");
      })
  };

  const [cars, setCars] = useState(JSON.parse(localStorage.getItem('cars')) || []);
  getCars();

  const carTable = () => cars.map((car, index) => (
    <tr key={index}>
      <td>{car.carName}</td>
      <td>{car.brand}</td>
      <td>{car.model}</td>
      <td>{car.year}</td>
      <td>{car.numberPlate}</td>
      <td>
        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} />&nbsp;
        <FontAwesomeIcon icon={faPenToSquare} />
      </td>
    </tr>
  ));

  const handleDelete = async (index) => {
    const selectedCar = cars[index];

    await axios.delete("http://localhost:8080/car/delete/" + selectedCar.carId)
      .then((response) => {
        var updatedArray = cars.filter(item => item !== selectedCar);
        localStorage.setItem("cars", JSON.stringify(updatedArray));
        setCars(updatedArray);
        console.log("Car deleted succesfully.");
        carTable(cars);
      })
      .catch((error) => {
        console.log(" Delete operation could not be operated:  " + error);
      })
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className='home overflow-hidden'>

      <div className='row'>

        < LeftNavbar />

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
            <div className='col-md-3'>
              <input type="text" placeholder="Search..." className='border-0' />
            </div>
            <div className='col-md-3'>
              <p>{currentUser.firstName} {currentUser.lastName}</p>
            </div>
            <div className='col-md-3'>
              <Link to="/login" className="btn btn-danger text-decoration-none ms-2" onClick={handleLogout}>Log out</Link>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-3 p-4'>
              <Link to="/addNewCar" className="btn btn-outline-primary d-flex justify-content-between align-items-center text-decoration-none ms-2"> + Add New Car</Link>
            </div>
          </div>


          <div className='row'>
            <div className='col-md-12 p-4'>
              <table className="table table-hover" id='carTable'>
                <thead>
                  <tr>
                    <th scope="col">Car Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Year</th>
                    <th scope="col">Number Plate</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {carTable(cars)}
                  {errorMessage && <div className="error-message text-center text-danger">{errorMessage}</div>}
                </tbody>
              </table>
            </div>
          </div>

          <div className='row'>
            <div className='col-md-12'>

            </div>
          </div>


        </div>
      </div>
    </div>
  )
}