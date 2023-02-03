import React from 'react';
import InputSegment from './InputSegment';

export default {
    title: 'Molecules/InputSegment',
    component: InputSegment,
    argsTypes: {}
}

const Template = (args) => <InputSegment {...args} />;

export const WithLabel = Template.bind({});

WithLabel.args = {
    inputWithLabel:true,
    // className:"Label",
    // id:"label",
    // name:"first name",
    // required: false,
    // placeholder:"enter first name",
    labelText:"First Name:"
    // inputType:"text"
}

export const WithoutLabel = Template.bind({});

WithoutLabel.args =  {
    inputWithLabel:false,
    // className:"Label",
    // id:"label",
    // name:"last name",
    // required:false,
    // placeholder:"enter last name",
    labelText:"Email"
    // inputType:"text"
}
export const WithoutLabel1 = Template.bind({});


