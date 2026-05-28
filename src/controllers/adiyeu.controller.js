const Adiyeu = require('../models/Adiyeu');

// Créer un adiyeu
exports.creerAdiyeu = async (req, res) => {
  try {
    const { montant, membre, kourel } = req.body;
    const adiyeu = new Adiyeu({
      montant,
      membre,
      kourel,
      daara: req.daaraId
    });
    await adiyeu.save();
    res.status(201).json({ message: 'Adiyeu créé ✅', adiyeu });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Lister les adiyeu
exports.listerAdiyeu = async (req, res) => {
  try {
    const adiyeus = await Adiyeu.find({ daara: req.daaraId })
      .populate('membre', 'nom prenom')
      .populate('kourel', 'nom');
    res.json(adiyeus);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Marquer comme payé
exports.marquerPaye = async (req, res) => {
  try {
    const adiyeu = await Adiyeu.findByIdAndUpdate(
      req.params.id,
      { statut: 'Payé' },
      { new: true }
    );
    res.json({ message: 'Adiyeu marqué comme payé ✅', adiyeu });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Total collecté
exports.totalCollecte = async (req, res) => {
  try {
    const adiyeus = await Adiyeu.find({ daara: req.daaraId, statut: 'Payé' });
    const total = adiyeus.reduce((sum, a) => sum + a.montant, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};