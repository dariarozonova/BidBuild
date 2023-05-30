const express = require('express');
const router = express.Router();
const pakalpojumsController = require('../controllers/pakalpojumsController');
const isUserAuthenticated = require("../middlewares/isUserAuthenticated");

router.get('/', pakalpojumsController.getAllPakalpojumi);
router.get('/id/:id', pakalpojumsController.getPakalpojumsById);
router.get('/email/:email', pakalpojumsController.getPakalpojumsByEmail);
router.get('/sfera/:id', pakalpojumsController.getPakalpojumsBySfera);
router.post('/', isUserAuthenticated, pakalpojumsController.createPakalpojums);
router.delete('/:id', isUserAuthenticated, pakalpojumsController.deletePakalpojumsById);


module.exports = router;
