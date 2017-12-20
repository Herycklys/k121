const restifyErrors = require('restify-errors')
    , Model = require('./friends.model')
    , sortFriends = require('./sort-friends');

exports.get = (req, res, next) => {
    Model.find({}, { __v: 0, amigo: 0 }).then(result => {
        res.send({
            data: result
        });
    }).catch(e => {
        next(new restifyErrors.InternalError(e));
    });
}

exports.post = (req, res, next) => {
    let newFriend = new Model({
        nome: req.body.nome,
        email: req.body.email
    });

    newFriend.save().then(result => {
        res.status(201);
        
        res.send(result);
    }).catch(e => {
        next(new restifyErrors.InternalError(e));
    });
}

exports.postSort = (req, res, next) => {
    sortFriends().then(noSecretFriends => {
        res.send({
            no_secret_friends: noSecretFriends
        });
    }).catch(e => {
        next(new restifyErrors.InternalError(e));
    });
}

exports.put = (req, res, next) => {
    let dataFriend = {};

    if (req.body.nome) dataFriend.nome = req.body.nome;

    if (req.body.email) dataFriend.email = req.body.email;

    Model.update({ _id: req.params[0] }, { $set: dataFriend })
        .then(() => Model.find({ _id: req.params[0] }))
        .then(result => {
            res.send(result);
        }).catch(e => {
            next(new restifyErrors.InternalError(e));
        });
}

exports.delete = (req, res, next) => {
    Model.remove({ _id: req.params[0] }).then(result => {
        res.send(204);
    }).catch(e => {
        next(new restifyErrors.InternalError(e));
    });
}