import { URL } from "../Global"
export default class TheatersServices {
    url = "";
    constructor() {
        this.url = URL;
    }
    getAllTheaters() {
        return fetch(this.url + "theaters").then(response => response.json())
    }
    getTheater(id) {
        return fetch(this.url + "theaters/" + id).then(response => response.json());
    }

    removeTheater(id) {
        return fetch(this.url + "theaters/" + id, { method: 'delete' })
    }

    saveTheater(theater) {
        let url = this.url + "theaters";
        if (theater._id) {
            url += "/" + theater._id;
        }
        console.log(theater);
        let params = { "name": theater.NAME, "location": theater.LOCATION, "movies": theater.LisMovies.join(",") }
        return fetch(url,
            {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params)
            })
    }



}