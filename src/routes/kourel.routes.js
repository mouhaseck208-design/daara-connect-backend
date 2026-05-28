const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { creerKourel, listerKourels, supprimerKourel } = require('../controllers/kourel.controller');

router.post('/', auth, creerKourel);
router.get('/', auth, listerKourels);
router.delete('/:id', auth, supprimerKourel);

module.exports = router;