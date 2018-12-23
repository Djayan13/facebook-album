import React, { Component } from 'react';
import { PrivateRoute } from './components/PrivateRoute'
import PhotoList from './components/PhotoList'
import LoginPage from './components/LoginPage'
import { Router, Route } from 'react-router-dom';
import { history } from './store';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Router history={history}>
          <div>
            <PrivateRoute exact path="/photos/:albumId" component={PhotoList} />
            <Route exact path="/" component={LoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}


export default App; 
