module.exports = function(app) {
  var session     = require('express-session')
  var secret      = process.env.SESSION_SECRET || 'secret'

  var MongoStore  = require('connect-mongo')(session);
  var mongoose    = require('mongoose')

  app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }))
}
