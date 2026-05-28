const Kourel = require('../models/kourel');

// Créer un Kourel
exports.creerKourel = async (req, res) => {
  try {
    const { nom, description, cotisation, frequence, statut } = req.body;
    const kourel = new Kourel({
      nom, description, cotisation, frequence, statut,
      daara: req.user.daara
    });
    await kourel.save();
    res.status(201).json({ message: 'Kourel créé ✅', kourel });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Lister les Kourels
exports.listerKourels = async (req, res) => {
  try {
    const kourels = await Kourel.find({ daara: req.user.daara });
    res.json(kourels);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Modifier un Kourel
exports.modifierKourel = async (req, res) => {
  try {
    const kourel = await Kourel.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json({ message: 'Kourel modifié ✅', kourel });
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