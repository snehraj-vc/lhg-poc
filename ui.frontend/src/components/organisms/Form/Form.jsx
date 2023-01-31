import React from 'react';
import { InputSegment, ButtonGroup } from '../../molecules';

const Form = (props) => {
  const {
    inputs = [],
    buttons = [],
    id ,
    formTitle ="",
    className = ""
  } = props;

  const singleLevelInputTypes = ['text', 'number', 'email'];

  return (
    <div className="location_form">
      {
        inputs && inputs.length && inputs.map((inputNode, idx) => {
          return (
            <div>
              {
                (singleLevelInputTypes.indexOf(inputNode.type) > -1) && <InputSegment type={inputNode.type}  />
              }
            </div>
          )
        })
      }
    </div>);
}


export default Form;