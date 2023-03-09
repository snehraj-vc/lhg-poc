import React from "react";
import "./BrilliantFooter.scss";

const BrilliantFooter = (props) => {
    const {
        headerimage = "",
        arrayimage = [],
        data = [],
        social_url = []
    } = props

    return (<>
        <div className="footer-bg">
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

        {
            <div className="address">
                <h1>BRILLIANT BY LANGHAM</h1>
                <p>2701, Great Eagle Centre,</p>
                <p>23 Harbour road, wan chai, Hong kong</p>
                <p>info@brilliantbylangham</p>
            </div>
        }

        {
            <div className="social-icons">
                <div classsName="social-icons-label"><h1>Find us</h1></div>

                {social_url.map((res) => {
                    return (<img src={res.url}></img>)
                }
                )}
            </div>
        }
<ul className="footer-list">
        {
            data.map((idx) => {
                return ( <li>
                        {idx.title}
                    </li>
               )

            })
        }
        </ul>
        </>
    );
}

export default BrilliantFooter;