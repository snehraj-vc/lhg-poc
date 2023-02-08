import React, { Component } from "react";
import SearchOther from "./SearchOther";

export default {
    title:"Organism/Search",
    Component:SearchOther,
    argsType:{}
}
const Template = (args) => <SearchOther {...args}/>;

export const SearchContent = Template.bind({});

SearchContent.args={
  value:"",
  text:"Search",
  placeholder:"Search...",
  options:[{
    value: "ind",
    text: "India"
}, {
    value: "chn",
    text: "China"
}, {
    value: "usa",
    text: "The United States of America"
}],
    data:[
      {
        Name: 'offers',
        link: [
          "/content/sitea",
          "/content/siteb",
          "/content/lhg-lms"
            ]
      },
      {
        Name: 'FnB',
        link: [
            "/content/sitea/hotel",
            "/content/siteb/hotel"
            ]
      },
      {
        Name: 'Hotel',
        link: [ 
            "/content/sitea/hotel",
            "/content/siteb/hotel"
            ]
      },
      {
        Name: 'Rooms',
        link: [ 
            "/content/sitea/hotel",
            "/content/siteb/hotel"
            ]
      },
      {
        Name: 'Admin',
        link: [ 
            "/content/sitea/hotel",
            "/content/siteb/hotel"
            ]
      }
    ]
}