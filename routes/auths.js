const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res) => {
    console.log('in auth .js function');
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        console.log('user not found')
        return res.status(400).send('Invalid email or password');
    }
    console.log(user);
    console.log(req.body.password, user.password);
    const isValidPassword = await bcrypt.compare(req.body.password, user.password);


    if (!isValidPassword) {
        return res.status(400).send('Invalid email or password');
    }


    const token = user.getAuthToken();
    if (!token) {
        res.status(401).send('Login Failed');
    }
    return res.send({ ..._.pick(user, ['email', 'name']), token: token });

})

module.exports = router;