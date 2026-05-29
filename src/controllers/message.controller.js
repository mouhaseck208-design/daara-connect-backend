const Message = require('../models/message');

exports.envoyerMessage = async (req, res) => {
  try {
    const { texte, auteur, kourel, type } = req.body;
    const message = new Message({
      texte, auteur, kourel,
      type: type || 'texte',
      daara: req.user.daara
    });
    await message.save();
    res.status(201).json({ message: 'Message envoyé ✅', data: message });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.listerMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      kourel: req.params.kourelId,
      daara: req.user.daara
    })
    .populate('auteur', 'nom prenom')
    .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.supprimerMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message supprimé ✅' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
