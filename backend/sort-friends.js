'use strict';

const Model = require('./friends.model')
    , debug = require('debug')('email:send')
    , sendEmail = require('./send-email.module');

module.exports = () => {
    return Model.find({ amigo: { $exists: false } }).then(result => {
        let restantFriends = Object.assign([], result),
            friendsWithoutSecretFriend = [],
            bulkOperations = [];

        if( restantFriends.length <= 1 ) return Promise.reject({ status: 'NOT_FRIEND' });

        function getFriendSorted(userFriend) {
            let indexFriend;

            if (!restantFriends.length || ( restantFriends.length === 1 && restantFriends[0]._id === userFriend._id )) return null;

            indexFriend = Math.floor((Math.random() * restantFriends.length) + 0);

            if (userFriend._id === restantFriends[indexFriend]._id)
                return getFriendSorted(userFriend);

            return restantFriends.splice(indexFriend, 1)[0];
        }

        result.forEach(friend => {
            let friendSelected = getFriendSorted(friend);

            if (friendSelected) {
                bulkOperations.push({
                    updateOne: {
                        filter: { _id: friend._id },
                        update: { $set: { amigo: friendSelected._id } }
                    }
                });

                sendEmail({
                    address: friend.email,
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