const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET http://localhost:8080/api/v2/
// Izvada visus pakalpojumus json formātā

exports.getAllAtsauksmes = async (req, res) => {
  try {
    const atsauksmes = await prisma.atsauksme.findMany({
      select: {
        Atsauksme: true,
        Datums: true,
        ID: true,
        Pakalpojums: {
          select: {
            Pakalpojuma_nosaukums: true
          }
        }
      }
    });
    res.status(200).json(atsauksmes);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};

// GET http://localhost:8080/api/v2/pakalpojumi/:id
// Izvada visus pakalpojumus ar ievadīto ID

exports.getAtsauksmeById = async (req, res) => {
  try {
    const { id } = req.params;
    const atsauksme = await prisma.atsauksme.findMany({
      where: {
        Pakalpojums: {
          Piegadatajs: parseInt(id)
        }
      },
      select: {
        ID: true,
        Atsauksme: true,
        Datums: true,
        Pakalpojums: {
          select: {
            Pakalpojuma_nosaukums: true,
          }
        }
      }
    });
    if (!atsauksme) {
      return res.status(404).json({ message: 'Atsauksme netika atrasta.' });
    }
    res.json(atsauksme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST http://localhost:8080/api/v2/atsauksmes/
// Izveido jaunu atsauksmi ar req.body ievadītajiem parametriem

exports.createAtsauksme = async (req, res) => {
  try {
    const { KlientsID, Atsauksme, Pakalpojums_id } = req.body;

    console.log(KlientsID, Atsauksme, Pakalpojums_id)

    const createdAtsauksme = await prisma.atsauksme.create({
      data: {
          Atsauksme: Atsauksme,
          Pakalpojums_id: Pakalpojums_id,
          Klients_id: KlientsID
      },
    });

    res.status(201).send(createdAtsauksme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addView = async (req, res) => {
  try{
    const { ID } = req.body


    const atsauksme = await prisma.atsauksme.update({
      where: {
        ID: parseInt(ID),
      },
      data: {
        Skatijumi: {
          increment: 1
        }
      }
    })

    res.status(200).send(atsauksme);


  } catch (error){
    console.log(error)
  }
}


