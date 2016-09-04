module.exports = function(app) {
  var express = require('express')
  var path = require('path');
  app.use(express.static(path.join(__dirname, '../.tmp/public')));
}
