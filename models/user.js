const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { cartSchema } = require('./cart');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 60,
    },
    cart: {
        type: [cartSchema],
        // required:true,   
    }

});

userSchema.methods.getAuthToken = function () {
    const token = jwt.sign({ id: this._id }, 'jwtPrivateKey');
    return token;
}

module.exports = mongoose.model('User', userSchema);



