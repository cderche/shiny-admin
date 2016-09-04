var app       = require('../.././index')
var chai      = require('chai')
var chaiHttp  = require('chai-http')
var expect    = chai.expect
var User      = require('../.././app/models/user')
var data      = { email: 'admin@test.com', password: 'password' }

chai.use(chaiHttp)

describe('Authentication', function() {

  describe('When POST /auth with valid data', function() {
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

    it('should respond with 200', function(done) {
      chai.request(app)
        .post('/auth')
        .send(data)
        .end(function(err, res) {
          expect(res).to.have.status(200)
          // expect(res).to.redirect
          done()
        })
    })

  })


  describe('When GET /login', function() {
    describe('If user is guest', function() {
      it('should respond with 200', function(done) {
        chai.request(app)
          .get('/login')
          .end(function(err, res) {
            expect(res).to.have.status(200)
            done()
          })
      })
    })

    describe('If user is authenticated', function() {
      var user = new User(data)

      before(function(done) {
        user.save(function(err) {
          if (err) {
            console.error(err);
          }
          chai.request(app)
            .post('/auth')
            .send(data)
            .end(function(err, res) {
              done()
            })
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

      it('should respond with 200', function(done) {
        chai.request(app)
          .get('/login')
          .end(function(err, res) {
            expect(res).to.have.status(200)
            // expect(res).to.redirect
            done()
          })
      })
    })
  })
})
