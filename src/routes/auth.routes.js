const express = require('express');
const router = express.Router();
const Daara = require('../models/Daara');
const { registerDaara, login, loginMembre } = require('../controllers/auth.controller');

router.post('/register', registerDaara);
router.post('/login', login);
router.post('/login-membre', loginMembre);

router.get('/search', async (req, res) => {
  try {
    const { nom } = req.query;
    const daaras = await Daara.find({
      nom: new RegExp(nom, 'i')
    }).select('nom siege');
    res.json(daaras);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;