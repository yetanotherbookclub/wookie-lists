var pg = require('pg'),
    DATABASE_URL = process.env.DATABASE_URL;

function extractTags(row) {
  return row.tag;
};

module.exports = {
  getTags: function(username, response) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('SELECT * FROM user_tags WHERE username=$1;', [username], function(error, result) {
        done();

        if (err) {
          console.error(error); response.send(error);
        } else {
          response.send({
            username: username,
            tags: result.rows.map(extractTags)
          });
        }
      });
    });
  },

  addTag: function(username, tag, response) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('INSERT INTO user_tags VALUES ($1, $2);', [username, tag], function(error, result) {
        done();
        if (err) {
          console.error(error); response.send(error);
        } else {
          response.sendStatus(200);
        }
      });
    });
  },

  removeTag: function(username, tag, response) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('DELETE FROM user_tags WHERE username=$1 AND tag=$2;', [username, tag], function(error, result) {
        done();
        if (err) {
          console.error(error); response.send(error);
        } else {
          response.sendStatus(200);
        }
      });
    });
  }
};
