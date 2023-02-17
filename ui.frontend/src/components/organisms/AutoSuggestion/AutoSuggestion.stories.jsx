import React from "react";
import AutoSuggestion from "./AutoSuggestion";

export default {
    title:"Organism/AutoSuggestion",
    component:AutoSuggestion,
    argType:{}
}

const Template =(args) => <AutoSuggestion {...args}/>

export const AutoSuggestionData = Template.bind({});

AutoSuggestionData.args={
         "inputs": {
             "placeholder": "Search...",
             "name": "search-field"
         },
        "button":{
            "text":"Search Now",
        }
    
}