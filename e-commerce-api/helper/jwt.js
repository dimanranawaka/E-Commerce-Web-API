const {expressjwt:expressJwt} = require('express-jwt');
require('dotenv').config(); // This should be at the top of your entry file

function authJwt(){
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path:[
            '/api/v1/user/login',
        ]
    })
}

module.exports = authJwt;