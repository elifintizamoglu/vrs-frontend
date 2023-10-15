import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/style.css';

export default function Login() {

  const [user, setUser] = useState({
    userName: "",
    password: "",
  })
  const { userName, password } = user;
  const jsonUser = JSON.stringify(user);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const OnInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const clearForm = () => {
    setUser({
      userName: "",
      password: "",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:8080/user/getByUserName/{userName}" + userName, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {

        setSuccessMessage('You have succesfully signed up! Go ahead and sign in.');
        setErrorMessage('');
        clearForm();
      })
      .catch(() => {
        setErrorMessage('This username is already used. Please change it and try again.');
        setSuccessMessage('');
      })
  };



  return (
    <div className="container-login">
      <form onSubmit={(e) => onSubmit(e)} className='row'>
        <div className='col-md-10 offset-md-1 border rounded p-3 mt-3 mb-2 shadow bg-light'>
          <h1 className='text-center'>My Cars</h1>
          <h5 className='text-center'>Log In</h5>
          <div className='mb-2 px-4'>
            <label htmlFor='Username' className='form-label'>Username:</label>
            <input type='text'
              className='form-control'
              placeholder='Enter your username.'
              name='userName'
              value={userName}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-3 px-4'>
            <label htmlFor='Password' className='form-label'>Password:</label>
            <input type='password'
              className='form-control'
              placeholder='Enter your password.'
              name='password'
              value={password}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-3 px-4'>
            <button type='submit' className='btn btn-primary custom-btn mb-3' >Log In</button>
            {successMessage && <div className="success-message text-center text-success ">{successMessage}</div>}
            {errorMessage && <div className="error-message text-center text-danger">{errorMessage}</div>}
          </div>

          <Link to="/signUp" className='text-decoration-none custom-btn'>No account yet? Sign Up!</Link>
        </div>

      </form>
    </div>
  )
}
