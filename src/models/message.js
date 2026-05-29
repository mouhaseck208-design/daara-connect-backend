const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  texte: { type: String, required: true },
  type: { type: String, default: 'texte' },
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Membre' },
  kourel: { type: mongoose.Schema.Types.ObjectId, ref: 'Kourel', required: true },
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
