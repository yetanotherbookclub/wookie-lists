var express = require('express');
var app = express();
var sse = require('./js/simple_service_endpoint');

var port = process.env.PORT || 5000;

app.get('/', function (request, response) {
  response.redirect('https://github.com/chrsjxn/massive-wookie');
});

app.get('/api/:username', function(request, response) {
  response.send(sse.getTags(request.params.username));
});

app.get('/api/:username/:tag', function(request, response) {
  var username = request.params.username,
      tag = request.params.tag;

  response.send(sse.hasTag(username, tag));
});

app.put('/api/:username/:tag', function(request, response) {
  var username = request.params.username,
      tag = request.params.tag;

  sse.addTag(username, tag);

  response.sendStatus(200);
});

app.delete('/api/:username/:tag', function(request, response) {
  var username = request.params.username,
      tag = request.params.tag;

  sse.removeTag(username, tag);

  response.sendStatus(200);
});

app.listen(port)
