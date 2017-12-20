'use strict';

const Model = require('./friends.model')
    , debug = require('debug')('email:send')
    , sendEmail = require('./send-email.module');

module.exports = () => {
    return Model.find({ amigo: { $exists: false } }).then(result => {
        let restantFriends = Object.assign([], result),
            friendsWithoutSecretFriend = [],
            bulkOperations = [];

        function getFriendSorted(userFriend, count) {
            let indexFriend;

            if (!restantFriends.length || count >= 3) return null;

            indexFriend = Math.floor((Math.random() * (restantFriends.length - 1)) + 0);

            if (userFriend._id === restantFriends[indexFriend]._id)
                return getFriendSorted(userFriend, ++count);

            return restantFriends.splice(indexFriend, 1)[0];
        }

        result.forEach(friend => {
            let friendSelected = getFriendSorted(friend, 0);

            if (friendSelected) {
                bulkOperations.push({
                    updateOne: {
                        filter: { _id: friend._id },
                        update: { $set: { amigo: friendSelected._id } }
                    }
                });

                sendEmail({
                    address: friendSelected.email,
                    subject: 'O seu amigo do "Amigo secreto" é...',
                    html: `
                    <div style="text-align: center;">
                        <h3>Acabou de ocorrer o sorteio dos amigos do <span style="text-decoration: underline;"><strong>Amigo Secreto</strong></span></h3>
                        <p>O nome do seu amigo que foi sorteado &eacute; <span style="color: #ff0000;"><em>${ friendSelected.nome }</em></span></p>
                    </div>
                    `
                }).then(result => {
                    debug(`Sent ${ friendSelected.email }`, result);
                }).catch(e => {
                    debug(`Error ${ friendSelected.email }`, e.stack);
                })
            } else {
                friendsWithoutSecretFriend.push(friend);
            }
        });

        if( !bulkOperations.length ) return Promise.resolve(friendsWithoutSecretFriend);

        return Model.collection.bulkWrite(bulkOperations).then(() => friendsWithoutSecretFriend);
    });
}