import React, { Component } from 'react';
import {HashRouter,Link,Redirect, Route, Switch} from 'react-router-dom'

import AuthContext from './contexts/auth';
import firebase from './firebase'
import './App.css';

import Header from './components/header'
import Home from './containers/home'
import Signup from './containers/signup'
import Logout from './containers/logout'
import Login from './containers/login';

class App extends Component {
  state = {
    user:null,
    search: null
  }

  changeAppState = (obj) =>{
    this.setState({})
  }

    
  componentDidMount(){
    this.unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
        if(user) this.setState({user:user})
        else this.setState({user:null})
    })
}  
  
  render() {
    return (
      <HashRouter>
      <AuthContext.Provider value={this.state.user}>
        <Route path='/' component={Header} />
        <div className='container mt-5'>
            <Switch>
              <Route path='/' exact component={ Home } />
              <Route path='/signup' exact component={ Signup } />
              <Route path='/login' exact component={ Login } />
              <Route path='/logout' exact component={ Logout } />
            </Switch>
          </div>
      </AuthContext.Provider>
      </HashRouter>
      
    );
  }
}

export default App;
