import React,{useState} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {setToken} from './userData/userSlice';
import { useNavigate } from 'react-router-dom';


export default function SignupFrom() {
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");


    const dispatch=useDispatch();
    const Navigate=useNavigate();
    
    
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }
    const handleName=(e)=>{
        setName(e.target.value);
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            const response=await axios.post('http://localhost:5000/api/users',{email:email,password:password,name:name});
            console.log(response.data);
            dispatch(setToken(response.data));
            Navigate('/');
        } catch (error) {

            console.log(error.response.status);
            
        }
    }


  return (
    <div>
        <form style={{marginTop:'10rem'}} className="w-50 mx-auto">
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
