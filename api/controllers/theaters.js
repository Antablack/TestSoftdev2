

var path = require("path");
var fs = require("fs");
var models = require("../models");

function getAllTheaters(req, res) {
    models.THEATERS.find({}).exec((err, resu) => {
        if (resu) {
            res.status(200).send({ data: resu });
        } else {
            res.status(500).send({ message: "Error al Consultar" });
        }
    })
}

function getTheaters(req, res) {
    models.THEATERS.findById(req.params.id).exec((err, resu) => {
        if (resu) {
            res.status(200).send({ data: resu });
        } else {
            res.status(500).send({ message: "Error al Consultar" });
        }
    });
}

function moviesxtheaters(req, res) {
    models.THEATERSXMOVIES.find({ THEATERID: req.params.id }).populate({ path: "MOVIEID", select: '' }).exec((err, resu) => {
        if (!err) {
            res.status(200).send({ data: resu.map((a) => a.MOVIEID) });
        } else {
            res.status(500).send({ message: "Error al Consultar" });
        }
    })
}

function saveTheaters(req, res) {
    var theaterid = req.params.id;

    var theater = {}; 
    if (!theaterid) {
        theater = new models.THEATERS();
    } 
    var params = req.body;
    theater.NAME = params.name;
    theater.LOCATION = params.location;
    var resu = (err, resu) => {
        if (!err) { 
            console.log(params); 
            var movies = params.movies.split(",");
            Promise   
                .all(movies.map(movie => saveTheatersxMovies(movie, resu._id ? resu._id : theaterid)))
                .then(() => {    
                    res.status(200).send({ message: "ok" });
                })
                .catch(() => { 
                    res.status(500).send({ message: "Error al Guardar" });
                })
        } else {
            res.status(500).send({ message: "Error al Guardar" });
        }
    }

    if (!theaterid) {
        theater.save(resu)
    } else {
        models.THEATERSXMOVIES.find({ THEATERID: theaterid }).remove((err, resu) => {
            if (!err) {

            }
        });
        models.THEATERS.findByIdAndUpdate(theaterid, theater, resu);
    }
}

function saveTheatersxMovies(movieid, theaterid) {
    return new Promise((resolve) => {
        if (movieid != '') {
            var theaterxmovie = new models.THEATERSXMOVIES();
            theaterxmovie.MOVIEID = movieid;
            theaterxmovie.THEATERID = theaterid;
            theaterxmovie.save();
        }
        resolve();
    })
}

function removeTheaters(req, res) {
    var id = req.params.id;
    models.THEATERS.findById(id).remove((err, resu) => {
        if (!err) {
            models.THEATERSXMOVIES.find({ THEATERID: id }).remove((err, resu) => {
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

module.exports = {
    getAllTheaters,
    getTheaters,
    moviesxtheaters,
    saveTheaters,
    removeTheaters
}