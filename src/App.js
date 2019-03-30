import React, { Component } from 'react';
import {HashRouter,Link,Redirect, Route} from 'react-router-dom'

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
        if(user) this.setState({user:'true'})
    })
}  
  
  render() {
    return (
      <HashRouter>
      <AuthContext.Provider value={this.state.user}>
        <Route path='/' component={Header} />
        <Route path='/' exact component={Home}/>
        <Route path='/search/:search' exact/>
        <Route path='/signup' component={Signup}/>
        <Route path='/login' component={Login}/>
        <Route path='/cart'/>
        <Route path='/logout' component={Logout} />
      </AuthContext.Provider>
      </HashRouter>
      
    );
  }
}

export default App;
