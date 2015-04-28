function extractTags(row) {
  return row.tag;
};

var query = require('./query');

module.exports = {
  getTags: function(name, response) {
    query('SELECT * FROM tags WHERE name=$1;', [name], function(result) {
      response.send({
        name: name,
        tags: result.rows.map(extractTags)
      })
    });
  },

  addTag: function(name, tag, response) {
    var queryString = 'INSERT INTO tags (name, tag) ' +
          'SELECT $1, $2 ' +
          'WHERE NOT EXISTS (SELECT * FROM tags WHERE name=$1 AND tag=$2);'

    query(queryString, [name, tag], function(result) {
      response.sendStatus(200);
    });
  },

  removeTag: function(name, tag, response) {
    query('DELETE FROM tags WHERE name=$1 AND tag=$2;', [name, tag], function(result) {
      response.sendStatus(200);
    });
  }
};
