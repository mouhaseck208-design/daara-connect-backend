const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { creerAdiyeu, listerAdiyeu, marquerPaye } = require('../controllers/adiyeu.controller');

router.post('/', auth, creerAdiyeu);
router.get('/', auth, listerAdiyeu);
router.put('/:id', auth, marquerPaye);

module.exports = router;