import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import NameContext from '../contexts/name'
import axios from 'axios'
import ShowProducts from '../components/showProducts'

class Shop extends Component{
    static contextType = NameContext

    state = {
        shop:null
    }

    componentDidMount(){
        const {id} = this.context
        axios.get(`http://localhost:3001/shop/${id}/seller`)
        .then(response=>{
            const {shop_id} = response.data
            return axios.get(`http://localhost:3001/shop/${shop_id}/products`)
        })
        .then(response=>this.setState({shop:response.data}))
    }

    handleX = (i) => {}


    handleClick = (prod_id) =>{
        this.props.history.push(`/product/${prod_id}`)
    }

    render(){
        const shop_name = this.state.shop ? this.state.shop[0].shop_name : null
        if(shop_name) return <>
            <h1 class="display-3">{shop_name}</h1>
            <ShowProducts products={this.state.shop} handleX={this.handleX} handleClick={this.handleClick} /></>
        else return ''
    }
}

export default withRouter(Shop)