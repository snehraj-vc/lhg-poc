import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const SsoFacebook = (props) => {
  const [user, setUser] = useState(null);
  const {
    fbappid = "",
    fbFields = "name,email,id"
  } = props;

  const responseFacebook = (response) => {
    console.log(response);
    setUser(response);
  }

  return (
    <div>
      {
        user ?
          <div>
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
          </div>
          :
          <FacebookLogin
            // appId="878025543243819"
            appId={fbappid}
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