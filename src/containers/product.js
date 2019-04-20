import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'
import NameContext from '../contexts/name'

class Product extends Component {
    static contextType = NameContext
    
    state = {
        product: '',
        shop_name:'',
        selectedSize:'M',
        quantity:1
    }
    
    componentDidMount(){
        const {prod_id} = this.props.match.params
        axios.get(`http://localhost:3001/product/${prod_id}`)
        .then(response=>{
            console.log(response.data)
            this.setState({product:response.data})
            return axios.get(`http://localhost:3001/shop/${this.state.product.shop_id}`)
        })
        .then(response=>{
            this.setState({shop_name:response.data.shop_name})
        })
    }

    sizeButtons = (size) =>{
        if(size){
            if(size.xs){
            return<>
            <div class="btn-group" role="group" aria-label="sizes">
            <button type="button" class="btn btn-secondary" onClick={e=>this.setState({selectedSize:'XS'})}>XS</button>
            <button type="button" class="btn btn-secondary" onClick={e=>this.setState({selectedSize:'S'})}>S</button>
            <button type="button" class="btn btn-secondary" onClick={e=>this.setState({selectedSize:'M'})}>M</button>
            <button type="button" class="btn btn-secondary" onClick={e=>this.setState({selectedSize:'L'})}>L</button>
            </div>
            </>
        }
        else{
            return<>
                <ul class="list-group">
                <li class="list-group-item disabled">{size.length}</li>
                <li class="list-group-item">{size.width}</li>
                <li class="list-group-item">{size.height}</li>
                </ul>
            </>
        }
        }
        
    }

    quantity = () =>{
        return <>
        <label for="exampleFormControlSelect1">Quantity</label>
        <select class="form-control" id="exampleFormControlSelect1" style={{width:'10%'}} onChange={e=>this.setState({quantity:e.target.value},()=>console.log(this.state))}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
        </select>
        </>
    }

    handleSubmit = () =>{
        const {product,selectedSize,quantity} = this.state
        const {prod_id} = product
        const {id} = this.context

        //console.log('userid,prod_id,size,quantity',id,prod_id,selectedSize,quantity)
        
        axios.post('http://localhost:3001/cart',{
            userid:id,
            prod_id:prod_id,
            quantity:quantity,
            size:selectedSize
        })
    }

    render(){
        const {prod_name,description,price,img,size} = this.state.product
        const {shop_name} = this.state
        return <>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                    <img src={img} class="card-img-top" alt="..." />
                    </div>
                    <div class="col-sm">
                        <div class="card" style={{width: "18em"}}>
                            <div class="card-body">
                                <h5 class="card-title">{prod_name}</h5>
                                <h6 class="card-title">by {shop_name}</h6>
                                <p class="card-text">{price}</p>
                                <p class="card-text">{description}</p>
                                <button type="button" class="btn btn-primary" onClick={e=>this.handleSubmit()}>Add to cart</button>
                            </div>
                        </div>
                        {this.sizeButtons(size)}
                        <br />
                        {this.quantity()}
                    </div>
                </div>
            </div>



            
        </>
    }
}

export default withRouter(Product)