import React, { Component } from 'react';
import {HashRouter,Link,Redirect, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import AuthContext from './contexts/auth';
import NameContext from './contexts/name'
import IdContext from './contexts/id'
import firebase from './firebase'
import './App.css';

import Header from './components/header'
import Home from './containers/home'
import Product from './containers/product'
import Signup from './containers/signup'
import Logout from './containers/logout'
import Login from './containers/login';
import Sell from './containers/sell';

class App extends Component {
  state = {
    user:null,
    search: null,
    name:null,
    isSeller: null,
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
            console.log('lm',response)
            this.setState({name:response.data.name,isSeller:response.data.seller})
          })
        }
        else this.setState({user:null,name:null})
    })
}  
  
  render() {
    return (
      <HashRouter>
      <IdContext.Provider value={this.state.isSeller}>
      <NameContext.Provider value={this.state.name}>
      <AuthContext.Provider value={this.state.user}>
        <Route path='/' component={Header} />
          <Switch>
              <Route path='/' exact component={ Home } />
              <Route path='/product/:prod_id' exact component={ Product } />
              <Route path='/signup' exact component={ Signup } />
              <Route path='/login' exact component={ Login } />
              <Route path='/logout' exact component={ Logout } />
              <Route path='/sell' exact component={ Sell } />
            </Switch>
      </AuthContext.Provider>
      </NameContext.Provider>
      </IdContext.Provider>
      </HashRouter>
      
    );
  }
}

export default App;
