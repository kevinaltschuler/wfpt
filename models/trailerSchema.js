var mongoose = require("mongoose");

var trailerSchema  = mongoose.Schema({
    name: String,
    date: Date,
    votes: Number,
    link: String,
    description: String,
    category: {
        type: String,
        enum: ['Photo', 'Video', 'photo', 'video']
    }
});

var Trailer = mongoose.model('Trailer', trailerSchema);

module.exports = Trailer;