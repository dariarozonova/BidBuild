const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {
        // Pārbauda vai request.body ir nepieciešamie lauciņi lietotāja profila izveidei
        if (
            !req.body.name||
            !req.body.surname||
            !req.body.number ||
            !req.body.email ||
            !req.body.password ||
            !req.body.role
        ) {
            return res.status(400).send({ error: true, message: 'Viens vai vairāki lauciņi nav aizpildīti' })
        }
  
        // Pārbauda vai ievaditais e-pasts ir e-pasts
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).send({ error: true, message: 'Nepareizs E-Pasta formāts' })
        }
  
        // Parbauda, vai e-pasta adrese jau nav reģistrēta
        var user = await prisma.piegadatajs.findFirst({
            where: {
                Epasts: req.body.email,
            },
        })
        if (user) {
            return res.status(409).send({ error: true, emailTaken: true, message: 'Lietotājs ar šādu E-Pasta adresi jau eksistē.' })
        }

        user = await prisma.klients.findFirst({
            where: {
                Epasts: req.body.email,
            },
        })
        if (user) {
            return res.status(409).send({ error: true, emailTaken: true, message: 'Lietotājs ar šādu E-Pasta adresi jau eksistē.' })
        }
  
        // Šifrē paroli
        const hash = await bcrypt.hash(req.body.password, 10)
  

        if (req.body.role === 'Piegādātājs') {
            await prisma.piegadatajs.create({
                data: {
                    Vards: req.body.name,
                    Uzvards: req.body.surname,
                    Talr_nr: req.body.number,
                    Epasts: req.body.email,
                    Pieredze: req.body.experience,
                    Parole: hash,
                    Pilseta: req.body.pilseta,
                },
            })
        } else if (req.body.role === 'Klients') {
            await prisma.klients.create({
            data: {
                Vards: req.body.name,
                Uzvards: req.body.surname,
                Talr_nr: req.body.number,
                Epasts: req.body.email,
                Parole: hash,
                Pilseta: req.body.pilseta,
            },
            })
        } else {
            return res.status(400).send({ error: true, message: 'Nepareiza loma.' })
        }
  
        return res.send({ error: false, message: 'Lietotāja profils izveidots!' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error: true, message: 'Ir notikusi kļūda, lūdzams sazināties ar sistēmas administratoru.' })
    }
}

let currentUser;

exports.loginUser = async (req, res) => {
    try {

      // Ievades pārbaude
      if (!req.body.email || !req.body.password) {
        return res.status(409).send({ message: 'Viens vai vairāki lauciņi ir tukši.' });
      }
  
  
      // Pārbauda vai lietotājs ir Klients vai Piegādātājs
      const klientsUser = await prisma.klients.findUnique({
        where: {
          Epasts: req.body.email,
        },
      });


      const piegadatajsUser = await prisma.piegadatajs.findUnique({
        where: {
          Epasts: req.body.email,
        },
      });
  

      if (klientsUser) {
        currentUser = klientsUser;
      } else if (piegadatajsUser) {
        currentUser = piegadatajsUser;
      } else {
        return res.status(404).send({ message: 'Lietotājs ar šādu E-Pasta adresi netika atrasts.' });
      }

      // Pārbauda, vai ievadītā parole ir pareiza
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        currentUser.Parole
      );
  
      if (!isPasswordValid) {
        return res.status(401).send({ token: null, message: 'Nepareiza parole.' });
      }
  
      // Izveido autentifikācijas atslēgu un aizsūta uz nuxt
      const token = jwt.sign({ email: currentUser.Epasts }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
  
      res.status(200).json({ token: token });
  
    } catch (error) {
      console.log(error);
    }
};

exports.getLoggedInUser = async (req, res) => {
    if (!currentUser) {
      return res.status(404).json({ message: 'Nav lietotāja.' });
    }
    try {
      let userType;
  
      // Nosaka, vai ielogotais lietotājs ir klients vai piegādātājs
      if (currentUser.hasOwnProperty('KlientsID')) {
        userType = 'Klients';
      } else if (currentUser.hasOwnProperty('PiegadatajsID')) {
        userType = 'Piegadatajs';
      }


      // Aizsūta ielogotā lietotāja datus uz nuxt
      res.status(200).json({
        Vards: currentUser.Vards,
        Uzvards: currentUser.Uzvards,
        Epasts: currentUser.Epasts,
        Numurs: currentUser.Talr_nr,
        Pilseta: currentUser.Pilseta,
        Role: userType,
      });

    } catch (error) {
      console.log(error);
    }
};