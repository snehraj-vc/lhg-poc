import React, { useEffect, useRef } from 'react';

const Olapic = (props) => {
    const {
        html = ""
    } = props;

    const olapicRef = useRef(null);

    useEffect(() => {
		if(html){
			const fragment = document.createRange().createContextualFragment(html);
        	olapicRef.current.append(fragment);
		}
        
    });

    return (
        <>
            {html && (<div className={`cp-olapic wrapper`} ref={olapicRef}></div>)}
        </>
    )
};

export default Olapic;