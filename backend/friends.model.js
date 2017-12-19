'use strict';

const mongoose = require('mongoose')
    , mongoosePaginate = require('mongoose-paginate');

const schema = new mongoose.Schema({
    nome: String,
    email: String,
    amigo: mongoose.Schema.Types.ObjectId
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Friends', schema);