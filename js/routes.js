module.exports = function(app) {
  var sse = require('./tags');

  app.get('/', function (request, response) {
    response.redirect('https://github.com/chrsjxn/massive-wookie');
  });

  app.get('/api/:username', function(request, response) {
    sse.getTags(request.params.username, response);
  });

  app.get('/api/:username/:tag', function(request, response) {
    var username = request.params.username,
        tag = request.params.tag;

    sse.hasTag(username, tag, response);
  });

  app.put('/api/:username/:tag', function(request, response) {
    var username = request.params.username,
        tag = request.params.tag;

    sse.addTag(username, tag, response);
  });

  app.delete('/api/:username/:tag', function(request, response) {
    var username = request.params.username,
        tag = request.params.tag;

    sse.removeTag(username, tag, response);
  });
};
