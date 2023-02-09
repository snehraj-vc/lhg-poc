import React, { useEffect, useState } from 'react';
import {getData, postData} from '../../../utils/server'
import { InputSegment, SelectOption, DatepickerSegment } from '../../molecules';
import { Button } from '../../atoms';
import { LJI_URLS } from '../../../utils/constants';

const RegisterForm = (props) => {
  const [inputVals, setInputVals] = useState({});
  let modifiedProps = {};

  if(typeof props.props === 'string') {
    modifiedProps = {...JSON.parse(props.props)};
  } else {
    modifiedProps = {...props.props};
  }
  const {
    id = "",
    className = "",
    inputs = [],
    buttons = [],
    apiData = {}
  } = modifiedProps;

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
        city: geoLocationTimeStamp.data.city
      })
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
          city: res.data.city
        });
      })
      .catch(err => {
        console.error("There is some problem", err)
      });
  };

  const orderInputs = () => {
    inputs.sort((a,b) => {
      if(a.order === 'undefined' || b.order === 'undefined') {
        return -1;
      }
      return a.order - b.order;
    })
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
      ['x-api-key']: apiData.xApiKey
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
    orderInputs();
  }, []);

  const TEXT_TYPE_INPUTS = ['text', 'number', 'email', undefined];

  return (<>
    <div className={`register-form ${className}`} id={id}>
      {inputs && inputs.map((input, index) => {
        if (TEXT_TYPE_INPUTS.indexOf(input.type) > -1) {
          return (<InputSegment
            key={index}
            name={input.name}
            inputType={input.inputType}
            placeholder={input.placeholder}
            className={input.className}
            id={input.id}
            labelText={input.labelText}
            onInputChange={onInputChange}
            value={inputVals[input.name] || ""}
          />);
        } else if (input.type === 'select') {
          return (<SelectOption
            labelText={input.text || ""}
            fieldName={input.name}
            options={input.options}
            key={index}
            value={inputVals[input.name] || ""}
            onChange={onInputChange}
          />)
        } else if (input.type === 'date') {
          return (<DatepickerSegment
            onDateChange={onInputChange}
            name={input.name}
            locale={input.locale}
            maxDate={new Date()}
            key={index}
          />)
        }
      })}
      {buttons && buttons.map((btn, idx) => {
        return (<Button
          id={btn.id}
          onClick={onRegisteration}
          className={btn.className}
          type={btn.type}
          text={btn.text}
          key={idx}
        />);
      })}
    </div>
  </>);
}

export default RegisterForm;