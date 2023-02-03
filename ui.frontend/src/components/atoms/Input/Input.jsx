import React from 'react';

const Input = (props) => {
    const {
        id="",
        className="",
        placeholder="",
        type="text",
        required=false,
        name="",
        value=""
    } = props;

    return (
        <>
            <input
                id={id}
                name={name}
                className={`cp-input ${className}`}
                placeholder={placeholder}
                type={type}
                required={required}
                value={value}
            />
        </>
    )
};

export default Input;