module.exports = function(app) {
  var tags = require('./tags');

  app.get('/', function (request, response) {
    response.redirect('https://github.com/chrsjxn/massive-wookie');
  });

  app.get('/api/:name', function(request, response) {
    tags.getTags(request.params.name, response);
  });

  app.post('/api/:name/:tag', function(request, response) {
    var name = request.params.name,
        tag = request.params.tag;

    tags.addTag(name, tag, response);
  });

  app.delete('/api/:name/:tag', function(request, response) {
    var name = request.params.name,
        tag = request.params.tag;

    tags.removeTag(name, tag, response);
  });
};
