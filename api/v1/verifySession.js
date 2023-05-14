const express = require('express')
require('dotenv').config()
const sessionValidator = express.Router()

// In your login route
sessionValidator.post('/', async (req, res) => {
    if (req.session.user && req.body.sessionID) {
        console.log(req.session.user, req.body.sessionID)
        return res.status(200).json({ name: req.session.user.name, surname: req.session.user.surname, authenticated: req.session.user.authenticated });
    } else {
        return res.status(401).json({ message: 'Not authenticated', authenticated: false });
    } 
});

module.exports = sessionValidator;
