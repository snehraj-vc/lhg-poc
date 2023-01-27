import React from 'react';
import './style.scss';

const LanguageNavigation = (props) => {
    const {
        id = "",
        items = []
    } = props;
    return (<>
    {console.log(props)}
        <div id={id} className="navigation">
        <div className="menu-img"><img src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"  alt="" className="icon-img"/></div>
        <div className="menu-item">
            {items.length ?
                <ul>
                    {
                        items.map((item, key) => {
                            const {
                                id,
                                url,
                                language,
                                title,
                                current
                            } = item;
                            return (<li key={key} id={id} lang={language} className={current ? "active" : ""}>
                                <a href={url}>{title}</a>
                                {console.log(item.url)}
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