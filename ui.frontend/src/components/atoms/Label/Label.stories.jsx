import React from "react";
import Label from "./Label";

export default {
    title:"Atoms/Label",
    component:Label,
    args:{}
}

const Template = (args) => <Label {...args}/>

export const LabelCustom = Template.bind({});

LabelCustom.args = {
        id:"MainLabelCustom",
        className:"LabelCustom",
        text:"Custom Input"
}