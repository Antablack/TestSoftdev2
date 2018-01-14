"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var theatersSchema = Schema({
    NAME: String,
    LOCATION: String
});

module.exports = mongoose.model("THEATERS", theatersSchema);