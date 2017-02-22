var mongoose = require("mongoose");

var tourSchema  = mongoose.Schema({
    location: String,
    date: Date,
    ticketsAvailable: Number,
    ticketsSold: Number
});

var TourStop = mongoose.model('TourStop', tourSchema);

module.exports = TourStop;