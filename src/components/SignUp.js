import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SignUp() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
    })

    // const FIRST_NAME_REGEX= /^[a-zA-z][a-zA-Z]{2,23}$/; 
    // const LAST_NAME_REGEX= /^[a-zA-z][a-zA-Z]{2,23}$/; 
    // const USER_NAME_REGEX= /^[a-zA-z][a-zA-Z0-9-_]{5,23}$/; 
    // const PASS_REGEX= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const [confirmPassword, setConfirmPassword] = useState('');
    const { firstName, lastName, userName, password } = user;
    const jsonUser = JSON.stringify(user);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const clearForm = () => {
        setUser({
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
        });
      };

    const OnInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            await axios.post("http://localhost:8080/user/add", jsonUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(() => {
                    setSuccessMessage('You have succesfully signed up! Go ahead and sign in.');
                    setErrorMessage('');
                    clearForm();
                    setConfirmPassword('');
                })
                .catch(() => {
                    setErrorMessage('This username is already used. Please change it and try again.');
                    setSuccessMessage('');
                })
        }
        else {
            setErrorMessage('Confirmation password is different. Please enter the same password.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <form onSubmit={(e) => onSubmit(e)} className='row'>
                <div className='col-md-10 offset-md-1 border rounded p-3 mt-3 mb-2 shadow bg-light'>
                    <h1 className='text-center'>My Cars</h1>
                    <h5 className='text-center'>Sign Up</h5>
                    <div className='mb-2 px-4'>
                        <label htmlFor='FirstName' className='form-label'>First Name:</label>
                        <input type='text'
                            className='form-control'
                            placeholder='Enter your name.'
                            name='firstName'
                            value={firstName}
                            onChange={(e) => OnInputChange(e)} />
                    </div>
                    <div className='mb-2 px-4'>
                        <label htmlFor='LastName' className='form-label'>Last Name:</label>
                        <input type='text'
                            className='form-control'
                            placeholder='Enter your last name.'
                            name='lastName'
                            value={lastName}
                            onChange={(e) => OnInputChange(e)} />
                    </div>
                    <div className='mb-2 px-4'>
                        <label htmlFor='Username' className='form-label'>Username:</label>
                        <input type='text'
                            className='form-control'
                            placeholder='Select a username.'
                            name='userName'
                            value={userName}
                            onChange={(e) => OnInputChange(e)} />
                    </div>
                    <div className='mb-2 px-4'>
                        <label htmlFor='Password' className='form-label'>Password:</label>
                        <input type='password'
                            className='form-control'
                            placeholder='Set a password.'
                            name='password'
                            value={password}
                            onChange={(e) => OnInputChange(e)} />
                    </div>
                    <div className='mb-3 px-4'>
                        <label htmlFor='ConfirmPassword' className='form-label'>Confirm Password:</label>
                        <input type='password'
                            className='form-control'
                            placeholder='Confirm the password.'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className='mb-3 px-4'>
                        <button type='submit' className='btn btn-primary custom-btn mb-3' >Sign Up</button>
                        {successMessage && <div className="success-message text-center text-success ">{successMessage}</div>}
                        {errorMessage && <div className="error-message text-center text-danger">{errorMessage}</div>}
                    </div>

                    <Link to="/login" className='text-decoration-none custom-btn'>Have an account? Log In</Link>
                </div>

            </form>
        </div>
    )
}

