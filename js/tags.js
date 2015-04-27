var pg = require('pg'),
    DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  getTags: function(username, response) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('select tag from user_tags where username=\'$1\';', [username], function(error, result) {
        done();

        result = result || {};

        if (err) {
          console.error(error); response.send(error);
        } else {
          console.log('result:', result);
          response.send(result.rows);
        }
      });
    });
  },

  hasTag: function(username, tag, response) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('select tag from user_tags where username=\'$1\'and tag=\'$2\';', [username, tag], function(error, result) {
        done();

        result = result || {};

        if (err) {
          console.error(error); response.send(error);
        } else {
          console.log('result:', result);
          response.send(result.rows);
        }
      });
    });
  },

  addTag: function(username, tag, response) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('insert into user_tags values (\'$1\', \'$2\')', [username, tag], function(error, result) {
        done();
        if (err) {
          console.error(error); response.send(error);
        } else {
          response.sendStatus(200);
        }
      });
    });
  },

  removeTag: function(username, tag) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('delete from user_tags where username=\'$1\' and tag=\'$2\';', [username, tag], function(error, result) {
        done();
        if (err) {
          console.error(error); response.send(error);
        } else {
          response.sendStatus(200);
        }
      });
    });
  }
}
