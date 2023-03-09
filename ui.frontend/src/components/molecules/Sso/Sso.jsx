import React from 'react';
import {
    SsoGoogle,
    SsoFacebook,
    SsoApple,
    // SsoWeChat
} from '../../atoms';

const Sso = (props) => {
    {console.log(props)}
    const {
        className="",
        id="",
        fbSso=true,
        gglSso=true,
        appleSso=true,
        fbAppId="",
        fbFields="",
        gglClientId = ""
    } = props;

    const fbProps = {
        fbAppId,
        fbFields
    }
    const gglProps = {
        gglClientId,
        isLogin:true
    };

    return (
        <div className={`sso-segment ${className}`} id={id}>
            { gglSso && <SsoGoogle {...gglProps } /> }
            { fbSso && <SsoFacebook {...fbProps} /> }
            { appleSso && <SsoApple /> }
        </div>
    );
};

export default Sso;