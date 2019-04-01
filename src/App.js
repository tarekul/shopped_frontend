import React, { Component } from 'react';
import {HashRouter,Link,Redirect, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import AuthContext from './contexts/auth';
import NameContext from './contexts/name'
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
    search: null,
    name:null
  }

  changeAppState = (obj) =>{
    this.setState({})
  }

    
  componentDidMount(){
    this.unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
        if(user) {
          this.setState({user:user})
          const {email} = user
          axios.get(`https://shopped-backend.herokuapp.com/user/${email}/email`)
          .then(response=>{
            console.log('lm',response.name)
            this.setState({name:response.name})
          })
        }
        else this.setState({user:null})
    })
}  
  
  render() {
    return (
      <HashRouter>
      <NameContext.Provider value={this.state.name}>
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
      </NameContext.Provider>
      </HashRouter>
      
    );
  }
}

export default App;
