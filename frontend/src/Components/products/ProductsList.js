import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productsSlice";
import DotLoader from "react-spinners/DotLoader";
import { itemAdded } from "../cart/cartSlice";
import { updateCart } from "../cart/cartSlice";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import './productsList.css';

export default function ProductsList() {
  const dispatch = useDispatch();
  //all products
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  //user data
  const user = useSelector((state) => state.user);

  //use effect to fetch products from db
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  //useEffect to update Cart in case already logged in user
  useEffect(() => {
    console.log("navbar useeffect is called");
    localStorage.getItem("userToken") &&
      dispatch(updateCart(localStorage.getItem("userToken")));
  }, []);

  const truncate = (text) => {
    return text.length > 50 ? text.substring(0, 50) + "..." : text;
  };

  //adding items to the cart
  const addToCart = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart",
        { prodId: product._id },
        {
          headers: {
            "x-auth-token": localStorage.getItem("userToken"),
          },
        }
      );
      console.log("in try response", response);
      dispatch(itemAdded());


    } catch (error) {
      if (error.response.status === 401) {
        swal(
          "Authentication Required",
          `You need to login to add things to your cart`,
          "error"
        );
      }
    }
  };

  return (
    <>
      <h1 className="my-3 text-center">Products</h1>
      <div className="row mt-5">
        {products.status === "loading" ? (
          <DotLoader />
        ) : (
          products.products.map((product) => {
            return (
              <div className="col-sm-4 mt-4 product" key={product._id}>
                <div className="card mt-3 py-4 h-100 shadow" style={{ borderRadius: '5px' }}>
                  <img
                    src={`${product.image}`}
                    style={{ cursor: "pointer", width: '200px', height: '200px', objectFit: 'contain' }}
                    className="card-img-top mx-auto"
                    alt="Hollywood Sign on The Hill"
                    onClick={() => {
                      navigate(`/products/${product._id}`);
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{product.title}</h5>
                    <h5 className="text-center"> ${product.price} </h5>
                    <p className="card-text" style={{ color: '#4d5156' }}>
                      {truncate(product.description)}
                    </p>
                  </div>
                  <button
                    className="btn btn-primary mt-2 mx-3"
                    onClick={() => addToCart(product)}
                  >
                    {" "}
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
