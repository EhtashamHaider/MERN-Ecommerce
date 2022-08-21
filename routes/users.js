const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const _=require('lodash');


router.post('/',async (req,res)=>{
    let user=await User.findOne({email:req.body.email});
    if(user){
        return res.status(409).send('User with this email is already registered');
    }


    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);

    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        cart:[],
    });
    try {
        await user.save();
        const token=user.getAuthToken();
        res.header('x-auth-token',token).send(_.pick(user,['name','email','_id']));
        
    } catch (error) {
        res.status(500).send('Server error: ' + error);
        
    }
});


module.exports=router;