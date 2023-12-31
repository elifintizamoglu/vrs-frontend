import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import AddNewCar from './components/AddNewCar';
import ChangePassword from './components/ChangePassword';
import EditCar from './components/EditCar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "signUp",
    element: <SignUp/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "home",
    element: <Home/>
  },
  {
    path: "addNewCar",
    element: <AddNewCar/>
  },
  {
    path: "changePassword",
    element: <ChangePassword/>
  },
  {
    path: "editCar",
    element: <EditCar/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
