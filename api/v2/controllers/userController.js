const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')


exports.getAllSellers = async (req, res) => {
    try {
        const sellers = await prisma.piegadatajs.findMany()
        res.status(200).send(sellers)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Notika kļūda' })
    }
}
  
exports.getAllBuyers = async (req, res) => {
    try {
        const buyers = await prisma.klients.findMany()
        res.status(200).send(buyers)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Notika kļūda' })
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