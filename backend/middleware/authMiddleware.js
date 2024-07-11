// authMiddleware.js

const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const authConfig = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE,
};

// Middleware to verify JWT
const checkJwt = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, getKey, {
    algorithms: ['RS256'],
    audience: "https://dev-icgyvvherrtitv2m.us.auth0.com/api/v2/",
    issuer: `https://dev-icgyvvherrtitv2m.us.auth0.com`,
  }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = decoded; // Attach decoded user data to request object
    next();
  });
};

// Function to get the Key for JWT verification
function getKey(header, callback) {
  jwksRsa.getSigningKey(header.kid, {
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }, (err, key) => {
    if (err) {
      console.error('Error getting signing key:', err);
      callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

module.exports = {
  checkJwt
};
