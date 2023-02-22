import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { postData } from '../../../utils/server';
import { LJI_URLS } from '../../../utils/constants';
import { getLocal, setLocal } from '../../../utils';

const SsoFacebook = (props) => {
  const [user, setUser] = useState(null);
  const {
    fbAppId = "",
    fbFields = "name,email,id",

  } = props;

  const responseFacebook = (response) => {

    // setUser(response);
    // console.log(user);  

    let payload = {
      facebook_id: response.id,
      access_token: response.accessToken,
      enrolling_sponsor: 4
    };

    const facebookSignIn = () => {
      delete payload['enrolling_sponsor'];
      postData(LJI_URLS.SSO_FB_SIGN_IN, payload)
        .then(signInResp => {
          
          const LS_USER_DATA_TOKEN_KEY = 'userDataToken';
          let currentUserLS = getLocal(LS_USER_DATA_TOKEN_KEY);
          if (currentUserLS) {
            currentUserLS = JSON.parse(currentUserLS);
          } else {
            currentUserLS = {}
          }
          const {
            token,
            member_data: {
              member_id,
              user: {
                first_name,
                last_name,
                email
              }
            }
          } = signInResp.data;
          currentUserLS = {
            ...currentUserLS,
            token: token,
            memberId: member_id
          }
          setUser({
            name: `${first_name} ${last_name}`,
            email: email,
            id: member_id
          });
          console.log(first_name, last_name, token, currentUserLS)
          setLocal(LS_USER_DATA_TOKEN_KEY, JSON.stringify(currentUserLS));

        })
        .catch(err => {
          console.log('there is some error', err);
        })
    }

    postData(LJI_URLS.SSO_FB_SIGN_UP, payload)
      //success 
      .then(resp => {
        console.log(resp);
        facebookSignIn();
        // localStorage.setItem(LS_USER_DATA_TOKEN_KEY, JSON.stringify(currentUserTokenLS));
      })
      //error handling
      .catch(err => {
        console.log('err on sign in', err)
        const checkUnique = (allErr) => {
          let isUnique = false;
          for (let errType in allErr) {
            if (Array.isArray(allErr[errType])) {
              allErr[errType].forEach(errInstance => {
                if (errInstance.code === 'unique') {
                  isUnique = true;
                }
              })
            }
          }
          return isUnique;
        }
        if (checkUnique(err.response.data.error)) {
          facebookSignIn();
        }
      });


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
