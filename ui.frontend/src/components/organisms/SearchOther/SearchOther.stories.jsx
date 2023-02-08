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
  options: [{
    value: "ind",
    text: "India"
  }, {
    value: "chn",
    text: "China"
  }, {
    value: "usa",
    text: "The United States of America"
  }],
  inputs: {
    placeholder: "Search...",
    name: "search-field",
  },
  button: {
    text: 'Search Now'
  }
}