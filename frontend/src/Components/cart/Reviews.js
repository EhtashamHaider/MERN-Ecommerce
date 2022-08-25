import React,{useState,useEffect} from 'react'
import './cart.css'
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';


export default function Reviews({match}) {
    const {id}=useParams();
    console.log('in review component',id);

    // const [reviewItemId,setId]=useState(id);
    const [reviews,setReviews]=useState("");


    useEffect(()=>{
        console.log('Reviews useEffect is called');
        async function getSingleProduct() {
            try {
              const response = await axios.get(`http://localhost:5000/api/products/${id}`);
              console.log('iN useEffect of Reviews data is:', response);
              console.log('descrition is:',response.data);
              setReviews(response.data.description);
            } catch (error) {
              swal('Product Not found', "This product is out stock", "error");
              console.log('iN useEffect of single Prodt error is:', error);
            }
          }
          getSingleProduct();
    },[])

    return (
    reviews && <div className="cartDetails shadow">
        <h3 className="text-center">Description</h3>
        {/* <p>{reviews}</p> */}
        <button className="btn btn-dark">Place Order</button>
    </div>
  )
}
