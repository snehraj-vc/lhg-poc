import React from "react";
import { Select } from "../../atoms";
import   {Label} from '../../atoms';

const SelectOption = (props) => {
    const{
       Withlabel=true,
       id="",
       className="",
       text="",
       optionvalue="",
       value=""
    }=props
    return (  
        <div className={className} id={id}>
            {Withlabel && <Label text={text}/>}
            <Select optionvalue={optionvalue}  value={value}/>
        </div>
        
    );
}
 
export default SelectOption;