import React from "react";
import StaticOffer from "./StaticOffer";

export default {
    title:'Organism/StaticOffer',
    component:StaticOffer,
    argType:{}
}

const Template =(args) => <StaticOffer {...args}/>;

export const StaticofferData= Template.bind({});

StaticofferData.args={
 offers: [{
        title:"test-1",
        description:"lorem dummy content",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4yoGWnhaus_qDoR-kw0bjn_EkrN0TH7y-Q&usqp=CAU"
    }, {
        title:"test-2",
        description:"lorem dummy content",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4yoGWnhaus_qDoR-kw0bjn_EkrN0TH7y-Q&usqp=CAU"
    }, {
        title:"test-3",
        description:"lorem dummy content",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4yoGWnhaus_qDoR-kw0bjn_EkrN0TH7y-Q&usqp=CAU"
    }, {
        title:"test-4",
        description:"lorem dummy content",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk4yoGWnhaus_qDoR-kw0bjn_EkrN0TH7y-Q&usqp=CAU"
    }]
}