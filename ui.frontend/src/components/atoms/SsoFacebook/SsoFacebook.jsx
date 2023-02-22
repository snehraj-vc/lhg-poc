import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { postData } from '../../../utils/server';
import { LJI_URLS } from '../../../utils/constants';

const SsoFacebook = (props) => {
  const [user, setUser] = useState(null);
  const {
    fbAppId = "",
    fbFields = "name,email,id",

  } = props;

  const responseFacebook = (response) => {

    // setUser(response);
    // console.log(user);  

    const payload = {
      facebook_id: response.id,
      access_token: response.accessToken,
      enrolling_sponsor: 4
    };


    postData(LJI_URLS.SSO_FB_SIGN_UP, payload)
      //success 
      .then(resp => {
        console.log(resp)
        localStorage.setItem(LS_USER_DATA_TOKEN_KEY, JSON.stringify(currentUserTokenLS));
      })
      //error handling
      .catch(err => {
        console.log('err on sign in', err)
      });

      
  }
  console.log(fbAppId);
  return (
    <div>

      {
        user ?
          <div>
            {console.log(user)}
            {console.log(user.accessToken)}
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
          </div>
          :
          <FacebookLogin
            // appId="878025543243819"
            appId={fbAppId}

            autoLoad={false}
            fields={fbFields}
            onClick={responseFacebook}
            callback={responseFacebook}
          />
      }
    </div>
  );
}

export default SsoFacebook;
