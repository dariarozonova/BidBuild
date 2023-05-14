const express = require('express')
require('dotenv').config()
const tokenValidator = express.Router()

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY

// In your login route
tokenValidator.post('/', async (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token;
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // If token is valid, save to request for use in other routes
        const userName = decoded.name
        const userSurname = decoded.surname
        const authState = decoded.authenticated
        return res.status(200).send({ auth: authState, name: userName, surname: userSurname});
    });
});

module.exports = tokenValidator;
