import { URL } from "../Global"
export default class MoviesServices {
    url = "";
    constructor() {
        this.url = URL;
    }

    getMoviesxTheaters(id) {
        return fetch(this.url + "moviesxtheaters/" + id
        ).then(response => response.json());
    }

    getMovie(id) {
        return fetch(this.url + "movies/" + id).then(response => response.json());
    }

    getAllMovies() {
        return fetch(this.url + "getallmovies").then(response => response.json());
    }
    removeMovie(id) {
        return fetch(this.url + "movies/" + id, { method: 'delete' })
    }

    saveMovie(movie) {
        let url = this.url;
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            formData.append("name", movie.NAME);
            formData.append("lenguage", movie.LENGUAGE);
            formData.append("releasedate", movie.RELEASEDATE);
            if (movie.IMAGE.length !== 0) {
                formData.append("image", movie.IMAGE[0], movie.IMAGE[0].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            if (movie._id) {
                xhr.open("POST", url + "movies/" + movie._id, true);
            } else {
                xhr.open("POST", url + "movies", true);
            }
            xhr.send(formData);
        });
    }
}