const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const {Product}=require('../models/product');
const _=require('lodash');
// const router = require('express');

router.post('/',async(req,res)=>{

    const product=new Product(_.pick(req.body,['title','price','description','category','image']));

    // console.log(product);
    try {
        await product.save();
        res.status(200).send(product);
        
    } catch (error) {
        res.status(500).send('Server error: ' + error); 
    }
})


router.get('/',async(req,res)=>{
    try {
        const products=await Product.find({}).select('title description price category image');
        // console.log(products);
        res.status(200).send(products);
    } catch (error) {
        // console.log(typeof req.params.id,req.params.id);
       res.status(500).send('Server Error:'+ error)
    }
})

router.get('/:id',async(req,res)=>{

    try {
        const product=await Product.findOne({_id:req.params.id});
        res.status(200).send(product);
    } catch (error) {
        res.status(404).send('Product not found');
    }
})


module.exports=router;
