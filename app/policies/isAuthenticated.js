module.exports = function(req, res, next) {
  console.log('isAuthenticated');
  if (req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/login')
}
