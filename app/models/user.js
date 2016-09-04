if(!global.hasOwnProperty('User') || typeof global.User === 'undefined') {

  var bCrypt    = require('bcrypt-nodejs')
  var mongoose  = require('mongoose')
  require('mongoose-type-email');
  var uniqueValidator = require('mongoose-unique-validator');

  var schema = new mongoose.Schema({
    email:    {
      type: mongoose.SchemaTypes.Email,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  })

  schema.methods.login = function(pwd) {
    return bCrypt.compareSync(pwd, this.password)
  }

  schema.pre('save', function(next) {
    if (this.isNew) {
      this.password = bCrypt.hashSync(this.password, bCrypt.genSaltSync(10), null)
    }
    next()
  })

  schema.plugin(uniqueValidator)

  global.User = mongoose.model('Admin', schema)

}

module.exports = global.User
