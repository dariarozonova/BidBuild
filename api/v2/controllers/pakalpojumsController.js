const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET http://localhost:8080/api/v2/pakalpojumi
// Izvada visus pakalpojumus json formātā

exports.getAllPakalpojumi = async (req, res) => {
  try {
    const pakalpojumi = await prisma.pakalpojums.findMany({
      include: {
        Sfera_Pakalpojums_SferaToSfera: {
          select: {
            Sferas_nosaukums: true,
          },
        },
        Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs: {
          select: {
            Vards: true,
            Uzvards: true,
            Pilseta: true
          },
        },
      },
    });
    res.status(200).json(pakalpojumi);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};

// GET http://localhost:8080/api/v2/pakalpojumi/:id
// Izvada visus pakalpojumus ar ievadīto ID

exports.getPakalpojumsById = async (req, res) => {
  try {
    const { id } = req.params;
    const pakalpojums = await prisma.pakalpojums.findUnique({
      where: { PakalpojumsID: parseInt(id) },
      include: {
        Sfera_Pakalpojums_SferaToSfera: {
          select: {
            Sferas_nosaukums: true,
          },
        },
        Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs: {
          select: {
            Vards: true,
            Uzvards: true,
            Pilseta: true
          },
        },
      },
    });
    if (!pakalpojums) {
      return res.status(404).json({ message: 'Pakalpojums netika atrasts.' });
    }
    res.json(pakalpojums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET http://localhost:8080/api/v2/pakalpojumi/:email
// Iegūst visus pakalpojumus, kuriem veidotājs ir ievadītais E-Pasts

exports.getPakalpojumsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const pakalpojumi = await prisma.pakalpojums.findMany({
      where: {
        Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs: {
          Epasts: email,
        },
      },
      include: {
        Sfera_Pakalpojums_SferaToSfera: true,
      },
    });

    res.status(200).send(pakalpojumi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE http://localhost:8080/api/v2/pakalpojumi/:id
// Izdzēš visus pakalpojumus ar ievadīto ID

exports.deletePakalpojumsById = async (req, res) => {
  try {
    const { id } = req.params;

    const userEmail = req.user

    // Check if the user is the creator of the post
    const pakalpojums = await prisma.pakalpojums.findUnique({
      where: { PakalpojumsID: parseInt(id) },
      select: {
        Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs: {
          select: { Epasts: true }
        }
      },
    });

    // If the post doesn't exist or the user is not the creator, return an error
    if (!pakalpojums || pakalpojums.Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs.Epasts !== userEmail) {
      return res.status(403).send({ message: 'Unauthorized access or post not found.' });
    }

    // Delete the pakalpojums
    const deletedPakalpojums = await prisma.pakalpojums.delete({
      where: { PakalpojumsID: parseInt(id) },
    });

    res.status(200).send(deletedPakalpojums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// POST http://localhost:8080/api/v2/pakalpojumi
// Izveido jaunu pakalpojumu ar request.body ievadītajiem parametriem

exports.createPakalpojums = async (req, res) => {
  try {
    const { Pakalpojuma_nosaukums, Pakalpojuma_apraksts, Sfera, Cena, Piegadatajs } = req.body;

    const createdPakalpojums = await prisma.Pakalpojums.create({
      data: {
        Pakalpojuma_nosaukums: Pakalpojuma_nosaukums,
        Pakalpojuma_apraksts: Pakalpojuma_apraksts,
        Cena: parseFloat(Cena),
        Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs: {
          connect: {
            PiegadatajsID: parseInt(Piegadatajs)
          },
        },
        Sfera_Pakalpojums_SferaToSfera: {
          connect: {
            SferaID: parseInt(Sfera)
          }
        }
      },
    });

    res.status(201).send(createdPakalpojums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addView = async (req, res) => {
  try{
    const { PakalpojumsID } = req.body


    const pakalpojums = await prisma.pakalpojums.update({
      where: {
        PakalpojumsID: parseInt(PakalpojumsID),
      },
      data: {
        Skatijumi: {
          increment: 1
        }
      }
    })

    res.status(200).send(pakalpojums);


  } catch (error){
    console.log(error)
  }
}

// GET http://localhost:8080/api/v2/pakalpojumi/sfera/:id
// Izvada visus pakalpojumus ar ievadītās sfēras ID

exports.getPakalpojumsBySfera = async (req, res) => {
  try {
    const { id } = req.params;
    const pakalpojumi = await prisma.pakalpojums.findMany({
      where: { Sfera: parseInt(id) },
      include: {
        Sfera_Pakalpojums_SferaToSfera: {
          select: {
            Sferas_nosaukums: true,
          },
        },
        Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs: {
          select: {
            Vards: true,
            Uzvards: true,
            Pilseta: true
          },
        },
      },
    });
    res.status(200).send(pakalpojumi);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
