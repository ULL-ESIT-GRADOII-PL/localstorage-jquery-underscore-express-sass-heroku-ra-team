// This is th Express JS app file
var express = require('express');
var app = express();

var _ = require("underscore");

app.locals._ = _;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use('/test', express.static(__dirname + '/public/test'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
