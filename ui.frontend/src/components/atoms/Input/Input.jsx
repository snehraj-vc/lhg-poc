import React from 'react';

const Input = (props) => {
    
    const {
        id="",
        className="",
        placeholder="",
        type="text",
        required=false,
        name="",
        value="",
        onChange = () => null,
        onBlur = () => null,
        disabled=false
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
                onChange={(e) => onChange(e.target.value, name)}
                onBlur={(e) => onBlur(e.target.value, name)}
                disabled={disabled}
            />
        </>
    )
};

export default Input;