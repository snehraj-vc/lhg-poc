import React from 'react';
import {
    SsoGoogle,
    FacebookSSO
} from '../../atoms';

const Sso = (props) => {
    const {
        className="",
        id="",
    } = props;

    return (
        <div className="sso-segment">
            <SsoGoogle id={id} className={className} />
            <FacebookSSO id={id} className={className} />
        </div>
    )
};

export default Sso;