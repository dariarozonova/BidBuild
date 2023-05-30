const express = require('express');
const router = express.Router();
const rezervacijaController = require('../controllers/rezervacijaController');

router.get('/', rezervacijaController.getAllRezervacijas);
router.post('/sendEmail', rezervacijaController.sendEmail)



module.exports = router;
