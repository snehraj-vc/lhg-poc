import React from "react";

const Select = (props) => {
    const {
        id="",
        className="",
        name="",
        optionvalue="",
        value=""
    }=props
    return ( 
        <select name={name} id={id}>
            
                      <option value={value}>{optionvalue}</option>
            
        </select>
     );
}
 
export default Select;