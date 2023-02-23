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
     title:"Image title",
     source:"https://avatars.githubusercontent.com/u/112613356?v=4"
}
