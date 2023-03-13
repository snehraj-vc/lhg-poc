import React from "react";
import './BrilliantFooter.scss'
const BrilliantFooter = (props) => {

    const {
        brandsList = [],
        brandLogoPath = "",
        brandLogoAltText = "",
        contactInfo = "",
        findUs = "",
        socialIconsList = "",
        secondLevelList = [],
        thirdLevelList = [],
        copyrightText = ""

    } = props;
    return (<>
        <div className="footer-container">
            <div className="footer-HeaderBrandLog"><img src={brandLogoPath} alt={brandLogoAltText} /></div>
            <div className="footer-brandlogs">
                {brandsList.map((res) => {
                    return (<img src={res.logoPath} alt={res.altText} />);
                })
                }
            </div>
        </div>
        <div className="footer-contactContainer">
            <div className="footer-contactHeader">BRILLIANT BY LANGHAM</div>
            <div className="footer-contactAddress">
                <p>2701, Great Eagle Centre, 23 Harbour Road, Wan Chai, Hong Kong info@brilliantbylangham
                    F: +852 2186 2300 info@langhamhotels.com
                </p>

            </div>
            <div className="footerHorizontalLine-1"></div>
            <div className="footer-socialicons">
                <div className="iconLabel">{findUs}</div>
                <div className="socialIcons"> {socialIconsList.map((res) => {
                    return (<img src={res.logoPath} alt={res.altText} />)
                })}</div>

            </div>
            <div className="footerHorizontalLine-2"></div>
            <div className="footer-secondLevelList">
                {secondLevelList.map((res) => {
                    return (<a href={res.itemPath}>{res.itemText}</a>)
                })

                }
            </div>
            <div className="footerHorizontalLine-3"></div>
            <div className="footer-thirdLevelList">

                {thirdLevelList.map((res) => {
                    return (<a href={res.itemPath}>{res.itemText} |</a>)
                })
                }

                <p>{copyrightText}</p>
            </div>
        </div>
    </>);
}

export default BrilliantFooter;