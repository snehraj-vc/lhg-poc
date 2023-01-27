import React from 'react';
import {
    SsoGoogle,
    SsoFacebook,
    SsoApple,
    SsoWeChat
} from '../../atoms';

const Sso = (props) => {
    const {
        className="",
        id="",
        fbSso=true,
        gglSso=true,
        appleSso=true,
        weSso=true,
        fbappid="",
        fbFields="",
        gglclientid = ""
    } = props;

    const fbProps = {
        fbappid,
        fbFields
    }
    const gglProps = {
        gglclientid
    };

    return (
        <div className={`sso-segment ${className}`} id={id}>
            { gglSso && <SsoGoogle {...gglProps } /> }
            { fbSso && <SsoFacebook {...fbProps} /> }
            { appleSso && <SsoApple /> }
            {/* { weSso && <SsoWeChat /> } */}
            
        </div>
    );
};

export default Sso;