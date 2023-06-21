const express = require('express');
const router = express.Router();
const rezervacijaController = require('../controllers/rezervacijaController');

router.get('/:id', rezervacijaController.getRezervacijaById);
router.get('/klients/:id', rezervacijaController.getRezervacijaByKlientsId);
router.get('/all/:id', rezervacijaController.getRezervacijasForPiegadatajs);
router.post('/', rezervacijaController.createRezervacija);
router.post('/sendEmail', rezervacijaController.sendEmail);
router.delete('/:id', rezervacijaController.deleteRezervacija)



module.exports = router;
