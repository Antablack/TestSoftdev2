import React from "react";
import "./styles.css";
import { TextField, RaisedButton, DatePicker, SelectField, MenuItem, FloatingActionButton, Snackbar } from 'material-ui';
import MoviesServices from '../../services/movies';
import { URL } from "../../Global"
export default class MovieComponent extends React.Component {

    url = "";
    resetState = { movies: [], open: false, message: "", _id: undefined, NAME: "", RELEASEDATE: new Date().toString(), LENGUAGE: "Español", IMAGE: [] };
    constructor() {
        super();
        this.url = URL;
        this.state = this.resetState;
        this.loadMovies();
        this.form_submit = this.form_submit.bind(this);
    }

    loadMovies() {
        let moviesServices = new MoviesServices();
        moviesServices.getAllMovies().then((resu) => {
            this.setState({ movies: resu.data })
        });
    }

    btnEdit_click(evt) {
        console.log(evt.target.dataset.id);
        let moviesServices = new MoviesServices();
        moviesServices.getMovie(evt.target.dataset.id).then((resu) => {
            this.setState({ _id: resu.data._id, NAME: resu.data.NAME, RELEASEDATE: resu.data.RELEASEDATE, LENGUAGE: resu.data.LENGUAGE });
        });
    }
    btnRemove_click(evt) {
        if (window.confirm("esta Seguro que desea Continuar?")) {
            let moviesServices = new MoviesServices();
            moviesServices.removeMovie(evt.target.dataset.id).then((resu) => {
                if (resu.status === 200) {
                    this.openSnackbar("Eliminado Exitoso");
                    this.loadMovies();
                }
            });
        }
    }
    form_submit(evt) {
        evt.preventDefault();
        if (this.state.IMAGE.length === 0 && !(this.state._id)) {
            window.alert("por favor Agrege una Imagen");
            return;
        }
        let moviesServices = new MoviesServices();
        moviesServices.saveMovie(this.state).then((resu) => {
            this.loadMovies();
            this.resetState.open = true;
            this.resetState.message = "Guardado Exitoso";
            this.setState(this.resetState);
        });
    }
    openSnackbar(message) {
        this.setState({ open: true, message });
    }
    render() {
        return (
            <div>
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
                            <DatePicker hintText="Fecha de Lanzamiento"
                                defaultDate={new Date(this.state.RELEASEDATE)}
                                onChange={(evt, date) => this.setState({ RELEASEDATE: date.toLocaleDateString() })}
                                floatingLabelText="Fecha de Lanzamiento" container="inline" />

                            <SelectField
                                floatingLabelText="Lenguaje"
                                value={this.state.LENGUAGE}
                                onChange={(evt, index, value) => this.setState({ LENGUAGE: value })}
                                autoWidth={true}
                            >
                                <MenuItem value={'Español'} primaryText="Español" />
                                <MenuItem value={'Ingles'} primaryText="Ingles" />
                            </SelectField>
                        </div>
                        <div className="col-md-5">
                            <label className="custom-file">
                                <input type="file" className="custom-file-input"
                                    onChange={evt => this.setState({ IMAGE: evt.target.files })} />
                                <span className="custom-file-control"></span>
                            </label>
                        </div>
                    </div >
                </form >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Fecha de Lanzamiento</th>
                            <th scope="col">Lenguaje</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>
                                        <img src={`${this.url}images/${item.IMAGE}`} alt={item.NAME} width="100" height="100" />
                                    </td>
                                    <td>{item.NAME}</td>
                                    <td>{new Date(item.RELEASEDATE).toLocaleDateString()}</td>
                                    <td>{item.LENGUAGE}</td>
                                    <td>
                                        <FloatingActionButton mini={true} data-id={item._id} onClick={this.btnEdit_click.bind(this)} >
                                            <i className="material-icons">mode_edit</i>
                                        </FloatingActionButton>
                                    </td>
                                    <td>
                                        <FloatingActionButton mini={true} data-id={item._id} onClick={this.btnRemove_click.bind(this)}>
                                            <i className="material-icons">delete_forever</i>
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
            </div >)
    }

}