import React from 'react';
import './style.css'

const LanguageNavigation = (props) => {
    // console.log('LanguageNavigation props', props);
    const {
        id = "",
        items = []
    } = props;
    return (<>
        <div id={id} className="navigation">
        <div className="menu-img"><img src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"  alt="" className="icon-img"/></div>
        <div className="menu-item">
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
        </div>
    </>)
};

export default LanguageNavigation;