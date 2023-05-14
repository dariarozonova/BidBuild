const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const validator = require('validator')


exports.getAllSellers = async (req, res) => {
    try {
        const sellers = await prisma.piegadatajs.findMany()
        res.status(200).send(sellers)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}
  
exports.getAllBuyers = async (req, res) => {
    try {
        const buyers = await prisma.klients.findMany()
        res.status(200).send(buyers)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Internal Server Error' })
    }
}


exports.registerNewUser = async (req, res) => {
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
  
        if (!validator.isEmail(req.body.email)) {
            return res.status(400).send({ error: true, message: 'Nepareizs E-Pasta formāts' })
        }
  
    
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
  
        // Hash the password
        const hash = await bcrypt.hash(req.body.password, 10)
  
        // Insert user data in to the database
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

exports.deleteUser = async (req, res) => {
    
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ error: true, message: 'Netika ievadīts E-Pasts un/vai parole.' });
    }
    
    const user = await prisma.klients.findUnique({
        where: { Epasts: req.body.email },
    }) || await prisma.piegadatajs.findUnique({
        where: { Epasts: req.body.email },
    });
    
    if (!user) {
        return res.status(404).send({ error: true, message: 'Lietotājs netika atrasts' });
    }
    
    const passwordMatch = await bcrypt.compare(req.body.password, user.Parole);
    
    if (!passwordMatch) {
        return res.status(401).send({ error: true, message: 'Nepareiza parole.' });
    }
    
    try {
        if (user.hasOwnProperty('Klienta_ID')) {
            await prisma.klients.delete({ where: { Klienta_ID: user.Klienta_ID } });
        } else if (user.hasOwnProperty('Piegadataja_ID')) {
            await prisma.piegadatajs.delete({ where: { Piegadataja_ID: user.Piegadataja_ID } });
        }
        return res.status(200).send({ message: 'Lietotāja profils izdzēsts' });
    } catch (error) {
        return res.status(500).send({ error: true, message: 'Kļūda dzēšot lietotāja profilu. Lūdzu sazināties ar sistēmas administratoru.' });
    }
};