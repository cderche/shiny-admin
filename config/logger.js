module.exports = function(app) {
  var morgan = require('morgan')
  app.use(morgan('dev'))
}
