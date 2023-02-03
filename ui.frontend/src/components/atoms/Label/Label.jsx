import React from 'react';

const Label = (props) => {
    const {
        id="",
        className="",
        text=""
    } = props;

    return (
        <>
            <label htmlFor={id} className={`cp-label ${className}`}>
                {text}
            </label>
        </>
    )
};

export default Label;