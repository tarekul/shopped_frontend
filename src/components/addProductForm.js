import React from 'react'
import ProductDimForm from './productdim'

const AddProductForm = (props) =>{ 
    return <>
            <div class="form-group">
            <div class="row">
                <div class="col">
                    <label for="formGroupExampleInput">Enter Product Name</label>
                    <input type="text" class="form-control" id="formGroupExampleInput" name="prod_name" value={props.state.prod_name} placeholder="product name" style={{width:'30%'}} onChange={e=>props.handleChange(e)}/>
                </div>
            </div>
                <label for="exampleFormControlTextarea1">Enter product description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="prod_description" value={props.state.prod_description} onChange={e=>props.handleChange(e)}></textarea>
                
                <label for="inputState">Category</label>
                <select id="inputState" class="form-control" name="category" style={{width:'30%'}} onChange={props.handleChange} >
                    <option selected={props.state.selected}>choose...</option>
                    <option>tech</option>
                    <option>appliance</option>
                    <option>clothing</option>
                </select>

                
                <ProductDimForm state={props.state} handleChange={props.handleChange}/>
               
                <div className="input-group mb-3" style={{marginTop:'1%'}}>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" onChange={e=>{props.handleInput(e)}} />
                    <label className="custom-file-label">Upload Product image</label>
                </div>
            
                </div>
            </div>
      </>
}

export default AddProductForm     