import React from 'react';
import RegisterForm from './RegisterForm';

export default {
    title: 'organism/RegisterForm',
    component: RegisterForm,
    argsTypes: {}
}

const Template = (args) => <RegisterForm {...args} />

export const RegisterFormValues = Template.bind({});

RegisterFormValues.args = {
    formId: 'register-form',
    className: '',
    formTitle: 'Registration Form',
    xApiKey: 'rFGDxqrSaC4KxzuZJI5KQ12BL6nVcaRY7ybG12Ej',
    registerButtonLabel: 'Register',
    firstNameInputLabel: 'First Name',
    firstNameInputPlaceholder: 'Enter first name',
    middleNameInputLabel: 'Middle Name',
    middleNameInputPlaceholder: 'Enter middle name',
    lastNameInputLabel: 'Last Name',
    lastNameInputPlaceholder: 'Enter last name',
    emailInputLabel: 'Email',
    emailInputPlaceholder: 'Enter Email',
    passwordInputLabel: 'Password',
    passwordInputPlaceholder: 'Enter password',
    dobInputLabel: 'Date of birth',
    dobLocale: 'en',
    cityInputLabel: 'City',
    cityInputPlaceholder: 'Enter City',
    countryInputLabel: 'Country',
    countryInputPlaceholder: 'Enter Country',
}