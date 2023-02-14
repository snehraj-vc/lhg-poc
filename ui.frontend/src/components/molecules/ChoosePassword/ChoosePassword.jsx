import React, { useState, useEffect } from 'react';
import { InputSegment } from '../';
import { Button } from '../../atoms';
import { postData } from '../../../utils/server';


const ChoosePassword = (props) => {
    const [inputVals, setInputVals] = useState({});
    const [jwt, setJwt] = useState('');

    const {
        choosePasswordFormTitle,
        passwordInputLabel,
        passwordInputPlaceholder,
        onSuccessCallback,
        choosePasswordWithJWTTokenApiEndPoint,
        passwordButtonLabel,
        userIdLabel,
        xApiKey
    } = props;

    const LS_USER_DATA_TOKEN_KEY = 'userDataToken';

    const setPasswordButtonClick = (e) => {
        e.preventDefault();
        const payload = {
            password: inputVals.password
        };
        const headers = {
            ['x-api-key']: xApiKey,
            Authorization: `JWT ${jwt}`
        };
        postData(choosePasswordWithJWTTokenApiEndPoint, payload, headers)
            .then(resp => {
                let currentUserTokenLS = localStorage.getItem(LS_USER_DATA_TOKEN_KEY);
                currentUserTokenLS = JSON.parse(currentUserTokenLS);
                currentUserTokenLS = {
                    ...currentUserTokenLS,
                    token: resp.data.token
                }
                localStorage.setItem(LS_USER_DATA_TOKEN_KEY, JSON.stringify(currentUserTokenLS));
                onSuccessCallback();
            })
            .catch(err => {
                console.log('err on password set', err)
            });
    }

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
        if (currentLS.token) {
            setJwt(currentLS.token);
        }
    }, []);

    const onInputChange = (val, name) => {
        setInputVals({
            ...inputVals,
            [name]: val
        });
    };

    return (<>
        <h3>{choosePasswordFormTitle}</h3>
        {userIdLabel && <InputSegment
            id={`memberId_${Math.floor(Math.random() * 100)}`}
            name={'memberId'}
            inputType="text"
            placeholder={""}
            labelText={userIdLabel}
            disabled={true}
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
        {passwordButtonLabel && <Button
            onClick={setPasswordButtonClick}
            type={'submit'}
            text={passwordButtonLabel}
        />}
    </>);
}

export default ChoosePassword;