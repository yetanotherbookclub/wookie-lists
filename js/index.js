var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var setupRoutes = require('./routes');
setupRoutes(app);

app.listen(port);
