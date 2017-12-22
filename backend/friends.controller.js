const restifyErrors = require('restify-errors')
    , Model = require('./friends.model')
    , sortFriends = require('./sort-friends')
    , validator = require('./validate.friend');

function sanitizeFriend(friend) {
    return {
        _id: friend._id,
        nome: friend.nome,
        email: friend.email,
        has_secret: !!friend.amigo
    }
}

exports.get = (req, res, next) => {
    Model.find({}, { __v: 0 }).then(result => {
        res.send({
            data: result.map(sanitizeFriend)
        });
    }).catch(e => {
        next(new restifyErrors.InternalError(e));
    });
}

exports.post = (req, res, next) => {
    validator({
        nome: req.body.nome,
        email: req.body.email
    }).then(() => {
        let newFriend = new Model({
            nome: req.body.nome,
            email: req.body.email
        });

        return newFriend.save();
    }).then(result => {
        res.status(201);

        res.send(sanitizeFriend(result));
    }).catch(e => {
        if (!e.stack) {
            res.status(422);

            res.send({
                code: 'UnprocessableEntity',
                errors: e
            });

            return;
        }

        next(new restifyErrors.InternalError(e));
    });
}

exports.postSort = (req, res, next) => {
    sortFriends().then(noSecretFriends => {
        res.send({
            no_secret_friends: noSecretFriends.map(sanitizeFriend)
        });
    }).catch(e => {
        if (e.status === 'NOT_FRIEND') return next(new restifyErrors.BadRequestError(new Error('Quantidade insuficiente de amigos')));

        next(new restifyErrors.InternalError(e));
    });
}

exports.put = (req, res, next) => {
    validator({
        nome: req.body.nome,
        email: req.body.email,
        _id: req.params[0]
    }).then(() => {
        let dataFriend = {};

        if (req.body.nome) dataFriend.nome = req.body.nome;

        if (req.body.email) dataFriend.email = req.body.email;

        return Model.update({ _id: req.params[0] }, { $set: dataFriend });
    }).then(() => Model.find({ _id: req.params[0] }))
    .then(result => {
        res.send(sanitizeFriend(result));
    }).catch(e => {
        if (!e.stack) {
            res.status(422);

            res.send({
                code: 'UnprocessableEntity',
                errors: e
            });

            return;
        }

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