'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    nome: String,
    email: String,
    amigo: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Friends', schema);