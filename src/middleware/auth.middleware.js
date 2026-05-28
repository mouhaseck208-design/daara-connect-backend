const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token manquant' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === 'membre') {
      req.user = { daara: decoded.daara, id: decoded.id, role: 'membre' };
    } else {
      req.user = { daara: decoded.id, role: 'admin' };
    }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalide' });
  }
};