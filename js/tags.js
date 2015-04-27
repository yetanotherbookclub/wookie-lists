function extractTags(row) {
  return row.tag;
};

var query = require('./query');

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
    var queryString = 'INSERT INTO user_tags (username, tag) ' +
          'SELECT $1, $2 ' +
          'WHERE NOT EXISTS (SELECT * FROM user_tags WHERE username=$1 AND tag=$2);'

    query(queryString, [username, tag], function(result) {
      response.sendStatus(200);
    });
  },

  removeTag: function(username, tag, response) {
    query('DELETE FROM user_tags WHERE username=$1 AND tag=$2;', [username, tag], function(result) {
      response.sendStatus(200);
    });
  }
};
