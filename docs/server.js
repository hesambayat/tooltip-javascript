var express = require('express');
var path = require('path');

var PORT = 8080;
var app = express();
app.use(express.static(__dirname));
app.listen( PORT, function(err, res){
  console.log('Server listens to port ' + PORT + '...');
});
