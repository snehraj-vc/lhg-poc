import BrilliantHeader from "./BrilliantHeader";

export default {
    title:"Organism/BrillientHeader",
    component:BrilliantHeader,
    argsType:{}
}

const Template = (args) => <BrilliantHeader {...args}/>;

export const BrillientHeaderData = Template.bind({});

BrillientHeaderData.args={
    login: "Log In",
    dummy:"gdgdg",
    createaccountlink:"dummy path",
    createaccountlabel: "Create Account",
    brilliantimage:"data:image/png;base64,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",
    menuItems:[
        {
            itemText:"Home",
            itemLink:"dummy"
           },{
               itemText:"About Brillient",
               itemLink:"dummy"
           },{
               itemText:"Brilliant Benefits",
               itemLink:"dummy"
           },{
               itemText:"Redeem points",
               itemLink:"dummy"
           },{
               itemText:"Global Campaigns",
               itemLink:"dummy"
           }
    ],
    languages:[{
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

