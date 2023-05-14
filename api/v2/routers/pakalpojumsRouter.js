const express = require('express');
const router = express.Router();
const pakalpojumsController = require('../controllers/pakalpojumsController');

router.get('/', pakalpojumsController.getAllPakalpojumi);
router.get('/:id', pakalpojumsController.getPakalpojumsById);
router.get('/sfera/:id', pakalpojumsController.getPakalpojumsBySfera)
router.delete('/:id', pakalpojumsController.deletePakalpojumsById);


module.exports = router;
