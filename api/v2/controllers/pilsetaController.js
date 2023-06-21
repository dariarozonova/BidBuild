const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET http://localhost:8080/api/v2/pakalpojumi
// Izvada visus pakalpojumus json formātā

exports.getAllPilsetas = async (req, res) => {
  try {
    const pilsetas = await prisma.pilseta.findMany()
    res.status(200).json(pilsetas);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};
