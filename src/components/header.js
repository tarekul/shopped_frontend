import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import NameContext from '../contexts/name'
import shopped from '../assets/shopped.png'
import axios from 'axios'
import './header.css'

class Header extends Component{
    state = {
        search:null
    }
  
    onChange = (e) =>{
       this.setState({search:e.target.value})
    }

    onEnter = e =>{
        if(e.keyCode === 13){
            console.log(this.state.search)
        }
    }

    onSubmit = e =>{
        
    }



  render(){
    const loggedOut = <>
    <Link className="nav-link" to="/signup">Sign Up</Link>
    <Link className="nav-link" to="/login">Login</Link>
    </>

    const loggedIn = <>
        <Link className="nav-link" to="/logout">Logout</Link>
        <Link className="nav-link" to="/sell">Sell</Link>
    </>
    return(
        <nav className="navbar navbar-light bg-dark" style={{backgroundColor: '#97EFE9'}}>
        <a className="navbar-brand"><Link className="navbar-brand" to="/"><img id='logo' src={shopped} alt='logo'/></Link></a>
        <div className="btn-group wide">
            <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
            </button>
            <div className="dropdown-menu wide">
                <a class="dropdown-item">Appliance</a>
                <a class="dropdown-item">Books</a>
                <a class="dropdown-item">Clothes</a>
                <a class="dropdown-item">Technology</a>
            </div>
        </div>
        <form className="form-inline">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e=>this.onChange(e)} onKeyDown={e=>{this.onEnter(e)}} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={e=>this.onSubmit(e)}>Search</button>
        </form>
        
        <AuthContext.Consumer>
            {
                user => {
                if (user) return loggedIn
                else return loggedOut
                }
            }
        </AuthContext.Consumer>
        <NameContext.Consumer>
            {
                state=>{
                    if(state.name) return <Link className="nav-link" to="/">Hi {state.name}!</Link>
                }
            }
        </NameContext.Consumer>
        
        <Link to='/cart'><img src="https://img.icons8.com/nolan/64/000000/shopping-cart.png"/></Link>
        </nav>
    )
  }
  
}

export default Header
