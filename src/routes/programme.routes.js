const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  creerProgramme,
  listerProgrammes,
  modifierProgramme,
  supprimerProgramme
} = require('../controllers/programme.controller');

router.post('/', auth, creerProgramme);
router.get('/', auth, listerProgrammes);
router.put('/:id', auth, modifierProgramme);
router.delete('/:id', auth, supprimerProgramme);

module.exports = router;