var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var movieSchema = Schema({
    NAME: String,
    RELEASEDATE: Date,
    LENGUAGE: String,
    IMAGE: String
})


module.exports = mongoose.model("MOVIES", movieSchema);