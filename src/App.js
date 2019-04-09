import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withCookies } from 'react-cookie'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import MenuContainer from './conatiners/MenuContainer'
import Footer from './components/Footer';
import routes from './routes';
import Menu from './components/Menu/Menu'


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
            <MenuContainer  />
            
            {/* Show Page */}
            { this.showPage(routes) }
        </div>
      </Router>
    );
  }

  showPage = routes => {
    var resuilt = '';
    if (routes.length > 0) {
      resuilt = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        )
      })
    }
    return <Switch>{resuilt}</Switch>
  }
}

export default withCookies(App);
