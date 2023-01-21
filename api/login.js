const express = require('express')
require('dotenv').config()
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const db = require('./db')

const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY

// In your login route
loginRouter.post('/', async (req, res, next) => {
  try {

    if(!req.body.email || !req.body.password || req.body.password =='' || req.body.email ==''){
      return res.status(409).json({ message: 'Viens vai vairāki lauciņi nav aizpildīti', successful: false})
    }

    if(!validator.isEmail(req.body.email)) {
      return res.status(409).json({ message: 'Ievadītais E-Pasts nav pareizā formātā', successful: false })
    }

    // Check if the email exists
    const emailCheck = await db.getUserPassword(req.body.email);

    if (!emailCheck.exists) {
      return res.status(401).json({ message: 'Profils, ar šādu E-Pastu neeksistē', successful: false });
    }

    console.log(emailCheck)

    // Compare the password
    const match = await bcrypt.compare(req.body.password, emailCheck.password);

    if (!match) {
      return res.status(401).json({ message: 'Nepareizs E-Pasts vai parole', successful: false });
    }

    const payload = {
      name: emailCheck.name,
      surname: emailCheck.surname,
      authenticated: true
    }
    
    const token = jwt.sign(payload, secret, { expiresIn: '24h' })

    return res.status(200).json({ jwt_token: token, message: 'Autentifikācija veiksmīga', successful: true, data: {name: emailCheck.name, surname: emailCheck.surname} });

    

  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ir notikusi kļūda, lūdzu sazinieties ar sistēmas administratoru', successful: false });
  }
});

module.exports = loginRouter;
