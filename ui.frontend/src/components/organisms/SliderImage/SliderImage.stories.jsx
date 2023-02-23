import React, { Component } from "react";
import SliderImage from "./SliderImage";

export default{
    title:"Organism/SliderImage",
    Component:SliderImage,
    argType:{}
}

const Template = (args) => <SliderImage {...args}/>;

export const SliderImageData = Template.bind({}) ;

SliderImageData.args={
    slides:[
        { url: "https://source.unsplash.com/user/c_v_r/100×100", title: "beach" },
        { url: "https://picsum.photos/1200/600", title: "boat" },
        { url: "https://pixabay.com/images/download/woman-1594711_1920.jpg?attachment&modal", title: "forest" },
        { url: "https://picsum.photos/id/237/200/300", title: "city" },
        { url: "https://www.infogrepper.com/wp-content/uploads/2022/10/image-url-for-testing.png", title: "italy" }
    ]
}