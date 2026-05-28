const mongoose = require('mongoose');

const presenceSchema = new mongoose.Schema({
  session: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Répétition', 'Xam Xam', 'Programme', 'Réunion'], 
    required: true 
  },
  date: { type: Date, default: Date.now },
  kourel: { type: mongoose.Schema.Types.ObjectId, ref: 'Kourel', required: true },
  daara: { type: mongoose.Schema.Types.ObjectId, ref: 'Daara', required: true },
  presences: [{
    membre: { type: mongoose.Schema.Types.ObjectId, ref: 'Membre' },
    present: { type: Boolean, default: false }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Presence', presenceSchema);