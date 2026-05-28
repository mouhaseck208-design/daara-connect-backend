const mongoose = require('mongoose');

const daaraSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  siege: { type: String, required: true },
  identifiant: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Daara', daaraSchema);