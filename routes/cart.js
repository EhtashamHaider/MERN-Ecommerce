const express=require('express');
const router=express.Router();
const User=require('../models/user');
const {Product}=require('../models/product');
const {Cart}=require('../models/cart');
const _=require('lodash');

router.post('/',async (req,res)=>{
    // const product


    //finding if product exists or not
    let product=await Product.findById({_id:req.body.prodId});
    if(!product){
        return res.status(404).send('This product is out of stock');
    }


    //finding user
    let user=await User.findOne({_id:'6302072d4686338e3067415a'});


    //finding if product already exists in the cart or not
    const index=user.cart.findIndex(cartItem=>{

        return cartItem.item._id.equals(product._id);
    });




    //adding first item to the cart
    if(index===-1){
        product=_.pick(product,['_id','title','description','price','category','image']);
        const cart=new Cart({
            item:{...product},
            quantity:1,
        })
        user.cart.push(cart);
        await user.save();
        return res.status(200).send('Added to cart');
    }
    //updating user's cart
    else{
        console.log('product already exits in the cart');
        user.cart[index].quantity +=1;
        await user.save();
        return res.status(200).send('udpated to cart');
    }
    

})




module.exports=router;