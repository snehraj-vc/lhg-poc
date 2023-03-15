import React from "react";
import Select from "../../atoms/Select/Select";
import "./Navbar.scss"
const Navbar = ((props) => {
    const {
        menuItems = [],
        languages = [],
        value = "",
        onLanguageSelect = () => null,
        createaccountlabel = "",
        createaccountlink="",
        login = "",
        loginurl ="",
    } = props;
    console.log('languages:::', languages);
    return (<div className="cp-navbar">
        <div className="navbar-list">

        <ul >
            {
                menuItems.map((res) => {
                    return (<>
                        <li><a href={res.itemLink}>{res.itemText}</a></li>
                    </>)
                })

            }
        </ul>
        </div>
       
      <div className="horizontal-line"></div>
        <div className="cp-navbar-bottom">
            <div></div>
            <a href={createaccountlink}>{createaccountlabel}</a>
            <div className="cp-navbar-languageToggle">
                <Select
                    preSelectedValue={value}
                    options={languages}
                    value={value}
                    onChange={onLanguageSelect} />
            </div>
        </div>
        
    </div>)
})
export default Navbar;