const mongoose = require('mongoose');

const programmeSchema = new mongoose.Schema({
  kourel: { type: mongoose.Schema.Types.ObjectId, ref: 'Kourel', required: true },
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
  xassida: { type: String, required: true },
  lieu: { type: String },
  responsable: { type: String },
  jour: { type: String, enum: ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'] },
  heure: { type: String },
  tolerance: { type: Number, default: 0 },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Programme', programmeSchema);