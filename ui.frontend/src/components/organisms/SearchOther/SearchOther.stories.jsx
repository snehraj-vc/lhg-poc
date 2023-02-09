import React, { Component } from "react";
import SearchOther from "./SearchOther";

export default {
  title: "Organism/Search",
  Component: SearchOther,
  argsType: {}
}
const Template = (args) => <SearchOther {...args} />;

export const SearchContent = Template.bind({});

SearchContent.args = {
  text: `{
    "categories": [{
      "value": "all",
      "text": "All"
    }, {
      "value": "cat1",
      "text": "Category 1"
    }, {
      "value": "cat2",
      "text": "Category 2"
    }, {
      "value": "cat3",
      "text": "Category 3"
    }],
    "inputs": {
      "placeholder": "Search...",
      "name": "search-field"
    },
    "button": {
      "text": "Search Now"
    },
    "sitePathData": {
      "offering": ["/content/sitea/us/en/offers", "/content/siteb/us/en/offers"],
      "FnB": ["/content/sitea/fnb", "/content/siteb/fnb"],
      "Hotel": ["/content/sitea/hotel", "/content/siteb/hotel"]
    }
  }`
}