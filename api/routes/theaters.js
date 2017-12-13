var express = require("express");
var api = express.Router();
var theater = require("../controllers/theaters");

api.get("/theaters/:id", theater.getTheaters);
api.get("/theaters", theater.getAllTheaters);
api.post("/theaters", theater.saveTheaters);
api.post("/theaters/:id", theater.saveTheaters);
api.delete("/theaters/:id", theater.removeTheaters);
api.get("/moviesxtheaters/:id", theater.moviesxtheaters);

module.exports = api; 