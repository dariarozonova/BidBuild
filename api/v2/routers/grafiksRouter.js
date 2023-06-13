const express = require('express');
const router = express.Router();
const grafiksController = require('../controllers/grafiksController');

router.get('/:id', grafiksController.getGrafiksById);
router.get("/pakalpojums/:id", grafiksController.getGrafiksByPakalpojumsId);

module.exports = router;