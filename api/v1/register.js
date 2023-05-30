const express = require('express')

const registerRouter = express.Router()
const bcrypt = require('bcrypt')
const validator = require('validator')
const db = require('./db')


registerRouter.post('/', async (req, res) => {
    // check if the required fields are present
    console.log(req.body)

    if(!req.body.name || !req.body.surname || !req.body.number || !req.body.email || !req.body.password || !req.body.role){
      return res.status(400).send({ error: true, message: 'Viens vai vairāki lauciņi nav aizpildīti' })
    }

    if(!validator.isEmail(req.body.email)) {
      return res.status(400).send({ error: true, message: 'Ievadītais E-Pasts nav pareizā formātā.' })
    }

    db.checkIfExists(req.body.email, req.body.role)
      .then((exists) => {
          if(exists) {
              return res.status(409).send({ error: true, emailTaken: true, message: 'Lietotājs ar šo E-Pasta adresi jau eksistē.' });
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

module.exports = registerRouter;