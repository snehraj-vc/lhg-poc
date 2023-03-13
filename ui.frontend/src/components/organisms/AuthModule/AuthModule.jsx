import React, { useState, useEffect } from 'react';
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
        // choosePasswordFormTitle = "",
        memberLoginApiEndpoint = "",
        choosePasswordWithJWTTokenApiEndPoint = "",
        createMemberApiEndpoint = "",
        passwordInputPlaceholder = "",
        passwordInputLabel = "",
        signInButtonLabel = "",
        // passwordButtonLabel = "",
        userIdLabel = "",
        userIdPlaceholder = "",
        passwordValidAtLeast8Chars = "",
        passwordValidAlphaNumeric = "",
        passwordValidSpecialChar = ""
    } = props;



    const stepSuccessCallback = (lastStep) => {
        if (lastStep === 'register') {
            setAuthState('signIn');
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
        passwordInputLabel,
        passwordInputPlaceholder,
        choosePasswordWithJWTTokenApiEndPoint,
        onSuccessCallback: () => stepSuccessCallback('register'),
        passwordValidAtLeast8Chars,
        passwordValidAlphaNumeric,
        passwordValidSpecialChar
    };

    // const choosePasswordStepArgs = {
    //     choosePasswordFormTitle,
    //     passwordInputLabel,
    //     passwordInputPlaceholder,
    //     onSuccessCallback: () => stepSuccessCallback('choosePassword'),
    //     choosePasswordWithJWTTokenApiEndPoint,
    //     passwordButtonLabel,
    //     userIdLabel,
    //     xApiKey
    // };

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

    useEffect(() => {
        let userDataTokenLS = localStorage.getItem('userDataToken');
        if(userDataTokenLS) {
            userDataTokenLS = JSON.parse(userDataTokenLS);
            if(userDataTokenLS.step === 'choosePassword') {
                setAuthState('choosePassword');
            } else if(userDataTokenLS.step === 'signIn' || userDataTokenLS.step === 'loggedIn') {
                setAuthState('signIn');
            }
        }
    }, [setAuthState]);

    return (<>
        <div id={formId} className={`cp-auth-module ${className}`}>
            {authState === 'register' && (<RegisterForm {...registerStepArgs} />)}
            {/* {authState === 'choosePassword' && <ChoosePassword {...choosePasswordStepArgs}/>} */}
            {authState === 'signIn' && <SignIn {...signInStepArgs} />}
        </div>
    </>);
}

export default AuthModule;