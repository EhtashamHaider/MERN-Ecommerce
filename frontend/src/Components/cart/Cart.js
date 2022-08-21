import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { itemRemoved } from './cartSlice';
import './cart.css'

export default function Cart() {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart);
  let index = 0;
  let sum = 0;
  const totalPrice = () => {
    cartProducts.map(product => {
      sum += product.price;
    })
    return sum;
  }
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
                <img src={`${product.image}`} height='140px' width='140px' className="mr-3 cartComponent" alt="" />
                <div className="media-body">
                  <h5 className="mt-0 mb-1">{product.title}</h5>
                  <h3>{product.price}</h3>
                  <p>{product.description}</p>
                  <button className="btn btn-danger" onClick={() => dispatch(itemRemoved(product))}>Remove</button>
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
              <span>{cartProducts.length}</span>
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
