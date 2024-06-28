const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.secret;
    return expressJwt({
        secret,
        alogorithms: ['HS256']
    })
}

module.exports = authJwt;