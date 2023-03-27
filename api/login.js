const express = require('express')
const session = require('express-session')
require('dotenv').config()
const loginRouter = express.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const db = require('./db')

const sessionSecret = process.env.SESSION_KEY

loginRouter.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false // set to true if HTTPS
  }
}));




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

    req.session.user = { name: emailCheck.name, surname: emailCheck.surname, email: req.body.email, authenticated: true }

    const sessionId = req.sessionID

    req.session.save(() => {})


    console.log("Backend /api/login route req.session.user content - ", req.session.user, "\nBackend /api/login route req.session content - ", req.session, '\nSession ID - ', sessionId)

    return res.status(200).json({ sessionshit: req.session.user, sessionid: sessionId, message: 'Autentifikācija veiksmīga', successful: true, data: {name: emailCheck.name, surname: emailCheck.surname} });

    

  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Ir notikusi kļūda, lūdzu sazinieties ar sistēmas administratoru', successful: false });
  }
});

loginRouter.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false // set to true if HTTPS
  }
}));

loginRouter.post('/validateSession', async (req, res) => {
  console.log('Backend /api/login/validateSession route, req.session.user content - ', req.session.user, "\nBackend /api/login/validateSession route req.session content - ", req.session,'\nreq.body.sessionID content - ', req.body.sessionID)
  if (req.session.user && req.body.sessionID) {
      console.log(req.session.user, req.body.sessionID)
      return res.status(200).json({ name: req.session.user.name, surname: req.session.user.surname, authenticated: req.session.user.authenticated });
  } else {
      return res.status(401).json({ message: 'Not authenticated', authenticated: false });
  } 
});

module.exports = loginRouter;
