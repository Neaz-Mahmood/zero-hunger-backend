const jwt = require('jsonwebtoken');

function generateAccessToken(shop) {
    return jwt.sign({ id: shop.id }, process.env.TOKEN_SECRET, {
        expiresIn: "24h",
        issuer: shop.id.toString()
    });
}

module.exports.generateAccessToken = generateAccessToken;