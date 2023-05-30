const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isUserAuthenticated = require('../middlewares/isUserAuthenticated')

router.get('/', isUserAuthenticated, authController.getLoggedInUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);



module.exports = router;
