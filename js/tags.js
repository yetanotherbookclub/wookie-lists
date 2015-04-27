var pg = require('pg'),
    DATABASE_URL = process.env.DATABASE_URL;

function extractTags(row) {
  return row.tag;
};

function query(queryString, params, formatResponse) {
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query(queryString, params, function(error, result) {
      done();

      if (err) {
        console.error(error); response.send('Error: ' + error);
      } else {
        formatResponse(result);
      }
    });
  });
}

module.exports = {
  getTags: function(username, response) {
    query('SELECT * FROM user_tags WHERE username=$1;', [username], function(result) {
      response.send({
        username: username,
        tags: result.rows.map(extractTags)
      })
    });
  },

  addTag: function(username, tag, response) {
    query('INSERT INTO user_tags VALUES ($1, $2);', [username, tag], function(result) {
      response.sendStatus(200);
    });
  },

  removeTag: function(username, tag, response) {
    query('DELETE FROM user_tags WHERE username=$1 AND tag=$2;', [username, tag], function(result) {
      response.sendStatus(200);
    });
  }
};
