import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Home() {

  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log(currentUser.userName);

  const getCars = async (e) => {
    await axios.get("http://localhost:8080/car/getByUserId/" + currentUser.userId)
      .then((response) => {

        localStorage.setItem("cars", JSON.stringify(response.data));

      })
      .catch(() => {
        console.log("bir hata var");
      })
  };

  getCars();
  const cars = JSON.parse(localStorage.getItem('cars'));
  console.log(cars);


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
            <div className='col-md-3 p-4'>
              <Link to="/addNewCar" className="btn btn-outline-primary d-flex justify-content-between align-items-center text-decoration-none ms-2"> + Add New Car</Link>
            </div>
          </div>


          <div className='row'>
            <div className='col-md-12 p-4'>
              <table class="table table-hover" >
                <thead>
                  <tr>
                    <th scope="col">Car Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Year</th>
                    <th scope="col">Number Plate</th>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <td>My Car</td>
                    <td>Audi</td>
                    <td>A5</td>
                    <td>2015</td>
                    <td>31 AA 23</td>
                  </tr>
                  <tr>
                    <td>My Car 2</td>
                    <td>Audi</td>
                    <td>A6</td>
                    <td>2016</td>
                    <td>31 AB 203</td>
                  </tr>
                  <tr>
                    <td>My Car 3</td>
                    <td>Audi</td>
                    <td>A3</td>
                    <td>2023</td>
                    <td>31 BA 23</td>
                  </tr> */}
                  {cars.map((item, index) => (
                    <tr key={index}>
                      <td>{item.carName}</td>
                      <td>{item.brand}</td>
                      <td>{item.model}</td>
                      <td>{item.year}</td>
                      <td>{item.numberPlate}</td>
                      <td>
                        <FontAwesomeIcon icon={faTrash} />
                      </td>
                    </tr>
                  ))}
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