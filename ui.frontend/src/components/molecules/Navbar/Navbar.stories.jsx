import Navbar from "./Navbar";

export default {
    title:"Molecules/Navbar",
    component:Navbar,
    argsType:{}
}

const Template = (args) => <Navbar {...args}/>;

export const NavbarData = Template.bind({});

NavbarData.args={
    login: "Log In",
    createaccountlink:"dummy comment",
    createaccountlabel: "Create Account",
    menuItems:[
    {
     itemText:"Home",
     itemLink:"#"
    },{
        itemText:"About Brillient",
        itemLink:"#"
    },{
        itemText:"Brilliant Benefits",
        itemLink:"#"
    },{
        itemText:"Redeem points",
        itemLink:"#"
    },{
        itemText:"Global Campaigns",
        itemLink:"#"
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