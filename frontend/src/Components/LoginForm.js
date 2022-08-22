import React, { useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
// import {useState,}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [name, setName] = useState("");


    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const response=await axios.post('http://localhost:5000/api/auths',{email:email,password:password});
            // console.log(response.);
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>
      <form style={{marginTop:'10rem'}} className="w-50 mx-auto">
        <h3>Login</h3>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
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
          Login
        </button>
        <Link to="/signup" class="btn btn-success mx-3" role="button">Register</Link>


      </form>
    </div>
  );
}
