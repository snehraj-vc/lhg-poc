import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookSSO = () => {
  const [user, setUser] = useState(null);

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
            appId="878025543243819"
            autoLoad={false}
            fields="name,email,id"
            onClick={responseFacebook}
            callback={responseFacebook}
          />
      }
    </div>
  );
}

export default FacebookSSO;
