const mongoose = require('mongoose');

const kourelSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, default: '' },
  statut: { type: String, enum: ['Actif','Inactif'], default: 'Actif' },
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Membre' },
}, { timestamps: true });

module.exports = mongoose.model('Kourel', kourelSchema);