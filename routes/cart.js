const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Product } = require('../models/product');
const { Cart } = require('../models/cart');
const _ = require('lodash');
const auth = require('../middleware/auth');

//adding to cart

router.post('/', auth, async (req, res) => {
    // const product


    //finding if product exists or not
    let product = await Product.findById({ _id: req.body.prodId });
    if (!product) {
        return res.status(404).send('This product is out of stock');
    }


    //finding user
    let user = await User.findOne({ _id: req.user.id });


    //finding if product already exists in the cart or not
    const index = user.cart.findIndex(cartItem => {

        return cartItem.item._id.equals(product._id);
    });




    //adding first item to the cart
    if (index === -1) {
        product = _.pick(product, ['_id', 'title', 'description', 'price', 'category', 'image']);
        const cart = new Cart({
            item: { ...product },
            quantity: 1,
        })
        user.cart.push(cart);
        await user.save();
        return res.status(200).send('Added to cart');
    }
    //updating user's cart
    else {
        user.cart[index].quantity += 1;
        await user.save();
        return res.status(200).send('udpated to cart');
    }


})


router.get('/', auth, async (req, res) => {
    // console.log('user id:', req.user.id);
    let user = await User.findOne({ _id: req.user.id });
    if (!user) {
        return res.status(404).send('User not found');
    }

    // console.log(user);
    const arr = [...user.cart];
    res.status(200).send(arr);
})



// removing from cart 

router.delete('/:id', auth, async (req, res) => {
    // const product


    //finding if product exists or not
    let product = await Product.findOne({ _id: req.params.id });
    if (!product) {
        return res.status(404).send('This product does not exist');
    }


    //finding user
    let user = await User.findOne({_id: req.user.id});


    //finding if product already exists in the cart or not
    const index = user.cart.findIndex(cartItem => cartItem.item._id.equals(product._id));

    if (index > -1) {

        if (user.cart[index].quantity > 1) user.cart[index].quantity -= 1;
        else user.cart.splice(index, 1);
        await user.save();
        res.status(200).send('Product removed from the cart');
    }
    else {
        return res.status(400).send('This product not exits in the cart');
    }


})




module.exports = router;