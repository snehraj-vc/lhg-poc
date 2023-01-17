import React from 'react';

const Navigation = (props) => {
    const {
        id = ""
    } = props;
    return (<div id={id}>
        Hello Nav
    </div>)
};

export default Navigation;