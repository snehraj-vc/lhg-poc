import Navbar from "./Navbar";

export default {
    title:"Atoms/Navbar",
    component:Navbar,
    argsType:{}
}

const Template = (args) => <Navbar {...args}/>;

export const NavbarData = Template.bind({});

NavbarData.args={
    createaccountlabel: "Create Account",
    menuItems:[
    {
     itemText:"Home"
    },{
        itemText:"About Brillient"
    },{
        itemText:"Brilliant Benefits"
    },{
        itemText:"Redeem points"
    },{
        itemText:"Global Campaigns"
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