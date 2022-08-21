const { application } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
const productsRouter=require('./routes/products');
const usersRouter=require('./routes/users');
const cartRouter=require('./routes/cart');
const authRouter=require('./routes/auths');

require("dotenv").config();


const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/products',productsRouter);
app.use('/api/users',usersRouter);
app.use('/api/cart',cartRouter);
app.use('/api/auths',authRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(()=>console.log("connected successfully"))
  .catch((err) => console.log("connection failed",err));

app.listen(process.env.PORT,()=>{
    console.log(`app is listening on port ${process.env.PORT}`);
})
