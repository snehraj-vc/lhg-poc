import React from 'react';

const Button = (props) => {
    const {
        id="",
        className="",
        text="",
        type="",
    
        
    } = props;

    return (
        
        <button id={id}className={className} type={type}>{text}</button>
        
    )
};

export default Button;