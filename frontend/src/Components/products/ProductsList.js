import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productsSlice';
import DotLoader from "react-spinners/DotLoader";
import { itemAdded } from '../cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';



export default function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  const truncate = (text) => {
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
  }

  const addToCart = async (product) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cart', { prodId: product._id }, {
        headers: {
          'x-auth-token': token,
        }
      }
      );
      console.log('in try response', response);
      dispatch(itemAdded())
    } catch (error) {
      if (error.response.status === 401) {
        swal("Authentication Required", `You need to login to add things to your cart`, "error");
      }

    }
  }



  return (
    <>
      <h1 className="my-3 text-center">Products</h1>
      <div className="row my-4">
        {products.status === 'loading' ? <DotLoader /> :
          products.products.map((product) => {
            return <div className="col-sm-3" key={product._id}>
              <div className="card mt-3 p-4 h-100">
                <img src={`${product.image}`} style={{ cursor: 'pointer' }} className="card-img-top"
                  alt="Hollywood Sign on The Hill" onClick={() => { navigate(`/products/${product._id}`) }} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    {truncate(product.description)} ${product.price}
                  </p>
                </div>
                <button className="btn btn-primary my-4 mx-3" onClick={() => addToCart(product)}> Add to Cart</button>
              </div>
            </div>
          })}
      </div>

    </>
  )
}
