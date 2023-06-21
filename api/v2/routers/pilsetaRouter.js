const express = require('express');
const router = express.Router();
const pilsetaController = require('../controllers/pilsetaController');

router.get('/', pilsetaController.getAllPilsetas);


module.exports = router;
