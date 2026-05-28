const Daara = require('../models/Daara');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Créer un nouveau Daara
exports.registerDaara = async (req, res) => {
  try {
    const { nom, siege, identifiant, motDePasse } = req.body;

    // Vérifier si l'identifiant existe déjà
    const exists = await Daara.findOne({ identifiant });
    if (exists) {
      return res.status(400).json({ message: 'Identifiant déjà utilisé' });
    }

    // Hasher le mot de passe
    const hash = await bcrypt.hash(motDePasse, 10);

    const daara = new Daara({ nom, siege, identifiant, motDePasse: hash });
    await daara.save();

    res.status(201).json({ message: 'Daara créé avec succès ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { identifiant, motDePasse } = req.body;

    const daara = await Daara.findOne({ identifiant });
    if (!daara) {
      return res.status(404).json({ message: 'Daara introuvable' });
    }

    const valid = await bcrypt.compare(motDePasse, daara.motDePasse);
    if (!valid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: daara._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, daara: { id: daara._id, nom: daara.nom, siege: daara.siege } });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};