import React from 'react';
import { Button } from '../../atoms';
import Button_submit from './buttonSegment';

export default {
    title: 'Molecule/ButtonSegment',
    component: Button_submit,
    argsTypes: {}
}

const Template = (args) => <Button {...args} />;

export const ButtonWithvalue = Template.bind({});

ButtonWithvalue.args = {
    id:"",
        className:"sumit_button",
        text:"submit",
        type:"submit",
}