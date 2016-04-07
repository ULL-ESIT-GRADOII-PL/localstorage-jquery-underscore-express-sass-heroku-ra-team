// This is th Express JS app file
var express = require('express');	// Include express
var app = express();	// Assign a express instance
var expressLayouts = require('express-ejs-layouts');	// Include the express layouts

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'ejs');
require('ejs').delimiter = '$';

app.use(expressLayouts);

app.use(express.static(__dirname + '/'));

app.get('/', function (request, response) {
    response.render('index', { title: 'Language Processors - Comma Separated Values Analyzer' });
});

app.get('', function (request, response) {

});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});
module.exports = app;