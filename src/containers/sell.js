import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import IdContext from '../contexts/id'
import firebase from 'firebase'

import AddProductForm from '../components/addProductForm'

class Sell extends Component {
    state = {
        products : [],
        shop_name:'',
        shop_description:'',
        prod_name:'',
        prod_description:'',
        file:'',
        category:'',
        size:'',
        width:'',
        height:'',
        length:'',
        error:null,
        errorNan:null,
        saved:false,
        selected:true,
        dimForm:false

    }

    componentDidMount(){
        if(!localStorage.getItem('products')){
            localStorage.setItem('products',JSON.stringify([]))
        }
        else{
            const products = JSON.parse(localStorage.getItem('products'))
            this.setState({products:products})
        }
    }

    handleChange = e =>{
        this.setState({saved:false})
        if(e.target.value !== 'choose...' && e.target.name === 'category') {
            if(e.target.value !== 'clothing'){ 
                console.log(e.target.value)
                this.setState({[e.target.name]:e.target.value,selected:false,dimForm:true}, () => {
                    console.log(this.state.dimForm)
                })
            }
            else if(e.target.value === 'clothing'){
                console.log(e.target.value)
                this.setState({[e.target.name]:e.target.value,selected:false,dimForm:false,width:0,height:0,length:0}, () => {
                    console.log(this.state.dimForm)
                })
            }
            
        }

        else this.setState({[e.target.name]:e.target.value})
        
    }
    
    handleSubmit = (e) =>{
        if(e.target.name === "save"){
            const {prod_name,prod_description,file,category,size,width,height,length} = this.state
            if(prod_name === '' || category === '' || file === '' || width === '' || height === '' || length ===  ''){
                this.setState({error:'Missing input',saved:false})
            }
            else if(isNaN(width) || isNaN(height) || isNaN(length)) this.setState({errorNan:true})
    
            else{
                const {products} = this.state
                const root = firebase.storage().ref()
                const newImage = root.child(this.state.file.name)

                newImage.put(this.state.file)
                .then(snapshot=>{
                    return snapshot.ref.getDownloadURL()
                })
                .then(img=>{
                    products.push({prod_name,prod_description,img,category,size})
                    localStorage.setItem('products',JSON.stringify(products))
                    this.setState({error:null,errorNan:null,products:products,shop_name:'',
                    shop_description:'',
                    prod_name:'',
                    prod_description:'',
                    category:'',
                    size:'',
                    width:'',
                    height:'',
                    length:'',
                    saved:true, 
                    file:'',
                    selected:true,
                    dimForm: false
                },()=>console.log(this.state.products))
                })
                
            }
            
        }
        
    }

    handleSubmitStore = () =>{
        const {shop_name,shop_description,products} = this.state
        if(shop_name !== '' && shop_description !== '' && products.length > 0) {
            firebase.auth().currentUser.getIdToken(true)
            .then(idToken=>{
                console.log('succees')
                axios({
                    method : 'post',
                    url:'http://localhost:3001/shop',
                    data: {sellerid:1,shop_name : 'tarekshop13', shop_description: 'selling stuffs2'},
                    headers : {token : idToken}

                })
                 
            })
            
            
        }
    }

    handleInput = (e) =>{
        console.dir(e.target.files[0])
        const file = e.target.files[0]
        this.setState({file:file})
        
    }

    handleX = (index) =>{
        //console.log(index)
        const {products} = this.state
        const prods = products.slice(0,index).concat(products.slice(index+1))
        this.setState({products:prods},()=>{
            localStorage.setItem('products',JSON.stringify(prods))
        })
    }

    showProducts = () =>{
       return <><div class='container'><div class='row'>{this.state.products.map((prod,i)=>{
             return <div class="card" key={i} style={{width: "30%",backgroundColor:'#f5f4e8'}}>
            <img src={prod.img} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{prod.prod_name}</h5>
              <p class="card-text">{prod.prod_description}</p>
              <p class="card-text">{prod.category}</p>
              
              
            </div>
            <div align="right"><button type="button" class="btn btn-danger" onClick={e=>this.handleX(i)}>X</button></div>
          </div>  })}
          </div></div></>
       
    }
    

    render(){
        const {shop_name,shop_description,prod_name,prod_description,category,size} = this.state
        const displayError = this.state.error === null ? '' : <div class="alert alert-warning" role="alert">
        {this.state.error}
        </div>

        const displayError2 = this.state.errorNan === null ? '' : <div class="alert alert-warning" role="alert">
        size of product has to be numbers
        </div>
        
        
        const displaySavedAlert = this.state.saved === false ? '' : <div class="alert alert-info" role="alert">
        product saved
        </div>

        const form = 
            <div class='row'>
                <div class='col'>
                    <form>
                    <div class="form-group">
                    <label for="formGroupExampleInput">Enter Shop Name</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="shop name" name="shop_name" value={shop_name} style={{width:'30%'}} onChange={e=>this.handleChange(e)} />
                
                    <label for="exampleFormControlTextarea1">Enter Shop Description</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="shop_description" value={shop_description} onChange={this.handleChange}></textarea>
                    
                    </div>
                    </form>
                </div>
                <div class='col'>
                <button type="button" class="btn btn-light" name='saveStore' onClick={this.handleSubmitStore}>Save Store</button>
                </div>
            </div>
        

    

        return (
            
            <IdContext.Consumer>
                {
                    isSeller =>{
                        if(isSeller) return <h1>is a seller</h1>
                        else return <>
                        <div class = "container mt-5">
                        {displaySavedAlert}
                        {displayError}
                        {displayError2}
                        {form} 
                        <AddProductForm state={this.state} handleChange={this.handleChange} handleInput={this.handleInput}/>
                        <button type="button" class="btn btn-dark" name='save' onClick={this.handleSubmit}>save product</button>
                        {this.showProducts()}
                        </div>
                        </>
                            
                            
            
                    }
                }
            </IdContext.Consumer>
            
        )
    }
}

export default Sell