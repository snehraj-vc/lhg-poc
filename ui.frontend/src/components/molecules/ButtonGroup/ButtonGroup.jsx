import React from 'react';
import { Button } from '../../atoms';

const ButtonGroup = (props) => {
    const {
        id="",
        className="",
        buttons = []
    } = props;

    return (
        <div id={id} className={`button-segment ${className}`}>
            {buttons && buttons.map((btn,idx) => {
                return <Button
                        id={btn.id}
                        onClick={btn.onClick}
                        className={btn.className}
                        type={btn.type}
                        text={btn.text}
                        key={idx}
                    />
            })}
        </div>
    )
};

export default ButtonGroup;