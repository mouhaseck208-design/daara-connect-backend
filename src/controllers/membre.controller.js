// controllers/membre.controller.js
const Membre = require('../models/Membre');

exports.ajouterMembre = async (req, res) => {
  try {
    const { nom, prenom, telephone, role, kourel } = req.body;
    const membre = new Membre({
      nom, prenom, telephone, role,
      kourel: kourel || undefined,
      daara: req.user.daara  // récupéré depuis le token auth
    });
    await membre.save();
    res.status(201).json(membre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listerMembres = async (req, res) => {
  try {
    const membres = await Membre.find({ daara: req.user.daara })
      .populate('kourel', 'nom');
    res.json(membres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.modifierMembre = async (req, res) => {
  try {
    const membre = await Membre.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    res.json(membre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.supprimerMembre = async (req, res) => {
  try {
    await Membre.findByIdAndDelete(req.params.id);
    res.json({ message: 'Membre supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};