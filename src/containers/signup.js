import React from 'react';
import firebase from '../firebase';
import axios from 'axios'

export default class Signup extends React.Component {
    state = {
        name:'',
        username:'',
        address: '',
        city:'',
        state:'',
        zip:'',
        email:'',
        password:'',
        error:''
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]:e.target.value})
        console.log(e.target.value)
    }


    handleSubmit = e =>{
        e.preventDefault()
        const {email,password} = this.state
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(response=>{
            console.log('Returns: ',response)
            const {name,username,address,city,state,zip,email} = this.state
                const addressObj = {address:address,city:city,state:state,zip:zip}
                return axios.post('https://shopped-backend.herokuapp.com/user', {
                    username:username,
                    name: name,
                    email:email,
                    address: addressObj,
                    uid: response.user.uid,
                    seller:false
                })
                
        })
        .then(response=>{
            const {userid} =  response.data
            console.log(userid)
            
            
        })
        .catch(err=>{
            const {message} = err
            this.setState({error:message})
        })
    }

    componentDidMount(){
        this.unsubscribe = firebase.auth().onAuthStateChanged((user)=>{
            if(user) this.props.history.push('/')
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render(){
        const {name,username,address,city,zip,email,password,error} = this.state
        const displayError = error === '' ? '': <div className="alert alert-danger" role="alert">{error}</div>
        return (
            <>
              <h1>Sign Up</h1>
              {displayError}
              <form>
              <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter name" name="name" value={name} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter username" name="username" value={username} onChange={this.handleChange} />
                </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email" name="email" value={email} onChange={this.handleChange}/>
                </div>
                <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password" name="password" value={password} onChange={this.handleChange}/>
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" name="address" value={address} onChange={this.handleChange}/>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                <label for="inputCity">City</label>
                <input type="text" class="form-control" id="inputCity" name="city" value={city} onChange={this.handleChange}/>
                </div>
                <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control" name="state" onChange={this.handleChange} >
                    <option selected>Choose...</option>
                    <option>New York City</option>
                    <option>New Jersey</option>
                </select>
                </div>
                <div class="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" class="form-control" id="inputZip" name="zip" value={zip} onChange={this.handleChange}/>
                </div>
            </div>
            <button type="submit" class="btn btn-primary" onClick={this.handleSubmit}>Sign Up</button>

            {/* image upload */}
            {/* <div class="form-group">
                <label for="exampleFormControlFile1">Example file input</label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1" accept=".png, .jpg, .jpeg" onChange={this.handleChange}/>
            </div> */}
        </form>
    </>
          )
    }
}