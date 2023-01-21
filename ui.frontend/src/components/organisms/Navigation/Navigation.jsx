import React from 'react';

const Navigation = (props) => {
    const {
        id = "",
        items = []
    } = props;
    return (<div id={id}>
        {items.length ?
            items.map((item, key) => {
                const {
                    id,
                    title,
                    url
                } = item;
                return (<a href={url} key={key} id={id}>{title}</a>)
            })
            : null
        }
    </div>)
};

export default Navigation;