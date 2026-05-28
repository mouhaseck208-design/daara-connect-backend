const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { ajouterMembre, listerMembres, modifierMembre, supprimerMembre } = require('../controllers/membre.controller');

router.post('/', auth, ajouterMembre);
router.get('/', auth, listerMembres);
router.put('/:id', auth, modifierMembre);
router.delete('/:id', auth, supprimerMembre);

module.exports = router;