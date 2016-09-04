module.exports = function(app) {

  var passport = require('passport')

  app.post('/auth', passport.authenticate('auth', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

  app.get('/login', function(req, res) {
    if(req.isAuthenticated()) {
      return res.redirect('/')
    }
    return res.render('login')
  })

}
