var should  = require('should')
require('./config')

describe('User', function() {

  var User  = require('../.././app/models/user')
  var data  = { email: 'admin@test.com', password: 'password' }

  describe('SAVE empty user', function() {
    var user = new User()
    it('Should return a error', function(done) {
      user.save(function(err) {
        should.exist(err)
        done()
      })
    })
  })

  describe('SAVE user ONLY email', function() {
    var user = new User({ email: data.email })
    it('Should return a error', function(done) {
      user.save(function(err) {
        should.exist(err)
        done()
      })
    })
  })

  describe('SAVE user ONLY password', function() {
    var user = new User({ password: data.password })
    it('Should return a error', function(done) {
      user.save(function(err) {
        should.exist(err)
        done()
      })
    })
  })

  describe('SAVE user INCORRECT email format', function() {
    var user = new User({ email: 'email', password: data.password })
    it('Should return a error', function(done) {
      user.save(function(err) {
        should.exist(err)
        done()
      })
    })
  })

  describe('SAVE user EXISTING email', function() {
    var user  = new User(data)

    before(function(done) {
      user.save(function(err) {
        if (err) {
          console.error(err);
        }
        done()
      })
    })

    after(function(done) {
      user.remove(function(err) {
        if (err) {
          console.error(err);
        }
        done()
      })
    })

    it('Should return a error', function(done) {
      var user1  = new User(data)
      user1.save(function(err) {
        should.exist(err)
        done()
      })
    })
  })

  describe('SAVE user', function() {
    var user = new User(data)

    before(function(done) {
      user.save(function(err) {
        if (err) {
          console.error(err);
        }
        done()
      })
    })

    after(function(done) {
      user.remove(function(err) {
        if (err) {
          console.error(err);
        }
        done()
      })
    })

    it('Should save the user', function(done) {
      user.isNew.should.be.eql(false)
      done()
    })

    it('Should convert the password the user', function(done) {
      user.password.should.not.be.eql(data.password)
      done()
    })

    it('Should compare password', function(done) {
      user.login(data.password).should.be.eql(true)
      user.login('wrongPassword').should.be.eql(false)
      done()
    })
  })

})
