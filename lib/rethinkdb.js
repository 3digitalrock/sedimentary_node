// https://github.com/rethinkdb/rethinkdb-example-nodejs-chat/blob/master/README.md

var r = require('rethinkdb');

// #### Connection details

// RethinkDB database settings. Defaults can be overridden using environment variables.
var dbConfig = {
  host: process.env.RETHINK_HOST,
  port: parseInt(process.env.RETHINK_PORT),
  db  : process.env.RETHINK_DB,
  authKey: process.env.RETHINK_AUTHKEY,
  tables: {
    'videos': 'uid',
    'channels': 'name',
    'studios': 'uid'
  }
};

module.exports.submitContact = function (body) {
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