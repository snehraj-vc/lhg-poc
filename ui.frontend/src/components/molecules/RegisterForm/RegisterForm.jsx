import React, { useState, useEffect, useRef } from 'react';
import { getData, postData } from '../../../utils/server';
import { InputSegment, DatepickerSegment, SelectOption } from '../../molecules';
import { Button } from '../../atoms';
import { LJI_URLS, REGEX } from '../../../utils/constants';
import './style.scss';


const RegisterForm = (props) => {
    const {
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
        createMemberApiEndpoint = "",
        onSuccessCallback = () => null,
        passwordInputLabel = "",
        passwordInputPlaceholder = "",
        choosePasswordWithJWTTokenApiEndPoint = "",
        passwordValidAtLeast8Chars = "",
        passwordValidAlphaNumeric = "",
        passwordValidSpecialChar = "",
    } = props;

    const [inputVals, setInputVals] = useState({});
    const [validPass, setValidPass] = useState({
        charNum: false,
        alphaNumeric: false,
        splChar: false
    });
    const [invalidForm, setInvalidForm] = useState(true);
    const passValidEl = useRef(null);

    const onRegisteration = (e) => {
        e.preventDefault();

        const payload = {
            "user": {
                "email": inputVals.email,
                "first_name": inputVals.firstName,
                "last_name": inputVals.lastName
            },
            "salutation": inputVals.salutation,
            "member_name": inputVals.firstName,
            "country": inputVals.country,
            "middle_name": inputVals.middleName,
            "gender": inputVals.gender || 'male',
            "mobile": inputVals.phoneNumber || '919999900000',
            "address_line1": null,
            "date_of_birth": inputVals.dob || null,
            "address_line2": null,
            "enrollment_touchpoint": 1,
            "enrolling_sponsor": 4,
            "enrolling_location": null,
            "preferred_location": null,
            "receive_offers": true,
            "membership_tenure": 0,
            "extra_data": {}
        };

        const headers = {
            ['x-api-key']: xApiKey
        };

        postData(createMemberApiEndpoint ? createMemberApiEndpoint : LJI_URLS.CREATE_MEMBER, payload, headers)
            .then(resp => {
                if (resp.data && [200, 201, 302].indexOf(resp.status) > -1) {
                    const memberId = resp.data.member_id;
                    postData(choosePasswordWithJWTTokenApiEndPoint, {
                        password: inputVals.password
                    },
                    {
                        ...headers,
                        Authorization: `JWT ${resp.data.token}`
                    }).then(resp => {
                        localStorage.setItem('userDataToken', JSON.stringify({
                            token: resp.data.token,
                            step: 'signIn',
                            memberId: memberId
                        }));
                        onSuccessCallback();
                    })
                }
            })
            .catch(err => {
                console.log('err', err);
            })
    }

    const passwordValidation = (val) => {
        let validState = {
            charNum: false,
            alphaNumeric: false,
            splChar: false
        };
        const trimmedVal = val.trim();
        if(trimmedVal.match(REGEX.SPL_CHAR)) {
            validState.splChar = true;
        }
        if(trimmedVal.match(REGEX.CHAR_MIN_8)) {
            validState.charNum = true;
        }
        if(trimmedVal.match(REGEX.ALPHA_NUMERIC)) {
            validState.alphaNumeric = true;
        }
        setValidPass({
            splChar: validState.splChar,
            alphaNumeric: validState.alphaNumeric,
            charNum: validState.charNum
        });

        if(validState.charNum && validState.alphaNumeric && validState.splChar) {
            setInvalidForm(false);
            return true;
        } else {
            setInvalidForm(true);
            return false;
        }
    }

    const onInputChange = (val, name) => {
        if (name === 'dob') {
            const formattedDate = new Date(val);
            let fullDate = {
                year: formattedDate.getFullYear()
            };
            const month = formattedDate.getMonth();
            fullDate.month = month < 9 ? '0' + (month + 1) : (month + 1);
            const date = formattedDate.getDate();
            fullDate.date = date < 10 ? '0' + date : date;
            setInputVals({
                ...inputVals,
                [name]: '' + fullDate.year + '-' + fullDate.month + '-' + fullDate.date
            });
            return;
        }
        if(name === 'password') {
            passwordValidation(val);
        }
        setInputVals({
            ...inputVals,
            [name]: val
        });
    };

    const onPasswordFocus = () => {
        passValidEl.current.style.display = 'block';
    }
    const onPasswordBlur = () => {
        passValidEl.current.style.display = 'none';
    }

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        let timeStamp = new Date()
        timeStamp = timeStamp.getTime();
        let geoLocationTimeStamp = localStorage.getItem('geolocationTimeStamp');
        if (geoLocationTimeStamp) {
            geoLocationTimeStamp = JSON.parse(geoLocationTimeStamp);
        }

        if (geoLocationTimeStamp && (timeStamp - geoLocationTimeStamp.ts) < 300000) {
            setInputVals({
                ...inputVals,
                city: geoLocationTimeStamp.data.city,
                country: geoLocationTimeStamp.data.country
            });
            return;
        }

        getData("https://ipapi.co/json")
            .then(res => {
                localStorage.setItem('geolocationTimeStamp', JSON.stringify({
                    ts: timeStamp,
                    data: res.data
                }));
                setInputVals({
                    ...inputVals,
                    city: res.data.city,
                    country: res.data.country
                });
            })
            .catch(err => {
                console.error("There is some problem", err)
            });
    };

    const renderRuntimePassCheck = () => {
        if(passwordValidAtLeast8Chars || passwordValidAlphaNumeric || passwordValidSpecialChar) {
            return (<>
                <div className={'password-valid-check'} ref={passValidEl}>
                    {passwordValidAtLeast8Chars && <p className={`${validPass.charNum ? 'valid': ''}`}>{passwordValidAtLeast8Chars}</p>}
                    {passwordValidAlphaNumeric && <p className={`${validPass.alphaNumeric ? 'valid': ''}`}>{passwordValidAlphaNumeric}</p>}
                    {passwordValidSpecialChar && <p className={`${validPass.splChar ? 'valid': ''}`}>{passwordValidSpecialChar}</p>}
                </div>
            </>)
        }
    }

    return (<>
        <div className="cp-register-form">
            <h3>{formTitle}</h3>
            {salutations.length > 0 && <SelectOption
                Withlabel={false}
                options={salutations}
                fieldName={"salutation"}
                value={inputVals['salutation'] || ""}
                onChange={onInputChange}
            />
            }
            {firstNameInputLabel && <InputSegment
                id={`firstName_${Math.floor(Math.random() * 100)}`}
                name={'firstName'}
                inputType="text"
                placeholder={firstNameInputPlaceholder}
                labelText={firstNameInputLabel}
                onInputChange={onInputChange}
                value={inputVals['firstName'] || ""}
            />}
            {middleNameInputLabel && <InputSegment
                id={`middleName_${Math.floor(Math.random() * 100)}`}
                name={'middleName'}
                inputType="text"
                placeholder={middleNameInputPlaceholder}
                labelText={middleNameInputLabel}
                onInputChange={onInputChange}
                value={inputVals['middleName'] || ""}
            />}
            {lastNameInputLabel && <InputSegment
                id={`lastName_${Math.floor(Math.random() * 100)}`}
                name={'lastName'}
                inputType="text"
                placeholder={lastNameInputPlaceholder}
                labelText={lastNameInputLabel}
                onInputChange={onInputChange}
                value={inputVals['lastName'] || ""}
            />}
            {emailInputLabel && <InputSegment
                id={`email_${Math.floor(Math.random() * 100)}`}
                name={'email'}
                inputType="text"
                placeholder={emailInputPlaceholder}
                labelText={emailInputLabel}
                onInputChange={onInputChange}
                value={inputVals['email'] || ""}
            />}
            {passwordInputLabel && <InputSegment
                id={`password_${Math.floor(Math.random() * 100)}`}
                name={'password'}
                inputType="password"
                placeholder={passwordInputPlaceholder}
                labelText={passwordInputLabel}
                onInputChange={onInputChange}
                value={inputVals['password'] || ""}
                onInputFocus={onPasswordFocus}
                onInputBlur={onPasswordBlur}
            />}
            {renderRuntimePassCheck()}
            {phoneNumberInputLabel && <InputSegment
                id={`phoneNumber_${Math.floor(Math.random() * 100)}`}
                name={'phoneNumber'}
                inputType="text"
                placeholder={phoneNumberInputPlaceholder}
                labelText={phoneNumberInputLabel}
                onInputChange={onInputChange}
                value={inputVals['phoneNumber'] || ""}
            />}
            {dobInputLabel && (
                <DatepickerSegment
                    onDateChange={onInputChange}
                    name={'dob'}
                    id={`dob_${Math.floor(Math.random() * 100)}`}
                    locale={dobLocale}
                    maxDate={new Date()}
                    labelText={dobInputLabel}
                />)
            }
            {cityInputLabel && <InputSegment
                id={`coty_${Math.floor(Math.random() * 100)}`}
                name={'city'}
                inputType="text"
                placeholder={cityInputPlaceholder}
                labelText={cityInputLabel}
                onInputChange={onInputChange}
                value={inputVals['city'] || ""}
            />}
            {countryInputLabel && <InputSegment
                id={`country_${Math.floor(Math.random() * 100)}`}
                name={'country'}
                inputType="text"
                placeholder={countryInputPlaceholder}
                labelText={countryInputLabel}
                onInputChange={onInputChange}
                value={inputVals['country'] || ""}
            />}
            {registerButtonLabel && <Button
                onClick={onRegisteration}
                type={'submit'}
                text={registerButtonLabel}
                disabled={invalidForm}
            />}
        </div>
    </>);
}

export default RegisterForm;