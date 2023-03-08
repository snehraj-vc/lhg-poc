import React from "react";
import "./BrilliantFooter.scss";

const BrilliantFooter = (props) => {
    const {
        headerimage = "",
        arrayimage = []
    } = props

    return (<div className="footer-bg">
        <div className="footerimg">
            <img src={headerimage} alt="" />
        </div>
        <div className="arrayimg">
            {arrayimage.map((res) => {
                return (<img src={res.url}></img>)
            })
            }
        </div>
    </div>
    );
}

export default BrilliantFooter;