var lists = require('./lists');

module.exports = function(app) {
  app.get('/api/lists', function(request, response) {
    lists.getLists(response);
  });

  app.post('/api/lists/', function(request, response) {
    lists.createList(request.body.name, response);
  });

  app.get('/api/lists/:listId', function(request, response) {
    lists.getList(request.params.listId, response);
  });

  app.delete('/api/lists/:listId', function(request, response) {
    lists.deleteList(request.params.listId, response);
  });

  app.put('/api/lists/:listId/users/:userId', function(request, response) {
    lists.addUser(request.params.listId, request.params.userId, response);
  });

  app.delete('/api/lists/:listId/users/:userId', function(request, response) {
    lists.removeUser(request.params.listId, request.params.userId, response);
  });

};
