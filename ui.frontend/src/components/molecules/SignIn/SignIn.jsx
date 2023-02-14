import React, { useState, useEffect } from 'react';
import { postData } from '../../../utils/server';
import { InputSegment } from '../';
import { Button } from '../../atoms';

const SignIn = (props) => {
    const {
        signInFormTitle,
        memberLoginApiEndpoint,
        signInButtonLabel,
        passwordInputLabel,
        passwordInputPlaceholder,
        userIdLabel,
        userIdPlaceholder,
        xApiKey
    } = props;
    const [inputVals, setInputVals] = useState({});

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
    }, []);

    const onInputChange = (val, name) => {
        setInputVals({
            ...inputVals,
            [name]: val
        });
    };
    const LS_USER_DATA_TOKEN_KEY = 'userDataToken';

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
                    memberId: resp.data.member_id
                };
                localStorage.setItem(LS_USER_DATA_TOKEN_KEY, JSON.stringify(currentUserTokenLS));
            })
            .catch(err => {
                console.log('err on sign in', err)
            });
    };

    return (<>
        <h3>{signInFormTitle}</h3>
        {userIdLabel && <InputSegment
            id={`memberId_${Math.floor(Math.random() * 100)}`}
            name={'memberId'}
            inputType="text"
            placeholder={userIdPlaceholder}
            labelText={userIdLabel}
            value={inputVals['memberId'] || ""}
        />}
        {passwordInputLabel && <InputSegment
            id={`password_${Math.floor(Math.random() * 100)}`}
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
    </>);
}

export default SignIn;