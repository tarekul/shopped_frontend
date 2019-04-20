import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import NameContext from '../contexts/name'
import firebase from 'firebase'

import AddProductForm from '../components/addProductForm'
import Shop from '../components/shopPage'
import ShowProducts from '../components/showProducts'

class Sell extends Component {
    static contextType = NameContext
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
        dimForm:false,
        price:5,
        idToken:null

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

        else this.setState({[e.target.name]:e.target.value},()=>{
            console.log(this.state)
        })
        
    }
    
    handleSubmit = (e) =>{
        if(e.target.name === "save"){
            const {prod_name,prod_description,file,category,size,width,height,length,price} = this.state
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
                    products.push({prod_name,prod_description,img,category,size,price,width,length,height})
                    localStorage.setItem('products',JSON.stringify(products))
                    this.setState({error:null,errorNan:null,products:products,
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
                })
                })
                
            }
            
        }
        
    }

    handleSubmitStore = () =>{
        const {shop_name,shop_description,products} = this.state
        console.log(this.context)
        const {id} = this.context
        if(shop_name !== '' && shop_description !== '' && products.length > 0) {
            firebase.auth().currentUser.getIdToken(false)
            .then(idToken=>{
                console.log('succees')
                this.setState({idToken:idToken})
                return axios({
                    method : 'POST',
                    url:'http://localhost:3001/shop',
                    data: {sellerid:id,shop_name : shop_name, description: shop_description},
                    headers : {token : idToken}

                })
            })
            .then(()=>{
                return axios({
                    method : 'GET',
                    url:`http://localhost:3001/shop/${shop_name}/shop_name`,
                })
            })
            .then(response=>{
                const {shop_id} = response.data
                products.forEach(product => {
                    const {prod_name,prod_description,category,price,img,width,height,length} = product
                    let size = {xs:'XS',s:'S',m:'M',l:'L'}
                        if(category !== 'clothing') size = {width:width,height:height,length:length}
                        const JsonSize = JSON.stringify(size)
                        return axios({
                            method : 'POST',
                            url:'http://localhost:3001/product',
                            data: {sellerid:id,shop_id:shop_id,prod_name : prod_name, description: prod_description,category:category,price:price,img:img,size:JsonSize,ratings:null},
                            headers : {token : this.state.idToken}

                        })
                        .then(response=>console.log('suceessfully added product'))
                        .catch(err=>console.log(err))
                })
            })
            .then(()=>{
                localStorage.setItem('products',JSON.stringify([]))
                this.setState({products:[]})
                return axios.put(`http://localhost:3001/user/${id}`,{
                    seller:true
                })
            })
            .then(response=>{
                console.log(response)
                this.props.history.push('/')
            })
        }
        else this.setState({error:'missing store name/description'})
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
    
    handleClick = (param) =>{}

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
            <NameContext.Consumer>
                {
                    state =>{
                        if(state.isSeller) return <Shop />
                        else return <>
                        <div class = "container mt-5">
                        {displaySavedAlert}
                        {displayError}
                        {displayError2}
                        {form} 
                        <AddProductForm state={this.state} handleChange={this.handleChange} handleInput={this.handleInput}/>
                        <button type="button" class="btn btn-dark" name='save' onClick={this.handleSubmit}>save product</button>
                        <ShowProducts products={this.state.products} handleX={this.handleX} handleClick={this.handleClick} />
                        </div>
                        </>
                            
                            
            
                    }
                }
            </NameContext.Consumer>
            
        )
    }
}

export default withRouter(Sell)