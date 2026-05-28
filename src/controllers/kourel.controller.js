const Kourel = require('../models/Kourel');

// Créer un Kourel
exports.creerKourel = async (req, res) => {
  try {
    const { nom, type } = req.body;
    const kourel = new Kourel({
      nom,
      type,
      daara: req.daaraId
    });
    await kourel.save();
    res.status(201).json({ message: 'Kourel créé ✅', kourel });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Lister les Kourels d'un Daara
exports.listerKourels = async (req, res) => {
  try {
    const kourels = await Kourel.find({ daara: req.daaraId });
    res.json(kourels);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Supprimer un Kourel
exports.supprimerKourel = async (req, res) => {
  try {
    await Kourel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Kourel supprimé ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};