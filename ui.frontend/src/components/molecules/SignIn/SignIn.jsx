import React, { useState, useEffect } from 'react';
import { postData } from '../../../utils/server';
import { InputSegment } from '../';
import { Button } from '../../atoms';

const SignIn = (props) => {
    const {
        signInFormTitle = "",
        memberLoginApiEndpoint = "",
        signInButtonLabel = "",
        passwordInputLabel = "",
        passwordInputPlaceholder = "",
        userIdLabel = "",
        userIdPlaceholder = "",
        xApiKey = "",
    } = props;
    const [inputVals, setInputVals] = useState({});
    const [logInInfo, setLoginInfo] = useState({
        loggedIn: false
    });

    const LS_USER_DATA_TOKEN_KEY = 'userDataToken';
    useEffect(() => {
        let currentLS = localStorage.getItem(LS_USER_DATA_TOKEN_KEY);
        if (!currentLS) {
            return;
        }
        currentLS = JSON.parse(currentLS);
        if (currentLS.memberId) {
            setInputVals({
                ...inputVals,
                memberId: currentLS.memberId
            });
        }
        if(currentLS.step === 'loggedIn') {
            setLoginInfo({
                ...logInInfo,
                userData: currentLS.userData,
                loggedIn: true
            });
        }
    }, []);

    const onInputChange = (val, name) => {
        setInputVals({
            ...inputVals,
            [name]: val
        });
    };

    const signInButtonClick = (e) => {
        e.preventDefault();
        const payload = {
            password: inputVals.password,
            username: inputVals.memberId
        };
        const headers = {
            ['x-api-key']: xApiKey
        };
        postData(memberLoginApiEndpoint, payload, headers)
            .then(resp => {
                let currentUserTokenLS = localStorage.getItem(LS_USER_DATA_TOKEN_KEY);
                currentUserTokenLS = JSON.parse(currentUserTokenLS);
                currentUserTokenLS = {
                    ...currentUserTokenLS,
                    token: resp.data.token,
                    memberId: resp.data.member_id,
                    step: 'loggedIn',
                    userData: {
                        firstName: resp.data.member_data.user.first_name,
                        lastName: resp.data.member_data.user.last_name
                    }
                };
                localStorage.setItem(LS_USER_DATA_TOKEN_KEY, JSON.stringify(currentUserTokenLS));
                setLoginInfo({
                    loggedIn: true,
                    userData: {
                        firstName: resp.data.member_data.user.first_name,
                        lastName: resp.data.member_data.user.last_name
                    }
                });
                window.dispatchEvent(new Event("loggedIn"));
            })
            .catch(err => {
                console.log('err on sign in', err)
            });
    };

    return (<>
        <div className={'cp-sign-in'}>
            {!logInInfo.loggedIn && (
                <>
                    <h3>{signInFormTitle}</h3>
                    {userIdLabel && <InputSegment
                        id={`memberId_label`}
                        name={'memberId'}
                        inputType="text"
                        placeholder={userIdPlaceholder}
                        labelText={userIdLabel}
                        value={inputVals['memberId'] || ""}
                    />}
                    {passwordInputLabel && <InputSegment
                        id={`password_label`}
                        name={'password'}
                        inputType="password"
                        placeholder={passwordInputPlaceholder}
                        labelText={passwordInputLabel}
                        onInputChange={onInputChange}
                        value={inputVals['password'] || ""}
                    />}
                    {signInButtonLabel && <Button
                        onClick={signInButtonClick}
                        type={'submit'}
                        text={signInButtonLabel}
                    />}
                </>
            )}
            {logInInfo.loggedIn && logInInfo.userData && (
                <>
                    {`Welcome ${logInInfo.userData.firstName} ${logInInfo.userData.lastName}`}
                </>
            )}
        </div>
    </>);
}

export default SignIn;