const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/sellers', userController.getAllSellers);
router.get('/buyers', userController.getAllBuyers);
router.delete('/', userController.deleteUser);

module.exports = router;