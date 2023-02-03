import React from 'react';
import { Label } from '../../atoms';
import SelectOption from './SelectOption';

export default {
    title:'Molecules/Selectoption',
    component:SelectOption,
    argstype:{}
}
 const Template = (args)=> <SelectOption {...args}/>

 export const InputSelectOption = Template.bind({});

 InputSelectOption.args = {
    Withlabel:true,
    id:"MainSelectOption",
    className:"SelectOpton",
    name:"SelectOpton",
    optionvalue:"India",
    value:"India",
    text:"Select the option",
 }