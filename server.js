
const express = require('express');
const app = express();

// Imports
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/client/build'));
app.use(cookieParser());

// DB models
const User = require('./models/User');

// Main route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.get('/:route', (req, res) => {
    // Check auth
    if (req.params.route === 'dashboard') {
        if (!authToken(req, res)) {
            res.redirect('/');
        }
        
    }

    res.sendFile(__dirname + '/client/build/index.html');
    
});

// Routes
const loginRoute = require('./routes/login');
app.use('/login', loginRoute);


app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => {
    console.log('Connected to MongoDB');
});
console.log(require('crypto').randomBytes(256).toString('base64'));

function authToken(req, res) {
    const result = false;
    const token = req.cookies['auth-token'];
    if (!token) return result;// res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return result;//res.sendStatus(403);
        req.userId = user.userId;
        result = true;//next();
    });
    return result;
}