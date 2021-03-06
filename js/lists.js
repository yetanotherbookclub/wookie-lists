var query = require('./query');

function extractUserIds(result) {
  return result.user_id;
};

function notNull(result) {
  return result != null;
}

module.exports = {
  getLists: function(response) {
    query('SELECT * FROM lists', [], function(result) {
      response.send(result.rows);
    });
  },

  getList: function(listId, response) {
    var qString = 'SELECT id, name, user_id FROM lists LEFT OUTER JOIN list_memberships '
      + 'ON (lists.id=list_memberships.list_id) '
      + 'WHERE lists.id=$1';

    query(qString, [listId], function(result) {
      response.send({
        id: result.rows[0].id,
        name: result.rows[0].name,
        user_ids: result.rows.map(extractUserIds).filter(notNull)
      });
    });
  },

  createList: function(listName, response) {
    query('INSERT INTO lists (name) VALUES ($1) RETURNING *', [listName], function(result) {
      response.status(201).send(result.rows[0]);
    });
  },

  deleteList: function(listId, response) {
    query('DELETE FROM lists WHERE id=$1', [listId], function(result) {
      response.sendStatus(200);
    });
  },

  addUser: function(listId, userId, response) {
    var qString = 'INSERT INTO list_memberships (list_id, user_id) VALUES ($1, $2) RETURNING *';

    query(qString, [listId, userId], function(result) {
      response.send(result.rows[0]);
    });
  },

  removeUser: function(listId, userId, response) {
    var qString = 'DELETE FROM list_memberships WHERE list_id=$1 AND user_id=$2';

    query(qString, [listId, userId], function(result) {
      response.sendStatus(200);
    });
  }
};
