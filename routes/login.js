const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePass(pass) {
    return pass.length >= 8;
}
function validateUsername(username) {
    return username.length <= 10;
}


router.post('/createaccount', async (req, res) => {
    try {
        const {  username, email, password} = req.body;
        const checkUser = await User.findOne({ username });
        if (checkUser) {
            return res.json({status: 'Username already exists'});
        }
        if (!validateEmail(email)) return res.json({status: 'Please enter a valid email'});
        if (!validatePass(password)) return res.json({status: 'Password must be at least 8 characters long'});
        if (!validateUsername(username)) return res.json({status: 'Username must be 10 characters or less'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });
        await user.save();

        const jwt_token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('auth-token', jwt_token, { httpOnly: true, expires: new Date(Date.now() + 20 * 365 * 24 * 60 * 60 * 1000) }).json({ status: 'success' });

    } catch(err) {
        console.error(err);
    }
});


function authToken(req, res) {
    const token = req.cookies['auth-token'];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.userId = user.userId;
        next();
    });
}


module.exports = router;