var mongoose    = require('mongoose')

if(!mongoose.connection.readyState) {
  mongoose.Promise = require('bluebird')
  mongoose.connect(process.env.MONGODB)
  // mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
  // mongoose.connection.once('open', function() {
  //   console.log(`we're connected!`)
  // });

}
