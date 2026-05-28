const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  contenu: { type: String, required: true },
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Membre', required: true },
  kourel: { type: mongoose.Schema.Types.ObjectId, ref: 'Kourel', required: true },
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);