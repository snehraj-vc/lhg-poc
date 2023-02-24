import React from "react";

const SliderImage = ((props) => {

    const {
        slides = []
    } = props;
    return (<>
        <div className="slider-image"> 
            {slides.map((res, idx) => {
                return <img src={res.url}></img>
            })
            }
        </div></>);

})

export default SliderImage;