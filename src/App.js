import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withCookies } from 'react-cookie'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import MenuContainer from './containers/MenuContainer'
import Footer from './components/Footer/Footer';
import routes from './routes';
import Menu from './components/Menu/Menu'


class App extends Component {

  render() {
    return (
      <Router>
        <Route render={({ location }) => (
              <div className="App">
              <MenuContainer  />   
              {/* Show Page */}
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={600}
                  classNames='fade'  
                >
                  { this.showPage(routes, location) }
                </CSSTransition>
              </TransitionGroup>         
              <Footer />
          </div>
        )} />
        
      </Router>
    );
  }

  showPage = (routes, location) => {
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
    return <Switch location={location}>{resuilt}</Switch>
  }
}

export default withCookies(App);
