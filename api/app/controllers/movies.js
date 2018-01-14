'use strict'
var path = require("path");
var fs = require("fs");
var models = require("../models/index");

function getAllMovies(req, res) {
    models.MOVIES.find({}).exec((err, resu) => {
        if (resu) {
            res.status(200).send({ data: resu });
        } else {
            res.status(500).send({ message: "Error al Consultar" });
        }
    })
}

function getMovie(req, res) {
    models.MOVIES.findById(req.params.id).exec((err, resu) => {
        if (resu) {
            res.status(200).send({ data: resu });
        } else {
            res.status(500).send({ message: "Error al Consultar" });
        }
    });
}

function removeMovie(req, res) {
    var moviesId = req.params.id;
    models.MOVIES.findById(moviesId).remove((err, resu) => {
        if (!err) {
            models.THEATERSXMOVIES.find({ MOVIEID: moviesId }).remove((err, resu) => {
                if (!err) {
                    res.status(200).send({ message: "ok" })
                } else {
                    res.status(500).send({ message: "Error al Eliminar" });
                }
            })
        } else {
            res.status(500).send({ message: "Error al Eliminar" });
        }
    })
}

function saveMovie(req, res) {
    var movieId = req.params.id;
    var movie = {};
    if (!movieId) {
        movie = new models.MOVIES();
    }
    var params = req.body;
    movie.NAME = params.name;
    movie.RELEASEDATE = params.releasedate;
    movie.LENGUAGE = params.lenguage;
    if(req.files.image){
        movie.IMAGE = req.files.image.path.split("\\").reverse()[0];
    }
    var resu = (err, resu) => {
        if (resu) {
            res.status(200).send({ message: "ok" })
        } else {
            res.status(500).send({ message: "Error al Guardar" });
        }
    } 
    if (!movieId) {
        movie.save(resu);
    } else {
        models.MOVIES.findByIdAndUpdate(movieId, movie, resu);
    }
}

function getImage(req, res) {
    var imageFile = req.params.filename;
    var path_file = './uploads/movies/' + imageFile;
    fs.exists(path_file, function (exist) {
        if (exist) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(404).send({ message: "no encontro el archivo" })
        }
    })
}

module.exports = {
    getAllMovies,
    getMovie,
    saveMovie,
    getImage,
    removeMovie
}