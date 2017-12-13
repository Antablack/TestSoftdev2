import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
//import RaisedButton from 'material-ui/RaisedButton';
import MoviesServices from '../../services/movies';
import TheatersServices from '../../services/theaters';
import { URL } from "../../Global"

export default class HomeComponent extends React.Component {

    movies = [];
    url = "";
    constructor(props) {
        super();
        this.state = { movies: [], theaters: [] };
        this.url = URL;
        let moviesServices = new MoviesServices();
        var id = props.match.params.id;
        if (id) {
            moviesServices.getMoviesxTheaters(id).then((resu) => {
                if (resu.data.length > 0) {
                    this.setState({ movies: resu.data });
                } else {
                    this.setState({ movies: [] });
                }
            });
        } else {
            moviesServices.getAllMovies().then((resu) => {
                this.setState({ movies: resu.data })
            });
        }
        let theatersServices = new TheatersServices();
        theatersServices.getAllTheaters().then((resu) => {
            this.setState({ theaters: resu.data })
        })
    }

    render() {
        return (
            <div>
                <Link to="/manager" className="btn btn-primary btn-lg" id="administrar">Administrar</Link>
                <div className="row">
                    <div className="col-md-3">
                        <div className="card" style={{ width: '20rem' }}>
                            <div className="card-header">
                                Teatros
                        </div>
                            <ul className="list-group list-group-flush">
                                {this.state.theaters.map((item, i) => {
                                    return (
                                        <li className="list-group-item" key={i}>
                                            <a href={`/q/${item._id}`}> {item.NAME} ({item.LOCATION})</a>
                                        </li>);
                                })}
                            </ul>
                        </div>
                    </div >
                    <div className="col-md-8">
                        <h4>Peliculas</h4>
                        <div className="row">
                            {this.state.movies.map((item, i) => {
                                return (
                                    <div key={i} className="card" style={{ width: "12rem" }}>
                                        <img className="card-img-top" src={`${this.url}images/${item.IMAGE}`} height="200" alt={item.NAME} />
                                        <div className="card-body">
                                            <div className="card-text">
                                                <h5>{item.NAME}</h5>
                                                <h6>{`${ new Date(item.RELEASEDATE).toLocaleDateString()}-${item.LENGUAGE}`}</h6>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div >
                </div >
            </div >);
    }

}
/* export class moviesHome extends React.Component {
    movies = [];
    constructor(props) {
        super();
        let moviesServices = new MoviesServices();
        var id = props.match.params.id;
        if (id) {
            moviesServices.getMoviesxTheaters(id).then((resu) => {
                this.movies = resu.data;
            });
        } else {
            moviesServices.getAllMovies().then((resu) => {
                this.movies = resu.data;
            });
        }
    }
    render() {
        return (
            <div className="row">
                {this.state.movies.map((item, i) => {
                    return (
                        <div key={i} className="card" style={{ width: "12rem" }}>
                            <img className="card-img-top" src={`${this.url}images/${item.IMAGE}`} height="200" alt={item.NAME} />
                            <div className="card-body">
                                <div className="card-text">
                                    <h5>{item.NAME}</h5>
                                    <h6>{`${item.RELEASEDATE} - ${item.LENGUAGE}`}</h6>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>);
    }

} */
/*const moviesHome = (state,props) => {
    console.log(state.movies);
     return (
        <div className="row">
            {this.state.movies.map((item, i) => {
                return (
                    <div key={i} className="card" style={{ width: "12rem" }}>
                        <img className="card-img-top" src={`${this.url}images/${item.IMAGE}`} height="200" alt={item.NAME} />
                        <div className="card-body">
                            <div className="card-text">
                                <h5>{item.NAME}</h5>
                                <h6>{`${item.RELEASEDATE} - ${item.LENGUAGE}`}</h6>
                            </div>
                         </div>
                   </div>
                );
            })}
        </div>); 
}*/