import React from "react";
import StaticOfferTemplate from "./StaticOfferTemplate";
 
export default {
    title:'Molecules/StaticOfferTemplate',
    component:StaticOfferTemplate,
    argType:{}
}

const Template= (args) => <StaticOfferTemplate {...args}/>;

export const StaticOfferContent = Template.bind({});

StaticOfferContent.args={
    title:"offer title",
    description:"some dummy content",
    source:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4yoGWnhaus_qDoR-kw0bjn_EkrN0TH7y-Q&usqp=CAU",
}
