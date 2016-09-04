module.exports = function(app) {

  var passport      = require('passport')
  var LocalStrategy = require('passport-local').Strategy

  passport.serializeUser(function(user, done) {
    done(null, user._id)
  })

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  passport.use('auth', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  },
  function(req, email, password, done) {
    console.log(`${email}, ${password}`);
    User.findOne({ email: email}, function(err, user) {
      if (err) {
        console.error(err);
        return done(err)
      }
      if (!user) {
        console.error('Err: user not found');
        return done(null, false)
      }

      if(!user.login(password)) {
        console.error('Err: password doesn`t match');
        return done(null, false)
      }

      console.log('User identified');
      return done(null, user)
    })
  }))

  app.use(passport.initialize())
  app.use(passport.session())

}
