import React from "react";
import { Input,Button } from "../../atoms";
const AutoSuggestion = (props) => {
    const {
       input={},
       button={},
    }=props;

    return ( <>
    <Input/>
    <Button/>
    <div>Hello world</div>
    </> );
}
 
export default AutoSuggestion;