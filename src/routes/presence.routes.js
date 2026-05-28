const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const {
  creerSession,
  listerSessions,
  modifierSession,
  supprimerSession,
  statsPresence
} = require('../controllers/presence.controller');

router.post('/', auth, creerSession);
router.get('/', auth, listerSessions);
router.get('/stats', auth, statsPresence);
router.put('/:id', auth, modifierSession);
router.delete('/:id', auth, supprimerSession);

module.exports = router;