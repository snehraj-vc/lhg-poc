import React from "react";
import { Input } from "../../atoms";
import { useState } from "react";
import { SelectOption } from "../../molecules";

const AutoSuggestion = (props) => {
    const{
       hotels=[],
       name=""
    }=props;
    
    const [query,setquery]=useState("");
    const [mapvalue,setmapvalue]=useState("")

    const onInputChange = (value) => {
        setquery(value);
      };
    return ( <>
    
    <Input placeholder={props.inputPlaceholder} 
           value={query}
           onChange={onInputChange}
     />

    { hotels.map((res)=>{
          console.log(res.name)
          
          return (<div> <h2>{res.continent}</h2><h4>{res.country}</h4><h6>{res.name}</h6></div>)
        })}
     <SelectOption  />
    <div>
        <h3>{props.recentSearchText}</h3>
    </div>

    </> );
}
 
export default AutoSuggestion;