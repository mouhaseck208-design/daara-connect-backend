const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { envoyerMessage, listerMessages, supprimerMessage } = require('../controllers/message.controller');

router.post('/', auth, envoyerMessage);
router.get('/:kourelId', auth, listerMessages);
router.delete('/:id', auth, supprimerMessage);

module.exports = router;