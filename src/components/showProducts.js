import React from 'react'

const ShowProducts = (props) =>{
    const {products,handleX,handleClick} = props
    return <>
        <div class='container'><div class='row'>{products.map((prod,i)=>{
             return <div class="card" key={i} style={{width: "30%",backgroundColor:'#f5f4e8'}} onClick={e=>handleClick(prod.prod_id)}>
            <img src={prod.img} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{prod.prod_name}</h5>
              <p class="card-text">{prod.prod_description}</p>
              <p class="card-text">{prod.category}</p>
              
              
            </div>
            <div align="right"><button type="button" class="btn btn-danger" onClick={e=>handleX(i)}>X</button></div>
          </div>  })}
          </div></div></>
}

export default ShowProducts