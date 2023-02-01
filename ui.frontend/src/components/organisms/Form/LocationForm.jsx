import React from 'react';
import { InputSegment } from '../../molecules';
import {Button} from '../../atoms';
const LocationForm = (props) => {
    const {
      id="",
      className="",
      input=[],
      buttons=[]
    }=props;
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

  
export default LocationForm;