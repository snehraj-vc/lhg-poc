import React from 'react';

const Button = (props) => {
    const {
        id="",
        className="",
        text="",
        type="",
        onClick = () => null,
    } = props;

    return (
        <button id={id} className={className} onClick={() => onClick()} type={type}>{text}</button>
    )
};

export default Button;