const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = async (req, res) => {
    try {
  
      const { recipient, subject, emailText } = req.body;

      console.log(req.body)

      await transporter.sendMail({
        from: process.env.EMAIL,
        to: req.body.recipient,
        subject: subject,
        text: emailText
      });
  
      console.log(`Email sent to ${recipient}`);
      res.status(200).send('It worked')
    } catch (error) {
      console.log(`Error sending email: ${error}`);
      res.status(500).send(`It didnt work : ${error}`)
    }
};

exports.getRezervacijaById = async (req, res) => {
  const { id } = req.params;
    try {
      const rezervacija = await prisma.rezervacija.findUnique({
        where: {
          RezervacijaID: parseInt(id)
        },
        select: {
          RezervacijaID: true,
          Datums: true,
          Statuss: true,
          Grafiks_id: true,
          Grafiks: {
            select: {
              Datums: true,
              Pakalpojums: {
                select: {
                  Pakalpojuma_nosaukums: true,
                  Pakalpojuma_apraksts: true,
                },
              },
            },
          },
          Klients: {
            select: {
              Vards: true,
              Uzvards: true,
              KlientsID: true
            }
          }
        },
      })

      if (rezervacija) {
        res.status(200).json(rezervacija);
      } else {
        res.status(404).json({ message: 'Rezervācija ar šādu ID netika atrasta'})
      }

    } catch (error) {
      res.status(500).json({ message: error.message})
    }
};

exports.getRezervacijaByKlientsId = async (req, res) => {
  const { id } = req.params;
    try {
      const rezervacija = await prisma.rezervacija.findMany({
        where: {
          Klients_id: parseInt(id)
        },
        orderBy: {
          Grafiks: {
            Datums: 'asc',
          }
        },
        select: {
          RezervacijaID: true,
          Datums: true,
          Statuss: true,
          Grafiks_id: true,
          Grafiks: {
            select: {
              Datums: true,
              Pakalpojums: {
                select: {
                  Pakalpojuma_nosaukums: true,
                  Pakalpojuma_apraksts: true,
                  Piegadatajs_Pakalpojums_PiegadatajsToPiegadatajs: {
                    select: {
                      Vards: true,
                      Uzvards: true,
                      Epasts: true,
                    }
                  }
                },
              },
            },
          },
        },
      })

      if (rezervacija) {
        res.status(200).json(rezervacija);
      } else {
        res.status(404).json({ message: 'Rezervācijas šim klientam netika atrastas.'})
      }

    } catch (error) {
      res.status(500).json({ message: error.message})
    }
};

exports.createRezervacija = async (req, res) => {
  const { KlientsID, GrafiksID } = req.body;

  try {

    const parentSchedule = await prisma.grafiks.findUnique({
      where: {
        GrafiksID: parseInt(GrafiksID)
      },
    });

    if (parentSchedule.Statuss === "Aiz_emts") {
      res.status(409).json({ message: 'Šī diena jau ir aizņemta'})
    } else {
      const reservation = await prisma.rezervacija.create({
        data: {
          Grafiks_id: parseInt(GrafiksID),
          Klients_id: parseInt(KlientsID),
          Statuss: "Proces_",
        },
      });

      await prisma.grafiks.update({
        where: {
          GrafiksID: parseInt(GrafiksID)
        },
        data: {
          Statuss: "Aiz_emts"
        },
      });
    
      res.status(200).json({ message: 'Rezervācija pieteikta veiksmīgi!'});
      
    }  
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}
