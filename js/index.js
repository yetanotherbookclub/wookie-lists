var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var setupRoutes = require('./routes');

setupRoutes(app);

app.listen(port);
