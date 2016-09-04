module.exports = function(req, res, next) {
  console.log('isNotAuthenticated');
  if (!req.isAuthenticated()) {
    return next()
  }
  return res.redirect('/')
}
