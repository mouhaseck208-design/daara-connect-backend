const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { getRapport } = require('../controllers/rapport.controller');

router.get('/', auth, getRapport);

module.exports = router;