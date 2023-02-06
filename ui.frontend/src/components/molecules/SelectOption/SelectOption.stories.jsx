import React from 'react';
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
    options:[{
        value: "ind",
        text: "India"
    }, {
        value: "chn",
        text: "China"
    }, {
        value: "usa",
        text: "The United States of America"
    }],
    value:"chn",
    labelText:"Select the option",
 }