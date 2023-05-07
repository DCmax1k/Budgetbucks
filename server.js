
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

// Main route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
});