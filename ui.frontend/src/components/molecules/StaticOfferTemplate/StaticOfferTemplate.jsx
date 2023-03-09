import React from 'react';

const StaticOfferTemplate = (props) => {
    const {
        title = "",
        description = "",
        source = "",
    } = props;

    return (<>
        <div className="cp-static-offer-template">
            {title && <h3>{title}</h3>}
            {description && <p>{description}</p>}
            {source && <img src={source} alt={description} />}
        </div>
    </>);
}

export default StaticOfferTemplate;