var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var moviesxtheatersSchema = Schema({
    MOVIEID: { type: Schema.ObjectId, ref: 'MOVIES' },
    THEATERID: { type: Schema.ObjectId, ref: 'THEATERS' }
})

module.exports = mongoose.model("MOVIESXTHEATERS", moviesxtheatersSchema);