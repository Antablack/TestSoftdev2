import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { Tabs, Tab } from 'material-ui/Tabs';
import Movies from "../movies";
import Theaters from "../theaters";

export default class ManagerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'a'
        };
    };

    handleChange = (value) => {
        this.setState({ value })
    }

    render() {
        return <div>
            <Link to="/" className="btn btn-primary btn-log" id="home">Inicio</Link>
            <Tabs value={this.state.value} onChange={this.handleChange}>
                <Tab label="Peliculas" value="a">
                    <Movies/>
                </Tab>
                <Tab label="Teatros" value="b">
                    <Theaters/>
                </Tab>
            </Tabs>
        </div>
    }

}