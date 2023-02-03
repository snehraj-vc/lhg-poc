import React from 'react';
import RegisterForm from './RegisterForm';

export default {
    title: 'organism/RegisterForm',
    component: RegisterForm,
    argsTypes: {}
}

const Template = (args) => <RegisterForm {...args}/>

export const InputContent = Template.bind({});

InputContent.args = {
    id:"main-form-container",
    className:"form-container",
    select:[{
        text:"Select the country",
        value:[{value:"India"},
        {value:"china"}],

        
    }],
    buttons: [{
        text: 'Register',
        className: 'btn-primary',
        type: 'submit',
        onClick: () => { console.log('I am clicked on submit button')}
    },
 
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
        id:"city",
        labelText:"City",
        placeholder: 'Enter City',
        inputType:'text',
        className: 'input-city'
      
    },   
    {
        id:"countryCode",
        labelText:"countryCode",
        placeholder: 'Enter countryCode',
        inputType:'text',
        className: 'input-countryCode'
    }, 
    {
        id:"state",
        labelText:"State",
        placeholder: 'Enter State',
        inputType:'text',
        className: 'input-State'
    },
    {
        id:"postalCode",
        labelText:"postalCode",
        placeholder: 'Enter postalCode',
        inputType:'text',
        className: 'input-postalCode'
    },
    {
        id:"phoneNumber",
        labelText:"phoneNumber",
        placeholder: 'Enter phoneNumber',
        inputType:'text',
        className: 'input-phoneNumber'
    }
  
]
}

