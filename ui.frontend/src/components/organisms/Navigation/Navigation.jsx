import React from 'react';

const Navigation = (props) => {
    console.log('navigation props', props)
    const {
        id = "",
        items = []
    } = props;
    return (<div id={id}>
         {items.length ?
               
                        items.map((item, key) => {
                            console.log('item props', item)
                            const {
                                id,
                                title,
                                url
                            } = item;
                            return (<a href={url} key={key} id={id}>{title}</a>)
                        })
                    
                
                : null
            }
        {console.log('item props of navigation',id)}
    </div>)
};

export default Navigation;