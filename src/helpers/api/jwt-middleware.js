import { expressJWT } from 'express-jwt'
const util = require('util');
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressJWT({ secret: serverRuntimeConfig.AES256_USER_Key, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/register',
            '/api/users/authenticate'
        ]
    });

    return util.promisify(middleware)(req, res);
}