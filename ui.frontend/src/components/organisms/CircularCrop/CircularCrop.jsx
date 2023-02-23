import React from "react";
import './CircularCrop.scss';
const CircularCrop = (props) => {
    const {
        title="",
        source="",
        altertext=""
    } = props;
    return (<div className="CircularCrop-img-container">
        {title && <h1>{title}</h1>}
        <div className="Circular-image-card"> {source && <img className="Circular-image" src={source} alt={altertext}/>}</div>
       
    </div>);
}
 
export default CircularCrop;