const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getGrafiksById = async (req, res) => {
	try {
		const { id } = req.params;

		const grafiks = await prisma.grafiks.findUnique({
			where: {
				GrafiksID: parseInt(id),
			}
		})

		if (grafiks) {
      res.status(200).json(grafiks);
		} else {
			res.status(404).json({ message: 'Grafiks netika atrasts'})
		}
		
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

exports.getGrafiksByPakalpojumsId = async (req, res) => {
	try {
		const { id } = req.params;

		const grafiks = await prisma.grafiks.findMany({
			where: {
				Pakalpojums_id: parseInt(id),
			}
		})

		if (grafiks) {
      res.status(200).json(grafiks);
		} else {
			res.status(404).json({ message: 'Grafiki netika atrasti'})
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}