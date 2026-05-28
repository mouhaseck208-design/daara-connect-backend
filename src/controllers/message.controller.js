const Message = require('../models/Message');

// Envoyer un message
exports.envoyerMessage = async (req, res) => {
  try {
    const { contenu, auteur, kourel } = req.body;
    const message = new Message({
      contenu,
      auteur,
      kourel,
      daara: req.daaraId
    });
    await message.save();
    res.status(201).json({ message: 'Message envoyé ✅', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Lister les messages d'un Kourel
exports.listerMessages = async (req, res) => {
  try {
    const messages = await Message.find({ 
      kourel: req.params.kourelId,
      daara: req.daaraId 
    })
    .populate('auteur', 'nom prenom')
    .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Supprimer un message
exports.supprimerMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message supprimé ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};