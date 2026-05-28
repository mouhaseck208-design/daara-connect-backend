const mongoose = require('mongoose');

const conservatoireSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  kourel: { type: mongoose.Schema.Types.ObjectId, ref: 'Kourel', required: true },
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Membre' }],
}, { timestamps: true });

module.exports = mongoose.model('Conservatoire', conservatoireSchema);