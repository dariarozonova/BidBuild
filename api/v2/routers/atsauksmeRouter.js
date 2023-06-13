const express = require('express');
const router = express.Router();
const atsauksmeController = require('../controllers/atsauksmeController');
const isUserAuthenticated = require("../middlewares/isUserAuthenticated");

router.get('/', atsauksmeController.getAllAtsauksmes);
router.get('/id/:id', atsauksmeController.getAtsauksmeById);
router.post('/', isUserAuthenticated, atsauksmeController.createAtsauksme);
router.post('/addView', atsauksmeController.addView);

module.exports = router;
