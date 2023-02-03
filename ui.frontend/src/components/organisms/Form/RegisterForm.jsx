import React from 'react';
import axios from "axios";
import { InputSegment } from '../../molecules';
import {Button} from '../../atoms';
import {SelectOption} from '../../molecules'
import { useEffect, useState } from "react";
const RegisterForm = (props) => {
    const {
      id="",
      className="",
      input=[],
      buttons=[],
      select=[]
    }=props;

    useEffect(() => {
      getLocation();
    
    }, []);

    const [currLocation, setCurrLocation] = useState({});
    const getLocation = async () => {
      try{
           const location = await axios.get("https://ipapi.co/json");
             setCurrLocation(location.data);
                console.log(location.data)
         }
      catch(error){
        console.error("the server is down")
      }
    };

  return (<div className={`Input-form${className}`}>

  {input && input.map((input,index)=>{
              console.log(input.inputType)
                   return ( <InputSegment 
                               
                                inputType={input.inputType} 
                                placeholder={input.placeholder} 
                                className={input.className}
                                id={input.id}
                                labelText={input.labelText}
                              
                             />
                          );
                  } ) }
{select && select.map((select,idx) => {
             console.log(select.value[0].value)
            return(<SelectOption optionvalue={select.value} text={select.text}/>);
})}
                  {buttons && buttons.map((btn,idx) => {
                    
                    return (<Button
                            id={btn.id}
                            onClick={btn.onClick}
                            className={btn.className}
                            type={btn.type}
                            text={btn.text}
                            key={idx}
                        />);
                  })}
                  
  </div>);
}

  
export default RegisterForm;