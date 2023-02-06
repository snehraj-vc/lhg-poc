import React from "react";
import Button from "./Button";

export default {
    title:"Atoms/Button",
    component: Button,
    argsTypr:{}
}

const Template = (args) => <Button {...args}/>;

export const ButtonCustom = Template.bind({});

ButtonCustom.args={
        id:"MainButtonCustom",
        className:"ButtonCustom",
        text:"Submit",
        type:"submit",
        onClick : () => (console.log("this is from story book")),

}