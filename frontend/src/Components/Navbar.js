import React, { useEffect } from 'react'
// import 'bootstrap-icons/icons/cart3';
import './navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateCart } from './cart/cartSlice';
import {getUser} from './userData/userSlice';


export default function Navbar() {
  const totalItems = useSelector(state => state.cart.totalItems);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const Navigate= useNavigate();

  useEffect(()=>{
    localStorage.getItem('userToken') && dispatch(getUser(localStorage.getItem('userToken')));
  },[])

  return (
    <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/">Kapra Khana</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart" style={{ color: 'white' }}><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg><span className='badge badge-warning' id='lblCartCount'> {totalItems} </span></Link>
            </li>
          </ul>
        </ul>
        
        {!localStorage.getItem('userToken') ? <Link to="/login" class="btn btn-outline-success" role="button">Login</Link> :<> <h6 style={{ color: 'white' }}>Hello {user.userName}!</h6> <button className="btn btn-outline-danger mx-3" role="button" onClick={()=>{localStorage.removeItem('userToken');window.location.reload();}}>Logout</button> </>}
        

      </div>
    </nav></div>
  )
}
