import React from 'react';
import {Link} from 'react-router-dom'
import firebase from '../firebase';
import axios from 'axios'

export default class Home extends React.Component{
    state = {
        topTech: []
    }

    componentDidMount(){
        console.log('here')
        axios.get('https://shopped-backend.herokuapp.com/product')
        .then(response=>{
            this.setState({topTech:response.data},()=>{
                console.log(this.state.topTech)
            })
        })
    }

    handleClick = prod_id =>{
        this.props.history.push(`/product/${prod_id}`)
    }

    getRecentProducts = () =>{
        if(window.localStorage.getItem('recent')){
            const products = JSON.parse(window.localStorage.getItem('recent'))
            return <div class="card-group">{products.map(product=>{
                const redirecto = `/product/${product.prod_id}`
                return <Link to={redirecto}><div class="card">
                    <img src="..." class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">{product.prod_name}</h5>
                    </div>
                    </div></Link>
                })}
                </div>
            
            
        }
    }

    getBestSellers = () =>{
        return <>
        <h6>Best Sellers</h6>
        <div class="container">
            <div class="row">
            {
                this.state.topTech.map(element => {
                    return <>
                        <div class="col-4" style={{border:'1px solid', color:'black'}}>
                        <div class="container">
                        <div className='row'>{element[0].category}</div>
                        <div class="row">
                            {
                                element.map((elem,i)=>{
                                    if(i === 0 || i === 2){
                                        return <>
                                            <div className="card-group">
                                                <div class="card" onClick={e=>this.handleClick(elem.prod_id)}>
                                                    <img src="..." class="card-img-top" alt="..." />
                                                    <div class="card-body">
                                                    <h5 class="card-title">{elem.prod_name}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                    else{
                                        return <>
                                        <div class="card" onClick={e=>this.handleClick(elem.prod_id)}>
                                            <img src="..." class="card-img-top" alt="..." />
                                            <div class="card-body">
                                            <h5 class="card-title">{elem.prod_name}</h5>
                                            </div>
                                        </div>
                                        </>
                                    }
                                    
                                })
                            }
                        </div>
                        </div>
                        </div>
                    </>
                })
            }
            </div>
        </div></>

    }

    
    
    render(){
        return (
        <>
            {this.getRecentProducts()}
            {this.getBestSellers()}

        </>
        )    
    }
        
}

                                    