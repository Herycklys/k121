'use strict';

const https = require('https')
    , mailgun = require('mailgun-js')({ apiKey: process.env.SERVICE_EMAIL_API_KEY, domain: process.env.SERVICE_EMAIL_DOMAIN });

module.exports = email => {
    return new Promise((resolve, reject) => {
        let data = {
            from: 'System - Amigo secreto <me@samples.mailgun.org>',
            to: email.address,
            subject: email.subject,
            html: email.html
        };

        mailgun.messages().send(data, function (error, body) {
            if( error ) return reject(error);

            resolve(body);
        });
    });
}