import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './productsSlice';
import DotLoader from "react-spinners/DotLoader";
import { itemAdded } from '../Components/cart/cartSlice';
import { useNavigate } from 'react-router-dom';


export default function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
    // console.log('in use effect', products);
  }, [dispatch])

  if (products.status === 'success') {
    // console.log('after success ', products);
  }

  const truncate = (text) => {
    return text.length > 20 ? text.substring(0, 20) + '...' : text;
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
                <button className="btn btn-primary my-4 mx-3" onClick={() => dispatch(itemAdded(product))}> Add to Cart</button>
              </div>
            </div>
          })}
      </div>

    </>
  )
}
