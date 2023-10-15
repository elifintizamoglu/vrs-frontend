import React from 'react'

export default function Home() {

  const currentUser = JSON.parse(localStorage.getItem('user'));
  console.log(currentUser.userName);
  return (
    <div>
      {currentUser.firstName}
      {currentUser.lastName}
      {currentUser.userName}
      {currentUser.password}
    </div>
  )
}
