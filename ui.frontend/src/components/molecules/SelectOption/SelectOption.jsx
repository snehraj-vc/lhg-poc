import React from "react";
import { Select } from "../../atoms";
import { Label } from '../../atoms';

const SelectOption = (props) => {
    const {
        Withlabel = true,
        id = "",
        className = "",
        labelText = "",
        options = [],
        fieldName = "",
        value = "",
        onChange = () => null
    } = props
    return (
        <div className={className} id={id}>
            {Withlabel && <Label text={labelText} />}
            <Select
                preSelectedValue={value}
                options={options}
                value={value}
                name={fieldName}
                onChange={onChange}
            />
        </div>

    );
}

export default SelectOption;