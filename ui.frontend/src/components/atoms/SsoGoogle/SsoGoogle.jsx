import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { postData } from '../../../utils/server';
import { LJI_URLS } from '../../../utils/constants';
import { getLocal, setLocal } from '../../../utils';

const SsoGoogle = (props) => {
    const [profile, setProfile] = useState({
        name: '',
        email: ''
    });
    const [imageUrl, setImageUrl] = useState("");

    const {
        gglClientId = '',
        isLogin = false,
    } = props;

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: gglClientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const signInAction = (tokenId, googleId) => {
        const payload = {
            id_token: tokenId,
            google_id: googleId
        };

        postData(LJI_URLS.SSO_GG_SIGN_IN, payload)
            .then(signInResp => {
                const LS_USER_DATA_TOKEN_KEY = 'userDataToken';
                let currentUserLS = getLocal(LS_USER_DATA_TOKEN_KEY);
                if (currentUserLS) {
                    currentUserLS = JSON.parse(currentUserLS);
                } else {
                    currentUserLS = {};
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
                    memberId: member_id,
                    step: 'loggedIn',
                }
                setLocal(LS_USER_DATA_TOKEN_KEY, JSON.stringify(currentUserLS));
                console.log(first_name)
                setProfile({
                    name: `${first_name} ${last_name}`,
                    email: email
                });
            })
            .catch(() => {
                alert('Error logging in');
            });

    }

    /**
     * 
     * @param {object} res | This is the reponse from Google signin api
     */
    const onSuccess = (res) => {
        setImageUrl(res.profileObj.imageUrl);

        const payload = {
            id_token: res.tokenId,
            google_id: res.googleId,
            enrolling_sponsor: 4
        };

        if(isLogin) {
            signInAction(res.tokenId, res.googleId)
        } else {
            postData(LJI_URLS.SSO_GG_SIGN_UP, payload)
                .then(() => {
                    alert("Sign up successful");
                })
                .catch(err => {
                  
                    if (err.response.data.error.code === 'member_exists' || err.response.data.error.email[0].code === 'unique') {
                        alert("user aready exist");
                    } else {
                        alert('sign up error');
                    }
                })
        }
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile({});
        setImageUrl("");
    };

    return (
        <div className="sso-google">
            {(profile.name || profile.email) ? (
                <div>
                    {imageUrl && <img src={imageUrl} alt="user" />}
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <GoogleLogout clientId={gglClientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            ) : (
                <GoogleLogin
                    clientId={gglClientId}
                    buttonText={isLogin ? "Sign In" : "sign Up"}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
    );
}
export default SsoGoogle;