import React, { Component } from 'react'
import { Route, Router } from 'react-router'
import PropTypes from 'prop-types'
import './App.css'

import Catalogo from './views/Catalogo'
import Login from './views/Login'

class App extends Component {
  render() {
    return (
      <Router history={ this.props.history }>
        <div>
          <Route exact 
          path="/" 
          component={ Login }/>
          <Route 
          path='/catalogo' 
          component= { Catalogo }/>
          
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  history: PropTypes.any
};

export default App;
