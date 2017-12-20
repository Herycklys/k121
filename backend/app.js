'use strict';

const restify = require('restify')
  , controller = require('./friends.controller')
  , mongoConnection = require('./db.connect')
  , mongoose = require('mongoose');

mongoose.Promise = Promise;

/**
 * Connection to DATABASE
 */
mongoConnection();

const server = restify.createServer({
  name: 'Secret Friend',
  version: '1.0.0'
});

server.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': req.header('Access-Control-Request-Method'),
    'Access-Control-Allow-Header': req.header('Access-Control-Request-Headers')
  });

  return next();
});

server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));

server.get('/friends', controller.get);
server.post('/friends', controller.post);
server.post('/friends/sort', controller.postSort);
server.put(/\/friends\/([0-9a-fA-F]{24})/, controller.put);
server.del(/\/friends\/([0-9a-fA-F]{24})/, controller.delete);

server.listen(process.env.PORT || 3000);