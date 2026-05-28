const Adiyeu = require('../models/Adiyeu');

exports.creerAdiyeu = async (req, res) => {
  try {
    const { montant, membre, kourel } = req.body;
    const adiyeu = new Adiyeu({
      montant, membre, kourel,
      daara: req.user.daara
    });
    await adiyeu.save();
    res.status(201).json({ message: 'Adiyeu créé ✅', adiyeu });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.listerAdiyeu = async (req, res) => {
  try {
    const adiyeus = await Adiyeu.find({ daara: req.user.daara })
      .populate('membre', 'nom prenom')
      .populate('kourel', 'nom');
    res.json(adiyeus);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

exports.marquerPaye = async (req, res) => {
  try {
    const adiyeu = await Adiyeu.findByIdAndUpdate(
      req.params.id, { statut: 'Payé' }, { new: true }
    );
    res.json({ message: 'Adiyeu payé ✅', adiyeu });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};