module.exports = function(app) {
  var path = require('path');
  app.set('../views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
}
