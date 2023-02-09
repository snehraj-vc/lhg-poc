import React, { useEffect, useState } from 'react';
import {getData, postData} from '../../../utils/server'
import { InputSegment, DatepickerSegment } from '../../molecules';
import { Button, Label } from '../../atoms';
import { LJI_URLS } from '../../../utils/constants';
import crypto from '../../../utils/crypto';

const RegisterForm = (props) => {
  const [inputVals, setInputVals] = useState({});
  
  const {
    formId,
    className, 
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
    passwordInputLabel,
    passwordInputPlaceholder,
    dobInputLabel,
    dobLocale,
    cityInputLabel,
    cityInputPlaceholder,
    countryInputLabel,
    countryInputPlaceholder,
  } = props;

  const cryptoInstance = crypto();

  const getLocation = async () => {
    let timeStamp = new Date()
    timeStamp = timeStamp.getTime();
    let geoLocationTimeStamp = localStorage.getItem('geolocationTimeStamp');
    if(geoLocationTimeStamp) {
      geoLocationTimeStamp = JSON.parse(geoLocationTimeStamp);
    }

    if(geoLocationTimeStamp && (timeStamp - geoLocationTimeStamp.ts) < 300000) {
      setInputVals({
        ...inputVals,
        city: geoLocationTimeStamp.data.city,
        country: geoLocationTimeStamp.data.country_name
      });
      return;
    }

    getData("https://ipapi.co/json")
      .then(res => {
        localStorage.setItem('geolocationTimeStamp',JSON.stringify({
          ts: timeStamp,
          data: res.data
        }));
        setInputVals({
          ...inputVals,
          city: res.data.city,
          country: res.data.country_name
        });
      })
      .catch(err => {
        console.error("There is some problem", err)
      });
  };


  const onRegisteration = (e) => {
    e.preventDefault();

    const payload = {
      "user": {
        "email": inputVals.email,
        "first_name": inputVals.firstName,
        "last_name": inputVals.lastName
      },
      "salutation": inputVals.salutation,
      "member_name": inputVals.lastName,
      "middle_name": inputVals.middleName,
      "password": cryptoInstance.encrpt(inputVals.password),
      "date_of_birth": inputVals.dob,
      "gender": inputVals.gender,
      "mobile": inputVals.mobile,
      "address_line1": null,
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

    postData(LJI_URLS.CREATE_MEMBER, payload, headers)
      .then(resp => {
        console.log('resp::', resp);
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  const onInputChange = (val, name) => {
    setInputVals({
      ...inputVals,
      [name]: val
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (<>
    <div id={formId} className={className}>
      <h3>{formTitle}</h3>
      <InputSegment
        id=""
        name={'firstName'}
        inputType="text"
        placeholder={firstNameInputPlaceholder}
        labelText={firstNameInputLabel}
        onInputChange={onInputChange}
        value={inputVals['firstName'] || ""}
      />
      <InputSegment
        id=""
        name={'middleName'}
        inputType="text"
        placeholder={middleNameInputPlaceholder}
        labelText={middleNameInputLabel}
        onInputChange={onInputChange}
        value={inputVals['middleName'] || ""}
      />
      <InputSegment
        id=""
        name={'lastName'}
        inputType="text"
        placeholder={lastNameInputPlaceholder}
        labelText={lastNameInputLabel}
        onInputChange={onInputChange}
        value={inputVals['lastName'] || ""}
      />
      <InputSegment
        id=""
        name={'email'}
        inputType="text"
        placeholder={emailInputPlaceholder}
        labelText={emailInputLabel}
        onInputChange={onInputChange}
        value={inputVals['email'] || ""}
      />
      <InputSegment
        id=""
        name={'password'}
        inputType="password"
        placeholder={passwordInputPlaceholder}
        labelText={passwordInputLabel}
        onInputChange={onInputChange}
        value={inputVals['password'] || ""}
      />
      <Label text={dobInputLabel} />
      <DatepickerSegment
        onDateChange={onInputChange}
        name={'dob'}
        locale={dobLocale}
        maxDate={new Date()}
      />
      <InputSegment
        id=""
        name={'city'}
        inputType="text"
        placeholder={cityInputPlaceholder}
        labelText={cityInputLabel}
        onInputChange={onInputChange}
        value={inputVals['city'] || ""}
      />
      <InputSegment
        id=""
        name={'country'}
        inputType="text"
        placeholder={countryInputPlaceholder}
        labelText={countryInputLabel}
        onInputChange={onInputChange}
        value={inputVals['country'] || ""}
      />
      <Button
        onClick={onRegisteration}
        type={'submit'}
        text={registerButtonLabel}
      />
    </div>
  </>);
}

export default RegisterForm;