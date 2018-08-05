import React from "react";
import "./styles.css";
import { TextField, RaisedButton, List, Subheader,  FloatingActionButton, Snackbar } from 'material-ui';
import MoviesServices from '../../services/movies';
import TheatersServices from '../../services/theaters';
import { URL } from "../../Global"

export default class TheaterComponent extends React.Component {
    url = "";
    resetState = { movies: [], theaters: [], open: false, message: "", _id: undefined, NAME: "", LOCATION: "", LisMovies: [] };
    constructor() {
        super();
        this.url = URL;
        this.state = this.resetState;
        this.loadMovies();
        this.loadThaters();
        this.form_submit = this.form_submit.bind(this);
        this.chk_click = this.chk_click.bind(this);
    }

    loadMovies() {
        let moviesServices = new MoviesServices();
        moviesServices.getAllMovies().then((resu) => {
            this.setState({ movies: resu.data })
        });
    }

    loadThaters() {
        let theatersServices = new TheatersServices();
        theatersServices.getAllTheaters().then((resu) => {
            this.setState({ theaters: resu.data })
        })
    }
    btnEdit_click(evt) {
        let theatersServices = new TheatersServices();
        theatersServices.getTheater(evt.target.dataset.id).then((resu) => {
            this.setState({ _id: resu.data._id, NAME: resu.data.NAME, LOCATION: resu.data.LOCATION });
            let moviesServices = new MoviesServices();


            moviesServices.getMoviesxTheaters(resu.data._id).then((resu) => {
               let data = resu.data.map(x => {
                    return x._id;
                });
                this.setState({ LisMovies: data });
            })
        }); 
    }
    btnRemove_click(evt) {
        if (window.confirm("esta Seguro que desea Continuar?")) {
            let theatersServices = new TheatersServices();
            theatersServices.removeTheater(evt.target.dataset.id).then((resu) => {
                if (resu.status === 200) {
                    this.openSnackbar("Eliminado Exitoso");
                    this.loadThaters();
                }
            });
        }
    }
    btnUpdateList_click() {
        this.loadMovies();
    }

    form_submit(evt) {
        evt.preventDefault();
        let theatersServices = new TheatersServices();
        theatersServices.saveTheater(this.state).then((resu) => {
             this.resetState.open = true;
            this.resetState.message = "Guardado Exitoso"; 
            this.setState(this.resetState);
            this.loadThaters();
            this.loadMovies();
        });
    }
    openSnackbar(message) {
        this.setState({ open: true, message });
        setTimeout(()=>{
            this.setState({open:false})
        },4000)
    }

    chk_click(evt) {
        var id = evt.target.dataset.id;
        if (evt.target.checked) {
            this.state.LisMovies.push(id);
        } else {
            let index = this.state.LisMovies.findIndex((x) => x === id);
            this.state.LisMovies.splice(index, 1);
        }
        this.setState({ LisMovies: this.state.LisMovies });
        console.log(this.state.LisMovies);
    }
    exists(id) {
        return this.state.LisMovies.findIndex((x) => x === id);
    }


    render() {
        return (<div>
            <form onSubmit={this.form_submit}>
                <RaisedButton label="Guardar" secondary={true} type="submit" />
                <div className="row">
                    <div className="col-md-6">
                        <TextField
                            hintText="Nombre"
                            floatingLabelText="Nombre"
                            fullWidth={true}
                            value={this.state.NAME}
                            onChange={evt => this.setState({ NAME: evt.target.value })}
                            maxLength="50"
                            name="name"
                            required
                        />
                        <TextField
                            hintText="Ubicacion"
                            floatingLabelText="Ubicacion"
                            fullWidth={true}
                            value={this.state.LOCATION}
                            onChange={evt => this.setState({ LOCATION: evt.target.value })}
                            maxLength="50"
                            name="name"
                            required
                        />

                    </div>
                    <div className="col-md-5">
                        <List>
                            <Subheader>
                                Peliculas Disponibles para este Teatro
                            <FloatingActionButton mini={true} onClick={this.btnUpdateList_click.bind(this)} >
                                    <i className="material-icons">autorenew</i>
                                </FloatingActionButton>
                            </Subheader>
                            {this.state.movies.map((item, i) => {
                                return (<div key={i} className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" data-id={item._id} checked={this.exists(item._id) !== -1 ? true : false} onClick={this.chk_click}
                                            type="checkbox" /> {item.NAME}
                                    </label>
                                </div>)
                            })}
                        </List>
                    </div >
                </div >
            </form >
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Ubicacion</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.theaters.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.NAME}</td>
                                <td>{item.LOCATION}</td>
                                <td>
                                    <FloatingActionButton mini={true}  onClick={this.btnEdit_click.bind(this)} >
                                        <i className="material-icons" data-id={item._id}>mode_edit</i>
                                    </FloatingActionButton>
                                </td>
                                <td>
                                    <FloatingActionButton mini={true} onClick={this.btnRemove_click.bind(this)}>
                                        <i className="material-icons" data-id={item._id}>delete_forever</i>
                                    </FloatingActionButton>
                                </td>
                            </tr>
                        );
                    })}

                </tbody >
            </table >
            <Snackbar
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />
        </div >);
    }

}