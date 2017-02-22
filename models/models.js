var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/WFPTTest');

var connection = mongoose.connection;
connection.once('open', function() {
    console.log('connected to database');
});

