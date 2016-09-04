module.exports = function(app) {
  var session = require('express-session')
  var secret  = process.env.SESSION_SECRET || 'secret'
  app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
}
