'use strict';

const mongoose = require('mongoose')
    , debug = require('debug')('server:database');

module.exports = uri => {
    let dbOptions = {
        useMongoClient: true
    }

    if( process.env.MONGO_AUTH_USER && process.env.MONGO_AUTH_PASSWORD ) {
        dbOptions.auth = {
            user: process.env.MONGO_AUTH_USER,
            password: process.env.MONGO_AUTH_PASSWORD
        };
    }

    return mongoose.connect(process.env.MONGO_URI_K121, dbOptions).then(() => {
        debug(`Connected on ${ process.env.MONGO_URI_K121 }`);
    }).catch(e => {
        debug(e.stack);

        throw e;
    });
}