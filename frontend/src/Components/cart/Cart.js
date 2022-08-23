import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { itemRemoved, itemAdded, updateCart } from './cartSlice';
import './cart.css'
import axios from 'axios';
import swal from 'sweetalert';

export default function Cart() {
  const dispatch = useDispatch();

  //user cart
  const cartProducts = useSelector((state) => state.cart.cart);
  
  //total cart items
  const totalItems = useSelector(state => state.cart.totalItems);

  //user details ---name, email
  const user = useSelector(state => state.user);



  let index = 0;
  let sum = 0;
  const totalPrice = () => {
    cartProducts.map(product => {
      sum += product.item.price * product.quantity;
    })
    return sum;
  }


  //increment button to increase quantity on cart view
  const cartIncrement = async (prodId) => {

    try {
      const response = await axios.post('http://localhost:5000/api/cart', { prodId: prodId }, {
        headers: {
          'x-auth-token': localStorage.getItem('userToken'),
        }
      });
      //increments totalItems
      dispatch(itemAdded());

      
    } catch (error) {
      swal("Server Error","Increment failed","error")
    }
  }


  // cart decrement button to decrement quantity by 1
  const cartDecrement = async (prodId) => {

    try {
      const response = await axios.delete(`http://localhost:5000/api/cart/${prodId}`, {
        headers: {
          'x-auth-token': localStorage.getItem('userToken'),
        }
      });
      //derements total Items by 1
      dispatch(itemRemoved());


    } catch (error) {
      swal("Server Error","Decrement failed","error")
    }
  }

  //this use effect will store the db cart into redux state
  useEffect(() => {
    console.log('navbar useeffect is called');
    localStorage.getItem('userToken') && dispatch(updateCart(localStorage.getItem('userToken')))

  }, [totalItems]);


  // console.log(cartProducts);
  return (
    <>
      <h1 className="text-center my-3">My Cart</h1>
      <div className="row">
        <div className="col-sm-8">
          <span>My bag <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg></span>
          <ul className="list-unstyled my-3" style={{ borderTop: '1px solid black' }}>
            {cartProducts.map(product => {
              return (<li className="media my-4" key={index++}>
                <img src={`${product.item.image}`} height='140px' width='140px' className="mr-3 cartComponent" alt="" />
                <div className="media-body">
                  <h5 className="mt-0 mb-1">{product.item.title}</h5>
                  <h3>{product.item.price}</h3>
                  <p>{product.item.description}</p>
                  <div className="quantityHandler">
                    <span>
                      <button className="btn btn-primary mx-3" onClick={() => cartIncrement(product.item._id)}>+</button>
                    </span>
                    <span>{product.quantity}</span>
                    <span>
                      <button className="btn btn-danger mx-3" onClick={() => cartDecrement(product.item._id)}>-</button>
                    </span>

                  </div>
                </div>
              </li>);
            })}
          </ul>

        </div>
        <div className="col-sm-4 my-5">
          <div className="cartDetails">
            <h3 className="text-center">Order Summary</h3>
            <div className="detailsRow">
              <span><b>Total Items:</b></span>
              <span>{totalItems}</span>
            </div>
            <div className="detailsRow">
              <span><b>Total Price</b></span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
            <button className="btn btn-dark">Place Order</button>
          </div>
        </div>
      </div>


    </>
  );
}
