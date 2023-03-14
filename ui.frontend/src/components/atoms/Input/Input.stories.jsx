import React from 'react';
import Input from './Input';

export default {
    title: 'Atoms/Input',
    component: Input,
    argsTypes: {}
}

const Template = (args) => <Input {...args} />;

export const InputCustom = Template.bind({});

 InputCustom.args = {
    id:"MainInputCustom",
    className:"InputCustom",
    placeholder:"Common",
    type:"text",
    required:false,
    name:"MainInputCustom",
    label: "Enter text",
    helperText: "This is helper text",
    error: false,
    value: '',
    disabled: false,
}