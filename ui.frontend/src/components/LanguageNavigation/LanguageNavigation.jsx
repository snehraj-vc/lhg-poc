import React from 'react';
import './style.css'

const LanguageNavigation = (props) => {
    // console.log('LanguageNavigation props', props);
    const {
        id = "",
        items = []
    } = props;
    return (<>
        <div id={id} class="navigation">
            {items.length ?
                <ul>
                    {
                        items.map((item, key) => {
                            console.log('item props', item)
                            const {
                                id,
                                url,
                                language,
                                title,
                                current
                            } = item;
                            return (<li key={key} id={id} lang={language} className={current ? "active" : ""}>
                                <a href={url}>{title}</a>
                            </li>)
                        })
                    }
                </ul>
                : null
            }
        </div>
    </>)
};

export default LanguageNavigation;