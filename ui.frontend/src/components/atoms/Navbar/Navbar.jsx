import React from "react";
import Select from "../Select/Select";
import "./Navbar.scss"
const Navbar = ((props) => {
    const {
        menuItems = [],
        options=[],
        value="",
        onChange = () => null,
        createaccountlabel = ""
    } = props
    return (<div className="navbar-list">
        {
            menuItems.map((res) => {
                return (<>
                        <li><a>{res.itemText}</a></li>

                </>)
            })
    
        }
        <hr></hr>
        <div>
            <a>{ createaccountlabel}</a>
            <div>
                <Select
                preSelectedValue={value}
                options={options}
                value={value}
                onChange={onChange}/>
            </div>
        </div>
    </div>)
})
export default Navbar;