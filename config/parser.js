module.exports = function(app) {
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
}
