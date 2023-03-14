import React from 'react';
import { TextField } from '@mui/material';
import './style.scss';

const Input = (props) => {
    const {
        id="",
        placeholder="",
        type="text",
        required=false,
        name="",
        value="",
        onChange = () => null,
        onBlur = () => null,
        onFocus = () => null,
        disabled=false,
        helperText="",
        label="",
        error=false,
        className="",
        variant="standard"
    } = props;

    return (
        <>
            <TextField
                id={id}
                onChange={(e) => onChange(e.target.value, name)}
                onBlur={(e) => onBlur(e.target.value, name)}
                onFocus={(e) => onFocus(e.target.value, name)}
                placeholder={placeholder}
                required={required}
                name={name}
                type={type}
                disabled={disabled}
                helperText={helperText}
                value={value}
                label={label}
                error={error}
                variant={variant}
                className={`cp-input ${className}`}
            />
        </>
    )
};

export default Input;