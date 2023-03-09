import React, {useState} from 'react';
import './style.scss';

const Accordion = props => {
    const {
        children,
        title = "",
        isDefaultOpen = false,
    } = props;
    const [open, setOpen] = useState(isDefaultOpen);

    const toggleOpenState = () => {
        setOpen(!open);
    };

    return (<>
        <div className={`cp-accordion ${!open ? 'accordion-close' : ''}`}>
            <div className={'accordion-title'} onClick={toggleOpenState}>{title}</div>
            <div className={'accordion-children'}>
                {children}
            </div>
        </div>
    </>);
};

export default Accordion;