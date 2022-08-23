import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { getUser } from './userData/userSlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
// import {useState,}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [name, setName] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();


  //handlers
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/auths', { email: email, password: password });
      localStorage.setItem('userToken', data.token)
      dispatch(getUser(localStorage.getItem('userToken')));
      Navigate('/');
    }
    
    catch (error) {
      if (error.response.status === 400) {
        return swal('Invalid Credentials!', error.response.data, 'error');
      }
      if (error.response.status === 401) {
        return swal('Authentication Error!', 'Login Again', 'error');
      }

    }
  }
  return (
    <div>
      <form style={{ marginTop: '10rem' }} className="w-50 mx-auto">
        <h3>Login</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            value={email}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleEmail}
          />

        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Login
        </button>
        <Link to="/signup" class="btn btn-success mx-3" role="button">Register</Link>


      </form>
    </div>
  );
}
