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
        // weSso=true,
        fbAppId="",
        fbFields="",
        gglClientId = ""
    } = props;

    const fbProps = {
        fbAppId,
        fbFields
    }
    const gglProps = {
        gglClientId
    };

    return (
        <div className={`sso-segment ${className}`} id={id}>
           { console.log(props)}
            { gglSso && <SsoGoogle {...gglProps } /> }
            { fbSso && <SsoFacebook {...fbProps} /> }
            { appleSso && <SsoApple /> }
            {/* { weSso && <SsoWeChat /> } */}
            
        </div>
    );
};

export default Sso;