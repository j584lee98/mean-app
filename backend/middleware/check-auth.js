const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedJWT = jwt.verify(token, 'secret_key_for_jwt');
    req.userData = {email: decodedJWT.email, userId: decodedJWT.userId};
    next();
  } catch(error) {
    res.status(401).json({ message: 'Invalid request.' });
  }
};
