import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import NotMatch from '@/pages/404';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ListWJ from '@/pages/WJ/List';
import CreateWJ from '@/pages/WJ/Create';
import AnalyseWJ from '@/pages/WJ/Analyse';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Redirect exact from="/" to="/login" /> */}
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/wj/list" component={ListWJ} />
          <Route exact path="/wj/new" component={CreateWJ} />
          <Route exact path="/wj/:id/analyse" component={AnalyseWJ} />
          <Route component={NotMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
