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
    const [recentSearch,setrecentSearch]=useState(false);

    const onInputChange = (value) => {
        setquery(value);
       
        if(query.length > 0){
          setrecentSearch(true)
          console.log(recentSearch)
        }
      };

    return ( <>
    
    <Input placeholder={props.inputPlaceholder} 
           value={query}
           onChange={onInputChange}
     />

    { recentSearch ? "" : <div>
       {props.recentSearchText}</div>
    }

    { hotels.map((res)=>{
          console.log(res.name)
          
          return (<div> <h2>{res.continent}</h2><h4>{res.country}</h4><h6>{res.name}</h6></div>)
        })}
     <SelectOption  />
    

    </> );
}
 
export default AutoSuggestion;