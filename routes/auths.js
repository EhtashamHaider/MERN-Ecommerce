const express=require('express');
const router=express.Router();
const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

router.post('/',async (req,res)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).send('Invalid email or password');
    }
    // console.log(user);
    console.log(req.body.password,user.password);
    const isValidPassword=await bcrypt.compare(req.body.password,user.password);
    if(!isValidPassword){
        return res.status(400).send('Invalid email or password');
    }   

    const token=user.getAuthToken();
    return res.header('x-auth-token',token).send('OK');

})

module.exports=router;