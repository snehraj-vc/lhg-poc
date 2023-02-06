import React from 'react';

const Select = (props) => {
    const {
        id = "",
        className = "",
        name = "",
        options = [],
        preSelectedValue = "",
        onChange = () => null
    } = props;

    return (
        <>
            <select name={name} id={id} defaultValue={preSelectedValue} className={`cp-select ${className}`} onChange={(e) => onChange(e)}>
                {options.length && options.map((opt, idx) => {
                    return (<option
                                value={opt.value}
                                key={idx}
                            >
                                {opt.text}
                            </option>
                        )
                })}
            </select>
        </>
    );
}

export default Select;
