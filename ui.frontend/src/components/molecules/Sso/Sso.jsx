import React from 'react';
import {
    SsoGoogle,
    FacebookSSO
} from '../../atoms';

const Sso = (props) => {
    const {
        className="",
        id="",
        fbSso=true,
        gglSso=true,
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
        <div className="sso-segment" id={id} className={className}>
            { gglSso && <SsoGoogle {...gglProps } /> }
            { fbSso && <FacebookSSO {...fbProps} /> }
        </div>
    );
};

export default Sso;