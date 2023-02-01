import React from 'react';
import LocationForm from './LocationForm';

export default {
    title: 'organism/LocationForm',
    component: LocationForm,
    argsTypes: {}
}

const Template = (args) => <LocationForm {...args}/>

export const InputContent = Template.bind({});

InputContent.args = {
    id:"main-form-container",
    className:"form-container",
    buttons: [{
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
    }
    ],
    input: [{
        id:"firstName",
        labelText:"First name",
        placeholder: 'Enter First Name',
        inputType:'text',
        className: 'input-firstName'
    }, 
    {
        id:"lastName",
        labelText:"Last Name",
        placeholder: 'Enter Last Name',
        inputType:'text',
        className: 'input-LastName'
    }, 
    {
        id:"gender",
        labelText:"male",
        inputType:"radio",
        className: 'input-gender'
    },
    {
        id:"language",
        labelText:"language",
        inputType:"checkbox",
        className: 'input-language'
    }

]
}

