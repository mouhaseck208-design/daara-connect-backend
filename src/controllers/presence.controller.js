const Presence = require('../models/Presence');

// Créer une session de présence
exports.creerSession = async (req, res) => {
  try {
    const { kourel, date, type, lieu, membres } = req.body;
    const session = new Presence({
      kourel, date, type, lieu,
      membres: membres || [],
      daara: req.user.daara
    });
    await session.save();
    res.status(201).json({ message: 'Session créée ✅', session });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Lister les sessions
exports.listerSessions = async (req, res) => {
  try {
    const sessions = await Presence.find({ daara: req.user.daara })
      .populate('kourel', 'nom')
      .populate('membres.membre', 'nom prenom')
      .sort({ date: -1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Modifier une session
exports.modifierSession = async (req, res) => {
  try {
    const session = await Presence.findByIdAndUpdate(
      req.params.id, req.body, { new: true }
    );
    if (!session) return res.status(404).json({ message: 'Session introuvable' });
    res.json({ message: 'Session modifiée ✅', session });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Supprimer une session
exports.supprimerSession = async (req, res) => {
  try {
    await Presence.findByIdAndDelete(req.params.id);
    res.json({ message: 'Session supprimée ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Statistiques de présence par kourel
exports.statsPresence = async (req, res) => {
  try {
    const sessions = await Presence.find({ daara: req.user.daara });
    const stats = {};
    sessions.forEach(s => {
      const key = s.kourel.toString();
      if (!stats[key]) stats[key] = { total: 0, presents: 0 };
      s.membres.forEach(m => {
        stats[key].total++;
        if (m.statut === 'Présent' || m.statut === 'Retard') stats[key].presents++;
      });
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};