import React, { useEffect, useState } from 'react';
import { getData, postData } from '../../../utils/server'
import { InputSegment, DatepickerSegment, SelectOption } from '../../molecules';
import { Button } from '../../atoms';
import { LJI_URLS } from '../../../utils/constants';

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
    phoneNumberInputLabel,
    phoneNumberInputPlaceholder,
    dobInputLabel,
    dobLocale,
    cityInputLabel,
    cityInputPlaceholder,
    countryInputLabel,
    countryInputPlaceholder,
    salutations = [],
  } = props;

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

    postData(LJI_URLS.CREATE_MEMBER, payload, headers)
      .then(resp => {
        if(resp.data && [200,201, 302].indexOf(resp.status) > -1) {
          localStorage.setItem('userDataToken', resp.data.token);
        }
      })
      .catch(err => {
        console.log('err', err);
      })
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
      />}
    </div>
  </>);
}

export default RegisterForm;