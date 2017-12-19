'use strict';

const mongoose = require('mongoose')
    , debug = require('debug')('server:database');

module.exports = uri => {
    return mongoose.connect(process.env.MONGOLAB_URI_K121, {
        useMongoClient: true,
        auth: {
            user: process.env.MONGOLAB_AUTH_USER,
            password: process.env.MONGOLAB_AUTH_PASSWORD
        }
    }).then(() => {
        debug(`Connected on ${ process.env.MONGOLAB_URI_K121 }`);
    }).catch(e => {
        debug(e.stack);

        throw e;
    });
}