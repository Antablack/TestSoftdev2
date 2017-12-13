var express = require("express");
var api = express.Router();
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: './uploads/movies' });

var movies = require("../controllers/movies");


api.get("/getallmovies", movies.getAllMovies);
api.get("/movies/:id", movies.getMovie);
api.post("/movies", md_upload, movies.saveMovie);
api.post("/movies/:id", md_upload, movies.saveMovie);
api.get("/images/:filename", movies.getImage);
api.delete("/movies/:id", movies.removeMovie);
module.exports = api;