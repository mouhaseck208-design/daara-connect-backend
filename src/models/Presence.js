const mongoose = require('mongoose');

const presenceSchema = new mongoose.Schema({
  kourel: { type: mongoose.Schema.Types.ObjectId, ref: 'Kourel', required: true },
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
  date: { type: Date, required: true },
  type: {
    type: String,
    enum: ['Répétition', 'Xam Xam', 'Programme', 'Réunion'],
    default: 'Répétition'
  },
  lieu: { type: String },
  membres: [
    {
      membre: { type: mongoose.Schema.Types.ObjectId, ref: 'Membre' },
      statut: { type: String, enum: ['Présent', 'Retard', 'Absent'], default: 'Absent' },
      retardMinutes: { type: Number, default: 0 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Presence', presenceSchema);