const {expressjwt:expressJwt} = require('express-jwt');
require('dotenv').config(); // This should be at the top of your entry file
const api = process.env.API_URL;
function authJwt(){
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path:[
            {url:`${api}/v1/products`,methods:['GET','OPTIONS']},
            `${api}/v1/user/login`,
            `${api}/v1/user/register`
        ]
    })
}

module.exports = authJwt;