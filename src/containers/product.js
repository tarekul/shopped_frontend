import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Product extends Component {
    state = {
        product: ''
    }
    componentDidMount(){
        axios.get(`https://shopped-backend.herokuapp.com/product/${this.props.match.params.prod_id}`)
        .then(response=>{
            console.log(response.data)
            this.setState({product:response.data})
        })
    }

    render(){
        const {prod_name,description,price} = this.state.product
        return <>
            <div class="card" style={{width: "18em"}}>
            <img src="..." class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{prod_name}</h5>
                <p class="card-text">{price}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        </>
    }
}

export default Product