var pg = require('pg'),
    DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  getTags: function(username, response) {
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('SELECT tag FROM user_tags WHERE username=' + username + ';', function(error, result) {
        done();
        if (err) {
          console.error(error); response.send(error);
        } else {
          response.send(result ? result.rows : []);
        }
      });
    });
  },

  hasTag: function(username, tag) {
    var tagsForUser = tags[username] || {};

    var responseJSON = {
      user: username
    };

    responseJSON[tag] = !!tagsForUser[tag];

    return responseJSON;
  },

  addTag: function(username, tag) {
    var tagsForUser = tags[username];

    if (! tagsForUser) {
      tagsForUser = tags[username] = {};
    }

    tagsForUser[tag] = true;
  },

  removeTag: function(username, tag) {
    var tagsForUser = tags[username];

    if (! tagsForUser) {
      return;
    }

    delete tagsForUser[tag];
  }
}
