import React, { useEffect, useRef } from 'react';
import { Button } from '../../atoms';
import './style.scss';

const PopupModal = props => {
    const {
        children,
        closePopupCallback,
        popupTitle = "",
        primaryBtnLabel = "",
        secondaryBtnLabel = "",
        primaryBtnCallback = () => null,
        secondaryBtnCallback = () => null
    } = props;
    const popupRef = useRef(null);
    const closeBtn = useRef(null);

    useEffect(() => {
        closeBtn.current.addEventListener('click', closePopupCallback);
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', (evt) => {
            evt = evt || window.event;
            let isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key === "Escape" || evt.key === "Esc");
            } else {
                isEscape = (evt.keyCode === 27);
            }
            if (isEscape) {
                closePopupCallback();
            }
        })
        return () => {
            document.body.style.overflow = 'visible';
            document.removeEventListener('keydown', () => null)
        }
    }, );

    return (<>
        <div ref={popupRef} className={'cp-popup-modal'}>
            <div className="popup-wrapper">
                <div className="popup-header">
                    {popupTitle && <h4>{popupTitle}</h4>}
                    <span className={'close-button'} ref={closeBtn}>X</span>
                </div>
                <div className="popup-content">
                    {children}
                </div>
                {primaryBtnLabel || secondaryBtnLabel ?
                    (<div className="popup-footer">
                        {primaryBtnLabel && <Button text={primaryBtnLabel} onClick={primaryBtnCallback} />}
                        {secondaryBtnLabel && <Button text={secondaryBtnLabel} onClick={secondaryBtnCallback} />}
                    </div>)
                    : null
                }
            </div>
        </div>
    </>)
};

export default PopupModal;