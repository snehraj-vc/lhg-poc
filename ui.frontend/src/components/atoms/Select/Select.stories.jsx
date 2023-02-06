import React from 'react';
import Select from './Select';

export default {
    title:'Atoms/Select',
    component:Select,
    argstype:{}
}
 const Template = (args)=> <Select {...args}/>;

 export const InputSelect = Template.bind({});

 InputSelect.args = {
    id:"MainSelectOption",
    className:"SelectOpton",
    name:"SelectOpton",
    options:[{
        text: "- Select a bird -",
        value: ""
    },{
        text: "Parrot",
        value: "prt"   
    }, {
        text: "Sparrow",
        value: "spr"
    }, {
        value: "kfs",
        text: "Kingfisher"
    }],
    preSelectedValue:""
 }