import React, {useEffect, useRef} from 'react';

const Olapic = (props) => {
    const {
        id="",
        scriptLink="",
        widgetName="",
        instance="",
        apikey="",
        async="async"
    } = props;

    const olapicRef = useRef(null);

    useEffect(() => {
        if(!document.querySelector(`script[src="${scriptLink}"]`)) {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = async;
            s.src=scriptLink;
            s.dataset.olapic = widgetName;
            s.dataset.instance = instance;
            s.dataset.apikey = apikey;
            document.body.appendChild(s);
        }
    });

    return (
        <>
            <div id={id} ref={olapicRef}></div>
        </>
    )
};

export default Olapic;