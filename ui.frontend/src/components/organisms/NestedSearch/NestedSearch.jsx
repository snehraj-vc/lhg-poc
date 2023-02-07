import React from 'react';
import './style.scss';

/**
 * 
 * Requirements
 * 
 * 
 * 1- content structure- site a, site b site c

2- create a component which is having dialogue of nested multifield

3- each item in the multifield has text and multiple path field in each item

4- create a sling model for nested multifield 

5- React-  left- dropdown -title of items

   -select offers from drpdown type in search and submit

-- UI will post data to sling servlet  with keyword that has been searched and the all the path

6- write a sling servlet which will search the text at all the path for that categories and return to UI  
 * 
 * 
 * 
 * 
 */

const NestedSearch = (props) => {
  const {
    text
  } = props;
  let searchPathsArray = {};

  if(text && typeof text === 'string') {
    searchPathsArray = JSON.parse(text);
  }

  return (<div className="cm-search-other">
    {searchPathsArray && searchPathsArray.length && searchPathsArray.offers.map(a => (<div>{a}</div>))}
  </div>);
}

  
export default NestedSearch;