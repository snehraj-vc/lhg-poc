import Navbar from "./Navbar";

export default {
    title:"Atoms/Navbar",
    component:Navbar,
    argsType:{}
}

const Template = (args) => <Navbar {...args}/>;

export const NavbarData = Template.bind({});

NavbarData.args={
    data:[
    {
     title:"Home"
    },{
        title:"About Brillient"
    },{
        title:"Brilliant Benefits"
    },{
        title:"Redeem points"
    },{
        title:"Global Campaigns"
    }
],
options:[{
    value: "English",
    text: "english"
}, {
    value: "chinese",
    text: "Chinese"
}, {
    value: "French",
    text: "french"
}],
value:"English",

}