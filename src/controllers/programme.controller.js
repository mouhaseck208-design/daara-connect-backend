const Programme = require('../models/Programme');

// Créer un programme
exports.creerProgramme = async (req, res) => {
  try {
    const { kourel, xassida, lieu, responsable, jour, heure, tolerance, notes } = req.body;
    const programme = new Programme({
      kourel, xassida, lieu, responsable,
      jour, heure, tolerance, notes,
      daara: req.user.daara
    });
    await programme.save();
    res.status(201).json({ message: 'Programme créé ✅', programme });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Lister les programmes
exports.listerProgrammes = async (req, res) => {
  try {
    const programmes = await Programme.find({ daara: req.user.daara })
      .populate('kourel', 'nom');
    res.json(programmes);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Modifier un programme
exports.modifierProgramme = async (req, res) => {
  try {
    const programme = await Programme.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!programme) return res.status(404).json({ message: 'Programme introuvable' });
    res.json({ message: 'Programme modifié ✅', programme });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Supprimer un programme
exports.supprimerProgramme = async (req, res) => {
  try {
    await Programme.findByIdAndDelete(req.params.id);
    res.json({ message: 'Programme supprimé ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};