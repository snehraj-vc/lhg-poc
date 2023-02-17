import React from "react";
import { Input,Button } from "../../atoms";
const AutoSuggestion = (props) => {

    const {
       input={},
       button={},
    }=props;

    return ( <>
    
    <Input placeholder={props.inputs.placeholder} />
    <Button text={props.button.text}/>

    </> );
}
 
export default AutoSuggestion;