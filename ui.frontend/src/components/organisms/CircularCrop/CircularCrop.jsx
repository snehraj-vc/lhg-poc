import React from "react";
import './CircularCrop.scss';
const CircularCrop = (props) => {
    const {
        text="",
        image="",
        altertext=""
    } = props;
    return (<div className="CircularCrop-img-container">
        {text && <h1>{text}</h1>}
        <div className="Circular-image-card"> {image && <img className="Circular-image" src={image} alt={altertext}/>}</div>
       
    </div>);
}
 
export default CircularCrop;