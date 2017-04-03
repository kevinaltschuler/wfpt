var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_sksh3cz6:gep93jujkl9gvnuvapvf97qg82@ds137090.mlab.com:37090/heroku_sksh3cz6');

var connection = mongoose.connection;
connection.once('open', function() {
    console.log('connected to database');
});

var tourModel = require('./tourSchema');
var trailerModel = require('./trailerSchema');
var pressModel = require('./pressSchema');

var models = {
    tour: tourModel,
    trailer: trailerModel,
    press: pressModel
};

module.exports = models;
