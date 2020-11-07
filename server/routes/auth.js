const express = require('express');
const router = express.Router();
const {register, login, getUser, logout, token} = require('../controllers/auth');
const {getAccessToRoute} = require('../middlewares/authorization/authorization');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getAccessToRoute, getUser);
router.get('/logout', getAccessToRoute, logout);
router.post('/VpW02cG0W2vGeGXs8DdLIq3dQ62qMd0', getAccessToRoute, token);

module.exports = router;