import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { itemAdded } from '../cart/cartSlice';
import './singleProd.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { fetchProducts } from './productsSlice';



export default function SingleProduct({ match }) {
  const products = useSelector(state => { return state.products; });
  const user = useSelector(state => state.user);
  const [singleProd, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // dispatch(fechProducts());
    async function getSingleProduct() {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        console.log('iN useEffect of single Product data is:', response);
        setProduct(response.data);
      } catch (error) {
        swal('Product Not found', "This product is out of stock", "error");
        console.log('iN useEffect of single Product error is:', error);
      }
    }
    getSingleProduct();
  }, []);

  const addToCart = async (prodId) => {

    try {
      const response = await axios.post('http://localhost:5000/api/cart', { prodId: prodId }, {
        headers: {
          'x-auth-token': localStorage.getItem('userToken'),
        }
      });
      dispatch(itemAdded());


    } catch (error) {
      if (error.response.status === 401) {
        swal("Authentication Required", `You need to login to add things to your cart`, "error");
      }
      else {
        swal("Authentication Required", `You need to login to add things to your cart`, "error");

      }


    }

  }
  return (
    <div className="row mt-6" style={{ marginTop: '7rem' }}>
      <div className="col-sm-6">
        <img className="singleProductComponent" src={`${singleProd.image}`} alt={`${singleProd.title}`} />
      </div>
      <div className="col-sm-6 detail">
        <h2>Title:</h2>
        <p>{singleProd.title}</p>
        <h2>Price:</h2>
        <p>{singleProd.price}</p>
        <h2>Category:</h2>
        <p>{singleProd.category}</p>

        <h2>Description:</h2>
        <p>{singleProd.description}</p>
        <button className="btn btn-warning" onClick={() => navigate('/')}>Not interested</button>
        <button className="btn btn-primary" onClick={() => addToCart(singleProd._id)}>Add to Cart</button>
      </div>
    </div>
  )
}
