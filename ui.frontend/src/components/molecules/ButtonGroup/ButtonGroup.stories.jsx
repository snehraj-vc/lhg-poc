import React from 'react';
import ButtonGroup from './ButtonGroup';

export default {
    title: 'Molecule/ButtongGroup',
    component: ButtonGroup,
    argsTypes: {}
}

const Template = (args) => <ButtonGroup {...args} />;

export const ButtonWithvalues = Template.bind({});

ButtonWithvalues.args = {
    id:"main-button-group",
    className:"sumit_button",
    buttons: [{
        text: 'Non Submit button',
        className: 'btn-primary'
    }, {
        text: 'Submit Button',
        className: 'btn-secondary',
        type: 'submit',
        onClick: () => { console.log('I am clicked on submit button')}
    },
    {
        text: 'Submit Button',
        className: 'btn-secondary',
        type: 'submit',
        onClick: () => { console.log('I am clicked on submit button')}
    }]
}