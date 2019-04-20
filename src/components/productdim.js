import React from 'react'

const ProductDimForm = props =>{
    return props.state.dimForm === false ? '' : <><input class="form-control" type="text" name="width" onChange={props.handleChange} placeholder="width" style={{marginTop:'1%', width: "10%"}}></input>
    <input class="form-control" type="text" name="height" onChange={props.handleChange} placeholder="height" style={{width: "10%"}}></input>
    <input class="form-control" type="text" name="length" onChange={props.handleChange} placeholder="length" style={{width: "10%"}}></input></>
} 

export default  ProductDimForm       