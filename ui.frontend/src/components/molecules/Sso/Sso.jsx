import React from 'react';
import {
    SsoGoogle,
    SsoFacebook
} from '../../atoms';

const Sso = (props) => {
    const {
        className="",
        id="",
        fbSso=true,
        gglSso=true,
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
        </div>
    );
};

export default Sso;