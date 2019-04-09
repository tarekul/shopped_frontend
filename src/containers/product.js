import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Product extends Component {
    state = {
        product: '',
        shop_name:''
    }
    componentDidMount(){
        axios.get(`https://shopped-backend.herokuapp.com/product/${this.props.match.params.prod_id}`)
        .then(response=>{
            console.log(response.data)
            this.setState({product:response.data})
            return axios.get(`https://shopped-backend.herokuapp.com/shop/${this.state.product.shop_id}`)
        })
        .then(response=>{
            this.setState({shop_name:response.data.shop_name})
        })
    }

    render(){
        const {prod_name,description,price} = this.state.product
        const {shop_name} = this.state
        return <>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                    <img src="..." class="card-img-top" alt="..." />
                    </div>
                    <div class="col-sm">
                        <div class="card" style={{width: "18em"}}>
                            <div class="card-body">
                                <h5 class="card-title">{prod_name}</h5>
                                <h6 class="card-title">by {shop_name}</h6>
                                <p class="card-text">{price}</p>
                                <p class="card-text">{description}</p>
                                <button type="button" class="btn btn-primary">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            
        </>
    }
}

export default Product