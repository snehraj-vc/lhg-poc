import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {Input,Button} from '../../atoms'
/**
 * 
 * Requirements
 * 
 * 
 * 1- content structure- site a, site b site c

2- create a component which is having dialogue of nested multifield

3- each item in the multifield has text and multiple path field in each item

4- create a sling model for nested multifield 

5- React-  left- dropdown -title of items

   -select offers from drpdown type in search and submit

-- UI will post data to sling servlet  with keyword that has been searched and the all the path

6- write a sling servlet which will search the text at all the path for that categories and return to UI  
 * 
 * 
 * 
 * 
 */

const SearchOther = (props) => {
  const [query, setQuery] = useState("")
  const [populate_value,setpopulate_value] =useState("")
  const{
     data=[],
     link="",
     id="",
     className="",
     placeholder="",
     type="text",
     required=false,
     name="",
     value="",
     text=""
  }=props
const submitFunction=(()=>{
console.log(populate_value)

})
  const onchange=((data)=>{
    setpopulate_value(data)
  })
return(<>
  <Input  onChange={event => setQuery(event.target.value)} value={query.length ? populate_value : "" } placeholder={placeholder}/>
  <Button text={text} onClick={()=> submitFunction()}/>
{
  data.filter(post => {
    if (query === '') {
      return post;
    } else if (post.Name.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
  }).map((data)=>{
  {console.log(data.Name)}
 
  return(<div onClick={()=>onchange(data.Name)}>{data.Name}</div>)
})}

</>)
}

  
export default SearchOther;