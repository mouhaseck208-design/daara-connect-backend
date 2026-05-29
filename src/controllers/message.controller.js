const Message   = require('../models/message');
const cloudinary = require('../config/cloudinary');

exports.envoyerMessage = async (req, res) => {
  try {
    const { texte, auteur, kourel, type } = req.body;

    let contenu = texte;

    // Si c'est un audio en base64, on l'upload sur Cloudinary
    if (type === 'audio' && texte && texte.startsWith('data:')) {
      const uploadResult = await cloudinary.uploader.upload(texte, {
        resource_type: 'video', // Cloudinary utilise "video" pour l'audio
        folder: 'daara-connect/audio',
      });
      contenu = uploadResult.secure_url; // On stocke juste l'URL
    }

    const message = new Message({
      texte: contenu,
      auteur,
      kourel,
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