var mongoose = require("mongoose");

var pressSchema  = mongoose.Schema({
    title: String,
    date: Date,
    description: String,
    link: String,
    thumb: String
});

var Press = mongoose.model('Press', pressSchema);

module.exports = Press;