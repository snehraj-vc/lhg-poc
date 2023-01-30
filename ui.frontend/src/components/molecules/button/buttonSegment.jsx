import React from 'react';
import Button from '../../atoms'

const button_submit = (props) => {
    const {
        id="",
        className="",
        text="",
        type="",
    } = props;

    return (
        <div className="button-segment">
            <Button id={id} className={className} type={type} >{text}</Button>
            
        </div>
    )
};

export default button_submit;