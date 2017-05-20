var mongoose = require("mongoose");

var pollSchema  = mongoose.Schema({
    question: String,
    yes: Number,
    no: Number
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;