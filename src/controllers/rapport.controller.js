const Kourel = require('../models/Kourel');
const Membre = require('../models/Membre');
const Presence = require('../models/Presence');
const Adiyeu = require('../models/Adiyeu');

exports.getRapport = async (req, res) => {
  try {
    const daaraId = req.user.daara;

    const totalKourels = await Kourel.countDocuments({ daara: daaraId });
    const totalMembres = await Membre.countDocuments({ daara: daaraId });
    const totalSessions = await Presence.countDocuments({ daara: daaraId });

    const adiyeusPaies = await Adiyeu.find({ daara: daaraId, statut: 'Payé' });
    const totalCollecte = adiyeusPaies.reduce((sum, a) => sum + a.montant, 0);

    const adiyeusEnAttente = await Adiyeu.countDocuments({ daara: daaraId, statut: 'En attente' });

    res.json({
      totalKourels,
      totalMembres,
      totalSessions,
      totalCollecte,
      adiyeusEnAttente
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};