var pg = require('pg'),
    DATABASE_URL = process.env.DATABASE_URL;

module.exports = function query(queryString, params, formatResponse) {
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query(queryString, params, function(error, result) {
      done();

      if (err) {
        console.error(error); response.send('Error: ' + error);
      } else {
        formatResponse(result);
      }
    });
  });
};
