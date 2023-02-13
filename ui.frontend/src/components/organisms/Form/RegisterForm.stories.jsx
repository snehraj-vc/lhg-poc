import React from 'react';
import RegisterForm from './RegisterForm';

export default {
    title: 'organism/RegisterForm',
    component: RegisterForm,
    argsTypes: {}
}

const Template = (args) => <RegisterForm {...args} />

export const RegisterFormInput = Template.bind({});

RegisterFormInput.args = {
    props: {
        id: "register-form",
        className: "register-form",
        title: "Registration form",
        apiData: {
            xApiKey: "rFGDxqrSaC4KxzuZJI5KQ12BL6nVcaRY7ybG12Ej"
        },
        buttons: [{
            text: 'Register',
            className: 'btn-primary',
            type: 'submit'
        }],
        inputs: [{
            withLabel: false,
            type: "select",
            options: [{
                value: "MR",
                text: "Mr."
            }, {
                value: "MRS",
                text: "Mrs."
            }, {
                value: "MS",
                text: "Ms."
            }],
            name: "salutation",
            order: 1,
        }, {
            id: "firstName",
            type: 'text',
            labelText: "First name",
            placeholder: 'Enter First Name',
            className: 'input-firstName',
            name: "firstName",
            order: 2
        }, {
            id: "middleName",
            type: 'text',
            labelText: "Middle name",
            placeholder: 'Enter Middle Name',
            className: 'input-middleName',
            name: "middleName",
            order: 3
        }, {
            id: "lastName",
            type: 'text',
            labelText: "Last Name",
            placeholder: 'Enter Last Name',
            className: 'input-LastName',
            name: 'lastName',
            order: 4
        }, {
            id: "email",
            type: 'text',
            labelText: "Email",
            placeholder: 'Enter Email',
            className: 'input-email',
            name: 'email',
            order: 5,
        }, {
            id: "dob",
            type: 'date',
            labelText: "Date of birth",
            className: 'input-date',
            name: 'dob',
            order: 5,
        }, {
            id: "mobile",
            type: 'text',
            labelText: "Mobile",
            placeholder: 'Enter Mobile Number',
            className: 'input-mobile',
            name: 'mobile',
            order: 6,
        }, {
            withLabel: true,
            type: "select",
            options: [{
                value: "male",
                text: "Male"
            }, {
                value: "female",
                text: "Female"
            }],
            name: "gender",
            order: 7,
            text: "Gender"
        }, {
            id: "city",
            type: 'text',
            labelText: "City",
            placeholder: 'Enter City',
            className: 'input-city',
            name: 'city',
            order: 8
        }]
    }
}