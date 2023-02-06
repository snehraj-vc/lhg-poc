import React, {useEffect, useRef} from 'react';

const Olapic = (props) => {
    const {
        id="",
        html=""
    } = props;

    const olapicRef = useRef(null);

    useEffect(() => {
        const fragment = document.createRange().createContextualFragment(html);
        olapicRef.current.append(fragment);
    });

    return (
        <>
            {html && (<div id={id} ref={olapicRef}></div>)}
        </>
    )
};

export default Olapic;