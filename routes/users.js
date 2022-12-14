const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth=require('../middleware/auth');

router.post('/', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(409).send('User with this email is already registered');
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        cart: [],
    });
    try {
        await user.save();
        const token = user.getAuthToken();
        res.send({ ..._.pick(user, ['email', 'name']), token: token });

    } catch (error) {
        res.status(500).send('Server error: ' + error);

    }
});


router.get('/',auth, async(req, res) => {

    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) return res.status(404).send('User not found');
        return res.status(200).send(_.pick(user, ['name', 'email']));
        
    } catch (error) {
        return res.status(500).send('server Error');
    }
});

module.exports = router;