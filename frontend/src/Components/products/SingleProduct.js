import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { itemAdded } from '../cart/cartSlice';
import './singleProd.css'
import { useNavigate } from 'react-router-dom';



export default function SingleProduct({ match }) {
  const products = useSelector(state => { console.log('in use selector function'); return state.products; });
  const [singleProd, setProduct] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const product = products.products.find(p => p._id == id);
    setProduct(product);
  })
  console.log(singleProd)
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
        <button className="btn btn-primary" onClick={() => dispatch(itemAdded(singleProd))}>Add to Cart</button>
      </div>
    </div>
  )
}
