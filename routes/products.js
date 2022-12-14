const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const {Product}=require('../models/product');
const _=require('lodash');

router.post('/',async(req,res)=>{

    const product=new Product(_.pick(req.body,['title','price','description','category','image']));

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
        res.status(200).send(products);
    } catch (error) {
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
