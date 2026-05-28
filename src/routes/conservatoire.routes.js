const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  creerGroupe,
  listerGroupes,
  ajouterMembre,
  retirerMembre,
  supprimerGroupe
} = require('../controllers/conservatoire.controller');

router.post('/', auth, creerGroupe);
router.get('/', auth, listerGroupes);
router.put('/:id/ajout-membre', auth, ajouterMembre);
router.put('/:id/retrait-membre', auth, retirerMembre);  // ← NOUVEAU
router.delete('/:id', auth, supprimerGroupe);

module.exports = router;