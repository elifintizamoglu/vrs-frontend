import React, { useState } from 'react';
import LeftNavbar from './LeftNavbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const { oldPassword, newPassword, confirmNewPassword } = password;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const OnInputChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }
  const clearForm = () => {
    setPassword({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const navigate = useNavigate();
  const handleCancel = () => navigate("/home");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (currentUser.password === oldPassword) {
      if (newPassword === confirmNewPassword) {
        const putData = currentUser.userId + "?oldPassword=" + oldPassword + "&newPassword=" + newPassword;
        await axios.put("http://localhost:8080/user/update/" + putData)
          .then(() => {
            currentUser.password = newPassword
            console.log(currentUser.password);
            localStorage.setItem("user", JSON.stringify(currentUser));
            setSuccessMessage('Password is successfully changed');
            setErrorMessage('');
            clearForm();
          })
          .catch((error) => {
            console.log(error);
          })
      } else {
        setSuccessMessage('');
        setErrorMessage('Confirmation password is different. Please enter the same password.');
      }
    } else {
      setSuccessMessage('');
      setErrorMessage('You entered old password wrong. Please check and try again.');
    }

  };

  return (
    <div className='row'>
      <LeftNavbar />
      <div className='col-md-10 bg-light '>
        <h3 className='mt-3 ms-3'><b>Change Password</b></h3>

        <form onSubmit={(e) => onSubmit(e)}>
          <div className='mb-2 px-4'>
            <label htmlFor='OldPassword' className='form-label'>Old Password:</label>
            <input type='password'
              className='form-control'
              placeholder='Enter your old password.'
              name='oldPassword'
              value={oldPassword}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-2 px-4'>
            <label htmlFor='NewPassword' className='form-label'>New Password:</label>
            <input type='password'
              className='form-control'
              placeholder='Enter your new password.'
              name='newPassword'
              value={newPassword}
              onChange={(e) => OnInputChange(e)} />
          </div>
          <div className='mb-3 px-4'>
            <label htmlFor='ConfirmNewPassword' className='form-label'>Confirm New Password:</label>
            <input type='password'
              className='form-control'
              placeholder='Confirm the new password.'
              name='confirmNewPassword'
              value={confirmNewPassword}
              onChange={(e) => OnInputChange(e)} />
          </div>

          <div className='mb-3 px-4'>
            <button type='submit' className='btn btn-primary mb-3 me-3' >Save</button>
            <button type='cancel' className='btn btn-secondary mb-3' onClick={() => handleCancel()}>Cancel</button>
            {successMessage && <div className="success-message text-center text-success ">{successMessage}</div>}
            {errorMessage && <div className="error-message text-center text-danger">{errorMessage}</div>}
          </div>
        </form>


      </div>
    </div>



  )
}
