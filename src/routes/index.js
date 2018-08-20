import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import CreateWJ from '../pages/CreateWJ';
import ExistWJ from '../pages/ExistWJ';
import AnalyseWJ from '../pages/AnalyseWJ';
import NotMatch from '../pages/NotMatch';

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new" component={CreateWJ} />
        <Route exact path="/exist" component={ExistWJ} />
        <Route exact path="/wj/:id/analyse" component={AnalyseWJ} />
        <Route exact path="/login" component={Login} />
        <Route component={NotMatch} />
      </Switch>
    );
  }
}

export default Router;
