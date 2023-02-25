const jwt = require('jsonwebtoken');

function generateAccessToken (user) {
    return jwt.sign({ 
        id: user.id }, process.env.TOKEN_SECRET, {
         expiresIn: '2h' ,
         issuer: user.id.toString()
        });
}

module.exports.generateAccessToken = generateAccessToken;