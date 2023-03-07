import React from "react";
import Select from "../Select/Select";
import "./Navbar.scss"
const Navbar = ((props) => {
    const {
        data = [],
        options=[],
        value="",
        onChange = () => null
    } = props
    return (<div className="navbar-list">
        {
            data.map((res) => {
                return (<>
                    <ul>
                        <li><a>{res.title}</a></li>
                    </ul>

                </>)
            })
        }
        <hr></hr>
        <div>
            <a>Create New Account</a>
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