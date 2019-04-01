import React from 'react';
import firebase from '../firebase';
import AuthContext from '../contexts/auth'
import NameContext from '../contexts/name'
import axios from 'axios'

export default class Home extends React.Component{

    componentDidMount(){
       
    }
    render(){
        return (
        <>
        <NameContext.Consumer>
            {
                name =>{
                    return <>
                    <AuthContext.Consumer>
                    {   
                        user=>{
                            if(user){
                                return <>
                                    <h2>Welcome back,{user.email} </h2>
                                    <h4>Your ID is: {user.uid}</h4>
                                    <h4>Your Name is: {name}</h4>    
                                </>
                                
                            }
                        }
                    }
                    </AuthContext.Consumer>
                    </>
                }
            }
        </NameContext.Consumer>    
        
            </>
        )    
    }
        
}