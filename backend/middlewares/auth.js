const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ msg: 'Token não informado' });
    return;
  }
  const parts = authHeader.split(' ');
  if (!parts.length == 2) {
    res.status(401).json({ msg: 'Token error' });
    return;
  }
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ msg: 'Token mal informado' });
    return;
  }
  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ msg: 'Token Invalido' });
      return;
    }
    req.userId = decoded.id;
    return next();
  });
};
