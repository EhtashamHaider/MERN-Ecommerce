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
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        console.log('iN useEffect of single Product data is:', response);
        setProduct(response.data);
      } catch (error) {
        swal('Product Not found', "This product is out stock", "error");
        console.log('iN useEffect of single Product error is:', error);
      }
    }
    getSingleProduct();
  }, []);

  const addToCart = async (prodId) => {

    try {
      const response = await axios.post('http://localhost:3001/api/cart', { prodId: prodId }, {
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
      <div className="col-sm-6 details shadow" style={{backgroundColor:'white'}}>
        <h5>Title:</h5>
        <p style={{ color: '#4d5156' }}>{singleProd.title}</p>
        <h5>Price:</h5>
        <p style={{ color: '#4d5156' }}>$ {singleProd.price}</p>
        <h5>Category:</h5>
        <p style={{ color: '#4d5156' }}>{singleProd.category}</p>

        <h5>Description:</h5>
        <p className='text-left' style={{ color: '#4d5156' }}>{singleProd.description}</p>
        <button className="btn btn-warning" onClick={() => navigate('/')}>Not interested</button>
        <button className="btn btn-primary" onClick={() => addToCart(singleProd._id)}>Add to Cart</button>
      </div>
    </div>
  )
}
