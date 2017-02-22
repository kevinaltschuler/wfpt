var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WFPTTest');

var connection = mongoose.connection;
connection.once('open', function() {
    console.log('connected to database');
});

var tourModel = require('./tourSchema');
var trailerModel = require('./trailerSchema');

var models = {
    tour: tourModel,
    trailerModel: trailerModel
};

module.exports = models;
