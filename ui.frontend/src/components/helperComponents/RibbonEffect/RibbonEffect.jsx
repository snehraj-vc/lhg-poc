import React from 'react';
import './style.scss';

const RibbonEffect = (props) => {
    const {
        color = 'red',
        position = 'topRight'
    } = props;


    return (
        <div className={`cp-ribbon-effect ${position}`}>
            <svg width="31" height="31" viewBox="0 0 31 31" fill={color} xmlns="http://www.w3.org/2000/svg">
                <path d="M30.5596 14.9737V15.7018L22.2287 17.386C19.8609 17.8422 18.0369 19.6667 17.5809 21.9825L15.8972 30.3159H15.1693L13.4856 21.9825C13.0296 19.658 11.2056 17.8422 8.84664 17.3422L0.55957 15.7018V14.9737L8.84664 13.2895C11.2144 12.8334 13.0296 11.0088 13.4856 8.64919L15.1693 0.315857H15.8972L17.5809 8.64919C18.0808 11.0176 19.8609 12.8422 22.2287 13.2895L30.5596 14.9737Z" fill="" />
            </svg>
        </div>
    );
}

export default RibbonEffect;