const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { creerAdiyeu, listerAdiyeu, marquerPaye, totalCollecte } = require('../controllers/adiyeu.controller');

router.post('/', auth, creerAdiyeu);
router.get('/', auth, listerAdiyeu);
router.put('/:id/payer', auth, marquerPaye);
router.get('/total', auth, totalCollecte);

module.exports = router;