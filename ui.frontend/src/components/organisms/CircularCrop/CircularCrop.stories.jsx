import React from "react";
import CircularCrop from "./CircularCrop";

export default {
    title:'Organism/CircularCrop',
    component: CircularCrop,
    argType:{}
}

const Template = (args) => <CircularCrop {...args}/>;

export const CircularCropData = Template.bind({});

CircularCropData.args = {
     text:"Image title",
     description:"Image description",
     image:"https://avatars.githubusercontent.com/u/112613356?v=4",
     altertext:"crop image"
}
