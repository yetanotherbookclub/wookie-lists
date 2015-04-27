//simple in memory store for now
var tags = {};

module.exports = {
  getTags: function(username) {
    var tagsForUser = tags[username] || {};

    return {
      user: username,
      tags: tagsForUser
    };
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
