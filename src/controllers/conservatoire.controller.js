const Conservatoire = require('../models/conservatoire');

// Créer un groupe conservatoire
exports.creerGroupe = async (req, res) => {
  try {
    const { nom, kourel, membres } = req.body;
    const groupe = new Conservatoire({
      nom,
      kourel,
      membres: membres || [],
      daara: req.user.daara  // ← CORRECTION
    });
    await groupe.save();
    res.status(201).json({ message: 'Groupe créé ✅', groupe });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Lister les groupes
exports.listerGroupes = async (req, res) => {
  try {
    const groupes = await Conservatoire.find({ daara: req.user.daara })  // ← CORRECTION
      .populate('kourel', 'nom')
      .populate('membres', 'nom prenom');
    res.json(groupes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Ajouter un membre au groupe
exports.ajouterMembre = async (req, res) => {
  try {
    const groupe = await Conservatoire.findById(req.params.id);
    if (!groupe) return res.status(404).json({ message: 'Groupe introuvable' });
    
    // Éviter les doublons
    if (!groupe.membres.includes(req.body.membreId)) {
      groupe.membres.push(req.body.membreId);
      await groupe.save();
    }
    res.json({ message: 'Membre ajouté ✅', groupe });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Retirer un membre du groupe
exports.retirerMembre = async (req, res) => {
  try {
    const groupe = await Conservatoire.findById(req.params.id);
    if (!groupe) return res.status(404).json({ message: 'Groupe introuvable' });
    groupe.membres = groupe.membres.filter(
      m => m.toString() !== req.body.membreId
    );
    await groupe.save();
    res.json({ message: 'Membre retiré ✅', groupe });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Supprimer un groupe
exports.supprimerGroupe = async (req, res) => {
  try {
    await Conservatoire.findByIdAndDelete(req.params.id);
    res.json({ message: 'Groupe supprimé ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};