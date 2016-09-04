module.exports = function(app) {

  var isAuthenticated = require('.././app/policies/isAuthenticated')

  app.get('/', isAuthenticated, function(req, res) {
    return res.render('home')
  })

}
