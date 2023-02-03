import React from 'react';
import Select from './Select';

export default {
    title:'Atom/Select',
    component:Select,
    argstype:{}
}
 const Template = (args)=> <Select {...args}/>

 export const InputSelect = Template.bind({});

 InputSelect.args = {
    id:"MainSelectOption",
    className:"SelectOpton",
    name:"SelectOpton",
    optionvalue:"India",
    value:"India"
 }