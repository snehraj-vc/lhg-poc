import React from 'react';
import InputSegment from './InputSegment';

export default {
    title: 'Molecule/InputSegment',
    component: InputSegment,
    argsTypes: {}
}

const Template = (args) => <InputSegment {...args} />;

export const WithLabel = Template.bind({});

WithLabel.args = {
    inputWithLabel:true,
    className:"Label",
    id:"label",
    name:"first name",
    required: false,
    placeholder:"enter first name",
    labelText:"First Name:",
    inputType:"text"
}

export const WithoutLabel = Template.bind({});

WithoutLabel.args =  {
    inputWithLabel:false,
    className:"Label",
    id:"label",
    name:"last name",
    required:false,
    placeholder:"enter last name",
    labelText:"Email",
    inputType:"text"
}

export const WithLabelEmail = Template.bind({});

WithLabelEmail.args =  {
    inputWithLabel:true,
    className:"Label",
    id:"label",
    name:"Email",
    required:false,
    placeholder:"enter Email",
    labelText:"Email",
    inputType:"text"
}

export const WithLabelRadio = Template.bind({});

WithLabelRadio.args =  {
    inputWithLabel:true,
    className:"Label",
    id:"label",
    name:"select",
    required:false,
    labelText:"select",
    inputType:"radio"
}

export const WithLabelMultiSelect = Template.bind({});

WithLabelMultiSelect.args =  {
    inputWithLabel:true,
    className:"Label",
    id:" ",
    name:"select",
    required:false,
    labelText:"check box",
    inputType:"checkbox"
}