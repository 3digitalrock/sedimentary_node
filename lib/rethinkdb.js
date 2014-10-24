// https://github.com/rethinkdb/rethinkdb-example-nodejs-chat/blob/master/README.md

var r = require('rethinkdb');

// #### Connection details

// RethinkDB database settings. Defaults can be overridden using environment variables.
var dbConfig = {
  host: process.env.RETHINK_HOST,
  port: parseInt(process.env.RETHINK_PORT),
  db  : process.env.NODE_ENV+'_web',
  authKey: process.env.RETHINK_AUTHKEY,
  tables: {
    'contact': 'id',
    'featured': 'uid'
  }
};

module.exports.submitContact = function (body) {
  var date = new Date();
  body.created = date.toISOString();
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('contact').insert(body).run(connection, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        
      }
      connection.close();
    });
  });
};

module.exports.postFeatured = function (body, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('featured').insert(body, {conflict: "update"}).run(connection, function(err, result) {
      if(err) {
        callback(err);
      } else {
        callback(null);
      }
      connection.close();
    });
  });
};

module.exports.getFeatured = function (playlist, callback) {
  onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('featured').filter(r.row('playlists').contains(playlist)).eqJoin('uid', r.db('dev').table('trailers')).zip().pluck('uid','title','files','thumbnails','tech').run(connection, function(err, cursor) {
      if(err) {
        callback(err, null);
      } else {
        cursor.toArray(function(err, results) {
            callback(null, results);
        });
      }
      connection.close();
    });
  });
};

// #### Helper functions

/**
 * A wrapper function for the RethinkDB API `r.connect`
 * to keep the configuration details in a single function
 * and fail fast in case of a connection error.
 */ 
function onConnect(callback) {
  r.connect({host: dbConfig.host, port: dbConfig.port, authKey: dbConfig.authKey }, function(err, connection) {
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}