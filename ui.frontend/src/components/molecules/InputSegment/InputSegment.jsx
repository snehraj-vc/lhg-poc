import React from 'react';
import {
    Input,
    Label
} from '../../atoms';

const InputSegment = (props) => {
    const {
        inputWithLabel=true,
        className="",
        id="",
        name="",
        required=false,
        placeholder="",
        labelText="",
        inputType=""
    } = props;

    return (
        <div className="input-segment">
            {inputWithLabel && <Label id={id} className={className} text={labelText} />}
            <Input id={id} name={name} type={inputType} required={required} placeholder={placeholder} className={className} />
        </div>
    )
};

export default InputSegment;