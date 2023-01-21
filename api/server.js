require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const validator = require('validator')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./db')


const app = express()

app.use(cors())

const PORT = process.env.SERVER_PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})


connection.connect((error) => {
    if (error) {
        console.error(error)
    } else {
        console.log(`MySQL connected: \n*User: ${process.env.DB_USER} \n*Database: ${process.env.DB_NAME}`)
    }
})


app.post('/api/register', async (req, res) => {
    // check if the required fields are present
    console.log(req.body)

    if(!!req.body.name || !req.body.surname || !req.body.number || !req.body.email || !req.body.password || !req.body.role){
      return res.status(400).send({ error: true, message: 'Viens vai vairāki lauciņi nav aizpildīti' })
    }

    if(!validator.isEmail(req.body.email)) {
      return res.status(400).send({ error: true, emailTaken: true, message: 'Ievadītais E-Pasts nav pareizā formātā.' })
    }

    db.checkIfExists(req.body.email, req.body.role)
      .then((exists) => {
          if(exists) {
              return res.status(409).send({ error: true, message: 'Lietotājs ar šo E-Pasta adresi jau eksistē.' });
          }
          // If email does not exist continue registration process
          // hash the password
          bcrypt.hash(req.body.password, 10, (error, hash) => {
            if (error) {
              console.error(error)
              return res.status(500).send({ error: true, message: 'Ir notikusi kļūda, lūdzu sazinieties ar sistēmas administratoru.' })
            }
            // Insert user data in to the database
            if(req.body.role == 'Piegādātājs'){
              db.insertSeller(req.body.name, req.body.surname, req.body.number, req.body.email, req.body.experience, hash, req.body.pilseta)
              .then(() =>{
                return res.send({ error: false, message: 'Lietotāja profils ir izveidots.' })
              })
              .catch((error) => {
                console.error(error)
                return res.status(500).send({ error: true, message: 'Ir notikusi kļūda, lūdzu sazinieties ar sistēmas administratoru.' })
              });
            } else if(req.body.role === 'Klients') {
              db.insertBuyer(req.body.name, req.body.surname, req.body.number, req.body.email, hash, req.body.pilseta)
                .then(() => {
                  return res.send({ error: false, message: 'Lietotāja profils ir izveidots.' })
                })
                .catch((error) => {
                  console.error(error)
                  return res.status(500).send({ error: true, message: 'Ir notikusi kļūda, lūdzu sazinieties ar sistēmas administratoru.' })
                });
            } else {
              return res.status(400).send({ error: true, message: 'Ir notikusi kļūda, lūdzu sazinieties ar sistēmas administratoru.' });
            }
          })
      })
      .catch((error) => {
          console.error(error);
          return res.status(500).send({ error: true, message: 'Ir notikusi kļūda, lūdzu sazinieties ar sistēmas administratoru.' });
      });
})

/* app.post('/api/login', (req, res) => {
    // check if the required fields are present
    if (!req.body.username || !req.body.password) {
      return res.status(400).send({ error: true, message: 'Please provide a username and password' })
    }

    // check if the username and password match a user in the database
    connection.query('SELECT * FROM users WHERE username = ?', [req.body.username], (error, results) => {
      if (error) {
        console.error(error)
        return res.status(500).send({ error: true, message: 'An error occurred while logging in' })
      }
      if (results.length === 0) {
        return res.send({ error: true, message: 'Incorrect username or password' })
      }

      // compare the hashed password from the database with the plain text password provided by the user
      bcrypt.compare(req.body.password, results[0].password, (error, result) => {
        if (error) {
          console.error(error)
          return res.status(500).send({ error: true, message: 'An error occurred while logging in' })
        }
        if (!result) {
          return res.send({ error: true, message: 'Incorrect username or password' })
        }
        req.session.loggedIn = true
        res.send({ error: false, message: 'Logged in successfully' })
      })
    })
})*/


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})


// validate email using regex
