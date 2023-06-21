const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET http://localhost:8080/api/v2/profils
// Izvada visus pakalpojumus json formātā

exports.getProfile = async (req, res) => {
  try {
    const { Role, ID } = req.body;

    if(!Role || !ID){
      res.status(400).json({ message: "Nav Role vai ID"})
    }

    if(Role == "klients"){
      const response = await prisma.klients.findUnique({
        where: {
          KlientsID: parseInt(ID)
        },
        select: {
          Vards: true,
          Uzvards: true,
          Epasts: true,
          Pilseta: true
        }
      })

      if(!response){
        res.status(404).json({message: "Klients netika atrasts"})
      } else {
        res.status(200).json(response)
      }

    } else if(Role == 'piegadatajs') {
      const response = await prisma.piegadatajs.findUnique({
        where: {
          PiegadatajsID: parseInt(ID)
        },
        select: {
          Vards: true,
          Uzvards: true,
          Epasts: true,
          Pieredze: true,
          Pilseta: true,
          Pakalpojums_Pakalpojums_PiegadatajsToPiegadatajs: {
            select: {
              PakalpojumsID: true,
              Pakalpojuma_nosaukums: true,
              Pakalpojuma_apraksts: true,
              Cena: true,
              Sfera_Pakalpojums_SferaToSfera: {
                select: {
                  Sferas_nosaukums: true,
                }
              },
              Atsauksme: {
                select: {
                  ID: true,
                  Atsauksme: true,
                  Datums: true,
                  Klients: {
                    select: {
                      Vards: true,
                      Uzvards: true,
                    }
                  }
                }
              }
            }
          }
        }
      })
      if(!response){
        res.status(404).json({ message: "Piegādātājs netika atrasts" })
      } else {
        res.status(200).json(response)
      }
    } else {
      res.status(404).json({ message: "Lietotājs netika atrasts."})
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message });
  }
};
