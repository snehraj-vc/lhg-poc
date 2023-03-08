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
        { url: "https://media.istockphoto.com/id/1157799221/photo/malaikottai-temple-at-trichy-tamilnadu-india.jpg?s=612x612&w=0&k=20&c=YGNMFVSkgfhN6QI35KsBZm-cn3gFPnlcKs00AGwg8kQ=", title: "city" },
        { url: "https://www.infogrepper.com/wp-content/uploads/2022/10/image-url-for-testing.png", title: "italy" }
    ]
}