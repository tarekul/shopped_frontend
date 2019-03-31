import React from 'react';
import firebase from '../firebase';
import AuthContext from '../contexts/auth'
import axios from 'axios'

export default class Home extends React.Component{

    componentDidMount(){
        axios.get('https://shopped-backend.herokuapp.com/user/1')
        .then(response=>console.log(response))
    }
    render(){
        return (
        <AuthContext.Consumer>
            {   
                user=>{
                    if(user){
                        return <>
                            <h2>Welcome back,{user.email} </h2>
                            <h4>Your ID is: {user.uid}</h4>
                        </>
                    }
                }
            }
        </AuthContext.Consumer>

        )    
    }
        
}