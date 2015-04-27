module.exports = function(app) {
  var tags = require('./tags');

  app.get('/', function (request, response) {
    response.redirect('https://github.com/chrsjxn/massive-wookie');
  });

  app.get('/api/:username', function(request, response) {
    tags.getTags(request.params.username, response);
  });

  app.put('/api/:username/:tag', function(request, response) {
    var username = request.params.username,
        tag = request.params.tag;

    tags.addTag(username, tag, response);
  });

  app.delete('/api/:username/:tag', function(request, response) {
    var username = request.params.username,
        tag = request.params.tag;

    tags.removeTag(username, tag, response);
  });
};
