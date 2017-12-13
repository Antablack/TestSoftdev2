import React, { Component } from 'react';
import Home from "./components/home";
import Manager from "./components/manager";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/manager' component={Manager} />
        <Route path='/q/:id' component={Home} />
      </Switch>
    );
  }
}

export default App;
