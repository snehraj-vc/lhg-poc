import React from 'react';
import AuthModule from './AuthModule';

export default {
    title: 'organism/AuthModule',
    component: AuthModule,
    argsTypes: {}
}

const Template = (args) => <AuthModule {...args} />

export const AuthModuleValues = Template.bind({});

AuthModuleValues.args = {
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