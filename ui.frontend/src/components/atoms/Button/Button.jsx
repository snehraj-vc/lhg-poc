import React from 'react';

const Button = (props) => {
    const {
        id="",
        className="",
        text="",
        type="",
        onClick = () => null,
        disabled=false
    } = props;

    return (
        <>
            <button id={id} className={`cp-button ${className}`} disabled={disabled} onClick={(e) => onClick(e)} type={type}>
                {text}
            </button>
        </>
    )
};

export default Button;