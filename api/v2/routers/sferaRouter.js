const express = require('express');
const router = express.Router();
const sferaController = require('../controllers/sferaController');

router.get('/:id?', sferaController.getSferas);



module.exports = router;
