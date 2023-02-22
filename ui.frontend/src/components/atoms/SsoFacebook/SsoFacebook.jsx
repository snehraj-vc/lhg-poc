import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { postData } from '../../../utils/server';

const SsoFacebook = (props) => {
  const [user, setUser] = useState("");
  const {
    fbAppId = "",
    fbFields = "name,email,id",
    xApiKey = "",
  } = props;

  const responseFacebook = (response) => {
    
    setUser(response);
    console.log(`hi${response}`);
    console.log(user.id)

    const payload = {
      id: user.id,
      access_token: user.accessToken 
  };

    const headers = {
      ['x-api-key']: xApiKey
  };

    postData(payload, headers)
    .then(resp => {
    })
}

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
