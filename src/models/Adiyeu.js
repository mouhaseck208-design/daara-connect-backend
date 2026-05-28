const mongoose = require('mongoose');

const adiyeuSchema = new mongoose.Schema({
  montant: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  statut: { type: String, enum: ['Payé', 'En attente'], default: 'En attente' },
  membre: { type: mongoose.Schema.Types.ObjectId, ref: 'Membre', required: true },
  kourel: { type: mongoose.Schema.Types.ObjectId, ref: 'Kourel' },
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Adiyeu', adiyeuSchema);