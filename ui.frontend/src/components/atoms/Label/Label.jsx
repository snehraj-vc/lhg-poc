import React from 'react';

const Label = (props) => {
    const {
        id="",
        className="",
        text=""
    } = props;

    return (
        <label for={id} className={className}>{text}</label>
    )
};

export default Label;