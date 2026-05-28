const mongoose = require('mongoose');

const membreSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: String },
  role: { type: String, enum: ['Membre', 'Admin'], default: 'Membre' },
  statut: { type: String, enum: ['Actif', 'Inactif'], default: 'Actif' },
  kourel: { type: mongoose.Schema.Types.ObjectId, ref: 'Kourel'},
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Membre', membreSchema);