const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getSferas = async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        if (isNaN(id)) {
          return res.status(400).json({ error: 'Nezināms ID' });
        }
  
        const sfera = await prisma.sfera.findUnique({ where: { SferaID: parseInt(id) } });
        if (!sfera) {
          res.status(404).send({ error: 'Sfēra ar šādu ID netika atrasta' });
        } else {
          res.status(200).send(sfera);
        }
      } else {
        const sferas = await prisma.sfera.findMany();
        res.status(200).send(sferas);
      }
    } catch (error) {
        res.status(500).send({ message: "Notika kļūda."});
    }
  };
  
  