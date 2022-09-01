import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './userData/userSlice';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';



export default function SignupFrom() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const dispatch = useDispatch();
  const Navigate = useNavigate();


  //input handlers
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users', { email: email, password: password, name: name });
      localStorage.setItem('userToken', response.data.token)
      dispatch(getUser(localStorage.getItem('userToken')));
      Navigate('/');
    } catch (error) {
      if (error.response.status === 409) {
        return swal("Conflict!", `Email already exits`, "error");
      }
      if (error.response.status === 500) {
        return swal("Server Error!", "We will fix it soon!", "error");
      }
      else {
        return swal("Error!", "Fetal Error!", "error");

      }


    }
  }


  return (
    <div>
      <form style={{ marginTop: '10rem' }} className="w-50 mx-auto">
        <h3>Register</h3>
        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            value={name}
            type="text"
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            placeholder="Enter Name"
            onChange={handleName}
          />

        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email</label>
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
          <label for="exampleInputPassword1">Password</label>
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
          Register
        </button>
      </form>
    </div>
  )
}
