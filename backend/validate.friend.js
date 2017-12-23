const validator = require('validate.js')
    , Model = require('./friends.model');

validator.validators.friendExists = (value, options) => {
    let query = {
        $or: [ { nome: options.nome}, { email: options.email } ]
    };

    if( options._id ) {
        query._id = { $ne: options._id };
    }

    return Model.findOne(query).then(result => {
        if( result ) return 'Friend just exists';
    })
}

validator.validators.string = value => {
    return validator.isString(value) ? undefined : 'It\'s not string';
}

module.exports = friend => {
    let rules;

    rules = {
        email: {
            presence: true,
            email: true,
            string: true,
            friendExists: friend
        },
        nome: {
            presence: true,
            string: true
        }
    }

    if( friend._id ) {
        rules.email.presence = false;

        rules.nome.presence = false;
    }

    return validator.async(friend, rules);
}