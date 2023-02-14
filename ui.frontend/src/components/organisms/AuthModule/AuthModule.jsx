import React, { useState } from 'react';
import { RegisterForm, SignIn, ChoosePassword } from '../../molecules';

const AuthModule = (props) => {
    const [authState, setAuthState] = useState('register');

    const {
        formId = "",
        className = "",
        formTitle = "",
        xApiKey = "",
        registerButtonLabel = "",
        firstNameInputLabel = "",
        firstNameInputPlaceholder = "",
        middleNameInputLabel = "",
        middleNameInputPlaceholder = "",
        lastNameInputLabel = "",
        lastNameInputPlaceholder = "",
        emailInputLabel = "",
        emailInputPlaceholder = "",
        phoneNumberInputLabel = "",
        phoneNumberInputPlaceholder = "",
        dobInputLabel = "",
        dobLocale = "",
        cityInputLabel = "",
        cityInputPlaceholder = "",
        countryInputLabel = "",
        countryInputPlaceholder = "",
        salutations = [],
        signInFormTitle = "",
        choosePasswordFormTitle = "",
        memberLoginApiEndpoint = "",
        choosePasswordWithJWTTokenApiEndPoint = "",
        createMemberApiEndpoint = "",
        passwordInputPlaceholder = "",
        passwordInputLabel = "",
        signInButtonLabel = "",
        passwordButtonLabel = "",
        userIdLabel = "",
        userIdPlaceholder = "",
    } = props;



    const stepSuccessCallback = (lastStep) => {
        if (lastStep === 'register') {
            setAuthState('choosePassword');
            return;
        }
        if (lastStep === 'choosePassword') {
            setAuthState('signIn');
        }
    }

    const registerStepArgs = {
        formTitle,
        xApiKey,
        registerButtonLabel,
        firstNameInputLabel,
        firstNameInputPlaceholder,
        middleNameInputLabel,
        middleNameInputPlaceholder,
        lastNameInputLabel,
        lastNameInputPlaceholder,
        emailInputLabel,
        emailInputPlaceholder,
        phoneNumberInputLabel,
        phoneNumberInputPlaceholder,
        dobInputLabel,
        dobLocale,
        cityInputLabel,
        cityInputPlaceholder,
        countryInputLabel,
        countryInputPlaceholder,
        salutations,
        createMemberApiEndpoint,
        onSuccessCallback: () => stepSuccessCallback('register')
    };

    const choosePasswordStepArgs = {
        choosePasswordFormTitle,
        passwordInputLabel,
        passwordInputPlaceholder,
        onSuccessCallback: () => stepSuccessCallback('choosePassword'),
        choosePasswordWithJWTTokenApiEndPoint,
        passwordButtonLabel,
        userIdLabel,
        xApiKey
    };

    const signInStepArgs = {
        signInFormTitle,
        memberLoginApiEndpoint,
        signInButtonLabel,
        passwordInputLabel,
        passwordInputPlaceholder,
        userIdLabel,
        userIdPlaceholder,
        xApiKey
    };

    return (<>
        <div id={formId} className={className}>
            {authState === 'register' && (<RegisterForm {...registerStepArgs} />)}
            {authState === 'choosePassword' && <ChoosePassword {...choosePasswordStepArgs}/>}
            {authState === 'signIn' && <SignIn {...signInStepArgs} />}
        </div>
    </>);
}

export default AuthModule;