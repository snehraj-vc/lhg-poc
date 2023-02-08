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
    data:[
      {
        Name: 'offers',
        link: [
            "/content/sitea/fnb",
            "/content/siteb/fnb"
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