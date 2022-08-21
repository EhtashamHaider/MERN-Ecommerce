const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:5,
        maxLength:200,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    description:{
        type:String,
        required:true,
        minLength:5,
        maxLength:500,
    },
    category:{
        type:String,
        required:true,
        minLength:3,
    },
    image:{
        type:String,
        required:true,
    },
});

const Product=mongoose.model("Product",productSchema);
module.exports.Product=Product;
module.exports.productSchema=productSchema;
