import React from "react";
import AutoSuggestion from "./AutoSuggestion";

export default {
    title: "Organism/AutoSuggestion",
    component: AutoSuggestion,
    argType: {}
}

const Template = (args) => <AutoSuggestion {...args} />

export const AutoSuggestionData = Template.bind({});

AutoSuggestionData.args = {
    "inputPlaceholder": "Search ...",
    "searchFormTitle": "Search Hotels",
    "recentSearchText": "Recent searches",
    "value": "",
    "hotels": [
        {
            "name": "Langham Hotel, Mumbai",
            "country": "India",
            "continent": "Asia"
        },
        {
            "name": "Langham Hotel, Jaipur",
            "country": "India",
            "continent": "Asia"
        },
        {
            "name": "Langham Hotel, Shanghai",
            "country": "China",
            "continent": "Asia"
        },
        {
            "name": "Langham Hotel, New York",
            "country": "USA",
            "continent": "North America"
        }
    ]
}